import { chromium } from "playwright";
import assert from "node:assert/strict";

const URL = "http://localhost:8080/longevity";
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 974, height: 738 },
  { width: 1440, height: 900 },
];
const ORDER = ["1", "2", "4", "6"];

const state = async (page) => page.locator("[data-story-card]").evaluate((card) => ({
  chapter: card.dataset.chapter,
  phase: card.dataset.storyPhase,
  opacity: Number.parseFloat(getComputedStyle(card).opacity),
  transform: getComputedStyle(card).transform,
  count: document.querySelectorAll("[data-story-card]").length,
  scrollY,
}));

const openScene = async (page) => {
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, document.querySelector("#timeline")?.offsetTop ?? 0));
  await page.waitForFunction(() => document.querySelector("[data-story-card]")?.getAttribute("data-story-phase") === "idle");
};

const wheelStep = async (page, delta = 120) => {
  const viewport = page.viewportSize();
  await page.mouse.move((viewport?.width ?? 800) / 2, (viewport?.height ?? 800) / 2);
  await page.mouse.wheel(0, delta);
};

const waitIdle = (page) => page.waitForFunction(() => document.querySelector("[data-story-card]")?.getAttribute("data-story-phase") === "idle");

const checkAnimation = async (page) => {
  const before = await state(page);
  const startedAt = performance.now();
  await wheelStep(page);
  await page.waitForTimeout(150);
  const leaving = await state(page);
  assert.equal(leaving.chapter, before.chapter, "Содержимое сменилось до завершения выхода");
  assert.equal(leaving.phase, "exit", "Через 150 ms должна идти фаза выхода");
  assert(leaving.opacity > 0.05 && leaving.opacity < 0.95, "Через 150 ms старая карточка должна оставаться видимой");

  await page.waitForFunction((chapter) => {
    const card = document.querySelector("[data-story-card]");
    return card?.getAttribute("data-chapter") !== chapter && Number.parseFloat(getComputedStyle(card).opacity) <= 0.05;
  }, before.chapter);
  const swapped = await state(page);
  assert.equal(swapped.count, 1, "В сцене должна быть ровно одна карточка");

  await page.waitForFunction(() => document.querySelector("[data-story-card]")?.getAttribute("data-story-phase") === "hold");
  const enteredAt = performance.now() - startedAt;
  assert(enteredAt >= 650 && enteredAt <= 900, `Вход завершился за ${Math.round(enteredAt)} ms вместо 650–900 ms`);
  const held = await state(page);
  await page.waitForTimeout(850);
  const heldLater = await state(page);
  assert.equal(heldLater.chapter, held.chapter, "Карточка сменилась во время паузы чтения");
  assert.equal(heldLater.opacity, held.opacity, "Opacity изменился во время паузы чтения");
  assert.equal(heldLater.transform, held.transform, "Положение изменилось во время паузы чтения");
  await waitIdle(page);
};

const checkWheelSequence = async (page) => {
  for (let position = 1; position < ORDER.length; position += 1) {
    await wheelStep(page);
    await waitIdle(page);
    assert.equal((await state(page)).chapter, ORDER[position]);
  }
  for (let position = ORDER.length - 2; position >= 0; position -= 1) {
    await wheelStep(page, -120);
    await waitIdle(page);
    assert.equal((await state(page)).chapter, ORDER[position]);
  }
};

const checkInertia = async (page) => {
  for (const delta of [14, 24, 36, 28, 20, 14, 12]) {
    await page.mouse.wheel(0, delta);
    await page.waitForTimeout(70);
  }
  await waitIdle(page);
  assert.equal((await state(page)).chapter, "2", "Инерционный импульс перескочил больше одной главы");
};

const checkOtherInputs = async (page) => {
  await page.keyboard.press("ArrowDown");
  await waitIdle(page);
  assert.equal((await state(page)).chapter, "4", "Клавиатура не переключила ровно одну главу");

  const slider = page.getByRole("slider", { name: "Перемотка таймлайна" });
  await slider.focus();
  await page.keyboard.press("End");
  await waitIdle(page);
  assert.equal((await state(page)).chapter, "6", "Ползунок не использовал общий переход");

  await page.evaluate(() => {
    const start = new TouchEvent("touchstart", { bubbles: true, touches: [{ clientY: 500 }] });
    const move = new TouchEvent("touchmove", { bubbles: true, cancelable: true, touches: [{ clientY: 560 }] });
    window.dispatchEvent(start);
    window.dispatchEvent(move);
    window.dispatchEvent(new TouchEvent("touchend", { bubbles: true }));
  });
  await waitIdle(page);
  assert.equal((await state(page)).chapter, "4", "Свайп не переключил ровно одну главу");
};

const checkBoundaries = async (page) => {
  const topBefore = await page.evaluate(() => scrollY);
  await wheelStep(page, -120);
  await page.waitForTimeout(250);
  const topAfter = await page.evaluate(() => scrollY);
  assert(topAfter < topBefore, "На первой главе прокрутка вверх должна уходить странице");

  await page.evaluate(() => window.scrollTo(0, document.querySelector("#timeline")?.offsetTop ?? 0));
  for (let index = 1; index < ORDER.length; index += 1) {
    await wheelStep(page);
    await waitIdle(page);
  }
  const bottomBefore = await page.evaluate(() => scrollY);
  await wheelStep(page);
  await page.waitForTimeout(250);
  const bottomAfter = await page.evaluate(() => scrollY);
  assert(bottomAfter > bottomBefore, "На последней главе прокрутка вниз должна уходить странице");
};

const checkViewport = async (browser, viewport, comprehensive) => {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openScene(page);

  const y = await page.evaluate(() => scrollY);
  await checkAnimation(page);
  assert(Math.abs((await page.evaluate(() => scrollY)) - y) <= 2, "Сцена прокрутила страницу во время внутреннего шага");
  const cardBox = await page.locator("[data-story-card]").boundingBox();
  const sceneBox = await page.locator("[data-timeline-scene]").boundingBox();
  assert(cardBox && sceneBox, "Не удалось измерить сцену");
  assert(cardBox.x >= sceneBox.x - 1 && cardBox.x + cardBox.width <= sceneBox.x + sceneBox.width + 1, "Карточка вышла за горизонтальные границы сцены");
  assert(cardBox.y >= sceneBox.y - 1 && cardBox.y + cardBox.height <= sceneBox.y + sceneBox.height + 1, "Карточка вышла за вертикальные границы сцены");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), 0, "Появился горизонтальный скролл");
  assert.deepEqual(errors, [], `Ошибки страницы: ${errors.join("; ")}`);

  if (comprehensive) {
    await openScene(page);
    await checkWheelSequence(page);
    await openScene(page);
    await checkInertia(page);
    await checkOtherInputs(page);
    await openScene(page);
    await checkBoundaries(page);
  }
  await context.close();
};

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of VIEWPORTS) {
    await checkViewport(browser, viewport, viewport.width === 974);
    console.log(`PASS ${viewport.width}×${viewport.height}`);
  }
  console.log("PASS: все критерии скролл-сцены выполнены");
} finally {
  await browser.close();
}