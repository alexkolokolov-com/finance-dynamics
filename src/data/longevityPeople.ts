export type LongevityPerson = {
  name: string;
  /** Возраст, в котором человек оставался активным (точка на таймлайне) */
  age: number;
  /** Короткая подпись: чем занимался в этом возрасте */
  note: string;
};

/** Заполняется после проверки фактов */
export const longevityPeople: LongevityPerson[] = [];
