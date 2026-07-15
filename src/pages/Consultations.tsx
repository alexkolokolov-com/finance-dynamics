import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";

const stages = [
  {
    n: "01",
    title: "Диагностика",
    text:
      "Разбираем доходы, расходы и активы. Находим точки утечки и оцениваем реальную скорость накопления.",
  },
  {
    n: "02",
    title: "Модель бюджета",
    text:
      "Собираем персональную систему учёта — без таблиц-монстров. Простая модель, которой вы будете пользоваться годами.",
  },
  {
    n: "03",
    title: "Стратегия капитала",
    text:
      "Строим план накопления и распределения: подушка безопасности, цели, инвестиции. Всё под ваш доход и образ жизни.",
  },
  {
    n: "04",
    title: "Сопровождение",
    text:
      "Сверяем траекторию каждый месяц. Корректируем модель, когда меняется доход, состав семьи или цели.",
  },
];

const BookButton = ({ className = "" }: { className?: string }) => (
  <button
    type="button"
    id="book-consultation"
    data-book-consultation
    className={`inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors ${className}`}
  >
    Забронировать
    <span className="text-base">→</span>
  </button>
);

const Consultations = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Персональные консультации
          </div>
          <h1 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)] animate-fade-up">
            Финансовая модель под <span className="italic font-normal">ваш капитал</span>.
          </h1>
          <p
            className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Разбираем ваши финансы, строим систему учёта и держим траекторию накопления
            вместе — от первой встречи до устойчивой привычки.
          </p>

          <div
            className="mt-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <BookButton />
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up">
            Как проходит работа.
          </h2>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {stages.map((s, i) => (
              <div
                key={s.n}
                className="bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-5">
                  {s.n}
                </div>
                <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl mb-4">
                  {s.title}
                </h3>
                <p className="font-body text-base text-foreground/75 leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="p-8 md:p-12 border border-foreground/15 bg-card hard-shadow flex flex-col md:flex-row md:items-center md:justify-between gap-8 animate-fade-up">
            <div className="max-w-xl">
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                Готовы начать
              </div>
              <p className="font-serif-display text-2xl md:text-3xl leading-snug">
                Забронируйте удобное время — я лично провожу каждую встречу.
              </p>
            </div>
            <BookButton className="shrink-0 w-full md:w-auto" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consultations;
