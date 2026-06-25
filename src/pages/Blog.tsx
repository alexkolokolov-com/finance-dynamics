import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";


type Post = {
  tag: string;
  title: string;
  text: string;
  cta: string;
  href?: string;
  illustration: JSX.Element;
};

const checklistIllustration = (
  <svg viewBox="0 0 360 200" className="w-full h-auto">
    {/* лист бумаги */}
    <rect
      x="80"
      y="30"
      width="200"
      height="150"
      fill="none"
      stroke="hsl(var(--foreground))"
      strokeWidth="1.8"
    />
    {/* строки */}
    {[60, 85, 110, 135, 160].map((y, i) => (
      <g key={y}>
        {/* чекбокс */}
        <rect
          x="98"
          y={y - 8}
          width="14"
          height="14"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.6"
        />
        {i < 3 && (
          <path
            d={`M 100 ${y - 1} L 105 ${y + 4} L 112 ${y - 5}`}
            stroke="hsl(var(--accent))"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        <line
          x1="124"
          y1={y}
          x2={i % 2 === 0 ? 258 : 232}
          y2={y}
          stroke="hsl(var(--foreground))"
          strokeWidth="1.2"
          opacity="0.55"
        />
      </g>
    ))}
    {/* два кружка-сердечка как «пара» */}
    <circle
      cx="300"
      cy="60"
      r="14"
      fill="hsl(var(--accent))"
      stroke="hsl(var(--foreground))"
      strokeWidth="1.6"
    />
    <circle
      cx="320"
      cy="74"
      r="14"
      fill="none"
      stroke="hsl(var(--foreground))"
      strokeWidth="1.6"
    />
  </svg>
);

const budgetIllustration = (
  <svg viewBox="0 0 360 200" className="w-full h-auto">
    {/* лист таблицы */}
    <rect
      x="60"
      y="20"
      width="240"
      height="160"
      fill="none"
      stroke="hsl(var(--foreground))"
      strokeWidth="1.8"
    />
    {/* горизонтальные линии */}
    {[55, 90, 125, 160].map((y) => (
      <line
        key={y}
        x1="60"
        y1={y}
        x2="300"
        y2={y}
        stroke="hsl(var(--foreground))"
        strokeWidth="1"
        opacity="0.35"
      />
    ))}
    {/* вертикальные разделители */}
    <line x1="140" y1="20" x2="140" y2="180" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.35" />
    <line x1="220" y1="20" x2="220" y2="180" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.35" />
    {/* заголовки */}
    <text x="100" y="42" fontFamily="Cormorant Garamond, serif" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle">доходы</text>
    <text x="180" y="42" fontFamily="Cormorant Garamond, serif" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle">расходы</text>
    <text x="260" y="42" fontFamily="Cormorant Garamond, serif" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle">сбережения</text>
    {/* строки цифр */}
    <text x="100" y="78" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle">120 000 ₽</text>
    <text x="180" y="78" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle">85 000 ₽</text>
    <text x="260" y="78" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="hsl(var(--accent))" textAnchor="middle">+35 000 ₽</text>
    <text x="100" y="113" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle">95 000 ₽</text>
    <text x="180" y="113" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle">70 000 ₽</text>
    <text x="260" y="113" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="hsl(var(--accent))" textAnchor="middle">+25 000 ₽</text>
    {/* крупная цифра 19 */}
    <text x="180" y="155" fontFamily="Cormorant Garamond, serif" fontSize="44" fill="hsl(var(--accent))" textAnchor="middle" opacity="1">19</text>
    {/* ручка */}
    <line x1="316" y1="100" x2="338" y2="78" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
    <circle cx="338" cy="78" r="4" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
  </svg>
);

const posts: Post[] = [
  {
    tag: "чек-лист",
    title: "Финансовый чек-лист для пары",
    text:
      "23 разговора, которые стоит провести с партнёром до того, как деньги станут поводом для конфликта. Прошлое, настоящее, будущее, риски и забота — по&nbsp;пунктам, без воды.",
    cta: "Открыть чек-лист",
    href: "/checklist",
    illustration: checklistIllustration,
  },
  {
    tag: "бюджет",
    title: "19 способов ведения бюджета",
    text:
      "19 способов ведения семейного бюджета — от ежемесячного Excel до метода конвертов и FIRE.",
    cta: "Читать",
    href: "/budget-methods",
    illustration: budgetIllustration,
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = "Блог · Вася и финансы";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <SiteHeader />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="animate-fade-up">
            <h1 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
              <span className="italic font-normal">Блог</span>.
            </h1>
            <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-3xl">
              Заметки, инструменты и&nbsp;разборы — то, что помогает увидеть деньги
              как&nbsp;систему, а&nbsp;не&nbsp;как&nbsp;череду случайностей.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {posts.map((p, i) => {
              const inner = (
                <>
                  <h2 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl mb-8">
                    {p.title}
                  </h2>

                  <div
                    className="w-full mb-8 p-5 border border-dashed"
                    style={{ borderColor: "hsl(var(--foreground) / 0.25)" }}
                  >
                    {p.illustration}
                  </div>

                  <p
                    className="font-body text-base md:text-[17px] leading-relaxed text-foreground/75 flex-1"
                    dangerouslySetInnerHTML={{ __html: p.text }}
                  />

                  <div className="mt-8 pt-6 border-t border-dashed border-foreground/20">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/90 group-hover:text-accent transition-colors inline-flex items-center gap-2">
                      {p.cta} <span className="text-base">→</span>
                    </span>
                  </div>
                </>
              );

              const baseClass =
                "col-span-12 md:col-span-4 group relative bg-card border border-foreground/15 p-8 md:p-10 flex flex-col animate-fade-up hover:border-accent transition-colors";

              return p.href ? (
                <Link
                  key={p.title}
                  to={p.href}
                  className={baseClass}
                  style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                >
                  {inner}
                </Link>
              ) : (
                <article
                  key={p.title}
                  className={baseClass}
                  style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                >
                  {inner}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
