import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const config = JSON.parse(
  readFileSync(path.join(root, "public/cashback-sale/config.json"), "utf8"),
);
// Неразрывные пробелы в вёрстке сравниваем как обычные.
const page = readFileSync(path.join(root, "src/pages/Cashback.tsx"), "utf8").replace(
  / /g,
  " ",
);

describe("cashback sale deadline", () => {
  it("runs until 15 November 2026, 23:59:59 MSK", () => {
    expect(config.saleEnd).toBe("2026-11-15T23:59:59+03:00");
    expect(new Date(config.saleEnd).getTime()).toBe(
      new Date("2026-11-15T20:59:59Z").getTime(),
    );
  });

  it("says the sale is extended by one day because payments failed", () => {
    expect(page).toContain("Распродажа продлена ещё на сутки");
    expect(page).toContain("у многих не прошли оплаты");
  });

  it("no longer points shoppers at 14 November", () => {
    expect(page).not.toContain("до 14 ноября");
    expect(page).toContain("Только до 15 ноября");
    expect(page).toContain("действует только до 15 ноября");
  });
});

describe("cashback VIP seats", () => {
  it("keeps 13 of 20 VIP seats", () => {
    expect(config.vipTotal).toBe(20);
    expect(config.vipLeft).toBe(13);
  });

  it("shows 13 of 20 in the VIP tariff and 13 seats in the hero", () => {
    expect(page).toContain("осталось 13 из 20");
    expect(page).toContain("осталось 13 мест");
    expect(page).not.toContain("осталось 20 из 20");
  });
});
