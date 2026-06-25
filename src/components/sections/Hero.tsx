import { OrbitDiagram } from "@/components/OrbitDiagram";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-grid">
      {/* фоновая радиальная подсветка */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--grad-chalk)' }} />

      <div className="container-px max-w-7xl mx-auto relative">
        {/* верхняя метка */}
        <div className="flex items-center mb-12 animate-fade-up">
          <span className="badge-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink" />
            Эксперимент №001 · запущен
          </span>
        </div>

        {/* асимметричная сетка 7/5 */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="col-span-12 lg:col-span-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-display font-bold leading-[0.92] tracking-tight text-[clamp(2.75rem,9vw,7.5rem)]">
              Деньги <span className="italic font-light">не берутся</span>
              <br />
              из&nbsp;воздуха.
              <br />
              <span className="relative inline-block">
                У&nbsp;них есть
                <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 400 14" preserveAspectRatio="none">
                  <path d="M2 8 Q 100 2, 200 7 T 398 6" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <span className="text-accent">законы.</span>
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:pb-4 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <p className="font-body text-base md:text-lg text-foreground/75 max-w-md leading-relaxed">
              Авторский проект Василия Мещерякова — выпускника МФТИ и преподавателя физики.
              Учу управлять капиталом так же чётко, как решают задачи на втором курсе физтеха.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#marathon" className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors hard-shadow">
                Записаться на марафон
              </a>
              <a href="#courses" className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/40 font-mono text-xs uppercase tracking-widest hover:border-foreground transition-colors">
                Каталог курсов →
              </a>
            </div>
          </div>
        </div>

        {/* нижний ряд: формула + орбиты + статистика */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mt-20 items-center">
          <div className="col-span-12 md:col-span-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="font-display text-3xl md:text-4xl font-medium tracking-tight">
              <span className="text-accent">К</span> = <span className="italic">f</span> ( Д − Р ) · <span className="italic">t</span><sup className="text-accent">n</sup>
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-3 leading-relaxed">
              Капитал = функция от&nbsp;разницы дохода и&nbsp;расхода, умноженная на&nbsp;время в&nbsp;степени дисциплины.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 animate-fade-up flex justify-center" style={{ animationDelay: '0.5s' }}>
            <OrbitDiagram className="w-64 md:w-72" />
          </div>

          <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            {[
              { n: "12", l: "лет в финансах" },
              { n: "3 200+", l: "учеников" },
              { n: "₽1.4B", l: "под управлением" },
              { n: "97%", l: "доходят до цели" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-accent pl-3">
                <div className="number-display text-3xl md:text-4xl">{s.n}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
