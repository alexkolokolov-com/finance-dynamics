import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Video, FileCheck, Users, Clock, Check, Plus, Waves, Repeat2, Wallet, Hourglass, Activity, Settings, ScanSearch, HandCoins, Landmark, HeartHandshake, type LucideIcon } from "lucide-react";
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
import { reviews as allReviews } from "@/data/reviewsData";

import { Footer } from "@/components/sections/Footer";

import { HeroProfit } from "@/components/landing/HeroProfit";
import PuzzleWeeks from "@/components/landing/PuzzleWeeks";
import { generateDeckPdf } from "@/lib/generateDeckPdf";
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

const landingTariffs = [
  {
    name: "Всё сам",
    price: "29 900 ₽",
    oldPrice: "40 000 ₽",
    features: [
      "Все записи и материалы курса",
      "Презентации, конспекты, шаблоны",
      "Чат поддержки",
    ],
  },
  {
    name: "С куратором",
    price: "49 900 ₽",
    oldPrice: "75 000 ₽",
    features: [
      "Всё из тарифа «Всё сам»",
      "Куратор с обратной связью",
      "Проверка домашних заданий",
      "Живые еженедельные эфиры с Василием",
      { text: "Поддержка на год", plus: true },
    ],
  },
  {
    name: "VIP",
    price: "109 900 ₽",
    oldPrice: "150 000 ₽",
    features: [
      "Всё из тарифа «С куратором»",
      "Куратор — лично Василий",
      "Прямая обратная связь и личные разборы",
      { text: "Поддержка на год", plus: true },
    ],
  },
];

const scrollToPricing = () => {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToProgram = () => {
  document.getElementById("program")?.scrollIntoView({ behavior: "smooth" });
};


type RevealListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  revealAll?: boolean;
};

function RevealList<T>({ items, renderItem, className, itemClassName, revealAll }: RevealListProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(revealAll ? items.length : 0);
  const nRef = useRef(0);
  nRef.current = n;

  useEffect(() => {
    if (revealAll) return;
    const el = ref.current;
    if (!el) return;
    const section = el.closest("[data-slide], section, .snap-start") as HTMLElement | null;
    if (!section) return;

    let active = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.intersectionRatio > 0.55;
      },
      { threshold: [0, 0.55, 1] }
    );
    io.observe(section);

    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (nRef.current < items.length) {
          e.preventDefault();
          e.stopPropagation();
          setN((v) => Math.min(v + 1, items.length));
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (nRef.current > 0) {
          e.preventDefault();
          e.stopPropagation();
          setN((v) => Math.max(v - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey, { capture: true } as never);
    };
  }, [items.length, revealAll]);

  const onClick = () => {
    if (revealAll) return;
    setN((v) => (v >= items.length ? 0 : v + 1));
  };

  const shown = revealAll ? items.length : n;

  return (
    <div ref={ref} onClick={onClick} className={`${revealAll ? "" : "cursor-pointer"} ${className ?? ""}`}>
      {items.map((it, i) => {
        const visible = i < shown;
        const animCls = revealAll
          ? ""
          : visible
          ? "opacity-100 translate-y-0 transition-all duration-500 ease-out"
          : "opacity-0 translate-y-3 pointer-events-none transition-all duration-500 ease-out";
        return (
          <div
            key={i}
            data-reveal-item=""
            className={`${animCls} ${itemClassName ?? ""}`}
          >
            {renderItem(it, i)}
          </div>
        );
      })}
    </div>
  );
}

export type PdfMode = {
  discountApplied: Record<number, boolean>;
  seriesApplied: Record<number, boolean>;
};

const SNAP_BASE = "snap-start h-screen overflow-hidden flex flex-col justify-center relative";
const PDF_BASE = "relative overflow-hidden flex flex-col justify-center";
const PDF_SLIDE_STYLE: React.CSSProperties = { width: 1280, height: 720 };

type LandingDeckProps = { pdfMode?: PdfMode };

const LandingDeck = ({ pdfMode: pdfModeProp }: LandingDeckProps = {}) => {
  const [discountAppliedState, setDiscountApplied] = useState<Record<number, boolean>>({});
  const [seriesAppliedState, setSeriesApplied] = useState<Record<number, boolean>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [supportRevealed, setSupportRevealed] = useState(false);
  const pricingRef = useRef<HTMLElement>(null);

  const discountUntil = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря",
    ];
    return `до\u00A0${d.getDate()}\u00A0${months[d.getMonth()]}`;
  }, []);

  // QA-режим: открыть страницу как ?pdfPreview=1 и увидеть точно тот DOM,
  // который пойдёт в html2canvas (анимации заморожены, секции 1920×1080)
  const pdfPreview = typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("pdfPreview") === "1";
  const effectivePdfMode: PdfMode | undefined =
    pdfModeProp ?? (pdfPreview ? { discountApplied: {}, seriesApplied: {} } : undefined);

  const discountApplied = effectivePdfMode?.discountApplied ?? discountAppliedState;
  const seriesApplied = effectivePdfMode?.seriesApplied ?? seriesAppliedState;

  const handleGeneratePdf = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      await generateDeckPdf({ discountApplied, seriesApplied });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  // классы и атрибуты для контейнеров-«слайдов»
  const slideCls = (extra = "") => `${effectivePdfMode ? PDF_BASE : SNAP_BASE} ${extra}`;
  const slideAttrs: Record<string, unknown> = effectivePdfMode
    ? { "data-pdf-slide": "", style: PDF_SLIDE_STYLE }
    : {};

  // Reveal "Поддержка на год" по ArrowRight, когда слайд тарифов активен
  useEffect(() => {
    if (effectivePdfMode) return;
    const el = pricingRef.current;
    if (!el) return;
    let active = false;
    const io = new IntersectionObserver(
      ([entry]) => { active = entry.intersectionRatio > 0.55; },
      { threshold: [0, 0.55, 1] }
    );
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (!supportRevealed) {
          e.preventDefault();
          e.stopPropagation();
          setSupportRevealed(true);
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (supportRevealed) {
          e.preventDefault();
          e.stopPropagation();
          setSupportRevealed(false);
        }
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey, { capture: true } as never);
    };
  }, [effectivePdfMode, supportRevealed]);

  const renderReviewSlides = (
    indices: number[],
    pageStartIdx: number,
    totalPages: number,
    firstSlideId?: string,
  ) => {
    const isPdf = !!effectivePdfMode;
    // В PDF-режиме НЕ грузим Google Drive — это главная причина зависаний экспорта.
    // Используем только локальные аватары; иначе показываем монограмму.
    const driveImage = (id?: string) =>
      !isPdf && id ? `https://drive.google.com/thumbnail?id=${id}&sz=w400` : undefined;

    // Расширенный парсер: понимает «Точка А:», «ЕГО ТОЧКА А», «МОЯ ТОЧКА Б», варианты с/без двоеточия
    const splitText = (text: string) => {
      const parts: { label?: string; body: string[] }[] = [];
      let current: { label?: string; body: string[] } = { body: [] };
      const isPointA = (t: string) => /^(?:[А-ЯA-Z\s]*\s)?ТОЧКА\s+[АA]:?\s*$/iu.test(t.toUpperCase());
      const isPointB = (t: string) => /^(?:[А-ЯA-Z\s]*\s)?ТОЧКА\s+[БB]:?\s*$/iu.test(t.toUpperCase());
      text.split(/\n/).forEach((raw) => {
        const t = raw.trim();
        if (!t) return;
        if (isPointA(t) || isPointB(t)) {
          if (current.body.length || current.label) parts.push(current);
          const labelNorm = isPointA(t) ? "Точка А" : "Точка Б";
          current = { label: labelNorm, body: [] };
        } else {
          current.body.push(t);
        }
      });
      if (current.body.length || current.label) parts.push(current);
      return parts;
    };

    // Резерв: если у отзыва нет «Точка А/Б», берём короткие выжимки из pains/results
    const PAIN_LABELS: Record<string, string> = {
      "нет_системы": "Нет системы в финансах",
      "нет_целей_и_плана": "Нет целей и плана",
      "тревога_и_стресс": "Тревога и стресс из-за денег",
      "расходы_превышают_доходы": "Расходы превышают доходы",
      "долги_и_кредиты": "Долги и кредиты",
    };
    const RESULT_LABELS: Record<string, string> = {
      "появилась_система": "Появилась система в финансах",
      "появился_долгосрочный_план": "Долгосрочный план на 5–10 лет",
      "спокойствие_и_контроль": "Спокойствие и контроль над деньгами",
      "доход_вырос": "Доход вырос",
      "закрыл_долги": "Закрыты долги и кредиты",
      "качество_жизни_улучшилось": "Качество жизни выросло",
    };

    const truncateLine = (s: string, max = 140) =>
      s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
    const limitItems = (arr: string[], max = 4) =>
      isPdf ? arr.slice(0, max).map((l) => truncateLine(l)) : arr;

    const items = indices
      .map((i) => allReviews[i])
      .filter(Boolean)
      .map((r) => {
        const sections = splitText(r.text);
        const findSection = (label: "А" | "Б") =>
          sections.find((s) => s.label === (label === "А" ? "Точка А" : "Точка Б"));
        let from = findSection("А")?.body ?? [];
        let to = findSection("Б")?.body ?? [];
        // Фолбэк: если парсинг не нашёл — собираем из pains/results
        if (!from.length) from = (r.pains ?? []).map((k) => PAIN_LABELS[k] ?? k);
        if (!to.length) to = (r.results ?? []).map((k) => RESULT_LABELS[k] ?? k);
        const quote =
          r.quote && r.quote.trim()
            ? r.quote
            : r.text.split("\n").map((l) => l.trim()).find(Boolean) ?? "";
        return {
          name: r.name,
          role: r.role,
          quote: isPdf ? truncateLine(quote, 180) : quote,
          avatar: r.avatar ?? driveImage(r.photoId),
          from: limitItems(from, 4),
          to: limitItems(to, 4),
        };
      });
    const pages: typeof items[] = [];
    for (let i = 0; i < items.length; i += 2) pages.push(items.slice(i, i + 2));

    return (
      <>
        {pages.map((pageReviews, localIdx) => {
          const pageNum = pageStartIdx + localIdx + 1;
          return (
            <section
              key={`reviews-${pageStartIdx}-${localIdx}`}
              id={localIdx === 0 ? firstSlideId : undefined}
              {...slideAttrs}
              className={slideCls("py-20 md:py-28 border-t border-foreground/10")}
            >
              <div className="container-px max-w-7xl mx-auto">
                <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-12 items-end">
                  <div className="col-span-12 md:col-span-8">
                    <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
                      Отзывы выпускников
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:text-right">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      §&nbsp;{String(pageNum).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {pageReviews.map((r, i) => (
                    <figure
                      key={i}
                      className="border border-foreground/15 bg-card p-7 md:p-9 hover:border-foreground transition-colors duration-300 flex flex-col"
                    >
                      <header className="flex items-center gap-4">
                        {r.avatar ? (
                          <img
                            src={r.avatar}
                            alt={r.name}
                            loading="lazy"
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-foreground/15 shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-muted border border-foreground/15 grid place-items-center font-serif-display text-xl text-foreground/55 shrink-0"
                          >
                            {r.name.charAt(0)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="font-serif-display font-semibold text-xl text-foreground leading-tight">
                            {r.name}
                          </div>
                          {r.role && (
                            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                              {r.role}
                            </div>
                          )}
                        </div>
                      </header>

                      <blockquote className="mt-6 font-serif-display text-lg md:text-xl leading-snug text-foreground border-l-2 border-accent pl-4">
                        «{r.quote}»
                      </blockquote>

                      <div className="mt-7 pt-6 border-t border-foreground/10 grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                            Точка&nbsp;А
                          </div>
                          <ul className="space-y-1.5 font-body text-sm md:text-[0.95rem] leading-relaxed text-foreground/75">
                            {r.from.map((line, j) => (
                              <li key={j}>{line}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">
                            Точка&nbsp;Б
                          </div>
                          <ul className="space-y-1.5 font-body text-sm md:text-[0.95rem] leading-relaxed text-foreground">
                            {r.to.map((line, j) => (
                              <li key={j}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </>
    );
  };

  return (
    <main
      className={
        effectivePdfMode
          ? "pdf-export physics-theme"
          : "physics-theme h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      }
    >
      
      {/* ============== HERO ============== */}
      <section className={slideCls("")} {...slideAttrs}>
        <HeroProfit pdfMode={!!effectivePdfMode} />
      </section>



      {/* ============== AUDIENCE ============== */}
      <section id="pains" {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10 scroll-mt-24")}>
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-4xl">
            Вы уперлись в{" "}
            <span className="italic font-normal">финансовый потолок</span>?
          </h2>

          <RevealList revealAll={!!effectivePdfMode}
            items={targetAudience.fits}
            className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            renderItem={(item, i) => {
              const Icon = audienceIcons[i] ?? Check;
              return (
                <div className="border border-foreground/15 bg-card p-7 md:p-10 hard-shadow flex gap-5 md:gap-6 items-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 grid place-items-center bg-foreground text-background shrink-0">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <p className="font-serif-display text-xl md:text-2xl leading-snug tracking-tight">
                    {item}
                  </p>
                </div>
              );
            }}
          />

        </div>
      </section>


      {/* ============== GOALS ============== */}
      <section {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10")}>
        <div className="container-px max-w-7xl mx-auto w-full">
          <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight md:whitespace-nowrap mb-12 md:mb-14">
            Цели сопровождения
          </h2>

          <RevealList revealAll={!!effectivePdfMode}
            items={programGoals}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            itemClassName="border-l-2 border-accent pl-5 py-2"
            renderItem={(goal) => (
              <p className="font-body text-base md:text-lg text-foreground/85 leading-relaxed">
                {goal.text}
              </p>
            )}
          />
        </div>
      </section>

      {/* ============== MAIN GOAL — отдельный слайд ============== */}
      <section {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10")}>
        <div className="container-px max-w-7xl mx-auto w-full">
          <div className="bg-board p-10 md:p-16 lg:p-20 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full border-2 border-background/15" />
            <div
              className="absolute -top-12 -right-12 w-72 h-72 rounded-full border border-accent/40"
              style={{ borderStyle: "dashed" }}
            />
            <div className="absolute top-16 right-16 w-7 h-7 rounded-full bg-accent shadow-[0_0_30px_hsl(var(--accent))]" />
            <div className="relative max-w-4xl">
              <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-6">
                Главная цель
              </div>
              <p className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                {mainGoal}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ============== EXPERT (с главной) ============== */}
      <div {...slideAttrs} className={slideCls("")}>
        <CardAbout eyebrow="Автор программы" heading="Василий Мещеряков" />
      </div>

      {/* ============== REVIEWS — Алексей + Любовь (продолжение блока эксперт) ============== */}
      {renderReviewSlides([0, 1], 0, 5)}



      {/* ============== PROGRAM — OVERVIEW SLIDE ============== */}
      <section id="program" {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10 scroll-mt-24")}>
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
              <div>
                {/* MOBILE */}
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
                          <span className={`${labelCls(it)} text-right ${onLeft ? "" : "invisible"}`}>
                            {it.lines[0]}<br />{it.lines[1]}
                          </span>
                          <span className={squareCls(it)}>{it.w}</span>
                          <span className={`${labelCls(it)} text-left ${!onLeft ? "" : "invisible"}`}>
                            {it.lines[0]}<br />{it.lines[1]}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>

                {/* DESKTOP/TABLET */}
                <ol className="hidden md:grid grid-cols-7 relative">
                  <span
                    aria-hidden
                    className="absolute top-1/2 -translate-y-1/2 h-px bg-foreground/25"
                    style={{ left: `calc(100% / 14)`, right: `calc(100% / 14)` }}
                  />
                  {timeline.map((it, i) => {
                    const above = i % 2 === 0;
                    return (
                      <li key={i} className="relative">
                        <a
                          href={it.href}
                          className="group grid grid-rows-[5rem_auto_5rem] items-center justify-items-center text-center px-2"
                        >
                          <span className={`${labelCls(it)} self-end pb-3 ${above ? "" : "invisible"}`}>
                            {it.lines[0]}<br />{it.lines[1]}
                          </span>
                          <span className={squareCls(it)}>{it.w}</span>
                          <span className={`${labelCls(it)} self-start pt-3 ${!above ? "" : "invisible"}`}>
                            {it.lines[0]}<br />{it.lines[1]}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ============== PUZZLE (до карточек недель) ============== */}
      <section {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10")}>
        <div className="container-px max-w-7xl mx-auto w-full">
          <PuzzleWeeks forceProgress={effectivePdfMode ? 1 : undefined} />
        </div>
      </section>

      {/* ============== WEEK SLIDES ============== */}
      {programWeeks.map((w, i) => (
        <section
          key={i}
          id={`week-${i + 1}`}
          {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10 scroll-mt-24 overflow-hidden")}
        >
          <div className="container-px max-w-7xl mx-auto w-full">
            <div className="max-w-4xl">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                {w.week}
              </div>
              <h3 className="font-serif-display font-semibold text-foreground text-3xl md:text-5xl leading-[0.95] tracking-tight mb-8 md:mb-10">
                {w.title}
              </h3>
              <RevealList revealAll={!!effectivePdfMode}
                items={[...w.points, w.result]}
                className="space-y-4 md:space-y-5"
                renderItem={(p, idx) => {
                  const isResult = idx === w.points.length;
                  if (isResult) {
                    return (
                      <div className="mt-6 md:mt-8 bg-foreground text-background p-7 md:p-9 relative overflow-hidden flex flex-col">
                        <w.Icon
                          aria-hidden
                          strokeWidth={0.9}
                          className="pointer-events-none select-none absolute -top-6 -right-6 w-36 h-36 md:w-44 md:h-44 text-accent/25"
                        />
                        <div className="relative font-mono text-[11px] uppercase tracking-widest text-accent mb-4">
                          Результат недели
                        </div>
                        <p className="relative font-serif-display text-xl md:text-2xl leading-snug text-background">
                          {p}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div className="flex gap-4">
                      <span className="font-mono text-accent text-sm shrink-0 pt-1.5">→</span>
                      <span className="font-body text-base md:text-lg text-foreground/85 leading-relaxed">
                        {p}
                      </span>
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </section>
      ))}

      {/* ============== PUZZLE «долгосрочный финансовый план» — только в браузере ============== */}
      {!effectivePdfMode && (
        <section {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10")}>
          <div className="container-px max-w-7xl mx-auto w-full">
            <PuzzleWeeks variant="plan" forceProgress={effectivePdfMode ? 1 : undefined} />
          </div>
        </section>
      )}

      {/* ============== GRADUATION SLIDE ============== */}
      <section
        id="graduation"
        {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10 scroll-mt-24")}
      >
        <div className="container-px max-w-7xl mx-auto">
          <div className="bg-board relative overflow-hidden p-8 md:p-14">
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
                <RevealList revealAll={!!effectivePdfMode}
                  items={graduationPoints}
                  className="space-y-4"
                  renderItem={(p) => (
                    <div className="flex gap-4">
                      <span className="font-mono text-accent text-xs shrink-0 pt-1">—</span>
                      <span className="text-background/90 leading-relaxed">{p}</span>
                    </div>
                  )}
                />


                <div className="mt-8 pt-6 border-t border-background/20">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                    Результат
                  </div>
                  <p className="font-display text-lg md:text-xl text-background leading-relaxed">
                    Вы&nbsp;запускаете своё мышление на&nbsp;10&nbsp;лет вперёд без страха и&nbsp;боли.
                    <br />
                    У&nbsp;вас есть запасной план и&nbsp;в&nbsp;случае кризиса вы&nbsp;не&nbsp;паникуете.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10")}>
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
        ref={pricingRef}
        id="pricing"
        {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10 bg-grid scroll-mt-24")}
      >
        <div className="container-px max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
              Тарифы
            </h2>
          </div>

          {(() => {
            const indexed = landingTariffs.map((t, i) => ({ t, i }));
            const withDiscount = indexed.filter(({ i }) => discountApplied[i] || seriesApplied[i]);
            const list = effectivePdfMode && withDiscount.length > 0 ? withDiscount : indexed;
            return (
          <div className={`grid gap-6 lg:gap-8 ${list.length === 1 ? "md:grid-cols-1 max-w-xl mx-auto" : list.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {list.map(({ t, i }) => {
              const series = seriesApplied[i];
              const applied = discountApplied[i] || series;
              const priceNum = parseInt(t.price.replace(/\D/g, ""), 10) || 0;
              const seriesPriceFmt =
                Math.round(priceNum * 0.9);
              const seriesPriceStr =
                seriesPriceFmt.toLocaleString("ru-RU").replace(/\u00A0|,/g, "\u00A0") +
                "\u00A0₽";
              return (
                <div
                  key={i}
                  className={`relative p-7 md:p-8 flex flex-col bg-background border ${i === 1 ? "border-foreground" : i === 2 ? "border-accent" : "border-foreground/15"}`}
                >

                  <h3 className="font-serif-display text-2xl font-semibold mb-3">{t.name}</h3>
                  <div className="mb-7 pb-6 border-b border-foreground/10 space-y-1">
                    {series ? (
                      <>
                        <div className="font-mono text-base text-muted-foreground line-through">
                          {t.oldPrice}
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="font-mono text-base text-muted-foreground line-through">
                            {t.price}
                          </span>
                          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            {discountUntil}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="number-display text-4xl text-accent">
                            {seriesPriceStr}
                          </span>
                           <span className="font-mono text-xs uppercase tracking-widest text-accent">
                            скидка&nbsp;10%
                          </span>
                        </div>
                      </>
                    ) : applied ? (
                      <>
                        <div className="font-mono text-base text-muted-foreground line-through">
                          {t.oldPrice}
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="number-display text-4xl text-accent">{t.price}</span>
                          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            {discountUntil}
                            </span>
                        </div>
                      </>
                    ) : (
                      <div className="min-h-[3rem] flex items-baseline">
                        <span className="number-display text-4xl">{t.oldPrice}</span>
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3 flex-grow mb-6">
                    {t.features.map((f, fi) => {
                      const text = typeof f === "string" ? f : f.text;
                      const isPlus = typeof f === "object" && f.plus;
                      const Icon = isPlus ? Plus : Check;
                      const bold = i >= 1 && fi > 0;
                      const hidden = isPlus && !effectivePdfMode && !supportRevealed;
                      return (
                        <li
                          key={fi}
                          aria-hidden={hidden || undefined}
                          className={`flex items-start gap-3 transition-opacity duration-500 ease-out ${hidden ? "opacity-0" : "opacity-100"}`}
                        >
                          <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={2} />
                          <span className={`text-sm leading-relaxed ${isPlus ? "text-accent font-semibold" : "text-foreground/85"} ${bold && !isPlus ? "font-semibold" : ""}`}>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex items-center gap-4 flex-wrap">
                    <button
                      type="button"
                      onClick={() =>
                        setDiscountApplied((prev) => ({ ...prev, [i]: !prev[i] }))
                      }
                      disabled={applied}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-foreground/30 font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-colors disabled:opacity-60 disabled:cursor-default disabled:hover:border-foreground/30 disabled:hover:text-foreground"
                    >
                      {applied ? "Скидка применена ✓" : "Применить скидку"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSeriesApplied((prev) => ({ ...prev, [i]: !prev[i] }));
                        setDiscountApplied((prev) => ({ ...prev, [i]: true }));
                      }}
                      disabled={series}
                      className="font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors disabled:text-accent disabled:cursor-default"
                    >
                      {series ? "Доп ✓" : "Доп"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
            );
          })()}


        </div>
      </section>

      {/* ============== YULIA CASE ============== */}
      <section {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10 bg-grid")}>
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
      <section id="results" {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10 scroll-mt-24")}>
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14 items-end">
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Что вы получите
              </h2>
            </div>
          </div>

          <RevealList
            items={resultCategories}
            revealAll={!!effectivePdfMode}
            className="grid grid-cols-12 gap-6 lg:gap-8"
            renderItem={(cat, i) => (
              <div className="h-full border border-foreground/15 bg-card p-7 md:p-8">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-foreground/10">
                  <span className="number-display text-2xl text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-bold tracking-tight">
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
            )}
            itemClassName="col-span-12 md:col-span-4"
          />


        </div>
      </section>

      {/* ============== RESULTS — HIGHLIGHT (отдельный слайд) ============== */}
      <section {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10")}>
        <div className="container-px max-w-7xl mx-auto w-full">
          <div className="bg-board relative overflow-hidden p-8 md:p-14 lg:p-20">
            <svg className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 text-background/15" viewBox="0 0 8 8" fill="none" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
              <path d="M0 8 H1 V7 H2 V6 H3 V5 H4 V4 H5 V3 H6 V2 H7 V1 H8 V0" stroke="currentColor" strokeWidth="0.12" />
            </svg>
            <div className="relative max-w-4xl">
              <p className="font-display text-2xl md:text-4xl lg:text-5xl text-background leading-[1.15] tracking-tight">
                Вы&nbsp;обгоняете 99%&nbsp;населения по&nbsp;финансовой грамотности и&nbsp;впервые чётко осознаёте, чего хотите от&nbsp;жизни в&nbsp;деньгах и&nbsp;как&nbsp;к&nbsp;этому подконтрольно прийти
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== REVIEWS — продолжение (Алексей и\u00A0Любовь уже показаны после блока эксперт) ============== */}
      {renderReviewSlides([5, 7, 15, 14, 17, 16, 9, 8], 1, 5, "reviews")}

      {/* ============== FOOTER CTA — только в браузерной версии ============== */}
      {!effectivePdfMode && (
        <section {...slideAttrs} className={slideCls("py-20 md:py-28 border-t border-foreground/10")}>
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
                  <button
                    type="button"
                    onClick={handleGeneratePdf}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors disabled:opacity-60 disabled:cursor-progress"
                  >
                    {isGenerating ? "Готовим PDF…" : "Сформировать КП →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!effectivePdfMode && <Footer />}
    </main>
  );
};

export default LandingDeck;
