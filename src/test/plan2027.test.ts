import { describe, expect, it } from "vitest";
import { calculatePlanBalance, plan2027 } from "@/data/plan2027";

describe("Plan2027 offer", () => {
  it("offers independent participation for 10,000 rubles", () => { expect(plan2027.prices[0].price).toBe(10000); });
  it("offers expert participation for 30,000 rubles", () => { expect(plan2027.prices[1].price).toBe(30000); });
  it("runs three broadcasts and two practice days", () => {
    expect(plan2027.days.filter((day) => day.kind === "Эфир").map((day) => day.date)).toEqual(["31", "02", "04"]);
    expect(plan2027.days.filter((day) => day.kind === "Практика").map((day) => day.date)).toEqual(["01", "03"]);
  });
  it("calculates 600,000 savings from the supplied example", () => { expect(calculatePlanBalance(400000, 1200000)).toBe(600000); });
  it("preserves deficits instead of clamping to zero", () => { expect(calculatePlanBalance(250000, 1200000)).toBe(-1200000); });
  it.each(plan2027.prices)("sends $price applications to the supplied email with selected tariff", (offer) => {
    const link = new URL(offer.href);
    expect(link.protocol).toBe("mailto:");
    expect(link.pathname).toBe("nivz@mail.ru");
    expect(link.searchParams.get("subject")).toContain(new Intl.NumberFormat("en-US").format(offer.price).replace(/,/g, " "));
  });
});