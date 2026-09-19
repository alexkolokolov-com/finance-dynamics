"""Комплексная проверка скролл-сцены /longevity.

Запуск: python3 scripts/test_longevity_scroll.py
Сцена привязана к позиции прокрутки: главы 1 -> 2 -> 4 -> 6 не могут быть
пропущены ни на какой скорости, прокрутка страницы не перехватывается.
"""

import asyncio
import sys

from playwright.async_api import async_playwright

URL = "http://localhost:8080/longevity"
SIZES = [(390, 844), (768, 1024), (974, 738), (1440, 900)]
EXPECTED = ["1", "2", "4", "6"]
SPEEDS = [(300, 100), (200, 400), (120, 1200)]

STATE = """() => {
  const card = document.querySelector('[data-story-card]');
  const cards = document.querySelectorAll('[data-story-card]').length;
  const style = card ? getComputedStyle(card) : null;
  return {
    y: window.scrollY,
    cards,
    chapter: card ? card.getAttribute('data-chapter') : null,
    phase: card ? card.getAttribute('data-story-phase') : null,
    opacity: style ? parseFloat(style.opacity) : null,
    transform: style ? style.transform : null,
    label: document.querySelector('[data-timeline-scene] p')?.textContent ?? '',
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
}"""


def dedupe(values):
    out = []
    for value in values:
        if not out or out[-1] != value:
            out.append(value)
    return out


async def scroll_pass(page, delta, gap, steps, failures, label):
    states = []
    blocked = 0
    previous_y = await page.evaluate("window.scrollY")
    for _ in range(steps):
        await page.mouse.wheel(0, delta)
        await page.wait_for_timeout(gap)
        state = await page.evaluate(STATE)
        states.append(state)
        at_bottom = await page.evaluate("window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2")
        if delta > 0 and state["y"] == previous_y and state["y"] > 0 and not at_bottom:
            blocked += 1
        previous_y = state["y"]
        if state["cards"] != 1:
            failures.append(f"{label}: карточек в DOM {state['cards']}")
    sequence = dedupe([state["chapter"] for state in states if state["chapter"]])
    return states, sequence, blocked


async def check_size(page, width, height, errors, failures):
    await page.set_viewport_size({"width": width, "height": height})
    tag = f"{width}x{height}"
    await page.goto(URL, wait_until="domcontentloaded")
    await page.wait_for_timeout(1200)

    for delta, gap in SPEEDS:
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(600)
        steps = max(int((6.0 * height) / delta) + 6, 12)
        label = f"{tag} вниз d={delta}/{gap}ms"
        states, sequence, blocked = await scroll_pass(page, delta, gap, steps, failures, label)
        if sequence != EXPECTED:
            failures.append(f"{label}: главы {sequence}, ожидалось {EXPECTED}")
        if blocked:
            failures.append(f"{label}: прокрутка заблокирована {blocked} раз")
        hold_by_chapter = {}
        for state in states:
            if state["phase"] == "hold" and state["chapter"]:
                hold_by_chapter[state["chapter"]] = hold_by_chapter.get(state["chapter"], 0) + 1
                if state["opacity"] is not None and state["opacity"] < 0.999:
                    failures.append(f"{label}: во время hold opacity {state['opacity']}")
        for chapter in EXPECTED:
            if chapter not in hold_by_chapter:
                failures.append(f"{label}: у главы {chapter} нет фазы удержания")
        for state in states:
            if state["overflowX"] != 0:
                failures.append(f"{label}: горизонтальный overflow {state['overflowX']}")
                break
        for state in states:
            if state["chapter"] and state["label"] and state["label"].strip():
                expected_range = {"1": "0", "2": "35", "4": "40", "6": "80"}[state["chapter"]]
                if width >= 640 and not state["label"].strip().startswith(expected_range):
                    failures.append(f"{label}: подпись «{state['label']}» не совпадает с главой {state['chapter']}")
                    break

    label = f"{tag} вверх"
    _, sequence, _ = await scroll_pass(page, -200, 400, max(int((6.0 * height) / 200) + 6, 12), failures, label)
    if sequence != list(reversed(EXPECTED)):
        failures.append(f"{label}: главы {sequence}, ожидалось {list(reversed(EXPECTED))}")

    if errors:
        failures.append(f"{tag}: ошибки страницы {errors[:3]}")


async def main():
    failures = []
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        for width, height in SIZES:
            errors.clear()
            await check_size(page, width, height, errors, failures)
            print(f"проверено {width}x{height}")
        await browser.close()

    if failures:
        print("\nПРОВАЛЫ:")
        for failure in failures:
            print(" -", failure)
        sys.exit(1)
    print("\nвсе проверки пройдены")


asyncio.run(main())
