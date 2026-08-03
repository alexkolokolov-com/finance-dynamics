export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      <div className="container-px max-w-7xl mx-auto relative">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="col-span-12 lg:col-span-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.75rem,9vw,7.5rem)]">
              Вася <span className="italic font-light">и</span>
              <br />
              <span className="text-accent">финансы</span>
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:pb-4 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <p className="font-body text-base md:text-lg text-foreground/75 max-w-md leading-relaxed">
              Авторский проект Василия&nbsp;Мещерякова. Помогаю обычным людям спокойно
              разобраться с&nbsp;деньгами — без паники и громких обещаний.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#marathon" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background text-sm hover:bg-accent transition-colors">
                Записаться на марафон
              </a>
              <a href="#courses" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-foreground/40 text-sm hover:border-foreground transition-colors">
                Каталог курсов →
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10 mt-20 items-center">
          <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4 animate-fade-up md:col-start-7" style={{ animationDelay: '0.6s' }}>
            {[
              { n: "14", l: "лет в корпорациях" },
              { n: "3 200+", l: "учеников" },
              { n: "1400+", l: "разобранных бюджетов" },
              { n: "6 млрд ₽", l: "в управлении" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-accent pl-3">
                <div className="number-display text-3xl md:text-4xl">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
