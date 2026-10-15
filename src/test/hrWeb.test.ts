import { describe, expect, it } from "vitest";
import { hrWebOffer, hrWebProgram } from "@/data/hrWeb";

describe("HR webinar offer", () => {
  it("takes place on 21 October 2026", () => {
    expect(hrWebOffer.date).toBe("2026-10-21");
  });
  it("is free", () => {
    expect(hrWebOffer.price).toBe(0);
  });
  it("has a 60-minute programme", () => {
    expect(hrWebOffer.durationMinutes).toBe(60);
    expect(hrWebProgram.reduce((total, part) => total + part.minutes, 0)).toBe(60);
  });
  it("uses temporary registration", () => {
    expect(hrWebOffer.registrationMode).toBe("placeholder");
  });
});