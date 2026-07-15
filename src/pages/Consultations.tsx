import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import heroPhoto from "@/assets/hero-photo.png";
import laptopPhoto from "@/assets/vasily-laptop.jpg";
import { url as vladimirItAvatar } from "@/assets/reviews/vladimir-it.png.asset.json";
import { url as svetlanaAvatar } from "@/assets/reviews/svetlana.png.asset.json";
import { url as spartakAvatar } from "@/assets/reviews/spartak.png.asset.json";
import { url as tatyanaAvatar } from "@/assets/reviews/tatyana.png.asset.json";

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
  { month: "Декабрь", discount: 60, seats: 10 },
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

const galleryReviews = [
  {
    name: "Владимир",
    role: "Владелец бизнеса по IT-сопровождению",
    avatar: vladimirItAvatar,
    quote: "Научился планировать свои траты и\u00A0перестал их бояться",
  },
  {
    name: "Светлана",
    role: "Менеджер по продажам",
    avatar: svetlanaAvatar,
    quote: "Доход вырос на\u00A030%. Обучение окупилось за\u00A02 месяца",
  },
  {
    name: "Спартак",
    role: "Проектирование зданий и сооружений",
    avatar: spartakAvatar,
    quote: "Сместился фокус на\u00A0доходы (был только на\u00A0расходах). С\u00A0нетерпением жду, когда завершится календарный год и\u00A0я смогу сравнивать год к\u00A0году.",
  },
  {
    name: "Татьяна",
    role: "Врач антивозрастной медицины",
    avatar: tatyanaAvatar,
    quote: "Бюджет из\u00A0нулевого превратился в\u00A0плюсовой. Ведение бюджета теперь вдохновляет.",
  },
];

const formatPrice = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n) + " ₽";

const BookButton = ({ className = "" }: { className?: string }) => (
  <button
    type="button"
    id="book-consultation"
    data-book-consultation
    className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors ${className}`}
  >
    <span>Забронировать</span>
    <span className="font-body italic normal-case text-sm opacity-90">: заранее</span>
    <span className="text-base">→</span>
  </button>
);

const ReviewCard = ({ r, i }: { r: typeof galleryReviews[0]; i: number }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <figure
      className="bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col h-full"
      style={{ animationDelay: `${0.1 + i * 0.08}s` }}
    >
      <div className="flex items-center gap-4 mb-6">
        {imgError ? (
          <span className="w-14 h-14 rounded-full bg-muted border border-foreground/15 grid place-items-center font-serif-display text-lg text-foreground/55 shrink-0">
            {r.name.charAt(0)}
          </span>
        ) : (
          <img
            src={r.avatar}
            alt={r.name}
            className="w-14 h-14 rounded-full object-cover border border-foreground/15 shrink-0"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <div className="min-w-0">
          <div className="font-serif-display font-semibold text-lg leading-tight">
            {r.name}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/55 mt-1">
            {r.role}
          </div>
        </div>
      </div>

      <blockquote className="font-serif-display text-xl md:text-2xl leading-snug text-foreground border-l-2 border-accent pl-4 flex-1">
        «{r.quote}»
      </blockquote>
    </figure>
  );
};

const Consultations = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-24 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <h1 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
                Персональные <span className="italic font-normal">консультации</span>.
              </h1>
              <p
                className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-2xl"
                style={{ animationDelay: "0.1s" }}
              >
                Разбираем ваши финансы, строим модель капитала и держим траекторию.
              </p>

              <div className="mt-10" style={{ animationDelay: "0.2s" }}>
                <BookButton />
              </div>
            </div>

            <div
              className="lg:col-span-5 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative max-w-md lg:max-w-none mx-auto lg:mx-0">
                {/* decorative background layer */}
                <div className="absolute -inset-4 md:-inset-6 bg-accent/10 rounded-[2rem] -rotate-3 pointer-events-none" />
                {/* subtle texture layer */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none bg-grid"
                  style={{ maskImage: "linear-gradient(180deg, black 40%, transparent 100%)" }}
                />
                {/* photo card */}
                <div className="relative overflow-hidden rounded-2xl border border-foreground/10 shadow-hard aspect-[3/4] md:aspect-[4/5] max-h-[70vh] lg:max-h-none">
                  <img
                    src={laptopPhoto}
                    alt="Василий Мещеряков с ноутбуком"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                </div>
                {/* floating badge */}
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-card border border-foreground/15 px-4 py-2 shadow-hard rounded-full">
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent">
                    1 на 1 · 90 мин
                  </span>
                </div>
              </div>
            </div>
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
              Скидка до&nbsp;60% (при&nbsp;бронировании заранее)
            </h2>
            <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-3xl">
                Забронируйте консультацию сейчас по&nbsp;выгодной цене и&nbsp;воспользуйтесь ей к&nbsp;концу года — когда будете планировать стратегию на&nbsp;следующий.
              </p>
              <BookButton className="shrink-0 w-full md:w-auto" />
            </div>
          </div>

          <div className="mt-16 hidden md:block overflow-hidden border border-foreground/15 bg-card hard-shadow animate-fade-up">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem]">
                <thead>
                  <tr className="border-b border-foreground/15 bg-foreground/5">
                    <th className="text-left font-mono text-xs uppercase tracking-widest text-accent px-6 py-4">
                      Месяц
                    </th>
                    <th className="text-left font-mono text-xs uppercase tracking-widest text-accent px-6 py-4">
                      Скидка
                    </th>
                    <th className="text-left font-mono text-xs uppercase tracking-widest text-accent px-6 py-4">
                      Цена
                    </th>
                    <th className="text-left font-mono text-xs uppercase tracking-widest text-accent px-6 py-4">
                      Мест
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calendar.map((c, i) => {
                    const price = Math.round((BASE_PRICE * (100 - c.discount)) / 100);
                    return (
                      <tr
                        key={c.month}
                        className="border-b border-foreground/10 last:border-b-0"
                        style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                      >
                        <td className="font-serif-display font-semibold text-xl md:text-2xl px-6 py-5">
                          {c.month}
                        </td>
                        <td className="px-6 py-5">
                          {c.discount > 0 ? (
                            <span className="inline-block font-mono text-xs uppercase tracking-widest bg-accent text-accent-foreground px-2.5 py-1">
                              −{c.discount}%
                            </span>
                          ) : (
                            <span className="font-body text-foreground/60">—</span>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
                            <span className="font-serif-display font-semibold text-xl md:text-2xl">
                              {formatPrice(price)}
                            </span>
                            {c.discount > 0 && (
                              <span className="font-body text-sm text-foreground/50 line-through">
                                {formatPrice(BASE_PRICE)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="font-body text-base text-foreground/80 px-6 py-5">
                          {c.seats}{" "}
                          {c.seats === 1
                            ? "место"
                            : c.seats >= 2 && c.seats <= 4
                              ? "места"
                              : "мест"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-16 md:hidden overflow-hidden border border-foreground/15 bg-card hard-shadow animate-fade-up">
            {calendar.map((c, i) => {
              const price = Math.round((BASE_PRICE * (100 - c.discount)) / 100);
              return (
                <div
                  key={c.month}
                  className="px-6 py-5 border-b border-foreground/10 last:border-b-0"
                  style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="font-serif-display font-semibold text-xl">
                      {c.month}
                    </div>
                    {c.discount > 0 ? (
                      <span className="inline-block font-mono text-xs uppercase tracking-widest bg-accent text-accent-foreground px-2.5 py-1">
                        −{c.discount}%
                      </span>
                    ) : (
                      <span className="font-body text-foreground/60">—</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-serif-display font-semibold text-xl">
                        {formatPrice(price)}
                      </span>
                      {c.discount > 0 && (
                        <span className="font-body text-sm text-foreground/50 line-through">
                          {formatPrice(BASE_PRICE)}
                        </span>
                      )}
                    </div>
                    <div className="font-body text-base text-foreground/80">
                      {c.seats}{" "}
                      {c.seats === 1
                        ? "место"
                        : c.seats >= 2 && c.seats <= 4
                          ? "места"
                          : "мест"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Логика цены */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Логика цены
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            Почему чем дальше — тем дешевле.
          </h2>

          <figure className="mt-16 bg-card border border-foreground/15 p-8 md:p-12 hard-shadow animate-fade-up">
            <div className="grid grid-cols-12 gap-8 md:gap-12">
              <div className="col-span-12 md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                <img
                  src={heroPhoto}
                  alt="Василий Мещеряков"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-5">
                  <div className="font-serif-display font-semibold text-lg">
                    Василий Мещеряков
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground/55 mt-1">
                    Вася и&nbsp;финансы
                  </div>
                </figcaption>
              </div>

              <div className="col-span-12 md:col-span-9">
                <span className="font-serif-display text-4xl md:text-5xl text-accent leading-none">
                  "
                </span>
                <blockquote className="font-serif-display text-xl md:text-2xl leading-relaxed text-foreground/90 mt-2">
                  <p>
                    По&nbsp;аналогии с&nbsp;авиабилетами: если вы хорошо планируете заранее, вы можете покупать дешевле.
                  </p>
                  <p className="mt-4">
                    Если вы начинаете смотреть вперёд на&nbsp;длинный горизонт, то у вас становится больше денег! Это верно и&nbsp;для&nbsp;расходов, и&nbsp;для&nbsp;доходов, и&nbsp;для&nbsp;инвестиций.
                  </p>
                  <p className="mt-4">
                    Этот подход я хочу продемонстрировать на&nbsp;своих консультациях: чем длиннее горизонт планирования, тем лучше.
                  </p>
                  <p className="mt-4">
                    Если вы сейчас задумаетесь о&nbsp;подведении итогов года и&nbsp;финансовом плане на&nbsp;следующий{"\u00A0"}— то сделаете это вместе со&nbsp;мной в&nbsp;разы эффективнее и&nbsp;на&nbsp;60% дешевле.
                  </p>
                </blockquote>
                <div className="mt-8">
                  <BookButton />
                </div>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* Результаты */}
      <section className="relative py-24 md:py-32 overflow-hidden">
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

      {/* Отзывы */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            Истории
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            Что говорят клиенты.
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {galleryReviews.map((r, i) => (
              <ReviewCard key={r.name} r={r} i={i} />
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
