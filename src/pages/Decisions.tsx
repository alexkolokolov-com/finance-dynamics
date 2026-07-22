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
    title: "Кредиты на повседневные траты",
    cost: "×2–3",
    text:
      "Рассрочки, кредитки и «беспроцентные» покупки в итоге удваивают стоимость обычной жизни. Долг становится фоном, из которого сложно выйти без стратегии.",
  },
  {
    code: "02",
    title: "Инвестиции без подушки",
    cost: "−30%",
    text:
      "Люди заходят в акции и крипту без резерва, а потом при первом же кризисе продают в минус, потому что деньги срочно понадобились на жизнь.",
  },
  {
    code: "03",
    title: "Хаос в тратах",
    cost: "20–30%",
    text:
      "Без простой системы учёта пятая часть дохода растворяется в «мелочах», подписках и импульсивных покупках, которые вы даже не вспомните через неделю.",
  },
  {
    code: "04",
    title: "Хранение денег на карте",
    cost: "−10% в год",
    text:
      "Остатки на дебетовой карте тихо теряют покупательную способность из-за инфляции. Пара несложных действий возвращает эти деньги обратно в карман.",
  },
  {
    code: "05",
    title: "Слепые крупные покупки",
    cost: "×1.5",
    text:
      "Квартира, машина, ремонт, свадьба — решения на миллионы принимаются за вечер. Без расчёта полной стоимости владения переплата легко превышает половину суммы.",
  },
  {
    code: "06",
    title: "Ставка на «поднять доход»",
    cost: "0",
    text:
      "Пока нет системы, любой новый доход растворяется в тратах ровно с той же скоростью. Через год вы зарабатываете больше, а финансовое положение — то же.",
  },
  {
    code: "07",
    title: "Игнорирование налогов и льгот",
    cost: "до 52 000 ₽",
    text:
      "ИИС, налоговые вычеты, самозанятость, льготы работодателя — большинство ими не пользуется просто потому, что не разбирались один вечер.",
  },
  {
    code: "08",
    title: "Отсутствие финансовых целей",
    cost: "−годы",
    text:
      "Без чётких целей деньги уходят в текущие желания. Через 5 лет обнаруживается, что накоплений нет, а квартира, машина или пенсия по-прежнему «когда-нибудь потом».",
  },
];

const reasons = [
  {
    title: "Никто не учил",
    text: "В школе и в университете не рассказывают, как устроены деньги в обычной семье. Учимся на собственных ошибках — самый дорогой способ.",
  },
  {
    title: "Эмоции сильнее логики",
    text: "Реклама, тревога, желание догнать окружение — решения принимаются не головой, а чувствами. И чаще всего — не в пользу кошелька.",
  },
  {
    title: "Кажется, что потом",
    text: "«Начну копить, когда доход вырастет», «разберусь после отпуска» — и так десять лет подряд. Инерция стоит дороже любых ошибок.",
  },
  {
    title: "Много шума",
    text: "Блогеры, «эксперты», знакомые — все советуют разное. В итоге проще ничего не делать, чем разбираться, кому верить.",
  },
];

const steps = [
  {
    n: "01",
    title: "Посмотреть правде в глаза",
    text: "Собрать честную картину: сколько приходит, сколько уходит, где долги, что есть в активах. Без таблиц на 300 строк — по-простому.",
  },
  {
    n: "02",
    title: "Закрыть дыры",
    text: "Разобраться с кредитами, ненужными подписками, невыгодными продуктами банка. Убрать то, что каждый месяц тянет деньги без вашей выгоды.",
  },
  {
    n: "03",
    title: "Собрать подушку",
    text: "3–6 месяцев расходов на отдельном счёте. С этого момента любой форс-мажор перестаёт быть катастрофой, а вы перестаёте принимать решения из страха.",
  },
  {
    n: "04",
    title: "Настроить систему",
    text: "Простые правила: сколько на жизнь, сколько на цели, сколько на будущее. Автоматизировать, чтобы не зависело от силы воли.",
  },
  {
    n: "05",
    title: "Начать инвестировать осмысленно",
    text: "Только после подушки и системы — и только в том, что понимаете. Без гонки за доходностью и без «сигналов» из телеграма.",
  },
  {
    n: "06",
    title: "Пересматривать раз в квартал",
    text: "15 минут раз в три месяца, чтобы держать систему живой и менять её под изменившиеся цели и доходы.",
  },
];

const Decisions = () => {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Как перестать совершать дорогие финансовые ошибки · Вася и финансы";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Разбор самых дорогих ошибок в личных финансах и пошаговый метод, как перестать их совершать — спокойно, без формул и чувства вины.";
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
                Восемь типичных решений, которые тихо съедают миллионы за&nbsp;жизнь —
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
                  <div className="number-display text-3xl md:text-4xl text-accent">6 млрд</div>
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
                Одно неверное решение по ипотеке, кредитке или «перспективной инвестиции»
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
                  ~3 млн
                </div>
                <div className="text-sm text-foreground/70 mt-3">
                  ₽&nbsp;за&nbsp;10&nbsp;лет для семьи со средним доходом — по&nbsp;консервативной оценке.
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
              Не страшилки, а те решения, которые я вижу в финансах учеников чаще всего —
              и которые проще всего исправить, если знать, куда смотреть.
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
                Дорогие ошибки в деньгах совершают и айтишники, и финансисты. Причина — не в интеллекте, а в системе, которой нет.
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
              <span className="text-accent">перестать переплачивать</span> за собственную жизнь
            </h2>
            <p className="mt-5 font-body text-base md:text-lg text-foreground/75 leading-relaxed">
              Это не волшебная методика, а последовательность, которую мы проходим на консультациях и программах.
              Занимает от пары вечеров до нескольких месяцев — зависит от стартовой точки.
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
                  90 минут один на один: смотрим на ваши доходы, долги, цели — и выходим с планом, где именно вы сейчас теряете деньги.
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <a
                  href="/consultations"
                  className="inline-flex items-center gap-2 px-6 py-4 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors"
                >
                  Записаться на консультацию →
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
