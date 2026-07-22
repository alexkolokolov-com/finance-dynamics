import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { TrafficRegisterDialog } from "@/components/traffic/TrafficRegisterDialog";
import laptopPhoto from "@/assets/vasily-laptop.jpg";
import heroPhoto from "@/assets/hero-photo.png";

const corporate = [
  {
    title: "Личные финансы для сотрудников",
    text: "База финансовой грамотности: доходы, расходы, подушка, накопления. Как выстроить систему, которая работает годами.",
  },
  {
    title: "Психология денег",
    text: "Как установки и мозг управляют финансовыми решениями сотрудников — и как перестать саботировать собственный доход.",
  },
  {
    title: "Финансовые решения в эпоху неопределённости",
    text: "Как принимать решения о деньгах, когда вокруг турбулентность: работа, курсы, инвестиции, крупные покупки.",
  },
  {
    title: "Инвестиции без мистики",
    text: "Как на самом деле работают деньги на длинной дистанции — без «схем», хайпа и обещаний доходности.",
  },
  {
    title: "Рост дохода",
    text: "Навыки и стратегии, которые увеличивают доход сотрудника осознанно — без выгорания и переработок.",
  },
  {
    title: "Финансовое благополучие как часть well-being",
    text: "Почему деньги — один из главных источников стресса в команде и как компания может помочь сотрудникам его снизить.",
  },
];

const solo = [
  {
    title: "Капитал",
    text: "Как на самом деле работают деньги — без мистики и «схем». Разбираем законы, по которым капитал приумножается.",
  },
  {
    title: "Чёрные дыры бюджета",
    text: "Куда на самом деле утекают деньги в семье и как перекрыть утечки без аскезы и жёстких ограничений.",
  },
  {
    title: "Ускорение доходов",
    text: "Что влияет на рост дохода сильнее всего и как выстроить траекторию, где деньги приходят быстрее.",
  },
  {
    title: "Психология финансов",
    text: "Почему рациональные люди принимают иррациональные решения о деньгах — и как это исправить.",
  },
  {
    title: "Принцип шестерёнок",
    text: "Как устроена работающая финансовая система семьи: подушка, накопления, инвестиции, крупные покупки.",
  },
  {
    title: "Стратегия на год",
    text: "Как спланировать финансовый год так, чтобы к декабрю прийти с результатом, а не с ощущением «опять не получилось».",
  },
];

const facts = [
  { k: "14 лет", v: "корпоративной карьеры" },
  { k: "6 млрд ₽", v: "бюджет в управлении" },
  { k: "3200+", v: "учеников проекта" },
  { k: "1400+", v: "разобранных бюджетов" },
];

const RequestButton = ({ className = "" }: { className?: string }) => (
  <TrafficRegisterDialog
    widgetId={1631071}
    scriptHash="24e4f8d1a6ed671824006ef96ad5a19bbec043c9"
    title="Заявка на выступление"
    trigger={
      <button
        type="button"
        className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors ${className}`}
      >
        <span>Оставить заявку</span>
        <span className="font-body italic normal-case text-sm opacity-90">: обсудить</span>
        <span className="text-base">→</span>
      </button>
    }
  />
);

const Lectures = () => {
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
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                Лекции и&nbsp;выступления
              </div>
              <h1 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
                Деньги, которые работают <span className="italic font-normal">на&nbsp;вас</span>
              </h1>
              <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-2xl">
                Провожу лекции и&nbsp;курсы в&nbsp;организациях для&nbsp;сотрудников и&nbsp;выступаю в&nbsp;сообществах — о&nbsp;деньгах простым языком.
              </p>
              <div className="mt-10">
                <RequestButton />
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative max-w-md lg:max-w-none mx-auto lg:mx-0">
                <div className="absolute -inset-4 md:-inset-6 bg-accent/10 rounded-[2rem] -rotate-3 pointer-events-none" />
                <div className="relative overflow-hidden rounded-2xl border border-foreground/10 shadow-hard aspect-[3/4] md:aspect-[4/5] max-h-[70vh] lg:max-h-none">
                  <img
                    src={laptopPhoto}
                    alt="Василий Мещеряков"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-card border border-foreground/15 px-4 py-2 shadow-hard rounded-full">
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent">
                    Оффлайн · онлайн
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Корпоративные лекции */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            § 01 · Для&nbsp;организаций
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            Лекции и&nbsp;курсы для&nbsp;сотрудников.
          </h2>
          <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/70 max-w-3xl animate-fade-up">
            Провожу лекции и&nbsp;полноценные образовательные курсы для&nbsp;команд — от&nbsp;одного выступления до&nbsp;программы на&nbsp;несколько месяцев. Форматы адаптирую под&nbsp;задачи компании.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {corporate.map((t, i) => (
              <div
                key={t.title}
                className="bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-serif-display font-semibold leading-[1.1] tracking-tight text-xl md:text-2xl mb-4">
                  {t.title}
                </h3>
                <p className="font-body text-base text-foreground/75 leading-relaxed">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Разовые лекции */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            § 02 · Для&nbsp;сообществ
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            Разовые выступления.
          </h2>
          <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/70 max-w-3xl animate-fade-up">
            Выступаю в&nbsp;клубах, бизнес-сообществах и&nbsp;на&nbsp;конференциях — 45–90 минут о&nbsp;деньгах с&nbsp;живой Q&amp;A-частью.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solo.map((t, i) => (
              <div
                key={t.title}
                className="bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-serif-display font-semibold leading-[1.1] tracking-tight text-xl md:text-2xl mb-4">
                  {t.title}
                </h3>
                <p className="font-body text-base text-foreground/75 leading-relaxed">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Об эксперте */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4 animate-fade-up">
              <div className="relative w-[70%] lg:w-full mx-auto">
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full -z-10"
                  style={{ background: "hsl(var(--accent-soft) / 0.45)" }}
                />
                <img
                  src={heroPhoto}
                  alt="Василий Мещеряков"
                  className="w-full aspect-square object-cover rounded-full"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                § 03 · Обо&nbsp;мне
              </div>
              <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl">
                Василий <span className="italic font-normal">Мещеряков</span>.
              </h2>
              <div className="mt-8 space-y-5 font-body text-lg text-foreground/80 leading-relaxed max-w-2xl">
                <p>
                  14&nbsp;лет проработал в&nbsp;корпорациях (Procter&nbsp;&amp;&nbsp;Gamble и&nbsp;др.), последние годы — финансовым руководителем с&nbsp;бюджетом в&nbsp;6&nbsp;млрд&nbsp;₽. Выпускник ФТИ&nbsp;УрФУ — прикладная физика и&nbsp;математика.
                </p>
                <p>
                  Три года веду проект «Вася и&nbsp;финансы»: разобрал больше 1400&nbsp;семейных бюджетов, обучил 3200+ учеников. Автор марафона «Теория большого бюджета».
                </p>
                <p>
                  Рассказываю о&nbsp;деньгах простым языком — без мистики, без «схем», без давления. Только рабочие модели и&nbsp;живые примеры.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-foreground/15 border border-foreground/15">
                {facts.map((f) => (
                  <div key={f.k} className="bg-background p-5">
                    <div className="font-serif-display font-semibold text-2xl text-accent">
                      {f.k}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/60 mt-2">
                      {f.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Стоимость */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
            § 04 · Стоимость
          </div>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            Форматы и&nbsp;цены.
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-card border border-foreground/15 p-8 md:p-10 hard-shadow animate-fade-up flex flex-col">
              <div className="font-mono text-xs uppercase tracking-widest text-foreground/55 mb-4">
                Разовое выступление
              </div>
              <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-2xl md:text-3xl">
                Лекция для&nbsp;сообщества или&nbsp;команды.
              </h3>
              <p className="mt-4 font-body text-base text-foreground/75 leading-relaxed">
                45–90 минут + Q&amp;A. Оффлайн или&nbsp;онлайн. Одна тема, подготовка под&nbsp;аудиторию.
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/55">от</span>
                <span className="font-serif-display font-semibold text-5xl md:text-6xl leading-none text-accent">
                  50&nbsp;000&nbsp;₽
                </span>
              </div>
            </div>

            <div className="bg-card border border-foreground/15 p-8 md:p-10 hard-shadow animate-fade-up flex flex-col" style={{ animationDelay: "0.1s" }}>
              <div className="font-mono text-xs uppercase tracking-widest text-foreground/55 mb-4">
                Полноценный курс
              </div>
              <h3 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-2xl md:text-3xl">
                Программа для&nbsp;сотрудников.
              </h3>
              <p className="mt-4 font-body text-base text-foreground/75 leading-relaxed">
                Серия лекций, домашние задания, разборы. Программа под&nbsp;задачи и&nbsp;специфику компании.
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/55">от</span>
                <span className="font-serif-display font-semibold text-5xl md:text-6xl leading-none text-accent">
                  300&nbsp;000&nbsp;₽
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16 animate-fade-up">
            <RequestButton />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Lectures;
