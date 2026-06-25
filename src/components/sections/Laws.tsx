const laws = [
  {
    n: "I",
    formula: "F = m · a",
    title: "Закон инерции бюджета",
    excerpt: "Почему накопления, оставленные без приложенной силы, продолжают двигаться в выбранном направлении — даже если это направление вниз.",
    read: "8 мин",
    tag: "механика",
  },
  {
    n: "II",
    formula: "E = m · c²",
    title: "Эквивалент времени и денег",
    excerpt: "Маленькая сумма, умноженная на скорость регулярности в квадрате, превращается в капитал, который кажется чудом — но это арифметика.",
    read: "12 мин",
    tag: "относительность",
  },
  {
    n: "III",
    formula: "Δx · Δp ≥ ℏ/2",
    title: "Принцип неопределённости расходов",
    excerpt: "Чем точнее вы знаете, сколько потратите в этом месяце, тем меньше понимаете, на что. Учимся жить с этим парадоксом.",
    read: "10 мин",
    tag: "квантовая",
  },
];

export const Laws = () => {
  return (
    <section id="laws" className="relative py-24 md:py-32 border-t border-foreground/10">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14 items-end">
          <div className="col-span-12 md:col-span-7">
            <span className="badge-tag mb-6">§ 05 · блог</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
              Три закона
              <br />
              <span className="italic font-light">физики</span> финансов.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <a href="#" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
              Все статьи в блоге →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {laws.map((l, idx) => (
            <a
              key={l.n}
              href="#"
              className={`group relative col-span-12 md:col-span-6 lg:col-span-4 ${
                idx === 1 ? "lg:translate-y-10" : ""
              }`}
            >
              <article className="h-full border border-foreground/15 bg-background p-7 md:p-8 hover:border-foreground transition-colors duration-300 relative overflow-hidden">
                {/* фоновая римская цифра */}
                <div className="absolute -top-6 -right-2 font-display font-bold text-[8rem] leading-none text-foreground/5 group-hover:text-accent/20 transition-colors duration-500 select-none">
                  {l.n}
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <span className="formula text-accent">{l.formula}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">{l.tag}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-4">
                    {l.title}
                  </h3>

                  <p className="text-sm text-foreground/70 leading-relaxed mb-8">{l.excerpt}</p>

                  <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-foreground/50">
                      закон {l.n} · {l.read}
                    </span>
                    <span className="font-mono text-xs group-hover:text-accent transition-colors">читать →</span>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
