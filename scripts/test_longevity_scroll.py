import asyncio
from playwright.async_api import async_playwright

URL = "http://localhost:8080/longevity"
VIEWPORTS = [(390, 844), (768, 1024), (974, 738), (1440, 900)]
ORDER = ["1", "2", "4", "6"]

async def card_state(page):
    return await page.locator("[data-story-card]").evaluate("""card => ({
      chapter: card.dataset.chapter, phase: card.dataset.storyPhase,
      opacity: parseFloat(getComputedStyle(card).opacity),
      transform: getComputedStyle(card).transform,
      count: document.querySelectorAll('[data-story-card]').length,
      scrollY
    })""")

async def open_scene(page):
    await page.goto(URL, wait_until="domcontentloaded")
    await page.evaluate("window.scrollTo(0, document.querySelector('#timeline').offsetTop)")
    await page.wait_for_function("""() => {
      const card=document.querySelector('[data-story-card]');
      return card?.dataset.storyStarted === 'true' && card?.dataset.storyPhase === 'idle';
    }""")

async def wait_idle(page):
    await page.wait_for_function("document.querySelector('[data-story-card]')?.dataset.storyPhase === 'idle'", timeout=4000)

async def wheel(page, delta=120):
    size = page.viewport_size or {"width": 800, "height": 800}
    await page.mouse.move(size["width"] / 2, size["height"] / 2)
    await page.mouse.wheel(0, delta)

async def check_animation(page):
    before = await card_state(page)
    sample = await page.evaluate("""async () => {
      const started = performance.now();
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 150));
      const card = document.querySelector('[data-story-card]');
      return { started, leaving: { chapter: card?.dataset.chapter, phase: card?.dataset.storyPhase,
        opacity: parseFloat(getComputedStyle(card).opacity), transform: getComputedStyle(card).transform,
        count: document.querySelectorAll('[data-story-card]').length, scrollY } };
    }""")
    started = sample["started"]
    leaving = sample["leaving"]
    assert leaving["chapter"] == before["chapter"], "Содержимое сменилось до завершения выхода"
    assert leaving["phase"] == "exit", f"Через 150 ms должна идти фаза выхода: {leaving}"
    assert 0.05 < leaving["opacity"] < 0.95, "Старая карточка должна оставаться видимой через 150 ms"
    await page.wait_for_function("""chapter => {
      const card=document.querySelector('[data-story-card]');
      return card?.dataset.chapter !== chapter && parseFloat(getComputedStyle(card).opacity) <= .05;
    }""", arg=before["chapter"])
    swapped = await card_state(page)
    assert swapped["count"] == 1, "В сцене должна быть ровно одна карточка"
    await page.wait_for_function("document.querySelector('[data-story-card]')?.dataset.storyPhase === 'hold'")
    elapsed = await page.evaluate("started => performance.now() - started", started)
    assert 650 <= elapsed <= 900, f"Вход завершился за {elapsed:.0f} ms вместо 650–900 ms"
    held = await card_state(page)
    await page.wait_for_timeout(850)
    later = await card_state(page)
    assert (later["chapter"], later["opacity"], later["transform"]) == (held["chapter"], held["opacity"], held["transform"]), "Карточка двигалась во время паузы чтения"
    await wait_idle(page)

async def check_sequence(page):
    for expected in ORDER[1:]:
        await wheel(page); await wait_idle(page)
        assert (await card_state(page))["chapter"] == expected
    for expected in reversed(ORDER[:-1]):
        await wheel(page, -120); await wait_idle(page)
        assert (await card_state(page))["chapter"] == expected

async def check_inertia(page):
    for delta in [14, 24, 36, 28, 20, 14, 12]:
        await page.mouse.wheel(0, delta)
        await page.wait_for_timeout(70)
    await wait_idle(page)
    assert (await card_state(page))["chapter"] == "2", "Инерционный импульс перескочил больше одной главы"

async def check_inputs(page):
    await page.keyboard.press("ArrowDown"); await wait_idle(page)
    assert (await card_state(page))["chapter"] == "4", "Клавиатура переключила неверное число глав"
    slider = page.get_by_role("slider", name="Перемотка таймлайна")
    await slider.focus(); await page.keyboard.press("End"); await wait_idle(page)
    assert (await card_state(page))["chapter"] == "6", "Ползунок не использовал общий переход"
    await page.evaluate("""() => {
      window.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[{clientY:500}]}));
      window.dispatchEvent(new TouchEvent('touchmove',{bubbles:true,cancelable:true,touches:[{clientY:560}]}));
      window.dispatchEvent(new TouchEvent('touchend',{bubbles:true}));
    }""")
    await wait_idle(page)
    assert (await card_state(page))["chapter"] == "4", "Свайп переключил неверное число глав"

async def check_boundaries(page):
    y = await page.evaluate("scrollY"); await wheel(page, -120); await page.wait_for_timeout(250)
    assert await page.evaluate("scrollY") < y, "На первой главе прокрутка вверх не отдана странице"
    await page.evaluate("window.scrollTo(0, document.querySelector('#timeline').offsetTop)")
    for _ in ORDER[1:]: await wheel(page); await wait_idle(page)
    y = await page.evaluate("scrollY"); await wheel(page); await page.wait_for_timeout(250)
    assert await page.evaluate("scrollY") > y, "На последней главе прокрутка вниз не отдана странице"

async def check_viewport(browser, width, height, comprehensive):
    context = await browser.new_context(viewport={"width": width, "height": height})
    page = await context.new_page(); errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    await open_scene(page)
    y = await page.evaluate("scrollY")
    await check_animation(page)
    assert abs(await page.evaluate("scrollY") - y) <= 2, "Внутренний шаг прокрутил страницу"
    card = await page.locator("[data-story-card]").bounding_box()
    scene = await page.locator("[data-timeline-scene]").bounding_box()
    assert card and scene
    assert card["x"] >= scene["x"] - 1 and card["x"] + card["width"] <= scene["x"] + scene["width"] + 1
    assert card["y"] >= scene["y"] - 1 and card["y"] + card["height"] <= scene["y"] + scene["height"] + 1
    assert await page.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth") == 0
    assert not errors, "; ".join(errors)
    if comprehensive:
        await open_scene(page); await check_sequence(page)
        await open_scene(page); await check_inertia(page); await check_inputs(page)
        await open_scene(page); await check_boundaries(page)
    await context.close()
    print(f"PASS {width}×{height}")

async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        for width, height in VIEWPORTS:
            await check_viewport(browser, width, height, width == 974)
        await browser.close()
    print("PASS: все критерии скролл-сцены выполнены")

asyncio.run(main())