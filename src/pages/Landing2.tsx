import { Fragment } from "react";
import { ArrowUpRight, Video, FileCheck, Users, Clock, Check, Waves, Repeat2, Wallet, WalletCards, Hourglass, HandCoins, Landmark, NotebookTabs, CircleDollarSign, LineChart, ShieldCheck, TrendingUp, Activity, Settings, ScanSearch, HeartHandshake, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { levels } from "@/components/landing/ProfitLevels";
import {
  mainGoal,
  targetAudience,
  resultCategories,
} from "@/data/presentationData";
import { CardAbout } from "@/components/sections/CardAbout";

import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroProfit } from "@/components/landing/HeroProfit";
import PuzzleWeeks from "@/components/landing/PuzzleWeeks";
import { InlineReviewPair, InlineReviewFeature, InlineReviewGrid } from "@/components/landing/InlineReviews";
import { handleDiagnosAnketaClick, appendStoredParams } from "@/lib/ymGoals";
import { nbsp } from "@/lib/nbsp";

const processIcons = [Video, FileCheck, Users, Clock];
const audienceIcons = [Waves, Repeat2, Wallet, Hourglass];

const trackedHref = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.currentTarget.href = appendStoredParams(event.currentTarget.href);
};


// Задачи — как блок «Курс подойдет тем, кто хочет» на /profit
const goalTasks = [
  { Icon: NotebookTabs, text: "Собрать понятную финансовую систему" },
  { Icon: WalletCards, text: "Перестать жить в ноль" },
  { Icon: Landmark, text: "Разобраться, куда инвестировать" },
  { Icon: CircleDollarSign, text: "Начать вести бюджет без мучений" },
  { Icon: LineChart, text: "Увеличить доход" },
  { Icon: ShieldCheck, text: "Накопить на пенсию" },
  { Icon: HandCoins, text: "Избавиться от долгов" },
  { Icon: TrendingUp, text: "Перестать тревожиться из-за денег" },
];
const levelPrices = [
  { oldPrice: "30 000 руб.", newPrice: "19 000 руб." },
  { oldPrice: "40 000 руб.", newPrice: "29 000 руб." },
  { oldPrice: "70 000 руб.", newPrice: "49 000 руб." },
];

type WeekItem = {
  week: string;
  title: string;
  Icon: LucideIcon;
  points: string[];
  result: string;
};

const programWeeks: WeekItem[] = [
  {
    week: "Модуль 1",
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
    week: "Модуль 2",
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
    week: "Модуль 3",
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
    week: "Модуль 4",
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
    week: "Модуль 5",
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
    week: "Модуль 6",
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


const scrollToProgram = () => {
  document.getElementById("program")?.scrollIntoView({ behavior: "smooth" });
};

const landingPageNav = [
  { href: "#program", label: "Программа", id: "program" },
  { href: "#results", label: "Результаты", id: "results" },
  { href: "#reviews", label: "Отзывы", id: "reviews" },
  { href: "#cta", label: "Записаться", id: "cta", cta: true },
];

const Landing2 = () => {
  return (
    <main className="physics-theme min-h-screen">
      <SiteHeader pageNav={landingPageNav} />
      {/* ============== HERO ============== */}
      <HeroProfit ctaTarget="program" />

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

          <ul className="mb-12 grid gap-x-12 sm:grid-cols-2">
            {goalTasks.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-4 border-t border-foreground/15 py-5">
                <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.6} />
                <p className="font-display text-xl font-semibold leading-tight md:text-2xl">{nbsp(text)}</p>
              </li>
            ))}
          </ul>

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
                3&nbsp;ступени к&nbsp;вашему Профиту
              </p>
            </div>
          </div>

          {/* ===== Ступени курса ===== */}
          <div className="relative mt-14 md:mt-16">
            <div className="grid gap-6 md:h-[33rem] md:grid-cols-3 md:items-end md:gap-4 lg:gap-7">
            {levels.map((level, i) => {
              const stepHeights = ["md:h-[27rem]", "md:h-[30rem]", "md:h-[33rem]"];
              const price = levelPrices[i];
              if (!price) return null;
              const duration = i === 2 ? "4 недели" : level.duration;
              return (
                <article
                  key={level.number}
                  aria-label={`${level.number} ступень. ${level.title}`}
                   className={`relative flex flex-col overflow-hidden border border-foreground/15 border-t-4 border-t-accent bg-card p-6 ${stepHeights[i]} md:p-5 lg:p-7`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-0 font-display text-[8rem] font-semibold leading-none text-transparent opacity-20 [-webkit-text-stroke:1px_hsl(var(--foreground))] md:text-[9rem] lg:text-[11rem]"
                  >
                    {level.number}
                  </span>

                  <div className="relative z-10 flex h-full flex-col">
                    <p className="font-body text-sm font-semibold text-accent">{nbsp(duration)}</p>
                    <h3 className="mt-3 max-w-[14rem] font-display text-3xl font-semibold leading-none md:text-[1.65rem] lg:text-4xl">
                      {nbsp(level.title)}
                    </h3>
                    <p className="mt-5 font-body leading-relaxed text-foreground/75 md:text-sm lg:text-base">
                      {nbsp(level.description)}
                    </p>

                    <div className="mt-auto pt-6">
                      <del className="block font-display text-3xl font-semibold leading-none text-foreground/55 decoration-foreground/60 md:text-2xl lg:text-3xl">
                        {nbsp(price.oldPrice)}
                      </del>
                      <strong className="mt-3 block font-display text-3xl font-semibold leading-none text-accent md:text-2xl lg:text-3xl">
                        {nbsp(price.newPrice)}
                      </strong>
                      <p className="mt-2 font-body text-sm text-foreground/60">{nbsp("до 1 октября")}</p>
                      <Button asChild size="lg" className="mt-5 w-full rounded-none px-5">
                        <a href={level.href} target="_blank" rel="noopener noreferrer" onClick={trackedHref}>
                          {nbsp("Заказать")} <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
            </div>
          </div>

          {/* ===== Все 3 ступени — пазл, цена и срок ===== */}
          <div className="mt-16">
            <p className="font-display text-3xl font-semibold leading-none text-accent md:text-5xl">
              {nbsp("Все 3 ступени")}
            </p>
          </div>
          <PuzzleWeeks title={"Полный набор инструментов для роста вашего капитала"} />
          <div className="mt-10 border border-foreground/15 bg-card px-7 py-7 md:px-10 md:py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-body text-xl text-foreground/75">{nbsp("11 недель")}</p>
              <del className="mt-3 block font-display text-4xl font-semibold leading-none text-foreground/55 decoration-foreground/60 md:text-5xl">
                {nbsp("140 000 руб.")}
              </del>
              <strong className="mt-3 block font-display text-4xl font-semibold leading-none text-accent md:text-5xl">
                {nbsp("79 000 руб.")}
              </strong>
              <p className="mt-2 font-body text-sm text-foreground/60">{nbsp("до 1 октября")}</p>
            </div>
            <Button asChild size="lg" className="rounded-none px-6">
              <a href="https://nivz.getcourse.ru/profit_level123" target="_blank" rel="noopener noreferrer" onClick={trackedHref}>
                {nbsp("Заказать")} <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          {/* ===== Модули программы ===== */}
          <div className="grid grid-cols-12 gap-6 lg:gap-8 mt-20">
            {programWeeks.map((w, i) => (
              <Fragment key={i}>
              {i % 2 === 0 && (
                <div className="col-span-12 flex items-center gap-4 pt-4 first:pt-0">
                  <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
                  <span className="font-display text-lg font-semibold text-accent md:text-xl whitespace-nowrap">
                    {nbsp(`${i / 2 + 1} ступень · ${levels[i / 2].title}`)}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
                </div>
              )}
              <article
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
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="mb-14 max-w-4xl">
            <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Групповая динамика и <span className="italic font-normal">поддержка</span>
            </h2>
            <p className="mt-6 font-serif-display italic text-2xl md:text-3xl text-foreground/85 leading-snug tracking-tight">
              {nbsp("Вы примените навыки работы с личными финансами и создадите пассивный доход до 100 000 руб. в месяц")}
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

      {/* Кейс Юлии */}
      <section className="relative pt-16 md:pt-24 pb-16 md:pb-24 bg-grid">
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
      <section id="cta" className="relative py-20 md:py-28 border-t border-foreground/10 scroll-mt-24">
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
                  href="https://nivz.getcourse.ru/diagnostic"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDiagnosAnketaClick}
                  className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
                >
                  Записаться →
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

export default Landing2;
