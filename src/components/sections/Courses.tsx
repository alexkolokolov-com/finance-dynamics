const courses = [
  {
    duration: "1 месяц",
    code: "КУРС-М · 30 дней",
    name: "Квант капитала",
    sub: "месячный интенсив",
    formula: "Δm = базовая система за 30 дней",
    desc: "За&nbsp;месяц собираем работающую финансовую систему: учёт, бюджет, подушка, первый инвестиционный портфель. Без воды — только повторяемые упражнения.",
    items: [
      "30 коротких видео-лекций",
      "12 практических разборов",
      "шаблоны бюджета и портфеля",
      "проверка домашних заданий",
    ],
    price: "19 900 ₽",
    accent: false,
  },
  {
    duration: "12 месяцев",
    code: "КУРС-Г · 365 дней",
    name: "Орбита благосостояния",
    sub: "годовая программа",
    formula: "T = 1 год · полный цикл капитала",
    desc: "Год сопровождения, чтобы&nbsp;вывести капитал на&nbsp;устойчивую орбиту. Личные стратегии, ежемесячные ревизии портфеля, закрытый клуб инвесторов и&nbsp;разборы Василия.",
    items: [
      "12 модулей · от теории до практики",
      "ежемесячные созвоны с экспертом",
      "персональная стратегия и портфель",
      "закрытый клуб + библиотека отчётов",
      "сертификат программы",
    ],
    price: "149 000 ₽",
    accent: true,
  },
];

export const Courses = () => {
  return (
    <section id="courses" className="relative py-24 md:py-32 border-t border-foreground/10 bg-grid">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14">
          <div className="col-span-12 md:col-span-3">
            <span className="badge-tag">§ 04 · программа</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
              Каталог курсов.
              <br />
              <span className="text-foreground/40">Два контура движения.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {courses.map((c) => (
            <article
              key={c.name}
              className={`relative p-8 md:p-10 border border-foreground transition-all duration-300 flex flex-col h-full ${
                c.accent ? "bg-foreground text-background" : "bg-background"
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${c.accent ? "text-background/60" : "text-foreground/50"}`}>
                  {c.code}
                </span>
                <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border ${c.accent ? "border-accent text-accent" : "border-foreground/30"}`}>
                  {c.duration}
                </span>
              </div>

              <h3 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight">{c.name}</h3>
              <div className={`font-mono text-xs uppercase tracking-widest mt-2 ${c.accent ? "text-accent" : "text-foreground/50"}`}>
                {c.sub}
              </div>

              <div className={`formula mt-6 pb-6 border-b ${c.accent ? "border-background/20" : "border-foreground/15"}`}>
                <span className={c.accent ? "text-background/70" : "text-foreground/60"}>{c.formula}</span>
              </div>

              <p className={`mt-6 leading-relaxed ${c.accent ? "text-background/85" : "text-foreground/75"}`}
                 dangerouslySetInnerHTML={{ __html: c.desc }}
              />

              <ul className="mt-6 space-y-2.5">
                {c.items.map((i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${c.accent ? "text-background/85" : "text-foreground/80"}`}>
                    <span className={`font-mono mt-0.5 ${c.accent ? "text-accent" : "text-accent"}`}>◆</span>
                    {i}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10 flex items-end justify-between flex-wrap gap-4">
                <div className="number-display text-4xl">{c.price}</div>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                    c.accent
                      ? "bg-accent text-accent-foreground hover:bg-background hover:text-foreground"
                      : "bg-foreground text-background hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  Записаться →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
