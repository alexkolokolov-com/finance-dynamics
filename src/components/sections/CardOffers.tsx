import { Link } from "react-router-dom";

type Promo = {
  to: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  highlight: string;
  hint: string;
};

const items: Promo[] = [
  {
    to: "/landing",
    eyebrow: "программа",
    title: "Профит",
    text:
      "Главная авторская программа. Восемь недель, чтобы собрать собственную систему денег\u00A0— спокойную, на\u00A0вашем доходе и\u00A0вашем темпе. Без героических усилий и\u00A0без обещаний быстрого обогащения.",
    cta: "узнать о программе",
    highlight: "8\u00A0недель",
    hint: "поток в\u00A0сопровождении",
  },
  {
    to: "/cashback",
    eyebrow: "практический гайд",
    title: "Кэшбэк-гайд",
    text:
      "Подробный разбор банков, карт и\u00A0акций\u00A0— как настроить кэшбэк так, чтобы он\u00A0возвращал по\u00A0нескольку тысяч рублей в\u00A0месяц без лишних телодвижений. Обновляется каждый месяц.",
    cta: "открыть гайд",
    highlight: "до\u00A025%",
    hint: "возврат на\u00A0обычных покупках",
  },
];

export const CardOffers = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container-px max-w-7xl mx-auto relative">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {items.map((it, i) => (
            <Link
              key={it.title}
              to={it.to}
              className="col-span-12 md:col-span-6 group relative bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col hard-shadow animate-fade-up hover:border-accent transition-colors"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {it.eyebrow}
              </span>

              <h3 className="mt-4 font-display font-semibold leading-[1] tracking-tight text-5xl md:text-6xl">
                {it.title}
              </h3>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="number-display text-3xl md:text-4xl text-accent">
                  {it.highlight}
                </span>
                <span className="text-sm text-foreground/65">{it.hint}</span>
              </div>

              <p className="mt-6 font-body text-base md:text-[17px] leading-relaxed text-foreground/75 flex-1">
                {it.text}
              </p>

              <div className="mt-8 pt-6 border-t border-dashed border-foreground/20 flex items-center justify-between">
                <span className="text-sm text-foreground/80 group-hover:text-accent transition-colors">
                  {it.cta}
                </span>
                <span className="text-base text-foreground/70 group-hover:text-accent group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
