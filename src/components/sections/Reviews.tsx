const reviews = [
  {
    name: "Анна К.",
    role: "маркетолог · Москва",
    text: "До курса я думала, что просто плохо умею считать. Оказалось — у меня не было системы. Через месяц у меня появился бюджет, который реально работает, а через полгода — первая подушка в три месяца расходов.",
    metric: "+ 380 000 ₽",
    label: "сбережений за 6 мес",
  },
  {
    name: "Дмитрий Р.",
    role: "разработчик · СПб",
    text: "Василий объясняет деньги как физик: понятно, последовательно, без эзотерики. Каждый закон проверяется на собственном бюджете. Это первый курс, который я не бросил на третьей неделе.",
    metric: "× 2.4",
    label: "доходность портфеля",
  },
  {
    name: "Светлана М.",
    role: "врач · Казань",
    text: "Прошла «Теорию большого бюджета» — за 7 дней разобрала 4 года финансового хаоса. Главное — поняла, что деньги действительно подчиняются законам, и эти законы можно выучить.",
    metric: "7 дней",
    label: "до первого результата",
  },
  {
    name: "Игорь В.",
    role: "предприниматель · Екб",
    text: "Перешёл на годовую программу после марафона. Первый раз в жизни у меня есть стратегия, а не «как получится». Личные созвоны с Василием — самое ценное, что было в моём финансовом обучении.",
    metric: "₽4.2M",
    label: "капитал к концу года",
  },
];

export const Reviews = () => {
  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(42 27% 94%) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="container-px max-w-7xl mx-auto relative">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14">
          <div className="col-span-12 md:col-span-3">
            <span className="badge-tag border-background/30 text-background/70">§ 06 · результаты</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
              Эксперимент
              <br />
              <span className="text-accent">воспроизводится.</span>
            </h2>
            <p className="mt-6 font-body text-lg text-background/70 max-w-2xl">
              4&nbsp;из&nbsp;4&nbsp;учеников фиксируют рост капитала в&nbsp;первые 6&nbsp;месяцев. Вот&nbsp;что они говорят.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className="col-span-12 md:col-span-6 border border-background/20 p-7 md:p-9 hover:border-accent transition-colors duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[11px] uppercase tracking-widest text-background/50">
                  замер №{String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-accent text-3xl font-display leading-none">"</span>
              </div>

              <blockquote className="font-body text-base md:text-lg leading-relaxed text-background/90 mb-8">
                {r.text}
              </blockquote>

              <figcaption className="mt-auto pt-6 border-t border-background/15 flex items-end justify-between flex-wrap gap-4">
                <div>
                  <div className="font-display font-bold text-base">{r.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-background/55 mt-1">{r.role}</div>
                </div>
                <div className="text-right">
                  <div className="number-display text-2xl text-accent">{r.metric}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-background/55 mt-1">{r.label}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
