// Единый источник данных о трёх ступенях курса «Профит».
// Используется на /profit, /landing2 и в презентациях (/landing-deck-2).

export type ProfitLevel = {
  number: string;
  title: string;
  duration: string;
  /** Длительность без упоминания личной консультации — для слайдов презентации */
  durationShort: string;
  description: string;
  fits: string[];
  href: string;
  oldPrice: string;
  price: string;
  featured?: boolean;
};

export const profitLevels: ProfitLevel[] = [
  {
    number: "1",
    title: "Ленивый бюджет",
    duration: "3 недели",
    durationShort: "3 недели",
    description: "Шаблоны, механики и способы вести бюджет легко и эффективно.",
    fits: [
      "Начинаете вести бюджет и бросаете",
      "Не понимаете, какое приложение, таблицу или способ учёта выбрать",
      "Записываете расходы, но это не помогает",
      "Ненавидите вести финансы и хотите простое решение",
    ],
    href: "https://nivz.getcourse.ru/profit_level1",
    oldPrice: "30 000 руб.",
    price: "19 000 руб.",
  },
  {
    number: "2",
    title: "Денежный поток",
    duration: "4 недели",
    durationShort: "4 недели",
    description:
      "Инструменты, которые помогают растить доход, тратить без чувства вины и лучше жить за свои деньги.",
    fits: [
      "Доход нормальный, но хочется большего",
      "Непонятно, куда направлять свободные деньги",
      "Хочется копить, но не отказывать себе в жизни сейчас",
      "Хочется увеличивать доход, а не бесконечно оптимизировать кофе",
      "Доход растёт, а качество жизни — нет",
    ],
    href: "https://nivz.getcourse.ru/profit_level2",
    oldPrice: "40 000 руб.",
    price: "29 000 руб.",
  },
  {
    number: "3",
    title: "Разумные инвестиции",
    duration: "4 недели + личная консультация",
    durationShort: "4 недели",
    description:
      "Шаблон и механика долгосрочного планирования вместе с инструментами инвестирования.",
    fits: [
      "Накопить на пенсию",
      "Купить квартиру, машину, яхту или пароход",
      "Обеспечить детей",
      "Инвестировать, не ошибаясь",
    ],
    href: "https://nivz.getcourse.ru/profit_level3",
    oldPrice: "70 000 руб.",
    price: "49 000 руб.",
  },
];

export const allLevelsBundle = {
  title: "Все 3 ступени",
  duration: "11 недель",
  oldPrice: "140 000 руб.",
  price: "69 000 руб.",
  href: "https://nivz.getcourse.ru/profit_level3",
};

export const priceDeadline = "до 1 октября";
