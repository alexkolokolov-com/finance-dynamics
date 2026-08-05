import { Link } from "react-router-dom";
import { nbsp } from "@/lib/nbsp";

const items = [
  {
    n: "01",
    title: "Разбор карт и категорий месяца",
    text: "Какими картами платить за продукты, ЖКХ, маркетплейсы, такси, кафе, аптеки и АЗС.",
  },
  {
    n: "02",
    title: "Обновления по банкам",
    text: "Что изменилось в условиях, где упала выгода, какие лимиты и исключения появились.",
  },
  {
    n: "03",
    title: "Акции и накопительные счета",
    text: "Промо-ставки и сценарии, которые дают дополнительную выгоду к обычным расходам.",
  },
  {
    n: "04",
    title: "Спецвыпуск месяца",
    text: "Отдельная тема с условиями, последовательностью действий и предупреждениями.",
  },
];

export const CardCashback = () => {
  return (
    <section
      id="cashback"
      className="relative py-24 md:py-32 overflow-hidden bg-grid scroll-mt-20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--grad-chalk)" }}
      />

      <div className="container-px max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-fade-up">
          <div>
            <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
              Кэшбэк-гайд.
            </h2>
            <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-2xl">
              {nbsp(
                "Подробный разбор банков, карт и акций — как настроить кэшбэк так, чтобы он возвращал по нескольку тысяч рублей в месяц без лишних телодвижений."
              )}
            </p>
          </div>
          <Link
            to="/cashback"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors"
          >
            <span>Подробнее</span>
            <span className="text-base">→</span>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {items.map((s, i) => (
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
                {nbsp(s.text)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
