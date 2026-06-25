import vasilyBench from "@/assets/vasily-bench.jpg";

export const Expert = () => {
  const facts = [
    { k: "14 лет", v: "корпоративной карьеры" },
    { k: "6 млрд ₽", v: "бюджет в управлении" },
    { k: "3 года", v: "практики консультанта" },
    { k: "1400+", v: "семейных бюджетов разобрано" },
    { k: "3200+", v: "учеников проекта" },
    { k: "Автор", v: "марафона «Теория большого бюджета»" },
  ];

  return (
    <section id="expert" className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden">
      <div className="container-px max-w-7xl mx-auto relative">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-7 lg:pt-4 order-2 lg:order-1">
            <span className="badge-tag border-background/30 text-background/70">Эксперт</span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1] tracking-tight mt-6">
              Василий
              <br />
              <span className="text-accent">Мещеряков</span>
            </h2>

            <div className="mt-8 space-y-4 text-base md:text-lg text-background/80 leading-relaxed max-w-2xl">
              <p>
                14&nbsp;лет проработал в&nbsp;корпорациях, последние годы — финансовым
                руководителем с&nbsp;бюджетом в&nbsp;6&nbsp;млрд&nbsp;₽. Потом перенёс этот
                опыт в&nbsp;личные финансы обычных людей.
              </p>
              <p>
                За&nbsp;три года консультирования разобрал больше 1400&nbsp;семейных
                бюджетов. Учу собирать спокойную систему, в&nbsp;которой деньги растут
                без героических усилий.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-background/15 border border-background/15 mt-10">
              {facts.map((f) => (
                <div key={f.k} className="bg-foreground p-5">
                  <div className="font-display text-2xl font-semibold text-accent">{f.k}</div>
                  <div className="text-xs text-background/70 mt-1">{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent rounded-2xl" />
              <img src={vasilyBench} alt="Василий Мещеряков" className="relative w-full aspect-[4/5] object-cover rounded-2xl" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
