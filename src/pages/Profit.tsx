import { useEffect } from "react";
import { Check, CircleDollarSign, HandCoins, Landmark, LineChart, NotebookTabs, ShieldCheck, TrendingUp, WalletCards } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { SiteHeader } from "@/components/SiteHeader";
import { ProfitLevels } from "@/components/landing/ProfitLevels";
import { InlineReviewGrid, InlineReviewPair } from "@/components/landing/InlineReviews";
import { CardAbout } from "@/components/sections/CardAbout";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { nbsp } from "@/lib/nbsp";
import { usePageMeta } from "@/hooks/usePageMeta";

// ===== Визуал первого экрана как на /landing: контурное П₽ОФИТ, биржевая линия фоном =====

// Буква Р как настоящий символ рубля ₽ — тот же контурный стиль, что и остальные буквы.
const RubleLetter = () => <span className="inline-block">₽</span>;

// Биржевая линия: один период длиной 1000, start Y == end Y (бесшовный цикл).
const PERIOD_PATH =
  "M0 160 L60 150 L120 165 L180 130 L240 145 L300 100 L360 120 L420 85 L480 110 L540 70 L600 95 L660 55 L720 90 L780 120 L840 95 L900 140 L960 115 L1000 160";

const PERIOD_FILL =
  PERIOD_PATH + " L1000 240 L0 240 Z";

const HeroChartLine = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden>
    <svg
      viewBox="0 0 2000 240"
      preserveAspectRatio="none"
      className="block h-full w-[200%] animate-ticker"
    >
      <defs>
        <linearGradient id="profitHeroChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1000].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          <path d={PERIOD_FILL} fill="url(#profitHeroChartFill)" />
          <path
            d={PERIOD_PATH}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  </div>
);

const heroOutlineStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.04em",
  lineHeight: 0.85,
  color: "transparent",
  WebkitTextStroke: "2px hsl(var(--foreground))",
};

const profitNav = [
  { href: "#tasks", label: "О курсе", id: "tasks" },
  { href: "#levels", label: "Программа", id: "levels" },
  { href: "#about", label: "Об авторе", id: "about" },
  { href: "#reviews", label: "Истории участников", id: "reviews" },
  { href: "#levels", label: "Выбрать тариф", id: "levels", cta: true },
];

const tasks = [
  { Icon: NotebookTabs, text: "Собрать понятную финансовую систему" },
  { Icon: WalletCards, text: "Перестать жить в ноль" },
  { Icon: Landmark, text: "Разобраться, куда инвестировать" },
  { Icon: CircleDollarSign, text: "Начать вести бюджет без мучений" },
  { Icon: LineChart, text: "Увеличить доход" },
  { Icon: ShieldCheck, text: "Накопить на пенсию" },
  { Icon: HandCoins, text: "Избавиться от долгов" },
  { Icon: TrendingUp, text: "Перестать тревожиться из-за денег" },
  { Icon: CircleDollarSign, text: "Решить другую финансовую сложность" },
];

const Profit = () => {
  usePageMeta({ title: "ПРОФИТ — курс о личных финансах", description: "Курс «Профит» Василия Мещерякова: три ступени от ленивого бюджета до разумных инвестиций. Живые эфиры и бессрочный доступ к записям." });
  useEffect(() => {
    document.title = "ПРОФИТ — курс о личных финансах Василия Мещерякова";
    const description = "Три ступени курса ПРОФИТ: ленивый бюджет, управление деньгами и инвестиции. Можно выбрать одну задачу или пройти весь курс.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader pageNav={profitNav} />

      <header className="relative overflow-hidden bg-background pb-16 pt-28 md:pb-20 md:pt-32">
        {/* Меловой радиальный фон — как на /landing */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--grad-chalk)" }} />
        {/* Динамическая биржевая линия — единый фоновый слой за всем первым экраном */}
        <HeroChartLine className="absolute inset-x-0 top-1/2 h-[60%] -translate-y-1/2 md:h-[55%]" />

        <div className="container-px relative mx-auto max-w-7xl">
          {/* Лого + имя автора над названием */}
          <div className="mb-8 flex items-center gap-3 md:mb-10">
            <LogoMark size="md" />
            <span className="font-mono text-sm uppercase tracking-widest text-accent md:text-base">Василий&nbsp;Мещеряков</span>
          </div>

          {/* Три акцентных подзаголовка — как на /landing */}
          <div className="mb-8 space-y-1 md:mb-12 md:space-y-2">
            {["Планирование\u00A0Роста", "Оптимизация\u00A0Финансов", "и\u00A0Трат"].map((t) => (
              <p key={t} className="font-serif-display text-2xl leading-[1.05] tracking-tight text-foreground sm:text-3xl md:text-5xl lg:text-6xl">
                {t}
              </p>
            ))}
          </div>

          {/* ===== DESKTOP / TABLET: одна строка ===== */}
          <h1 className="relative hidden text-left sm:block" style={{ ...heroOutlineStyle, fontSize: "clamp(5rem, 19vw, 17rem)" }}>
            П<RubleLetter />ОФИТ
          </h1>

          {/* ===== MOBILE: две строки П₽О / ФИТ ===== */}
          <h1 className="relative leading-[0.85] sm:hidden" style={{ ...heroOutlineStyle, fontSize: "clamp(5rem, 30vw, 9rem)" }}>
            <span className="block">П<RubleLetter />О</span>
            <span className="block">ФИТ</span>
          </h1>

          <p className="mt-8 max-w-4xl font-display text-3xl font-semibold leading-tight md:mt-10 md:text-5xl">
            {nbsp("Разные финансовые задачи требуют разных инструментов")}
          </p>

        </div>
      </header>

      <section id="tasks" className="scroll-mt-24 pb-20 pt-8 md:pb-28 md:pt-10">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="max-w-3xl font-display text-5xl font-semibold leading-[0.95] md:text-7xl">{nbsp("У каждого своё «болит»")}</h2>
          <p className="mt-7 max-w-xl font-body text-xl leading-relaxed text-foreground/75">{nbsp("Разная точка старта, разные цели и разный темп. Финансовых сложностей гораздо больше, чем один универсальный шаблон способен решить.")}</p>

          <div className="mt-16 md:mt-24">
            <p className="font-display text-3xl font-semibold leading-tight md:text-4xl">{nbsp("Курс подойдет тем, кто хочет:")}</p>
            <ul className="mt-8 grid gap-x-12 sm:grid-cols-2">
              {tasks.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-4 border-t border-foreground/15 py-5">
                  <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.6} />
                  <p className="font-display text-xl font-semibold leading-tight md:text-2xl">{nbsp(text)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 border-l-4 border-accent py-2 pl-6 md:mt-24 md:pl-10">
            <p className="max-w-5xl font-display text-3xl font-semibold leading-tight md:text-5xl">{nbsp("Я не пытаюсь решить всё «бюджетом» или «долгосрочным планом». Каждую финансовую задачу разбираю отдельно и даю под неё свои инструменты.")}</p>
          </div>
        </div>
      </section>

      <ProfitLevels />

      <section className="border-y border-foreground/10 bg-grid py-16 md:py-20">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-semibold leading-none md:text-6xl">{nbsp("Во всех тарифах")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["Прямые эфиры с Василием", "Ответы на вопросы", "Записи уроков навсегда", "Домашние задания самостоятельно"].map((item) => (
              <div key={item} className="flex min-h-32 items-start gap-4 border-t-2 border-foreground pt-5">
                <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                <p className="font-display text-xl font-semibold leading-tight">{nbsp(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CardAbout
        heading="Василий Мещеряков"
        hideEducation
        quote={(
          <>
            <p>{nbsp("Я не подгоняю людей под один правильный способ обращаться с деньгами.")}</p>
            <p>{nbsp("Мы выбираем инструменты под вашу задачу, доход, образ жизни и тот результат, который нужен именно сейчас.")}</p>
          </>
        )}
      />
      <InlineReviewPair indices={[0, 1]} bgClass="bg-grid" />

      <section id="reviews" className="scroll-mt-24 border-t border-foreground/10 py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">{nbsp("Отзывы участников")}</h2>
        </div>
        <InlineReviewGrid indices={[15, 14, 17, 16, 9, 8]} columns={3} className="pb-0 pt-12" />
      </section>

      <section className="border-t border-foreground/10 py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="bg-board p-8 text-center md:p-14">
            <h2 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-none text-background md:text-6xl">{nbsp("Выберите задачу, с которой хотите начать")}</h2>
            <Button asChild size="lg" className="mt-9 rounded-none bg-accent px-7 text-accent-foreground hover:bg-background hover:text-foreground">
              <a href="#levels">{nbsp("Посмотреть ступени")}</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Profit;