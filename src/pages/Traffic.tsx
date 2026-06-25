import { useEffect, useState } from "react";
import { Check, Plus, Waves, Repeat2, Wallet, Hourglass, Activity, Settings, ScanSearch, HandCoins, AlertTriangle, ShieldCheck, TrendingUp, Target, Sparkles, type LucideIcon } from "lucide-react";
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
import { TrafficRegisterDialog } from "@/components/traffic/TrafficRegisterDialog";

import { OrbitDiagram } from "@/components/OrbitDiagram";
import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/SiteHeader";

import { InlineReviewPair, InlineReviewFeature, InlineReviewGrid } from "@/components/landing/InlineReviews";

import goldenSpiral from "@/assets/golden-spiral.png";

// ============== COPY DATA ==============
const pains: string[] = [
  "Зарплата приходит\u00A0— и\u00A0через неделю непонятно, куда она\u00A0делась.",
  "Доход растёт, а\u00A0свободных денег больше не\u00A0становится.",
  "Откладывать не\u00A0получается: то\u00A0ремонт, то\u00A0отпуск, то\u00A0подарки, то\u00A0«а\u00A0вдруг».",
  "Любая внеплановая трата выбивает из\u00A0колеи на\u00A0несколько месяцев.",
  "Бюджет в\u00A0Excel пробовали\u00A05\u00A0раз\u00A0— забрасывали через две\u00A0недели.",
  "В\u00A040+ нет ощущения, что вы\u00A0двигаетесь к\u00A0финансовой свободе\u00A0— скорее наоборот.",
  "Кредиты, рассрочки, ипотека\u00A0— и\u00A0вы\u00A0уже не\u00A0помните, кому и\u00A0сколько должны.",
  "Думать про пенсию страшно: подушки нет, инвестиций нет, плана нет.",
];

const promises: { num: string; title: string; text: string }[] = [
  {
    num: "+20%",
    title: "К\u00A0свободным деньгам",
    text: "Найдём в\u00A0вашем текущем бюджете 15\u00A0000–50\u00A0000\u00A0₽ в\u00A0месяц, которые сейчас утекают незаметно\u00A0— без аскезы и\u00A0отказа от\u00A0привычной жизни.",
  },
  {
    num: "2\u00A0часа",
    title: "В\u00A0месяц на\u00A0учёт",
    text: "Заберёте рабочую систему, которая ведётся за\u00A02\u00A0часа в\u00A0месяц\u00A0— а\u00A0не\u00A0съедает выходные таблицами и\u00A0чувством вины.",
  },
  {
    num: "10\u00A0лет",
    title: "Горизонт планирования",
    text: "Соберёте личный финансовый план на\u00A05 и\u00A010\u00A0лет: сколько нужно на\u00A0пенсию, детей, квартиру, мечты\u00A0— и\u00A0как туда прийти из\u00A0текущей точки.",
  },
  {
    num: "0",
    title: "Тревоги о\u00A0деньгах",
    text: "Перестанете нервничать в\u00A0конце месяца. У\u00A0вас будет план\u00A0В, С\u00A0и\u00A0даже\u00A0Ж\u00A0— на\u00A0случай кризиса, увольнения и\u00A0непредвиденных трат.",
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: "У\u00A0меня нет времени\u00A0— работа, дети, дом.",
    a: "Программа рассчитана на\u00A04–5\u00A0часов в\u00A0неделю. Эфиры\u00A0— по\u00A0вечерам, записи остаются навсегда. После курса на\u00A0сам учёт уходит 2\u00A0часа в\u00A0месяц.",
  },
  {
    q: "Я\u00A0уже пробовал(а) вести бюджет\u00A0— не\u00A0пошло.",
    a: "Большинство участников пробовали\u00A0— и\u00A0бросали. На\u00A0программе мы\u00A0подбираем формат под ваш характер и\u00A0ритм жизни из\u00A06\u00A0рабочих форматов, а\u00A0не\u00A0заставляем вести «как у\u00A0всех».",
  },
  {
    q: "У\u00A0меня небольшой доход\u00A0— это\u00A0вообще для\u00A0меня?",
    a: "Да. Чем меньше доход\u00A0— тем заметнее эффект от\u00A0наведения порядка. Найденные +15–20\u00A0тыс.\u00A0₽ при доходе\u00A050\u00A0тыс. меняют жизнь сильнее, чем при доходе\u00A0500\u00A0тыс.",
  },
  {
    q: "А\u00A0если у\u00A0меня большие долги и\u00A0кредиты?",
    a: "Третья неделя программы посвящена именно этому: как закрыть кредиты без переплат, что гасить первым и\u00A0как больше в\u00A0эту яму не\u00A0попадать.",
  },
  {
    q: "Чем это\u00A0отличается от\u00A0бесплатных гайдов и\u00A0блогов?",
    a: "Гайды дают информацию. Здесь вы\u00A0выходите с\u00A0работающей системой, наставником, обратной связью и\u00A0результатом\u00A0— деньгами в\u00A0кармане, а\u00A0не\u00A0папкой PDF в\u00A0загрузках.",
  },
  {
    q: "А\u00A0если не\u00A0подойдёт\u00A0— деньги вернёте?",
    a: "Да. В\u00A0течение первых 14\u00A0дней возвращаем 100%\u00A0стоимости без вопросов, если вы\u00A0прошли первый модуль и\u00A0поняли, что это\u00A0не\u00A0ваше.",
  },
];

// ============== TIMER ==============
const TIMER_STORAGE_KEY = "traffic_offer_end_v1";
const TIMER_DURATION_MS = 30 * 60 * 1000;

const getOfferEnd = (): number => {
  if (typeof window === "undefined") return Date.now() + TIMER_DURATION_MS;
  try {
    const raw = window.localStorage.getItem(TIMER_STORAGE_KEY);
    if (raw) {
      const v = parseInt(raw, 10);
      if (!isNaN(v) && v > Date.now()) return v;
    }
  } catch {
    // ignore
  }
  const end = Date.now() + TIMER_DURATION_MS;
  try {
    window.localStorage.setItem(TIMER_STORAGE_KEY, String(end));
  } catch {
    // ignore
  }
  return end;
};

const useOfferTimer = () => {
  const [end] = useState<number>(() => getOfferEnd());
  const [now, setNow] = useState<number>(() => Date.now());
  const expired = now >= end;
  useEffect(() => {
    if (expired) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [expired]);
  const remaining = Math.max(0, end - now);
  const totalSec = Math.floor(remaining / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  const label = `${min}\u00A0мин\u00A0${String(sec).padStart(2, "0")}\u00A0сек`;
  return { expired, label, min, sec };
};




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
];

const graduationPoints = [
  "По\u00A0уникальной методологии вы\u00A0сведёте воедино свои личные и\u00A0финансовые цели на\u00A05 и\u00A010\u00A0лет вперёд:",
  "Расчёт: сколько именно нужно на\u00A0комфортную жизнь, детей и\u00A0пенсию",
  "Интеграция мечт в\u00A0финансовый план\u00A0— не\u00A0фантазии, а\u00A0реальные измеримые цели",
  "Разработка плана\u00A0В, С\u00A0и\u00A0даже Ж\u00A0и\u00A0Ё",
  
];

type TariffFeature = string | { text: string; plus?: boolean };
type TariffConfig = {
  name: string;
  features: TariffFeature[];
  active: { price: string; oldPrice: string; widgetId: number; scriptHash: string };
  expired: { price: string; widgetId: number; scriptHash: string };
};

const landingTariffs: TariffConfig[] = [
  {
    name: "Всё сам",
    features: [
      "Все записи и материалы курса",
      "Презентации, конспекты, шаблоны",
      "Чат поддержки",
    ],
    active: {
      price: "9 900 ₽",
      oldPrice: "20 000 ₽",
      widgetId: 1616395,
      scriptHash: "693be30ca10dc8a20ae8411b103e2dc35d0d2275",
    },
    expired: {
      price: "20 000 ₽",
      widgetId: 1616628,
      scriptHash: "433a9e59ea52327edab698f4ffe4c407a5c29115",
    },
  },
  {
    name: "С куратором",
    features: [
      "Всё из тарифа «Всё сам»",
      "Куратор с обратной связью",
      "Проверка домашних заданий",
      "Живые еженедельные эфиры с Василием",
      { text: "Поддержка на год", plus: true },
    ],
    active: {
      price: "25 000 ₽",
      oldPrice: "50 000 ₽",
      widgetId: 1616625,
      scriptHash: "365a502d83b8abc6d949012232d67dc7a5c6f859",
    },
    expired: {
      price: "50 000 ₽",
      widgetId: 1616629,
      scriptHash: "c7c33b856388ea278925e39df0c55a79812e592a",
    },
  },
];

const scrollToPricing = () => {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
};



const Traffic = () => {
  const { expired, label, min, sec } = useOfferTimer();

  return (
    <main className="physics-theme min-h-screen">
      <SiteHeader
        pageNav={[
          { href: "#program", label: "Программа", id: "program" },
          { href: "#pricing", label: "Тарифы", id: "pricing" },
          { href: "#results", label: "Результаты", id: "results" },
          { href: "#reviews", label: "Отзывы", id: "reviews" },
          { href: "#top", label: "Записаться", id: "top", cta: true },
        ]}
      />
      {/* ============== HERO ============== */}
      <section id="top" className="relative min-h-[85vh] pt-20 md:pt-24 pb-16 overflow-hidden bg-grid">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--grad-chalk)' }} />

        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-12 gap-0 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end animate-fade-up" style={{ animationDelay: '0.25s' }}>
              <OrbitDiagram className="w-64 md:w-80" />
            </div>

            <div className="col-span-12 md:col-span-7 order-2 md:order-1 animate-fade-up">
              <h1 className="font-serif-display font-semibold leading-[0.92] tracking-tight text-[clamp(3.5rem,9vw,7.5rem)]">
                Ленивый
                <br />
                <span className="text-accent italic">бюджет</span>
              </h1>
              <p className="mt-8 font-serif-display font-normal italic leading-[1.15] tracking-tight text-[clamp(1.5rem,4vw,3rem)] max-w-2xl">
                Курс по&nbsp;управлению личными финансами —{" "}
                <span className="underline-accent">как&nbsp;лучше жить за&nbsp;те&nbsp;же деньги</span>.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4 justify-start animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <button
              type="button"
              onClick={scrollToPricing}
              className="inline-flex items-center justify-center px-5 py-3 md:px-6 md:py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              Записаться со скидкой
            </button>
            <div className="flex items-baseline gap-1 text-accent tabular-nums leading-none number-display text-2xl md:text-4xl m-0 p-0">
              <span>{String(min).padStart(2, "0")}</span>
              <span>:</span>
              <span>{String(sec).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-20 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            {[
              { n: "+20%", l: "к свободным деньгам" },
              { n: "2 часа", l: "в месяц на учёт" },
              { n: "0", l: "тревоги о финансах" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-accent pl-4 flex items-baseline gap-2 md:block">
                <div className="number-display text-3xl md:text-4xl">{s.n}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-0 md:mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== AUDIENCE / PAINS ============== */}
      <section className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-4xl">
            Вы&nbsp;уперлись в{" "}
            <span className="italic font-normal">финансовый потолок</span>?
          </h2>

          <ul className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-5 md:gap-y-6">
            {[
              "У\u00A0вас хаос в\u00A0финансах и\u00A0деньги утекают сквозь пальцы",
              "Откладывать не\u00A0получается: то\u00A0ремонт, то\u00A0отпуск, то\u00A0подарки",
              "Доход растёт, а\u00A0свободных денег больше не\u00A0становится",
              "В\u00A040\u00A0лет нет ощущения, что вы\u00A0двигаетесь к\u00A0финансовой свободе\u00A0— скорее наоборот",
              "Бюджет вести пробовали, но\u00A0от\u00A0этого ещё больше тревоги",
              "Устали бегать как\u00A0белка в\u00A0колесе и\u00A0хотите финансовой стабильности",
            ].map((p, i) => (
              <li key={i} className="flex gap-4 items-start border-b border-foreground/10 pb-5">
                <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-1" strokeWidth={1.75} />
                <span className="text-base md:text-lg text-foreground/85 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 md:mt-16 bg-foreground text-background p-7 md:p-10 max-w-3xl">
            <p className="font-display font-medium text-xl md:text-2xl lg:text-3xl leading-snug tracking-tight">
              Дело не&nbsp;в&nbsp;размере дохода и&nbsp;не&nbsp;в&nbsp;силе воли.
            </p>
            <p className="font-display font-medium text-xl md:text-2xl lg:text-3xl leading-snug tracking-tight mt-2">
              Дело в&nbsp;системе&nbsp;— и&nbsp;её&nbsp;можно построить за&nbsp;3&nbsp;недели.
            </p>
          </div>
        </div>
      </section>

      {/* ============== ACCENT CARDS ============== */}
      <section className="relative py-16 md:py-20 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "экономя на\u00A0всём",
              "считая каждую копейку",
              "работая на\u00A02\u00A0работах",
            ].map((text) => (
              <div
                key={text}
                className="border border-foreground/15 bg-card p-6 md:p-8 flex items-center justify-center text-center"
              >
                <p className="font-display text-lg md:text-xl font-medium leading-snug tracking-tight">
                  <span className="text-accent font-semibold">НЕ</span>{" "}
                  {text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 md:mt-16 font-serif-display font-semibold text-foreground text-3xl md:text-5xl leading-[0.95] tracking-tight text-center">
            Есть другой путь
          </p>
        </div>
      </section>

      {/* ============== EXPERT (с главной) ============== */}
      <CardAbout eyebrow="Автор программы" heading="Василий Мещеряков" />

      {/* отзывы — продолжение блока про эксперта */}
      <InlineReviewPair indices={[0, 1]} bgClass="bg-grid" />




      {/* ============== GOALS ============== */}
      <section className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14 items-end">
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Что вы&nbsp;получаете <span className="italic font-light">на&nbsp;программе</span>
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

      {/* ============== PROGRAM ============== */}
      <section id="program" className="relative py-20 md:py-28 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14 items-end">
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Программа <span className="italic font-light">экспресс-курса</span>
              </h2>
              <p className="mt-6 font-body text-2xl md:text-3xl lg:text-4xl text-foreground/85 max-w-3xl leading-snug">
                3&nbsp;недели <span className="underline-accent">работы над навыками</span> вместо 10&nbsp;лет проб и&nbsp;ошибок
              </p>
            </div>
          </div>

          {/* ===== TIMELINE: 4 недели + выпускной проект ===== */}
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
              { w: "Нед.5", lines: ["Выпускной", "проект"], href: "#graduation", final: true },
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
                <ol className="hidden md:grid grid-cols-5 relative">
                  <span
                    aria-hidden
                    className="absolute top-1/2 -translate-y-1/2 h-px bg-foreground/25"
                    style={{
                      left: `calc(100% / 10)`,
                      right: `calc(100% / 10)`,
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
                  <h3 className="font-serif-display text-xl md:text-2xl font-semibold leading-tight tracking-tight mb-5">
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
                <h3 className="font-serif-display text-3xl md:text-5xl font-semibold leading-[0.95] tracking-tight">
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


      {/* ============== PRICING — ТАРИФЫ ============== */}
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


          <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            {landingTariffs.map((t, i) => {
              const variant = expired ? t.expired : t.active;
              return (
                <div
                  key={i}
                  className="relative p-7 md:p-8 flex flex-col bg-background border border-foreground/15"
                >
                  <h3 className="font-serif-display text-2xl font-semibold mb-3">{t.name}</h3>
                  <div className="mb-7 pb-6 border-b border-foreground/10 space-y-1">
                    {!expired && (
                      <div className="font-mono text-base text-muted-foreground line-through">
                        {t.active.oldPrice}
                      </div>
                    )}
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="number-display text-4xl text-accent">{variant.price}</span>
                    </div>
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
                          <span className={`text-sm text-foreground/85 leading-relaxed overflow-hidden text-ellipsis whitespace-nowrap md:whitespace-normal ${bold ? "font-semibold" : ""}`}>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex flex-wrap items-center gap-3 mt-auto pt-6 border-t border-foreground/10">
                    <TrafficRegisterDialog
                      widgetId={variant.widgetId}
                      scriptHash={variant.scriptHash}
                      title={`Тариф «${t.name}»`}
                      subtitle={expired ? undefined : `скидка действует ${label}`}
                      trigger={
                        <button
                          type="button"
                          className="inline-flex items-center justify-center px-5 py-3 md:px-6 md:py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                        >
                          {expired ? "Записаться" : "Записаться со скидкой"}
                        </button>
                      }
                    />
                    {!expired && (
                      <div className="flex items-baseline gap-1 text-accent tabular-nums leading-none number-display text-xl md:text-2xl">
                        <span>{String(min).padStart(2, "0")}</span>
                        <span>:</span>
                        <span>{String(sec).padStart(2, "0")}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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
                  <h3 className="font-serif-display text-lg md:text-xl font-semibold tracking-tight leading-tight">
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


      {/* ============== PRE-FAQ CTA ============== */}
      <section className="relative py-16 md:py-20 border-t border-foreground/10">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <p className="font-body text-lg md:text-xl text-foreground/85 leading-relaxed">
                Гарантия возврата&nbsp;— 3&nbsp;недели. Если программа не&nbsp;подойдёт, вернём деньги без вопросов.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <TrafficRegisterDialog
                widgetId={expired ? landingTariffs[0].expired.widgetId : landingTariffs[0].active.widgetId}
                scriptHash={expired ? landingTariffs[0].expired.scriptHash : landingTariffs[0].active.scriptHash}
                title={`Тариф «${landingTariffs[0].name}»`}
                subtitle={expired ? undefined : `скидка действует ${label}`}
                trigger={
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-5 py-3 md:px-6 md:py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                  >
                    {expired ? "Записаться" : "Записаться со скидкой"}
                  </button>
                }
              />
              {!expired && (
                <div className="flex items-baseline gap-1 text-accent tabular-nums leading-none number-display text-xl md:text-2xl">
                  <span>{String(min).padStart(2, "0")}</span>
                  <span>:</span>
                  <span>{String(sec).padStart(2, "0")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============== FAQ — Возражения ============== */}
      <section className="relative py-20 md:py-28 border-t border-foreground/10 bg-grid">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14">
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-serif-display font-semibold text-foreground text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Что обычно <span className="italic font-light">останавливает</span>
              </h2>
              <p className="mt-6 font-body text-xl md:text-2xl text-foreground/85 leading-snug max-w-2xl">
                Шесть честных ответов на&nbsp;вопросы, которые задают чаще всего.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {faq.map((item, i) => (
              <article
                key={i}
                className="border border-foreground/15 bg-card p-7 md:p-8 flex flex-col"
              >
                <h3 className="font-serif-display text-lg md:text-xl font-semibold leading-snug tracking-tight mb-4">
                  {item.q}
                </h3>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </div>
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
              <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-5">
                Решение за&nbsp;вами
              </div>
              <h2 className="font-serif-display font-semibold text-background text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight max-w-3xl mx-auto">
                Ещё один год без системы&nbsp;— или 4&nbsp;недели и&nbsp;<span className="italic font-light">контроль над деньгами</span>?
              </h2>
              <p className="mt-7 font-body text-lg md:text-2xl text-background/85 leading-snug max-w-2xl mx-auto">
                В&nbsp;худшем случае вы&nbsp;вернёте деньги по&nbsp;гарантии. В&nbsp;лучшем&nbsp;— найдёте 200&nbsp;000&nbsp;₽ в&nbsp;год, которые сейчас утекают.
              </p>
              {!expired && (
                <div className="mt-7 font-mono text-[11px] md:text-xs uppercase tracking-widest text-accent">
                  скидка&nbsp;действует {label}
                </div>
              )}
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
                >
                  Записаться со&nbsp;скидкой&nbsp;→
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Traffic;


