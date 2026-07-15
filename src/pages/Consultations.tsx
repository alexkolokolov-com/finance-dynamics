import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";

const audience = [
  {
    title: "Хочу навести порядок в деньгах",
    text:
      "Доход есть, а накоплений нет. Не понимаю, куда уходят деньги и как выстроить систему учёта.",
  },
  {
    title: "Копить не получается",
    text:
      "Пробовал бюджеты и таблицы — забрасываю через месяц. Нужна модель, которая работает годами.",
  },
  {
    title: "Хочу собрать капитал",
    text:
      "Есть цель — квартира, обучение детей, финансовая независимость. Нужен понятный план и скорость.",
  },
  {
    title: "Планирую следующий год",
    text:
      "Хочу зайти в новый год со стратегией: подушка, накопления, инвестиции, крупные покупки.",
  },
];

const stages = [
  {
    n: "01",
    title: "Диагностика",
    text: "Разбираем доходы, расходы и активы. Находим точки утечки и оцениваем скорость накопления.",
  },
  {
    n: "02",
    title: "Модель бюджета",
    text: "Собираем персональную систему учёта — простую, которой вы будете пользоваться годами.",
  },
  {
    n: "03",
    title: "Стратегия капитала",
    text: "Строим план накопления: подушка, цели, инвестиции — под ваш доход и образ жизни.",
  },
];

const BASE_PRICE = 20000;

const calendar = [
  { month: "Июль", discount: 0, seats: 2 },
  { month: "Август", discount: 20, seats: 5 },
  { month: "Сентябрь", discount: 30, seats: 5 },
  { month: "Октябрь", discount: 40, seats: 8 },
  { month: "Ноябрь", discount: 50, seats: 5 },
  { month: "Декабрь", discount: 60, seats: 4 },
];

const results = [
  {
    title: "Ясная картина капитала",
    text: "Вы видите, сколько у вас есть, сколько приходит и уходит, и куда это движется.",
  },
  {
    title: "Рабочая система учёта",
    text: "Простая модель бюджета, которую не нужно вести часами — 10 минут в неделю.",
  },
  {
    title: "План накопления",
    text: "Понятная траектория к вашим целям: подушка, крупные покупки, инвестиции.",
  },
  {
    title: "Стратегия на год вперёд",
    text: "Готовый план, с которым вы заходите в новый финансовый год без хаоса.",
  },
];

const formatPrice = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n) + " ₽";

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
          <h1 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)] animate-fade-up">
            Персональные <span className="italic font-normal">консультации</span>.
          </h1>
          <p
            className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Разбираем ваши финансы, строим модель капитала и держим траекторию.
          </p>

          <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <BookButton />
          </div>
        </div>
      </section>

      {/* Для кого */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Для кого
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            Типовые запросы, с которыми&nbsp;приходят.
          </h2>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {audience.map((a, i) => (
              <div
                key={a.title}
                className="bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <h3 className="font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-3xl mb-4">
                  {a.title}
                </h3>
                <p className="font-body text-base text-foreground/75 leading-relaxed">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как проходит — горизонтально, 3 этапа */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 animate-fade-up">
            <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl">
              Как проходит.
            </h2>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Длительность — 90 минут
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {stages.map((s, i) => (
              <div
                key={s.n}
                className="bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col h-full"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-5">
                  {s.n}
                </div>
                <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-2xl md:text-3xl mb-4">
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

      {/* Календарь и бронирование */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto">
          <div className="animate-fade-up">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
              Раннее бронирование
            </div>
            <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl">
              Скидка до&nbsp;70% при&nbsp;бронировании заранее.
            </h2>
            <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-3xl">
              Забронируйте консультацию сейчас по&nbsp;выгодной цене и&nbsp;воспользуйтесь ей к&nbsp;концу года — когда будете планировать стратегию на&nbsp;следующий.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {calendar.map((c, i) => {
              const price = Math.round((BASE_PRICE * (100 - c.discount)) / 100);
              return (
                <div
                  key={c.month}
                  className="relative bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col"
                  style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                >
                  {c.discount > 0 && (
                    <div className="absolute top-5 right-5 font-mono text-xs uppercase tracking-widest bg-accent text-accent-foreground px-2.5 py-1">
                      −{c.discount}%
                    </div>
                  )}
                  <div className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl mb-6">
                    {c.month}
                  </div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <div className="font-serif-display font-semibold text-3xl md:text-4xl">
                      {formatPrice(price)}
                    </div>
                    {c.discount > 0 && (
                      <div className="font-body text-base text-foreground/50 line-through">
                        {formatPrice(BASE_PRICE)}
                      </div>
                    )}
                  </div>
                  <div className="font-body text-sm text-foreground/70">
                    {c.seats}{" "}
                    {c.seats === 1
                      ? "место"
                      : c.seats >= 2 && c.seats <= 4
                        ? "места"
                        : "мест"}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-8 md:p-10 border border-foreground/15 bg-card hard-shadow animate-fade-up"
          >
            <p className="font-serif-display text-xl md:text-2xl leading-snug text-foreground/85 max-w-xl">
              Выбирайте месяц с&nbsp;выгодной ценой — я&nbsp;лично провожу каждую встречу.
            </p>
            <BookButton className="shrink-0 w-full md:w-auto" />
          </div>
        </div>
      </section>

      {/* Результаты */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Результаты
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            В&nbsp;чём выгода.
          </h2>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {results.map((r, i) => (
              <div
                key={r.title}
                className="bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <h3 className="font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-3xl mb-4">
                  {r.title}
                </h3>
                <p className="font-body text-base text-foreground/75 leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 animate-fade-up">
            <BookButton />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consultations;
