// Offer facts for the personal consultations page (/consultations).
// Prices and remaining seats mirror the GetCourse booking widget
// ("Бронирование консультации", widget 1631071).

export const BASE_PRICE = 20000;

export type ConsultationSlot = {
  month: string;
  /** percent off BASE_PRICE, 0 = full price */
  discount: number;
  seats: number;
};

export const consultationCalendar: ConsultationSlot[] = [
  { month: "Ноябрь", discount: 0, seats: 4 },
  { month: "Декабрь", discount: 20, seats: 1 },
  { month: "Январь 2027", discount: 30, seats: 5 },
  { month: "Февраль 2027", discount: 40, seats: 2 },
  { month: "Март 2027", discount: 60, seats: 10 },
  { month: "Апрель 2027", discount: 60, seats: 10 },
];

export const consultationPrice = (discount: number) =>
  Math.round((BASE_PRICE * (100 - discount)) / 100);

export const seatWord = (seats: number) =>
  seats === 1 ? "место" : seats >= 2 && seats <= 4 ? "места" : "мест";
