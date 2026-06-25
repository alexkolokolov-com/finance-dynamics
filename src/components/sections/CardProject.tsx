const items = [
  {
    title: "Учебник",
    href: "#textbook",
    cta: "подробнее",
    text: "Доступным языком объясняем законы обращения денег и накопления — от первой формулы до личной модели капитала.",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* оси */}
        <line x1="30" y1="170" x2="380" y2="170" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="30" y1="170" x2="30" y2="20" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        {/* сетка */}
        {[40, 80, 120].map((y) => (
          <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
        ))}
        {[100, 175, 250, 325].map((x) => (
          <line key={x} x1={x} y1="20" x2={x} y2="170" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
        ))}
        {/* экспоненциальная кривая накопления */}
        <path
          d="M 30 165 Q 120 160, 180 140 T 280 90 Q 330 60, 375 25"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* точки */}
        {[
          { x: 30, y: 165 },
          { x: 100, y: 158 },
          { x: 175, y: 138 },
          { x: 250, y: 105 },
          { x: 325, y: 55 },
          { x: 375, y: 25 },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="hsl(var(--foreground))" />
        ))}
        {/* подписи */}
        <text x="40" y="35" className="font-mono" fontSize="9" fill="hsl(var(--foreground))" opacity="0.6">K(t)</text>
        <text x="350" y="185" className="font-mono" fontSize="9" fill="hsl(var(--foreground))" opacity="0.6">t</text>
        <text x="15" y="25" className="font-mono" fontSize="9" fill="hsl(var(--foreground))" opacity="0.6">Σ</text>
      </svg>
    ),
  },
  {
    title: "Лекции",
    href: "#marathon",
    cta: "подробнее",
    text: "Прямые эфиры и бесплатные образовательные программы — для развития финансовой грамотности без воды и обещаний.",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* центральная ось */}
        <line x1="30" y1="100" x2="370" y2="100" stroke="hsl(var(--foreground))" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
        {/* волны разной амплитуды */}
        <path
          d="M 30 100 Q 60 60, 90 100 T 150 100 T 210 100 T 270 100 T 330 100 T 370 100"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 30 100 Q 75 130, 120 100 T 210 100 T 300 100 T 370 100"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 30 100 Q 50 80, 70 100 T 110 100 T 150 100 T 190 100 T 230 100 T 270 100 T 310 100 T 350 100 T 370 100"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* концентрические дуги — антенна / эфир */}
        <circle cx="200" cy="100" r="6" fill="hsl(var(--accent))" />
        {[20, 40, 60, 85].map((r, i) => (
          <g key={r}>
            <path
              d={`M ${200 - r} 100 A ${r} ${r} 0 0 1 ${200 + r} 100`}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.2"
              opacity={0.7 - i * 0.15}
            />
            <path
              d={`M ${200 - r} 100 A ${r} ${r} 0 0 0 ${200 + r} 100`}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.2"
              opacity={0.7 - i * 0.15}
            />
          </g>
        ))}
        <text x="40" y="25" className="font-mono" fontSize="9" fill="hsl(var(--foreground))" opacity="0.6">live · эфир</text>
      </svg>
    ),
  },
  {
    title: "Консультации",
    href: "#consultations",
    cta: "подробнее",
    text: "Персональное сопровождение по работе над личными финансами — от диагностики до выстраивания собственной системы.",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* стол / линия диалога */}
        <line x1="40" y1="160" x2="360" y2="160" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        {/* левый человек */}
        <circle cx="110" cy="80" r="22" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <path
          d="M 75 160 Q 75 115, 110 115 Q 145 115, 145 160 Z"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />
        {/* правый человек */}
        <circle cx="290" cy="80" r="22" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <path
          d="M 255 160 Q 255 115, 290 115 Q 325 115, 325 160 Z"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />
        {/* речевые пузыри / обмен */}
        <path
          d="M 145 70 Q 175 55, 200 65 L 205 75 L 200 75 Q 175 80, 145 80 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
        />
        <path
          d="M 255 95 Q 225 110, 200 100 L 195 90 L 200 90 Q 225 85, 255 85 Z"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
        />
        {/* стрелка-обмен */}
        <path
          d="M 175 130 L 225 130"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        <text x="40" y="30" className="font-mono" fontSize="9" fill="hsl(var(--foreground))" opacity="0.6">1 : 1 · диалог</text>
      </svg>
    ),
  },
];

export const CardProject = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--grad-chalk)" }}
      />

      <div className="container-px max-w-7xl mx-auto relative">
        {/* шапка */}
        <div className="animate-fade-up">
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
            Направления.
          </h2>
        </div>

        {/* три блока */}
        <div className="mt-20 grid grid-cols-12 gap-6 lg:gap-8">
          {items.map((it, i) => (
            <a
              key={it.title}
              href={it.href}
              onClick={(e) => {
                const id = it.href.replace("#", "");
                const el = document.getElementById(id);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.replaceState(null, "", it.href);
                }
              }}
              className="col-span-12 md:col-span-4 group relative bg-card border border-foreground/15 p-8 md:p-10 flex flex-col hard-shadow animate-fade-up cursor-pointer"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl mb-6">
                {it.title}
              </h3>

              <div className="w-full aspect-[2/1] mb-6 border border-foreground/10 bg-background/50 p-4 flex items-center justify-center">
                {it.illustration}
              </div>

              <p className="font-body text-base text-foreground/75 leading-relaxed">
                {it.text}
              </p>

              <div className="mt-8 pt-6 border-t border-dashed border-foreground/20 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/90 group-hover:text-accent transition-colors">
                  подробнее
                </span>
                <span className="font-mono text-base text-foreground/70 group-hover:text-accent group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
