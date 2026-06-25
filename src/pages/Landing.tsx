import { useState } from "react";
import { Video, FileCheck, Users, Clock, Check, Plus, Waves, Repeat2, Wallet, Hourglass, Activity, Settings, ScanSearch, HandCoins, Landmark, HeartHandshake, type LucideIcon } from "lucide-react";
import { TrafficRegisterDialog } from "@/components/traffic/TrafficRegisterDialog";
import {
  programGoals,
  mainGoal,
  modules,
  processSteps,
  bonuses,
  targetAudience,
  resultCategories,
} from "@/data/presentationData";
import { CardAbout } from "@/components/sections/CardAbout";

import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroProfit } from "@/components/landing/HeroProfit";
import PuzzleWeeks from "@/components/landing/PuzzleWeeks";
import { InlineReviewPair, InlineReviewFeature, InlineReviewGrid } from "@/components/landing/InlineReviews";
import { handleDiagnosAnketaClick } from "@/lib/ymGoals";

import goldenSpiral from "@/assets/golden-spiral.png";


const processIcons = [Video, FileCheck, Users, Clock];
const audienceIcons = [Waves, Repeat2, Wallet, Hourglass];
const module1 = modules[0];

type WeekItem = {
  week: string;
  title: string;
  Icon: LucideIcon;
  points: string[];
  result: string;
};

const programWeeks: WeekItem[] = [
  {
    week: "Неделя 1",
    title: "Диагностика системы",
    Icon: Activity,
    points: [
      "3 главные причины, почему ваши деньги «утекают сквозь пальцы»",
      "Топ-6 форматов ведения бюджета под разные образы жизни",
      "10 шаблонов, с которыми даже «безнадёжные» начинают вести учёт",
      "Разбор ошибок в\u00A0личных финансах и\u00A0как больше не\u00A0наступать на\u00A0те\u00A0же грабли",
    ],
    result:
      "Поставлен честный финансовый диагноз и выбран рабочий формат ведения бюджета под ваш образ жизни.",
  },
  {
    week: "Неделя 2",
    title: "Принцип шестерёнок",
    Icon: Settings,
    points: [
      "Методика прокручивания «лучшей версии» за те же деньги",
      "Пошаговый разбор кейса составления бюджета",
      "Персональная практика по вашему выбранному формату бюджета",
      "Как потратить 20% сил на учёт, а 80% — на улучшения",
    ],
    result:
      "Готовый фундамент личной финансовой системы, которая требует не больше 2 часов в месяц.",
  },
  {
    week: "Неделя 3",
    title: "Чёрные дыры бюджета",
    Icon: ScanSearch,
    points: [
      "12 проверенных способов найти «потерянные» деньги и дыры, куда они утекают",
      "Здоровая экономия: как сокращать лишние траты, не отказываясь от удовольствий",
      "Управление кредитами без переплат и стресса",
    ],
    result:
      "Найдены первые 15–20 тыс. ₽ «потерянных» денег и закрыты основные точки утечки бюджета.",
  },
  {
    week: "Неделя 4",
    title: "Ускорение доходов",
    Icon: HandCoins,
    points: [
      "50 инструментов роста доходов при работе в найме и на себя",
      "Почему 95% людей неправильно просят повышения зарплаты",
      "Источники дополнительного дохода на фрилансе",
      "Вычеты, кэшбеки и другие «деньги из воздуха», о которых вы не задумывались",
    ],
    result:
      "На руках 2–3 конкретные стратегии роста дохода и план их внедрения на ближайшие месяцы.",
  },
  {
    week: "Неделя 5",
    title: "Инвестиции",
    Icon: Landmark,
    points: [
      "Развенчание мифов о пассивном доходе. Что из этого работает, а где зарабатывают на вас",
      "Консервативные инструменты: депозиты и недвижимость",
      "Простым языком — как работают фонды, акции и облигации",
      "Криптовалюта и другие высокорискованные инструменты",
    ],
    result:
      "Вы трезво смотрите на инвестиционные инструменты. Выбираете себе «по карману» без тревоги упущенной выгоды.",
  },
  {
    week: "Неделя 6",
    title: "Психология финансов",
    Icon: HeartHandshake,
    points: [
      "Почему дисциплина в финансах не работает",
      "Проработка установок «у меня никогда не будет денег», «деньги — зло»",
      "Как перестать бояться планировать и начать мечтать о большем",
      "Техники карьерного планирования в эпоху неопределённости",
    ],
    result:
      "Снята финансовая тревога, появляется уверенность в деньгах и привычка планировать вдолгую.",
  },
];

const graduationPoints = [
  "По\u00A0уникальной методологии вы\u00A0сведёте воедино свои личные и\u00A0финансовые цели на\u00A05 и\u00A010\u00A0лет вперёд:",
  "Расчёт: сколько именно нужно на\u00A0комфортную жизнь, детей и\u00A0пенсию",
  "Интеграция мечт в\u00A0финансовый план\u00A0— не\u00A0фантазии, а\u00A0реальные измеримые цели",
  "Разработка плана\u00A0В, С\u00A0и\u00A0даже Ж\u00A0и\u00A0Ё",
  
];

const landingTariffs: Array<{
  name: string;
  price: string;
  oldPrice: string;
  features: Array<string | { text: string; plus?: boolean }>;
  widgetId: number;
  scriptHash: string;
  soldOut?: boolean;
  installment?: string;
}> = [
  {
    name: "Всё сам",
    price: "34 900 ₽",
    oldPrice: "40 000 ₽",
    features: [
      "Все записи и материалы курса",
      "Презентации, конспекты, шаблоны",
      "Чат поддержки",
    ],
    widgetId: 1619139,
    scriptHash: "161dd3f30c940fc854a581051b587bcc4480ad86",
    installment: "5 816 руб/мес при оформлении в\u00A0рассрочку",
  },
  {
    name: "С куратором",
    price: "80 000 ₽",
    oldPrice: "",
    features: [
      "Всё из тарифа «Всё сам»",
      "Куратор с обратной связью",
      "Проверка домашних заданий",
      "Живые еженедельные эфиры с Василием",
    ],
    widgetId: 1619149,
    scriptHash: "3bf00501d531755c7bf7a4a94d6695e757f4f6c9",
    soldOut: true,
    installment: "13 333 руб/мес при оформлении в\u00A0рассрочку",
  },
  {
    name: "VIP",
    price: "109 900 ₽",
    oldPrice: "150 000 ₽",
    features: [
      "Всё из тарифа «С куратором»",
      "Куратор — лично Василий",
      "Прямая обратная связь и личные разборы",
    ],
    widgetId: 1619150,
    scriptHash: "ed03b4fc4904e528fa34849b8cdeb4d42605c2a3",
    installment: "18 316 руб/мес при оформлении в\u00A0рассрочку",
  },
]

const scrollToPricing = () => {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToProgram = () => {
  document.getElementById("program")?.scrollIntoView({ behavior: "smooth" });
};

const landingPageNav = [
  { href: "#program", label: "Программа", id: "program" },
  { href: "#results", label: "Результаты", id: "results" },
  { href: "#reviews", label: "Отзывы", id: "reviews" },
  { href: "#pricing", label: "Записаться", id: "pricing", cta: true },
];

const Landing = () => {
  const discountUntil = "до\u00A022\u00A0июня";
  return (
    <main className="physics-theme min-h-screen">
      <SiteHeader pageNav={landingPageNav} />
      {/* ============== HERO ============== */}
      <HeroProfit />

      {/* ============== AUDIENCE ============== */}
      <section className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-4xl">
            Вы уперлись в{" "}
            <span className="italic font-normal">финансовый потолок</span>?
          </h2>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {targetAudience.fits.map((item, i) => {
              const Icon = audienceIcons[i] ?? Check;
              return (
                <div
                  key={i}
                  className="border border-foreground/15 bg-card p-7 md:p-10 hard-shadow flex gap-5 md:gap-6 items-start"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 grid place-items-center bg-foreground text-background shrink-0">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <p className="font-serif-display text-xl md:text-2xl leading-snug tracking-tight">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ============== GOALS ============== */}
      <section className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14 items-end">
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Цели сопровождения
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8 mb-12">
            {programGoals.map((goal, i) => (
              <div
                key={i}
                className="col-span-12 md:col-span-6 border-l-2 border-accent pl-5 py-2"
              >
                <p className="font-body text-base md:text-lg text-foreground/85 leading-relaxed">
                  {goal.text}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-board p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-2 border-background/15" />
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-accent/40"
              style={{ borderStyle: "dashed" }}
            />
            <div className="absolute top-12 right-12 w-6 h-6 rounded-full bg-accent shadow-[0_0_30px_hsl(var(--accent))]" />
            <div className="relative max-w-3xl">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                {mainGoal}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== EXPERT (с главной) ============== */}
      <CardAbout eyebrow="Автор программы" heading="Василий Мещеряков" />

      {/* отзывы — продолжение блока про эксперта */}
      <InlineReviewPair indices={[0, 1]} bgClass="bg-grid" />




      {/* ============== PROGRAM ============== */}
      <section id="program" className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14 items-end">
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Программа
              </h2>
              <p className="mt-6 font-serif-display italic text-2xl md:text-3xl lg:text-4xl text-foreground/85 max-w-3xl leading-snug tracking-tight">
                2&nbsp;месяца системной работы с&nbsp;наставником вместо 10&nbsp;лет проб и&nbsp;ошибок
              </p>
            </div>
          </div>

          {/* ===== TIMELINE: 6 недель + выпускной проект ===== */}
          {(() => {
            type TItem = {
              w: string;
              lines: [string, string];
              href: string;
              final?: boolean;
            };
            const timeline: TItem[] = [
              { w: "Нед.1", lines: ["Диагностика", "системы"], href: "#week-1" },
              { w: "Нед.2", lines: ["Принцип", "шестерёнок"], href: "#week-2" },
              { w: "Нед.3", lines: ["Чёрные дыры", "бюджета"], href: "#week-3" },
              { w: "Нед.4", lines: ["Ускорение", "доходов"], href: "#week-4" },
              { w: "Нед.5", lines: ["Инвестиции", ""], href: "#week-5" },
              { w: "Нед.6", lines: ["Психология", "финансов"], href: "#week-6" },
              { w: "Нед.7–8", lines: ["Выпускной", "проект"], href: "#graduation", final: true },
            ];

            const labelCls = (it: TItem) =>
              `font-display font-bold text-sm lg:text-base leading-tight transition-colors ${
                it.final
                  ? "text-accent group-hover:text-accent"
                  : "text-foreground group-hover:text-accent"
              }`;

            const squareCls = (it: TItem) =>
              `relative z-10 min-w-14 h-11 px-2 grid place-items-center font-mono text-xs font-semibold tracking-tight transition-colors ${
                it.final
                  ? "bg-accent text-accent-foreground group-hover:bg-accent/90"
                  : "bg-foreground text-background group-hover:bg-accent group-hover:text-accent-foreground"
              }`;

            return (
              <div className="mb-16 md:mb-20">
                {/* MOBILE: вертикальный таймлайн, подписи слева/справа */}
                <ol className="md:hidden relative space-y-2">
                  <span
                    aria-hidden
                    className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-px bg-foreground/25"
                  />
                  {timeline.map((it, i) => {
                    const onLeft = i % 2 === 0;
                    return (
                      <li key={i}>
                        <a
                          href={it.href}
                          className="group grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 py-2"
                        >
                          <span
                            className={`${labelCls(it)} text-right ${
                              onLeft ? "" : "invisible"
                            }`}
                          >
                            {it.lines[0]}
                            <br />
                            {it.lines[1]}
                          </span>
                          <span className={squareCls(it)}>{it.w}</span>
                          <span
                            className={`${labelCls(it)} text-left ${
                              !onLeft ? "" : "invisible"
                            }`}
                          >
                            {it.lines[0]}
                            <br />
                            {it.lines[1]}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>

                {/* DESKTOP/TABLET: горизонтальный таймлайн, подписи сверху/снизу */}
                <ol className="hidden md:grid grid-cols-7 relative">
                  <span
                    aria-hidden
                    className="absolute top-1/2 -translate-y-1/2 h-px bg-foreground/25"
                    style={{
                      left: `calc(100% / 14)`,
                      right: `calc(100% / 14)`,
                    }}
                  />
                  {timeline.map((it, i) => {
                    const above = i % 2 === 0;
                    return (
                      <li key={i} className="relative">
                        <a
                          href={it.href}
                          className="group grid grid-rows-[5rem_auto_5rem] items-center justify-items-center text-center px-2"
                        >
                          <span
                            className={`${labelCls(it)} self-end pb-3 ${
                              above ? "" : "invisible"
                            }`}
                          >
                            {it.lines[0]}
                            <br />
                            {it.lines[1]}
                          </span>
                          <span className={squareCls(it)}>{it.w}</span>
                          <span
                            className={`${labelCls(it)} self-start pt-3 ${
                              !above ? "" : "invisible"
                            }`}
                          >
                            {it.lines[0]}
                            <br />
                            {it.lines[1]}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })()}

          {/* ===== PUZZLE: 6 недель = 6 деталей ===== */}
          <PuzzleWeeks />

          <div className="grid grid-cols-12 gap-6 lg:gap-8 mt-20">
            {programWeeks.map((w, i) => (
              <article
                key={i}
                id={`week-${i + 1}`}
                className="col-span-12 md:col-span-6 group relative border border-foreground/15 bg-card hover:border-foreground transition-colors duration-300 overflow-hidden flex flex-col scroll-mt-24"
              >
                <w.Icon
                  aria-hidden="true"
                  strokeWidth={0.9}
                  className="pointer-events-none select-none absolute text-accent/15 group-hover:text-accent/25 transition-colors duration-500 -top-8 -right-8 w-40 h-40 md:w-48 md:h-48"
                />
                <div className="relative flex flex-col flex-1 p-7 md:p-8">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    {w.week}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold leading-tight tracking-tight mb-5">
                    {(() => {
                      const parts = w.title.split(" ");
                      if (parts.length < 2) return w.title;
                      const last = parts.pop();
                      return (
                        <>
                          {parts.join(" ")}
                          <br />
                          {last}
                        </>
                      );
                    })()}
                  </h3>

                  <ul className="space-y-3 mb-8">
                    {w.points.map((p, pi) => (
                      <li key={pi} className="flex gap-3">
                        <span className="font-mono text-accent text-xs shrink-0 pt-1">
                          →
                        </span>
                        <span className="text-sm text-foreground/80 leading-relaxed">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-foreground text-background -mx-7 md:-mx-8 -mb-7 md:-mb-8 px-7 md:px-8 py-5 mt-auto">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">
                      результат
                    </div>
                    <p className="text-sm leading-relaxed text-background/90">
                      {w.result}
                    </p>
                  </div>
                </div>
              </article>

            ))}
          </div>

          {/* ===== PUZZLE (повтор) с оверлеем «долгосрочный финансовый план» ===== */}
          <PuzzleWeeks variant="plan" />

          {/* GRADUATION — chalkboard */}
          <div id="graduation" className="mt-20 bg-board relative overflow-hidden p-8 md:p-14 scroll-mt-24">
            {/* фон: золотое сечение — на мобильной/планшетной по ширине сверху, на десктопе под левой колонкой */}
            <img
              src={goldenSpiral}
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute top-0 left-0 w-full h-auto lg:w-[42%] lg:h-full lg:object-cover lg:object-left opacity-80"
            />




            <div className="relative grid grid-cols-12 gap-6 lg:gap-10">
              <div className="col-span-12 lg:col-span-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-4">
                  Выпускной проект
                </div>
                <h3 className="font-display text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">
                  <span className="italic font-light">Долгосрочный</span>
                  <br />
                  финансовый план
                </h3>
              </div>

              <div className="col-span-12 lg:col-span-7">
                <ul className="space-y-4">
                  {graduationPoints.map((p, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-mono text-accent text-xs shrink-0 pt-1">
                        —
                      </span>
                      <span className="text-background/90 leading-relaxed">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-background/20">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                    Результат
                  </div>
                  <div className="font-display text-lg md:text-xl text-background leading-relaxed space-y-3">
                    <p>Вы&nbsp;запускаете своё мышление на&nbsp;10&nbsp;лет вперёд без страха и&nbsp;боли.</p>
                    <p>У&nbsp;вас есть запасной план, и&nbsp;в&nbsp;случае кризиса вы&nbsp;не&nbsp;паникуете.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* отзывы — продолжение блока программы */}
      <InlineReviewPair indices={[5, 7]} bgClass="bg-grid" />

      {/* ============== HOW IT WORKS ============== */}
      <section className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="mb-14 max-w-4xl">
            <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Групповая динамика и <span className="italic font-normal">поддержка</span>
            </h2>
            <p className="mt-6 font-serif-display italic text-2xl md:text-3xl text-foreground/85 leading-snug tracking-tight">
              Мы создали среду, в которой вы гарантированно примените навыки работы с личными финансами и увеличите доходы на 20–30% в год.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {[
              { title: "Живые эфиры", text: "Каждую неделю, записи у вас навсегда" },
              { title: "Домашние задания", text: "С персональной обратной связью куратора" },
              { title: "Едино­мышленники", text: "Обмен опытом в парах и тройках" },
            ].map((step, i) => {
              const Icon = processIcons[i];
              return (
                <article
                  key={i}
                  className="col-span-12 md:col-span-4 group relative border border-foreground/15 bg-card hover:border-foreground transition-colors duration-300 overflow-hidden flex flex-col"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={0.9}
                    className="pointer-events-none select-none absolute text-accent/15 group-hover:text-accent/25 transition-colors duration-500 top-2 right-2 w-24 h-24 md:w-28 md:h-28"
                  />
                  <div className="relative flex flex-col flex-1 p-7 md:p-8">
                    <h3 className="font-display text-xl md:text-2xl font-bold leading-tight tracking-tight mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section
        id="pricing"
        className="relative py-20 md:py-28 border-t border-foreground/10 bg-grid scroll-mt-24"
      >
        <div className="container-px max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Тарифы
            </h2>
          </div>

          <div className="grid gap-6 lg:gap-8 md:grid-cols-3">
            {landingTariffs.map((t, i) => (
              <div
                key={i}
                className={`relative p-7 md:p-8 flex flex-col bg-background border ${i === 1 ? "border-foreground" : i === 2 ? "border-accent" : "border-foreground/15"}`}
              >
                <h3 className="font-serif-display text-2xl font-semibold mb-3">{t.name}</h3>
                <div className="mb-7 pb-6 border-b border-foreground/10 space-y-1">
                  {t.oldPrice && (
                    <div className="font-mono text-base text-muted-foreground line-through">
                      {t.oldPrice}
                    </div>
                  )}
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="number-display text-4xl text-accent">{t.price}</span>
                    {t.oldPrice && (
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {discountUntil}
                      </span>
                    )}
                  </div>
                  {t.soldOut && (
                    <div className="font-mono text-xs uppercase tracking-widest text-destructive">
                      промо-места закончились
                    </div>
                  )}
                </div>
                <ul className="space-y-3 flex-grow mb-6">
                  {t.features.map((f, fi) => {
                    const text = typeof f === "string" ? f : f.text;
                    const isPlus = typeof f === "object" && f.plus;
                    const Icon = isPlus ? Plus : Check;
                    const bold = i >= 1 && fi > 0;
                    return (
                      <li key={fi} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={2} />
                        <span className={`text-sm leading-relaxed ${isPlus ? "text-accent font-semibold" : "text-foreground/85"} ${bold && !isPlus ? "font-semibold" : ""}`}>{text}</span>
                      </li>
                    );
                  })}
                </ul>
                <TrafficRegisterDialog
                  widgetId={t.widgetId}
                  scriptHash={t.scriptHash}
                  title={`Тариф «${t.name}»`}
                  trigger={
                    <button className="w-full mt-auto py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
                      Купить
                    </button>
                  }
                />
                {t.installment && (
                  <p className="mt-3 text-center text-sm font-semibold text-muted-foreground leading-relaxed">
                    {t.installment.split(/(\d+(?:\s\d+)*)/).map((part, i) =>
                      /^\d/.test(part) ? (
                        <span key={i} className="text-lg">{part}</span>
                      ) : (
                        part
                      )
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Кейс Юлии — продолжение блока стоимости (тот же клетчатый фон) */}
      <section className="relative -mt-16 md:-mt-24 pt-0 pb-16 md:pb-24 bg-grid">
        <div className="container-px max-w-7xl mx-auto">
          <figure className="border border-foreground/20 bg-foreground text-background overflow-hidden">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <header className="flex items-center gap-4">
                  <img
                    src="https://drive.google.com/thumbnail?id=1NdDFC31rr5NX_d3zs2PDMQiq-Q4OkCBB&sz=w800"
                    alt="Юлия"
                    loading="lazy"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-background/20 shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="min-w-0">
                    <div className="font-display font-bold text-xl md:text-2xl leading-tight text-background">
                      Юлия
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-widest mt-1 text-background/55">
                      Интернет-маркетолог, 48&nbsp;лет
                    </div>
                  </div>
                </header>

                <a
                  href="https://clck.ru/3SffWb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground font-mono text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Смотреть видео
                </a>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <ul className="space-y-3 font-body text-[15px] leading-relaxed text-background/90">
                  {[
                    "Стоимость программы окупилась ещё во\u00A0время обучения только за\u00A0счёт возврата НДФЛ, хотя Юлия думала, что ей\u00A0налоговый вычет не\u00A0положен.",
                    "Принято стратегическое решение не\u00A0закрывать ипотеку досрочно, а\u00A0использовать деньги эффективнее.",
                    "Найдена зона перерасхода, которая годами не\u00A0отслеживалась (какая зона\u00A0— смотрите в\u00A0видео).",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden className="font-mono text-accent text-base leading-6 shrink-0">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="font-body text-[15px] leading-relaxed text-background/90 md:pl-6 md:border-l md:border-background/15 pt-5 border-t border-background/15 md:pt-0 md:border-t-0">
                  🔥 И&nbsp;самый важный результат&nbsp;— эмоциональный. Просто посмотрите наше интервью. Ни&nbsp;один текст не&nbsp;передаст те&nbsp;эмоции, которые описала Юлия&nbsp;— как она ведёт планы спокойно и&nbsp;даже ждёт конца месяца, чтобы их&nbsp;заполнить. Видит горизонты 1&nbsp;год, 10&nbsp;лет и&nbsp;даже 25&nbsp;лет вперёд.
                </p>
              </div>

            </div>
          </figure>

        </div>
      </section>




      {/* ============== RESULTS ============== */}
      <section id="results" className="relative py-20 md:py-28 border-t border-foreground/10 scroll-mt-24">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14 items-end">
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Что вы получите
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {resultCategories.map((cat, i) => (
              <div
                key={i}
                className="col-span-12 md:col-span-4 border border-foreground/15 bg-card p-7 md:p-8"
              >
                <div className="flex items-start gap-3 mb-5 pb-4 min-h-[5.25rem] md:min-h-[5.5rem] border-b border-foreground/10">
                  <span className="number-display text-2xl text-accent leading-tight">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-bold tracking-tight leading-tight">
                    {cat.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {cat.points.map((p, pi) => (
                    <li key={pi} className="flex gap-3">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-1" strokeWidth={2} />
                      <span className="text-sm text-foreground/80 leading-relaxed">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* HIGHLIGHT BLOCK */}
          <div className="mt-12 md:mt-16 bg-board relative overflow-hidden p-8 md:p-14">
            <svg className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 text-background/15" viewBox="0 0 8 8" fill="none" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
              <path d="M0 8 H1 V7 H2 V6 H3 V5 H4 V4 H5 V3 H6 V2 H7 V1 H8 V0" stroke="currentColor" strokeWidth="0.12" />
            </svg>
            <div className="relative max-w-3xl">
              <p className="font-display text-xl md:text-2xl lg:text-3xl text-background leading-relaxed tracking-tight">
                Вы&nbsp;обгоняете 99%&nbsp;населения по&nbsp;финансовой грамотности и&nbsp;впервые чётко осознаёте, чего хотите от&nbsp;жизни в&nbsp;деньгах и&nbsp;как&nbsp;к&nbsp;этому подконтрольно прийти
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============== REVIEWS ============== */}
      <section id="reviews" className="relative">
        <InlineReviewGrid indices={[15, 14, 17, 16, 9, 8]} columns={3} className="py-8 md:py-12" />
      </section>



      {/* ============== FOOTER CTA ============== */}
      <section className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="bg-board relative overflow-hidden p-10 md:p-16 text-center">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-2 border-background/10" />
            <div
              className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-accent/30"
              style={{ borderStyle: "dashed" }}
            />
            <div className="relative">
              <h2 className="font-serif-display font-semibold text-background text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight max-w-3xl mx-auto">
                Готовы построить фундамент капитала?
              </h2>
              <div className="mt-10 flex justify-center">
              <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
                >
                  к тарифам →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Landing;
