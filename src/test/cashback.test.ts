import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const config = JSON.parse(
  readFileSync(path.join(root, "public/cashback-sale/config.json"), "utf8"),
);
const page = readFileSync(path.join(root, "src/pages/Cashback.tsx"), "utf8");

describe("cashback sale deadline", () => {
  it("runs until 15 November 2026, 23:59:59 MSK", () => {
    expect(config.saleEnd).toBe("2026-11-15T23:59:59+03:00");
    expect(new Date(config.saleEnd).getTime()).toBe(
      new Date("2026-11-15T20:59:59Z").getTime(),
    );
  });

  it("takes the deadline from config.json at runtime", () => {
    expect(page).toContain('fetch("/cashback-sale/config.json');
    expect(page).toContain("SALE_END = new Date(d.saleEnd)");
    // Часы, минуты и секунды показываются из этого значения.
    expect(page).toContain("[data-timer]");
  });
});

describe("cashback VIP seats", () => {
  it("keeps 13 of 20 VIP seats", () => {
    expect(config.vipTotal).toBe(20);
    expect(config.vipLeft).toBe(13);
  });

  it("writes the seat counts from config into the page", () => {
    expect(page).toContain("VIP_TOTAL = +d.vipTotal");
    expect(page).toContain("VIP_LEFT = +d.vipLeft");
    expect(page).toContain("[data-seats]");
    expect(page).toContain("[data-seats-short]");
    expect(page).toContain("[data-seats-fill]");
  });
});
