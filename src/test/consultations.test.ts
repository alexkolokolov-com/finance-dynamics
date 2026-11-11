import { describe, expect, it } from "vitest";
import {
  BASE_PRICE,
  consultationCalendar,
  consultationPrice,
  seatWord,
} from "@/data/consultations";

const slot = (month: string) => {
  const found = consultationCalendar.find((c) => c.month === month);
  if (!found) throw new Error(`no slot for ${month}`);
  return found;
};

describe("consultation calendar prices", () => {
  it("has six months from November to April 2027", () => {
    expect(consultationCalendar.map((c) => c.month)).toEqual([
      "Ноябрь",
      "Декабрь",
      "Январь 2027",
      "Февраль 2027",
      "Март 2027",
      "Апрель 2027",
    ]);
  });

  it("sells November at full price", () => {
    expect(slot("Ноябрь").discount).toBe(0);
    expect(consultationPrice(slot("Ноябрь").discount)).toBe(20000);
  });

  it("sells December at 16 000", () => {
    expect(consultationPrice(slot("Декабрь").discount)).toBe(16000);
  });

  it("sells January 2027 at 14 000", () => {
    expect(consultationPrice(slot("Январь 2027").discount)).toBe(14000);
  });

  it("sells February 2027 at 12 000", () => {
    expect(consultationPrice(slot("Февраль 2027").discount)).toBe(12000);
  });

  it("sells March and April 2027 at 8 000", () => {
    expect(consultationPrice(slot("Март 2027").discount)).toBe(8000);
    expect(consultationPrice(slot("Апрель 2027").discount)).toBe(8000);
  });

  it("never discounts below 60%", () => {
    expect(Math.max(...consultationCalendar.map((c) => c.discount))).toBe(60);
    expect(consultationPrice(60)).toBe(8000);
    expect(BASE_PRICE).toBe(20000);
  });
});

describe("consultation calendar remaining seats", () => {
  it("matches the booking widget", () => {
    expect(consultationCalendar.map((c) => c.seats)).toEqual([4, 1, 5, 2, 10, 10]);
  });

  it("counts seats in Russian", () => {
    expect(seatWord(1)).toBe("место");
    expect(seatWord(2)).toBe("места");
    expect(seatWord(4)).toBe("места");
    expect(seatWord(5)).toBe("мест");
    expect(seatWord(10)).toBe("мест");
  });
});
