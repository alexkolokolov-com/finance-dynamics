export const About = () => {
  const principles = [
    { n: "01", title: "Наблюдение", desc: "Замеряем все денежные потоки. Без эмоций — только данные.", formula: "Σx → данные" },
    { n: "02", title: "Гипотеза", desc: "Формулируем закон, по которому ваши деньги работают именно так.", formula: "H₀ → модель" },
    { n: "03", title: "Эксперимент", desc: "Запускаем стратегию на контролируемом отрезке времени.", formula: "Δt → проверка" },
    { n: "04", title: "Закон", desc: "То, что воспроизводится — становится вашей финансовой константой.", formula: "k → результат" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-foreground/10">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="badge-tag">§ 01 · о проекте</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
              Финансы — <span className="italic font-light">это</span> естественная наука.
              <br />
              <span className="text-foreground/40">Магии нет. Есть метод.</span>
            </h2>
            <p className="mt-6 font-body text-lg text-foreground/70 max-w-2xl leading-relaxed">
              Мы&nbsp;разбираем личные деньги по&nbsp;тем&nbsp;же принципам, по&nbsp;которым физика разбирает мир: наблюдение, гипотеза, эксперимент, закон.
              Никакой мотивационной воды — только воспроизводимые модели поведения с&nbsp;капиталом.
            </p>
          </div>
        </div>

        {/* 4 принципа */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/15 border border-foreground/15">
          {principles.map((p) => (
            <div key={p.n} className="bg-background p-6 md:p-8 group hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default">
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 group-hover:text-background/60">шаг {p.n}</span>
                <span className="formula text-accent">{p.formula}</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{p.title}</h3>
              <p className="text-sm text-foreground/70 group-hover:text-background/80 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
