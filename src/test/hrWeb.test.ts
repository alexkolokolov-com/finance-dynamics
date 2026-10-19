import { describe, expect, it } from "vitest";
import { hrWebOffer, hrWebProgram } from "@/data/hrWeb";

describe("HR webinar offer", () => {
  it("takes place on 23 October 2026 at 19:00 MSK", () => {
    expect(hrWebOffer.date).toBe("2026-10-23");
    expect(hrWebOffer.dateLabel).toBe("23 октября");
    expect(hrWebOffer.time).toBe("19:00");
    expect(hrWebOffer.timeLabel).toBe("19:00 Мск");
  });
  it("is free", () => {
    expect(hrWebOffer.price).toBe(0);
  });
  it("has a 60-minute webinar", () => {
    expect(hrWebOffer.durationMinutes).toBe(60);
  });
  it("has three programme cards without timings", () => {
    expect(hrWebProgram).toHaveLength(3);
    expect(hrWebProgram.every((topic) => topic.trim().length > 0)).toBe(true);
    expect(hrWebProgram.every((topic) => !/\d+\s*мин/.test(topic))).toBe(true);
  });

  it("uses temporary registration", () => {
    expect(hrWebOffer.registrationMode).toBe("getcourse");
  });
});