import { Link } from "react-router-dom";

type Material = {
  tag: string;
  title: string;
  text: string;
  href: string;
  illustration: JSX.Element;
};

const materials: Material[] = [
  {
    tag: "чек-лист",
    title: "Финансовый чек-лист для пары",
    text: "20 вопросов, на которые стоит ответить вдвоём, прежде чем строить общий бюджет, брать ипотеку или планировать детей. Без занудства и упрёков — как разговор за чашкой кофе.",
    href: "/checklist",
    illustration: (
      <svg viewBox="0 0 360 200" className="w-full h-auto">
        {/* лист бумаги */}
        <rect
          x="120"
          y="30"
          width="120"
          height="140"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.8"
        />
        {/* строки чек-листа */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 60 + i * 22;
          return (
            <g key={i}>
              <rect
                x="132"
                y={y - 8}
                width="12"
                height="12"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="1.4"
              />
              {/* галочки на первых трёх */}
              {i < 3 && (
                <path
                  d={`M 134 ${y - 2} L 138 ${y + 2} L 144 ${y - 6}`}
                  stroke="hsl(var(--accent))"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <line
                x1="152"
                y1={y - 2}
                x2={i % 2 === 0 ? 222 : 210}
                y2={y - 2}
                stroke="hsl(var(--foreground))"
                strokeWidth="1.2"
                opacity="0.65"
              />
            </g>
          );
        })}
        {/* две фигуры по бокам */}
        <g>
          {/* левая */}
          <circle
            cx="60"
            cy="92"
            r="14"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.8"
          />
          <path
            d="M 40 150 Q 60 118 80 150"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
        <g>
          {/* правая */}
          <circle
            cx="300"
            cy="92"
            r="14"
            fill="hsl(var(--accent))"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.8"
          />
          <path
            d="M 280 150 Q 300 118 320 150"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
        {/* стрелочки от фигур к листу */}
        <path
          d="M 80 100 Q 100 100 118 95"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <path
          d="M 280 100 Q 260 100 242 95"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
      </svg>
    ),
  },
];

export const Materials = () => {
  return (
    <section
      id="materials"
      className="relative py-24 md:py-32 overflow-hidden bg-grid scroll-mt-20 border-t border-foreground/10"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--grad-chalk)" }}
      />

      <div className="container-px max-w-7xl mx-auto relative">
        {/* заголовок и интро */}
        <div className="mb-16 animate-fade-up">
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
            Полезные <span className="italic font-normal">материалы</span>.
          </h2>
          <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-3xl">
            Короткие&nbsp;тексты, чек-листы и&nbsp;шаблоны, которые помогают навести
            порядок в&nbsp;деньгах ещё до&nbsp;того, как&nbsp;вы&nbsp;придёте на&nbsp;программу.
          </p>
        </div>

        {/* карточки материалов — в стиле учебника */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {materials.map((m, i) => (
            <Link
              key={m.href}
              to={m.href}
              className="col-span-12 md:col-span-4 group relative bg-card border border-foreground/15 p-8 md:p-10 flex flex-col animate-fade-up hover:border-foreground transition-colors"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl mb-8">
                {m.title}
              </h3>

              <div
                className="w-full mb-8 p-5 border border-dashed"
                style={{ borderColor: "hsl(var(--foreground) / 0.25)" }}
              >
                {m.illustration}
              </div>

              <p className="font-body text-base md:text-[17px] leading-relaxed text-foreground/75 flex-1">
                {m.text}
              </p>

              <div className="mt-8 pt-6 border-t border-dashed border-foreground/20">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/90 group-hover:text-accent transition-colors inline-flex items-center gap-2">
                  открыть <span className="text-base">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
