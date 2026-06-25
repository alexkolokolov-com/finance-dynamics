import vasilyBench from "@/assets/vasily-bench.jpg";

export const Expert = () => {
  const facts = [
    { k: "МФТИ", v: "выпускник физтеха, ФАКИ" },
    { k: "10+ лет", v: "преподавал физику" },
    { k: "12 лет", v: "практика на финансовых рынках" },
    { k: "₽1.4B+", v: "активов под наставничеством" },
    { k: "3200+", v: "учеников по всему миру" },
    { k: "Автор", v: "методики «Физика финансов»" },
  ];

  return (
    <section id="expert" className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden">
      {/* фоновая сетка-доска */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(hsl(42 27% 94%) 1px, transparent 1px), linear-gradient(90deg, hsl(42 27% 94%) 1px, transparent 1px)',
        backgroundSize: '64px 64px'
      }} />
      {/* меловые формулы на фоне */}
      <div className="absolute top-10 right-10 font-mono text-xs chalk-text opacity-50 hidden lg:block">
        F = ma<br />
        E = mc²<br />
        ∫ f(x)dx
      </div>
      <div className="absolute bottom-10 left-10 font-mono text-xs chalk-text opacity-40 hidden lg:block">
        ROI = (V₁ − V₀)/V₀<br />
        FV = PV(1+r)ⁿ
      </div>

      <div className="container-px max-w-7xl mx-auto relative">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* левая колонка: текст и факты */}
          <div className="col-span-12 lg:col-span-7 lg:pt-4 order-2 lg:order-1">
            <span className="badge-tag border-background/30 text-background/70">§ 02 · эксперт</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mt-6">
              Василий
              <br />
              <span className="text-accent">Мещеряков</span>
            </h2>

            <div className="mt-8 space-y-4 text-base md:text-lg text-background/80 leading-relaxed max-w-2xl">
              <p>
                Закончил МФТИ и&nbsp;десять лет преподавал физику. Затем перенёс научный подход на&nbsp;деньги — и&nbsp;понял, что&nbsp;капитал подчиняется законам не&nbsp;хуже, чем падающее яблоко.
              </p>
              <p>
                За&nbsp;12&nbsp;лет работы с&nbsp;частными инвесторами вывел методику, по&nbsp;которой любой человек, умеющий считать до&nbsp;ста, может построить личный бюджет с&nbsp;точностью лабораторного эксперимента.
              </p>
            </div>

            {/* факты-таблица */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-background/15 border border-background/15 mt-10">
              {facts.map((f) => (
                <div key={f.k} className="bg-foreground p-5">
                  <div className="font-display text-2xl font-bold text-accent">{f.k}</div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-background/70 mt-1">{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* правая колонка: одно фото */}
          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent" />
              <img src={vasilyBench} alt="Василий Мещеряков, эксперт проекта «Физика финансов»" className="relative w-full aspect-[4/5] object-cover grayscale" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
