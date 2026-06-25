import { LogoMark } from "@/components/LogoMark";
// Hero лендинга «ПРОФИТ»: контурное русское слово П₽ОФИТ с настоящим знаком рубля,
// биржевая линия фоном (бесшовный цикл, с пиками и падениями), три акцентных подзаголовка.

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// Буква Р как настоящий символ рубля ₽ — тот же контурный стиль, что и остальные буквы.
const RubleLetter = () => <span className="inline-block">₽</span>;

// Биржевая линия: один период длиной 1000, start Y == end Y (бесшовный цикл).
// Содержит несколько пиков и падений.
const PERIOD_PATH =
  "M0 160 L60 150 L120 165 L180 130 L240 145 L300 100 L360 120 L420 85 L480 110 L540 70 L600 95 L660 55 L720 90 L780 120 L840 95 L900 140 L960 115 L1000 160";

const PERIOD_FILL =
  PERIOD_PATH + " L1000 240 L0 240 Z";

const ChartLine = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden>
    <svg
      viewBox="0 0 2000 240"
      preserveAspectRatio="none"
      className="block h-full w-[200%] animate-ticker"
    >
      <defs>
        <linearGradient id="profitChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1000].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          <path d={PERIOD_FILL} fill="url(#profitChartFill)" />
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

const outlineStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.04em",
  lineHeight: 0.85,
  color: "transparent",
  WebkitTextStroke: "2px hsl(var(--foreground))",
};

type HeroProfitProps = { pdfMode?: boolean };

export const HeroProfit = ({ pdfMode = false }: HeroProfitProps = {}) => {
  // высота, которую занимают кнопки + их верхний отступ (mt-10/14 + py-3 + border):
  // mt-14 ≈ 56px, кнопка ≈ 50px → ~106px. Округляем до 7rem (112px).
  const profitOffsetCls = pdfMode ? "mt-28 md:mt-32" : "";

  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-32 md:pb-24">
      {/* Меловой радиальный фон */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--grad-chalk)" }}
      />

      {/* Биржевая линия — единый фоновый слой за всем Hero */}
      <ChartLine className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60%] md:h-[55%]" />

      <div className="container-px max-w-7xl mx-auto relative">
        {/* Лого + имя автора */}
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <LogoMark size="md" />
          <span className="font-mono uppercase tracking-widest text-accent text-sm md:text-base">
            Василий&nbsp;Мещеряков
          </span>
        </div>

        {/* Три акцентных подзаголовка — без чёрной плашки */}
        <div className="mb-8 md:mb-12 space-y-1 md:space-y-2">
          {["Планирование\u00A0Роста", "Оптимизация\u00A0Финансов", "и\u00A0Трат"].map((t) => (
            <p
              key={t}
              className="font-serif-display text-foreground text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
            >
              {t}
            </p>
          ))}
        </div>

        {/* ===== DESKTOP / TABLET: одна строка ===== */}
        <h1
          className={`hidden sm:block relative text-left ${profitOffsetCls}`}
          style={{ ...outlineStyle, fontSize: "clamp(5rem, 19vw, 17rem)" }}
        >
          П<RubleLetter />ОФИТ
        </h1>

        {/* ===== MOBILE: две строки П₽О / ФИТ ===== */}
        <h1
          className={`sm:hidden relative leading-[0.85] ${profitOffsetCls}`}
          style={{ ...outlineStyle, fontSize: "clamp(5rem, 30vw, 9rem)" }}
        >
          <span className="block">П<RubleLetter />О</span>
          <span className="block">ФИТ</span>
        </h1>

        {/* CTA — только в браузерной версии */}
        {!pdfMode && (
          <div className="mt-10 md:mt-14 flex flex-wrap gap-3 relative">
            <button
              onClick={() => scrollTo("program")}
              className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/40 text-foreground font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              Программа
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors hard-shadow"
            >
              Записаться&nbsp;→
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
