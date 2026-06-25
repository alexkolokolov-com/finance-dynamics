import { Link } from "react-router-dom";

export const Marathon = () => {
  return (
    <section
      id="marathon"
      className="relative py-20 md:py-28 border-t border-foreground/10 px-4"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden bg-[hsl(165_35%_10%)] text-[hsl(var(--chalk))] border border-foreground/15 rounded-md">
          {/* виньетка */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, hsl(165 40% 5% / 0.85) 100%)",
            }}
          />

          {/* фон: формулы и графики мелом */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none select-none"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="card-chalk-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="hsl(var(--chalk))"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#card-chalk-grid)" />

            <g
              fill="none"
              stroke="hsl(var(--chalk))"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              <text x="60" y="90" fontSize="42" fill="hsl(var(--chalk))" stroke="none">∫ f(x)dx = F(x) + C</text>
              <text x="780" y="130" fontSize="46" fill="hsl(var(--chalk))" stroke="none">E = mc²</text>
              <text x="1280" y="200" fontSize="38" fill="hsl(var(--chalk))" stroke="none">Δp = F·Δt</text>
              <text x="120" y="380" fontSize="34" fill="hsl(var(--chalk))" stroke="none">lim n→∞ (1+1/n)ⁿ = e</text>
              <text x="1180" y="430" fontSize="36" fill="hsl(var(--chalk))" stroke="none">FV = PV·(1+r)ⁿ</text>
              <text x="60" y="720" fontSize="30" fill="hsl(var(--chalk))" stroke="none">"Assets = Liabilities + Equity"</text>
              <text x="200" y="560" fontSize="28" fill="hsl(var(--chalk))" stroke="none">xₙ₊₁ = xₙ − f(xₙ)/f'(xₙ)</text>
              <text x="900" y="780" fontSize="32" fill="hsl(var(--chalk))" stroke="none">∮ E·dl = −dΦ/dt</text>
              <text x="1300" y="680" fontSize="30" fill="hsl(var(--chalk))" stroke="none">Σ income − Σ expenses</text>
              <text x="500" y="850" fontSize="28" fill="hsl(var(--chalk))" stroke="none">μ = m·g</text>

              <path d="M 1050 620 Q 1180 480 1320 600 T 1560 540" />
              <line x1="1050" y1="620" x2="1560" y2="620" />
              <line x1="1050" y1="620" x2="1050" y2="430" />

              <circle cx="320" cy="240" r="60" />
              <ellipse cx="320" cy="240" rx="90" ry="30" transform="rotate(35 320 240)" />
              <ellipse cx="320" cy="240" rx="90" ry="30" transform="rotate(-35 320 240)" />

              <path d="M 700 500 L 850 500 L 780 380 Z" />
            </g>
          </svg>

          <div className="relative z-10 text-center px-4 py-14 md:px-16 md:py-20">
            <div className="flex flex-col items-center mb-5">
              <span className="block w-10 h-px bg-[hsl(var(--chalk))]/40 mb-3" />
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[hsl(var(--chalk))]/85">
                19–21 мая 2026
              </div>
            </div>

            <h2
              className="font-hand font-bold leading-[0.95] tracking-tight text-[hsl(var(--chalk))]"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 7rem)",
                textShadow: "0 0 18px hsl(var(--chalk) / 0.25)",
              }}
            >
              Теория{" "}
              <span className="block sm:inline uppercase text-accent">большого</span>{" "}
              бюджета
            </h2>

            <p className="mt-8 font-body text-lg sm:text-xl text-[hsl(var(--chalk))]/90 max-w-2xl mx-auto">
              Бесплатный практикум по&nbsp;личным финансам
            </p>

            <p className="mt-6 font-body text-base sm:text-lg text-[hsl(var(--chalk))]/60 max-w-2xl mx-auto">
              Без магии — только реальные законы движения денег:
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
              {["расходов", "доходов", "инвестиций"].map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[hsl(var(--chalk))]/30 bg-[hsl(215_45%_10%)]/40 backdrop-blur-sm font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[hsl(var(--chalk))]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--chalk))]/55" />
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-3">
              <Link
                to="/bigbudget"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-mono text-xs sm:text-sm uppercase tracking-widest rounded-md hover:brightness-110 transition-all hard-shadow"
              >
                Узнать подробнее →
              </Link>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[hsl(var(--chalk))]/55">
                бесплатно · 3&nbsp;эфира · zoom
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
