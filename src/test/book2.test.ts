import { describe, expect, it } from "vitest";
import {
  CHANNEL_URL,
  PREORDER_URL,
  book2Change,
  book2Contents,
  book2NotFor,
  book2Problem,
  book2StickyNav,
  book2Trust,
  book2Why,
} from "@/data/book2";

describe("Book2 landing (/book2)", () => {
  it("links the author channel", () => {
    expect(CHANNEL_URL).toBe("https://t.me/vasya_lfp");
  });

  it("keeps preorder as an anchor until a payment link is provided", () => {
    expect(PREORDER_URL).toBe("#preorder");
  });

  it("shows the four trust facts including P&G", () => {
    expect(book2Trust).toHaveLength(4);
    expect(book2Trust[0].top).toBe("P&G");
    expect(book2Trust[0].topLogo).toBe(true);
    expect(book2Trust[1].top).toBe("1 500+");
  });

  it("has six problem cards and five before/after rows", () => {
    expect(book2Problem.items).toHaveLength(6);
    expect(book2Change.rows).toHaveLength(5);
  });

  it("has five why items with a stairs scheme in the fourth", () => {
    expect(book2Why.items).toHaveLength(5);
    expect(book2Why.items[3].stairs).toEqual(["Бюджет", "Активы для жизни", "Инвестиции"]);
  });

  it("lists 11 chapters in two parts plus conclusion", () => {
    expect(book2Contents.parts).toHaveLength(3);
    const chapters = book2Contents.parts.flatMap((part) => part.chapters);
    expect(chapters.filter((chapter) => chapter.n.startsWith("Глава"))).toHaveLength(11);
  });

  it("marks chapters 2 and 5 as key by author's opinion", () => {
    const partOne = book2Contents.parts[0].chapters;
    expect(partOne[1].key).toBe(true);
    expect(partOne[4].key).toBe(true);
  });

  it("has four not-for items", () => {
    expect(book2NotFor.items).toHaveLength(4);
  });

  it("has six sticky-bar sections", () => {
    expect(book2StickyNav).toHaveLength(6);
    expect(book2StickyNav[0]).toMatchObject({ href: "#hook", label: "Проблема" });
  });
});
