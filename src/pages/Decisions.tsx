import { SiteHeader } from "@/components/SiteHeader";
import { CardAbout } from "@/components/sections/CardAbout";
import { CardConsultations } from "@/components/sections/CardConsultations";
import { CardOffers } from "@/components/sections/CardOffers";
import { CardTextbook } from "@/components/sections/CardTextbook";

import vasilyPortrait from "@/assets/vasily-hero.png.asset.json";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const decisionsPageNav = [
  { href: "#mistakes", label: "Ошибки", id: "mistakes" },
  { href: "#why", label: "Почему так", id: "why" },
  { href: "#method", label: "Метод", id: "method" },
  { href: "#consultations", label: "Консультации", id: "consultations" },
  { href: "/bigbudget", label: "Марафон" },
  { href: "/blog", label: "Блог" },
];

type Mistake = {
  code: string;
  title: string;
  cost: string;
  text: string;
};

const mistakes: Mistake[] = [
  {
    code: "01",
    title: "Кредиты на\u00A0повседневные траты",
    cost: "×2–3",
    text:
      "Рассрочки, кредитки и\u00A0«беспроцентные» покупки в\u00A0итоге удваивают стоимость обычной жизни. Долг становится фоном, из\u00A0которого сложно выйти без\u00A0стратегии.",
  },
  {
    code: "02",
    title: "Инвестиции без\u00A0подушки",
    cost: "−30%",
    text:
      "Люди заходят в\u00A0акции и\u00A0крипту без\u00A0резерва, а\u00A0потом при\u00A0первом же\u00A0кризисе продают в\u00A0минус, потому что деньги срочно понадобились на\u00A0жизнь.",
  },
  {
    code: "03",
    title: "Хаос в\u00A0тратах",
    cost: "20–30%",
    text:
      "Без\u00A0простой системы учёта пятая часть дохода растворяется в\u00A0«мелочах», подписках и\u00A0импульсивных покупках, которые вы\u00A0даже не\u00A0вспомните через неделю.",
  },
  {
    code: "04",
    title: "Хранение денег на\u00A0карте",
    cost: "−10% в\u00A0год",
    text:
      "Остатки на\u00A0дебетовой карте тихо теряют покупательную способность из-за\u00A0инфляции. Пара несложных действий возвращает эти\u00A0деньги обратно в\u00A0карман.",
  },
  {
    code: "05",
    title: "Слепые крупные покупки",
    cost: "×1.5",
    text:
      "Квартира, машина, ремонт, свадьба\u00A0— решения на\u00A0миллионы принимаются за\u00A0вечер. Без\u00A0расчёта полной стоимости владения переплата легко превышает половину суммы.",
  },
  {
    code: "06",
    title: "Ставка на\u00A0«поднять доход»",
    cost: "0",
    text:
      "Пока нет системы, любой новый доход растворяется в\u00A0тратах ровно с\u00A0той\u00A0же скоростью. Через год вы\u00A0зарабатываете больше, а\u00A0финансовое положение\u00A0— то\u00A0же.",
  },
  {
    code: "07",
    title: "Игнорирование налогов и\u00A0льгот",
    cost: "до\u00A052\u00A0000\u00A0₽",
    text:
      "ИИС, налоговые вычеты, самозанятость, льготы работодателя\u00A0— большинство ими не\u00A0пользуется просто потому, что не\u00A0разбирались один вечер.",
  },
  {
    code: "08",
    title: "Отсутствие финансовых целей",
    cost: "−годы",
    text:
      "Без\u00A0чётких целей деньги уходят в\u00A0текущие желания. Через 5\u00A0лет обнаруживается, что накоплений нет, а\u00A0квартира, машина или\u00A0пенсия по-прежнему «когда-нибудь потом».",
  },
];

const reasons = [
  {
    title: "Никто не\u00A0учил",
    text: "В\u00A0школе и\u00A0в\u00A0университете не\u00A0рассказывают, как устроены деньги в\u00A0обычной семье. Учимся на\u00A0собственных ошибках\u00A0— самый дорогой способ.",
  },
  {
    title: "Эмоции сильнее логики",
    text: "Реклама, тревога, желание догнать окружение\u00A0— решения принимаются не\u00A0головой, а\u00A0чувствами. И\u00A0чаще всего\u00A0— не\u00A0в\u00A0пользу кошелька.",
  },
  {
    title: "Кажется, что\u00A0потом",
    text: "«Начну копить, когда доход вырастет», «разберусь после отпуска»\u00A0— и\u00A0так десять лет подряд. Инерция стоит дороже любых ошибок.",
  },
  {
    title: "Много шума",
    text: "Блогеры, «эксперты», знакомые\u00A0— все советуют разное. В\u00A0итоге проще ничего не\u00A0делать, чем разбираться, кому верить.",
  },
];

const steps = [
  {
    n: "01",
    title: "Посмотреть правде в\u00A0глаза",
    text: "Собрать честную картину: сколько приходит, сколько уходит, где долги, что\u00A0есть в\u00A0активах. Без\u00A0таблиц на\u00A0300\u00A0строк\u00A0— по-простому.",
  },
  {
    n: "02",
    title: "Закрыть дыры",
    text: "Разобраться с\u00A0кредитами, ненужными подписками, невыгодными продуктами банка. Убрать то, что каждый месяц тянет деньги без\u00A0вашей выгоды.",
  },
  {
    n: "03",
    title: "Собрать подушку",
    text: "3–6 месяцев расходов на\u00A0отдельном счёте. С\u00A0этого момента любой форс-мажор перестаёт быть катастрофой, а\u00A0вы\u00A0перестаёте принимать решения из\u00A0страха.",
  },
  {
    n: "04",
    title: "Настроить систему",
    text: "Простые правила: сколько на\u00A0жизнь, сколько на\u00A0цели, сколько на\u00A0будущее. Автоматизировать, чтобы не\u00A0зависело от\u00A0силы воли.",
  },
  {
    n: "05",
    title: "Начать инвестировать осмысленно",
    text: "Только после подушки и\u00A0системы\u00A0— и\u00A0только в\u00A0том, что понимаете. Без\u00A0гонки за\u00A0доходностью и\u00A0без\u00A0«сигналов» из\u00A0телеграма.",
  },
  {
    n: "06",
    title: "Пересматривать раз в\u00A0квартал",
    text: "15\u00A0минут раз в\u00A0три месяца, чтобы\u00A0держать систему живой и\u00A0менять её\u00A0под изменившиеся цели и\u00A0доходы.",
  },
];

const Decisions = () => {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Как перестать совершать дорогие финансовые ошибки · Вася и\u00A0финансы";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Разбор самых дорогих ошибок в\u00A0личных финансах и\u00A0пошаговый метод, как перестать их\u00A0совершать\u00A0— спокойно, без\u00A0формул и\u00A0чувства вины.";
    if (desc) desc.setAttribute("content", content);
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [hash]);

  return (
    <main className="bg-background text-foreground">
      <SiteHeader pageNav={decisionsPageNav} />

      {/* HERO */}
      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
            <div
              className="col-span-12 md:col-span-7 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="badge-tag">Личные финансы без&nbsp;паники</span>
              <h1 className="mt-6 font-display font-semibold leading-[0.98] tracking-tight text-[clamp(2.5rem,7vw,6rem)]">
                Как перестать совершать{" "}
                <span className="text-accent">дорогие</span> финансовые ошибки
              </h1>

              <p className="mt-8 font-display font-light leading-[1.25] tracking-tight text-[clamp(1.15rem,2.4vw,1.75rem)] text-foreground/85 max-w-2xl">
                Восемь типичных решений, которые тихо съедают миллионы за&nbsp;жизнь\u2009—
                и&nbsp;спокойный метод, как их&nbsp;больше не&nbsp;повторять.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#mistakes"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors hard-shadow"
                >
                  Показать ошибки
                </a>
                <a
                  href="#method"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/40 text-foreground font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
                >
                  Как их&nbsp;не&nbsp;повторять
                </a>
              </div>

              {/* stats */}
              <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
                <div>
                  <div className="number-display text-3xl md:text-4xl text-accent">14&nbsp;лет</div>
                  <div className="text-xs text-foreground/60 mt-1">в&nbsp;корпоративных финансах</div>
                </div>
                <div>
                  <div className="number-display text-3xl md:text-4xl text-accent">3200+</div>
                  <div className="text-xs text-foreground/60 mt-1">учеников на&nbsp;программах</div>
                </div>
                <div>
                  <div className="number-display text-3xl md:text-4xl text-accent">6\u00A0млрд</div>
                  <div className="text-xs text-foreground/60 mt-1">управляемые бюджеты</div>
                </div>
              </div>
            </div>

            <div
              className="col-span-12 md:col-span-5 flex justify-center md:justify-end animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="relative w-full max-w-md aspect-[4/5]">
                <img
                  src={vasilyPortrait.url}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-contain rounded-[1.75rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE OF MISTAKES — банер */}
      <section className="relative py-16 md:py-20 border-y border-foreground/10 bg-accent-soft/25">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-display font-semibold leading-[1.05] tracking-tight text-[clamp(1.75rem,4vw,3rem)]">
                Финансовая ошибка редко стоит{" "}
                <span className="text-accent">одну зарплату.</span>
              </h2>
              <p className="mt-5 font-body text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl">
                Одно неверное решение по\u00A0ипотеке, кредитке или\u00A0«перспективной инвестиции»
                за&nbsp;10&nbsp;лет спокойно превращается в&nbsp;стоимость машины,
                первого взноса или&nbsp;лишнего года работы.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="bg-background border border-foreground/15 rounded-2xl p-8 hard-shadow">
                <div className="text-xs font-mono uppercase tracking-widest text-foreground/60">
                  Средняя цена<br />неосознанных решений
                </div>
                <div className="number-display text-6xl md:text-7xl text-accent mt-4 leading-none">
                  ~3\u00A0млн
                </div>
                <div className="text-sm text-foreground/70 mt-3">
                  ₽&nbsp;за&nbsp;10&nbsp;лет для\u00A0семьи со\u00A0средним доходом\u00A0— по&nbsp;консервативной оценке.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section id="mistakes" className="relative py-24 md:py-32 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="mb-14 animate-fade-up max-w-3xl">
            <span className="badge-tag">Топ&nbsp;8</span>
            <h2 className="mt-5 font-display font-semibold leading-[1.02] tracking-tight text-[clamp(2rem,5vw,4rem)]">
              Ошибки, которые{" "}
              <span className="text-accent">дороже всего</span> обходятся
            </h2>
            <p className="mt-5 font-body text-base md:text-lg text-foreground/75 leading-relaxed">
              Не\u00A0страшилки, а\u00A0те\u00A0решения, которые я\u00A0вижу в\u00A0финансах учеников чаще всего\u00A0—
              и\u00A0которые проще всего исправить, если знать, куда смотреть.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {mistakes.map((m, i) => (
              <article
                key={m.code}
                className="group relative bg-card border border-border rounded-2xl p-8 md:p-9 flex flex-col hard-shadow animate-fade-up hover:border-accent transition-colors"
                style={{ animationDelay: `${0.05 + i * 0.05}s` }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-xs text-accent tracking-widest">
                    {m.code}
                  </span>
                  <span className="number-display text-2xl md:text-3xl text-accent leading-none">
                    {m.cost}
                  </span>
                </div>
                <h3 className="mt-4 font-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-3xl">
                  {m.title}
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-foreground/75">
                  {m.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT HAPPENS */}
      <section id="why" className="relative py-24 md:py-32 border-t border-foreground/10 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-4">
              <span className="badge-tag">Почему так</span>
              <h2 className="mt-6 font-display font-semibold leading-[1.02] tracking-tight text-[clamp(2rem,5vw,4rem)]">
                Дело не&nbsp;в&nbsp;том, что вы&nbsp;<span className="text-accent">не&nbsp;умеете считать</span>
              </h2>
              <p className="mt-6 font-body text-base md:text-lg text-foreground/75 leading-relaxed max-w-md">
                Дорогие ошибки в\u00A0деньгах совершают и\u00A0айтишники, и\u00A0финансисты. Причина\u00A0— не\u00A0в\u00A0интеллекте, а\u00A0в\u00A0системе, которой нет.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
              {reasons.map((r, i) => (
                <div key={i} className="bg-background p-7 md:p-8">
                  <div className="font-mono text-xs text-accent tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-xl md:text-2xl leading-tight">
                    {r.title}
                  </h3>
                  <p className="mt-3 font-body text-base text-foreground/75 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="relative py-24 md:py-32 border-t border-foreground/10 scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <span className="badge-tag">Метод</span>
            <h2 className="mt-5 font-display font-semibold leading-[1.02] tracking-tight text-[clamp(2rem,5vw,4rem)]">
              Шесть шагов, чтобы{" "}
              <span className="text-accent">перестать переплачивать</span> за\u00A0собственную жизнь
            </h2>
            <p className="mt-5 font-body text-base md:text-lg text-foreground/75 leading-relaxed">
              Это не\u00A0волшебная методика, а\u00A0последовательность, которую мы\u00A0проходим на\u00A0консультациях и\u00A0программах.
              Занимает от\u00A0пары вечеров до\u00A0нескольких месяцев\u00A0— зависит от\u00A0стартовой точки.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((s) => (
              <li
                key={s.n}
                className="bg-card border border-border rounded-2xl p-7 md:p-8 flex flex-col hard-shadow"
              >
                <div className="number-display text-4xl md:text-5xl text-accent leading-none">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display font-semibold text-xl md:text-2xl leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-base text-foreground/75 leading-relaxed">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-16 bg-foreground text-background rounded-2xl p-8 md:p-12 hard-shadow">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-12 md:col-span-8">
                <h3 className="font-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl">
                  Разобрать вашу ситуацию лично
                </h3>
                <p className="mt-4 font-body text-base md:text-lg text-background/75 max-w-xl leading-relaxed">
                  90\u00A0минут один\u00A0на\u00A0один: смотрим на\u00A0ваши доходы, долги, цели\u00A0— и\u00A0выходим с\u00A0планом, где\u00A0именно вы\u00A0сейчас теряете деньги.
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <a
                  href="/consultations"
                  className="inline-flex items-center gap-2 px-6 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
                >
                  Записаться на\u00A0консультацию →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CardAbout />
      <CardConsultations />
      <CardOffers />
      <CardTextbook />
    </main>
  );
};

export default Decisions;
