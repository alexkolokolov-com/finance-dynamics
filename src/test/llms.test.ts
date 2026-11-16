import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
// Неразрывные пробелы в тексте сравниваем как обычные.
const text = readFileSync(path.join(root, "public/llms.txt"), "utf8").replace(
  /\u00a0/g,
  " ",
);

// Страницы, закрытые от поиска в robots.txt и через noindex.
const CLOSED = [
  "/landing2",
  "/landing-deck",
  "/landing-deck-2",
  "/traffic",
  "/old",
  "/support-2026",
  "/negotiations",
  "/bigbudget",
  "/oferta",
];

describe("llms.txt", () => {
  it("opens with the site name and a one-line summary", () => {
    expect(text.startsWith("# Вася и финансы\n")).toBe(true);
    expect(text.split("\n")[2]).toMatch(/^> /);
  });

  it("does not advertise pages hidden from search", () => {
    for (const p of CLOSED) {
      expect(text).not.toContain(`](${p})`);
      expect(text).not.toContain(`](${p}/`);
    }
  });

  it("lists the main public pages", () => {
    for (const p of [
      "/",
      "/consultations",
      "/profit",
      "/corporate",
      "/cashback",
      "/blog",
      "/reviews",
      "/hr-web",
      "/plan2027",
      "/book",
      "/book-3",
    ]) {
      expect(text).toContain(`](${p})`);
    }
  });
});
