import { ArrowUpRight, Video, FileCheck, Users, Clock, Check, Waves, Repeat2, Wallet, WalletCards, Hourglass, HandCoins, Landmark, NotebookTabs, CircleDollarSign, LineChart, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { levels } from "@/components/landing/ProfitLevels";
import {
  mainGoal,
  targetAudience,
  resultCategories,
  paymentFormats,
} from "@/data/presentationData";
import { CardAbout } from "@/components/sections/CardAbout";

import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroProfit } from "@/components/landing/HeroProfit";
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

const Landing2 = () => {
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
          <div className="relative mt-14 md:mt-20 lg:pt-36">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-28 hidden h-44 w-full text-accent lg:block"
              viewBox="0 0 1200 176"
              preserveAspectRatio="none"
            >
              <path d="M0 176 H400 V104 H800 V32 H1200" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div className="grid gap-6 md:grid-cols-2 md:items-start lg:grid-cols-3 lg:gap-7">
            {levels.map((level, i) => {
              const mobileOffsets = ["mr-8", "ml-4 mr-4", "ml-8"];
              const tabletOffsets = ["md:mt-9", "md:mt-0", "md:col-start-2 md:-mt-3"];
              const desktopOffsets = ["lg:mt-36", "lg:mt-[4.5rem]", "lg:mt-0"];
              const price = levelPrices[i];
              if (!price) return null;
              const duration = i === 2 ? "4 недели" : level.duration;
              return (
                <article
                  key={level.number}
                  aria-label={`${level.number} ступень. ${level.title}`}
                  className={`relative flex min-h-full flex-col overflow-hidden border border-foreground/15 border-t-4 border-t-accent bg-card p-6 ${mobileOffsets[i]} ${tabletOffsets[i]} ${desktopOffsets[i]} md:mx-0 md:p-7 lg:min-h-[46rem] lg:p-8`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-0 font-display text-[8rem] font-semibold leading-none text-transparent opacity-20 [-webkit-text-stroke:1px_hsl(var(--foreground))] md:text-[9rem] lg:text-[11rem]"
                  >
                    {level.number}
                  </span>

                  <div className="relative z-10 flex h-full flex-col">
                    <p className="font-body text-sm font-semibold text-accent">{nbsp(duration)}</p>
                    <h3 className="mt-3 max-w-[14rem] font-display text-3xl font-semibold leading-none md:text-[2rem] lg:text-4xl">
                      {nbsp(level.title)}
                    </h3>
                    <p className="mt-5 font-body leading-relaxed text-foreground/75 lg:text-lg">
                      {nbsp(level.description)}
                    </p>

                    <div className="mt-7 border-l-2 border-accent pl-4">
                      <p className="font-display text-lg font-semibold">{nbsp("Подходит вам, если:")}</p>
                      <ul className="mt-4 space-y-3">
                        {level.fits.map((item) => (
                          <li key={item} className="flex gap-2.5 font-body text-sm leading-snug text-foreground/80 lg:text-base">
                            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{nbsp(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8">
                      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-body">
                        <del className="text-base text-foreground/55 decoration-foreground/60">{nbsp(price.oldPrice)}</del>
                        <strong className="font-display text-3xl font-semibold leading-none text-accent">{nbsp(price.newPrice)}</strong>
                      </p>
                      <Button asChild size="lg" className="mt-6 w-full rounded-none px-5">
                        <a href={level.href} target="_blank" rel="noopener noreferrer" onClick={trackedHref}>
                          {nbsp("Выбрать тариф")} <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
            </div>
          </div>

          {/* ===== Все 3 ступени ===== */}
          <article className="mt-16 grid gap-8 bg-board p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-12">
            <div>
              <p className="font-display text-3xl font-semibold leading-none text-accent md:text-5xl">
                {nbsp("Все 3 ступени")}
              </p>
              <h3 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-none text-background md:text-6xl">
                {nbsp("От шаблона бюджета до инвестиций и долгосрочного плана")}
              </h3>
              <p className="mt-6 font-body text-xl text-background/75">
                {nbsp("11 недель")}
              </p>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <del className="font-body text-lg text-background/55 decoration-background/60">{nbsp("140 000 руб.")}</del>
                <strong className="font-display text-4xl font-semibold leading-none text-accent md:text-5xl">{nbsp("69 000 руб.")}</strong>
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-none bg-accent px-6 text-accent-foreground hover:bg-background hover:text-foreground"
            >
              <a href="https://nivz.getcourse.ru/profit_level3" target="_blank" rel="noopener noreferrer" onClick={trackedHref}>
                {nbsp("Выбрать тариф")} <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </article>
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

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-card border border-foreground/15 p-8 md:p-12 hard-shadow text-center">
              <div className="mb-8 md:mb-10">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Банковская рассрочка до 12 месяцев
                </div>
                <div className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1] whitespace-nowrap">
                  от <span className="text-accent">5 000</span> ₽/мес
                </div>
                <div className="mt-4 font-body text-lg md:text-xl text-foreground/65">
                  без переплат
                </div>
              </div>

              <div className="border-t border-foreground/10 pt-8 md:pt-10 mb-8 md:mb-10">
                <ul className="space-y-4 text-left">
                  {paymentFormats.map((format, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/85">
                      <span className="font-mono text-accent mt-0.5">◆</span>
                      <span className="font-body text-base md:text-lg leading-relaxed">{format}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://nivz.getcourse.ru/diagnostic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Оставить заявку →
              </a>
              <p className="mt-4 max-w-md mx-auto text-center font-body text-sm md:text-base text-foreground/70 leading-relaxed">
                ВАЖНО: заполнение заявки ни&nbsp;к&nbsp;чему вас не&nbsp;обязывает, но даёт возможность узнать об&nbsp;актуальной программе обучения, ваших возможных результатах и&nbsp;получить персональные условия на&nbsp;участие
              </p>
            </div>
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

export default Landing2;
