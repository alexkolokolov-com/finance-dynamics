import { describe, expect, it } from "vitest";
import { hrWebOffer, hrWebProgram } from "@/data/hrWeb";

describe("HR webinar offer", () => {
  it("takes place on 21 October 2026", () => {
    expect(hrWebOffer.date).toBe("2026-10-21");
  });
  it("is free", () => {
    expect(hrWebOffer.price).toBe(0);
  });
  it("has a 60-minute webinar", () => {
    expect(hrWebOffer.durationMinutes).toBe(60);
  });
  it("shows the programme as six short theses without timings", () => {
    expect(hrWebProgram).toHaveLength(6);
    expect(hrWebProgram.every((thesis) => thesis.length <= 70)).toBe(true);
    expect(hrWebProgram.every((thesis) => !/\d+\s*мин/.test(thesis))).toBe(true);
    expect(hrWebProgram[0]).toBe("Прибавка быстро растворяется в расходах, а тревога о деньгах остаётся");
  });

  it("uses temporary registration", () => {
    expect(hrWebOffer.registrationMode).toBe("placeholder");
  });
});