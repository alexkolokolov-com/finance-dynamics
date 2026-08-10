import { useEffect } from "react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import {
  HeartPulse,
  DoorOpen,
  PiggyBank,
  Users,
  Presentation,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Send,
  Mail,
  Check,
} from "lucide-react";
import { nbsp } from "@/lib/nbsp";
import expertPhoto from "@/assets/expert-vasily.jpg";

const pageNav: HeaderNavLink[] = [
  { href: "#about", label: "О тренинге", id: "about" },
  { href: "#formats", label: "Форматы", id: "formats" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#request", label: "Запросить", cta: true },
];

const problems = [
  {
    icon: HeartPulse,
    title: "Финансовый\nстресс",
    text: "Сотрудники отвлекаются на личные деньги, снижается фокус и вовлечённость.",
  },
  {
    icon: DoorOpen,
    title: "Уход лучших\nспециалистов",
    text: "Ключевые люди уходят туда, где предлагают больше, а не туда, где им комфортнее.",
  },
  {
    icon: PiggyBank,
    title: "Нет возможности\nподнимать зарплату",
    text: "Бюджет ограничен, но отток кадров и падение продуктивности обходятся дороже.",
  },
];

const skills = [
  "Эффективно управлять бюджетом без импульсивных трат",
  "Формировать финансовую подушку",
  "Находить доп. доход без подработки: кешбэки, налоговые вычеты и другие лайфхаки",
  "Внедрять дисциплину работы с финансами",
];

const companyBenefits = [
  {
    title: "Удержание ключевых сотрудников",
    text: "Без финансовых вложений в повышение зарплат.",
  },
  {
    title: "Повышение лояльности",
    text: "Забота о финансовом благополучии укрепляет связь с компанией.",
  },
  {
    title: "Рост продуктивности команды",
    text: "Сотрудники без финансового стресса продуктивнее на 25–30%.",
  },
  {
    title: "Оптимизация расходов на персонал",
    text: "Меньшее давление на ФОТ при сохранении мотивации.",
  },
];

const formats = [
  {
    icon: Presentation,
    title: "Интро-воркшоп",
    duration: "1,5–2 часа",
    text: "Пилотный формат для знакомства команды с ключевыми инструментами. Идеален для тестирования программы или корпоративных мероприятий.",
    bullets: [
      "Базовые принципы управления бюджетом",
      "Диагностика финансовых утечек",
      "Быстрые win-решения для сотрудников",
    ],
  },
  {
    icon: BookOpen,
    title: "Корпоративный интенсив",
    duration: "1–2 дня",
    text: "Глубокая проработка главных финансовых навыков с практическими заданиями. Участники создают собственную финансовую систему.",
    bullets: [
      "Понятная система личного бюджетирования",
      "Работа с финансовыми целями",
      "Стратегии накопления и инвестирования",
      "Разбор реальных кейсов участников",
    ],
  },
  {
    icon: Calendar,
    title: "Квартальная программа сопровождения",
    duration: "3 месяца",
    text: "Комплексная поддержка с регулярными встречами, индивидуальными консультациями и аналитикой для HR.",
    bullets: [
      "Ежемесячные групповые сессии",
      "Персональные разборы бюджетов",
      "Аналитические отчёты для HR-службы",
      "Рекомендации по работе с финансовым стрессом в команде",
    ],
  },
];

const program = [
  {
    n: "01",
    title: "«Деньги есть, но денег нет» — где теряются деньги",
    text: "Как понять, куда утекают деньги, и найти +10–20% в бюджете. Без экономии и отказа в удовольствиях.",
  },
  {
    n: "02",
    title: "Простая система бюджета: за 2 часа в месяц",
    text: "Планирование по методике «ленивого бюджета» — без сложных таблиц и ежедневного учёта. Всего 2 часа в месяц для полного контроля финансов.",
  },
  {
    n: "03",
    title: "Эмоциональные и импульсивные траты",
    text: "Как их контролировать и превращать сэкономленные деньги в реальные активы. Практические техники, которые съедают до 30% бюджета.",
  },
  {
    n: "04",
    title: "Накопления на крупные цели",
    text: "Квартира, машина, пенсия — конкретные стратегии и инструменты. Пошаговый план от постановки цели до её реализации.",
  },
];

const credentials = [
  "2,5 года корпоративных тренингов",
  "Тысячи специалистов обрели контроль над финансами",
  "ТГ-комьюнити из 10 000 подписчиков",
  "Авторская методика личных финансовых планов",
];

const SectionLabel = ({ children }: { children: string }) => (
  <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 animate-fade-up">
    {children}
  </div>
);

const RequestButton = ({ className = "" }: { className?: string }) => (
  <a
    href="https://t.me/Vasily_Mescheryakov"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground transition-colors hard-shadow ${className}`}
  >
    <span>Запросить программу</span>
    <span className="text-base">→</span>
  </a>
);

const Corporate = () => {
  useEffect(() => {
    document.title = "Корпоративное обучение «Вася и финансы»";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "Тренинги для сотрудников по личной финансовой устойчивости. Удержание команды, рост продуктивности и забота о финансовом благополучии без роста ФОТ.";
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader pageNav={pageNav} />

      {/* Hero */}
      <section className="relative pt-20 md:pt-32 lg:pt-36 pb-10 md:pb-16 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4 md:mb-6">
                {nbsp("Тренинг для сотрудников")}
              </div>
              <h1 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2rem,7vw,6rem)]">
                {nbsp("Личная финансовая")}{" "}
                <span className="italic font-normal">{nbsp("устойчивость")}</span>
              </h1>
              <p
                className="mt-4 md:mt-8 font-serif-display text-lg md:text-2xl leading-snug text-foreground/80 max-w-2xl"
                style={{ animationDelay: "0.1s" }}
              >
                {nbsp(
                  "Помогаю сотрудникам обрести контроль над личными финансами, а компаниям — сохранить команду без роста ФОТ"
                )}
              </p>

              <div className="hidden lg:block mt-10" style={{ animationDelay: "0.2s" }}>
                <RequestButton />
              </div>
            </div>

            <div
              className="lg:col-span-5 animate-fade-up flex flex-col items-center lg:items-end"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-md aspect-square mx-auto lg:mx-0 overflow-hidden rounded-2xl">
                <img
                  src={expertPhoto}
                  alt="Василий Мещеряков"
                  className="absolute inset-0 w-full h-full object-cover object-[50%_18%]"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-3 sm:bottom-4 z-10 flex justify-start px-3 sm:px-4">
                  <span className="badge-tag bg-card/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent whitespace-nowrap">
                    Василий Мещеряков · ex P&amp;G (Band 3)
                  </span>
                </div>
              </div>

              <div className="lg:hidden mt-4 w-full max-w-[320px] sm:max-w-[380px] mx-auto">
                <RequestButton className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Problem */}
      <section id="about" className="relative py-16 md:py-24 overflow-hidden scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Проблема")}</SectionLabel>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            {nbsp("Как сохранить сотрудников, без роста ФОТ?")}
          </h2>

          <figure className="mt-6 md:mt-8 animate-fade-up">
            <blockquote className="font-serif-display italic font-normal text-xl md:text-3xl leading-[1.3] tracking-tight text-foreground/80 max-w-4xl">
              {nbsp(
                "«Сотрудники, испытывающие проблемы с личными финансами, в 5 раз чаще отвлекаются на работе»"
              )}
            </blockquote>
            <figcaption className="mt-3 font-body text-xs md:text-sm text-foreground/50">
              {nbsp("PwC Employee Financial Wellness Survey")}
            </figcaption>
          </figure>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {problems.map((p, i) => {
              const Icon = p.icon;
              return (
              <div
                key={p.title}
                className="relative bg-board p-7 md:p-8 hard-shadow animate-fade-up flex flex-col h-full overflow-hidden"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className="absolute top-5 right-5 md:top-6 md:right-6 pointer-events-none">
                  <Icon
                    size={72}
                    strokeWidth={1}
                    className="text-accent/30 shrink-0"
                  />
                </div>
                <h3 className="relative font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-3xl mb-12 md:mb-14 whitespace-pre-line pr-16">
                  {nbsp(p.title)}
                </h3>
                <p className="relative mt-auto font-body text-base text-primary-foreground/70 leading-relaxed">
                  {nbsp(p.text)}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="animate-fade-up">
              <SectionLabel>{nbsp("Решение")}</SectionLabel>
              <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl">
                {nbsp("Не повышать ЗП, а научить")}{" "}
                <span className="italic text-accent">{nbsp("жить лучше за те же деньги")}</span>
              </h2>
              <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-2xl">
                {nbsp(
                  "Ваши сотрудники получат навыки, которые остаются с ними на всю жизнь, а компания — спокойную и вовлечённую команду"
                )}
              </p>
            </div>

            <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              {skills.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-card border border-foreground/15 p-5 md:p-6 hard-shadow"
                  style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                  <p className="font-body text-base md:text-lg text-foreground/85 leading-relaxed">
                    {nbsp(s)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for company */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Что получает компания")}</SectionLabel>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            {nbsp("Результат для бизнеса")}
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {companyBenefits.map((b, i) => (
              <div
                key={b.title}
                className="bg-card border border-foreground/15 p-7 md:p-8 hard-shadow animate-fade-up flex flex-col h-full"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <h3 className="font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-3xl mb-4">
                  {nbsp(b.title)}
                </h3>
                <p className="font-body text-base text-foreground/75 leading-relaxed">
                  {nbsp(b.text)}
                </p>
              </div>
            ))}
          </div>

          <figure className="mt-12 animate-fade-up">
            <div className="flex gap-4 md:gap-6">
              <div className="w-1 bg-accent shrink-0" aria-hidden="true" />
              <div>
                <p className="font-serif-display italic text-accent text-lg md:text-xl mb-2">
                  {nbsp("Важно:")}
                </p>
                <p className="font-serif-display text-lg md:text-2xl leading-snug text-foreground/90">
                  {nbsp(
                    "инвестиция в финансовую грамотность сотрудников окупается через 3–6 месяцев за счёт снижения текучести кадров и роста производительности труда"
                  )}
                </p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* Formats */}
      <section id="formats" className="relative py-16 md:py-24 overflow-hidden bg-grid scroll-mt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <SectionLabel>{nbsp("Форматы работы")}</SectionLabel>
          <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl animate-fade-up max-w-4xl">
            {nbsp("Подберите формат под задачи")}
          </h2>

          <div className="mt-12 space-y-6 lg:space-y-8">
            {formats.map((f, i) => (
              <div
                key={f.title}
                className="bg-card border border-foreground/15 p-7 md:p-8 lg:p-10 hard-shadow animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-serif-display font-semibold leading-[1.1] tracking-tight text-2xl md:text-3xl max-w-2xl">
                    {nbsp(f.title)}
                  </h3>
                  <div className="font-mono text-xs uppercase tracking-widest text-accent shrink-0 pt-1 text-right">
                    {nbsp(f.duration)}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                  <p className="font-body text-base text-foreground/75 leading-relaxed">
                    {nbsp(f.text)}
                  </p>
                  <ul className="space-y-2">
                    {f.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 font-body text-sm text-foreground/75">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>{nbsp(b)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <RequestButton className="mt-8" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Program intro-workshop */}
      <section id="program" className="relative py-16 md:py-24 overflow-hidden scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <SectionLabel>{nbsp("Программа интро-воркшопа")}</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="animate-fade-up">
              <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl max-w-4xl">
                {nbsp("Двухчасовая практическая сессия")}
              </h2>
              <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-2xl">
                {nbsp(
                  "Каждый блок решает реальную проблему и приносит измеримый результат. Участники уходят с конкретными инструментами для немедленного применения"
                )}
              </p>
            </div>

            <div className="space-y-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              {program.map((p, i) => (
                <div
                  key={p.n}
                  className={`relative pl-8 md:pl-10 pb-10 last:pb-0 ${
                    i !== program.length - 1 ? "border-l-2 border-foreground/10" : ""
                  }`}
                  style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                  <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                    {p.n}
                  </div>
                  <h3 className="font-serif-display font-semibold leading-[1.1] tracking-tight text-xl md:text-2xl mb-3">
                    {nbsp(p.title)}
                  </h3>
                  <p className="font-body text-base text-foreground/75 leading-relaxed">
                    {nbsp(p.text)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-accent/10 border border-accent/20 p-6 md:p-8 hard-shadow animate-fade-up">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                <Clock size={20} strokeWidth={1.5} />
              </div>
              <p className="font-serif-display text-lg md:text-2xl leading-snug text-foreground/90">
                {nbsp(
                  "Практический результат: 90% участников недавнего тренинга нашли от +10 до +100 тыс руб в бюджете уже на следующей неделе"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainer */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5 animate-fade-up">
              <div className="relative overflow-hidden rounded-2xl border border-foreground/10 shadow-hard aspect-[4/5] max-w-md mx-auto md:mx-0">
                <img
                  src={expertPhoto}
                  alt="Василий Мещеряков"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="md:col-span-7 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <SectionLabel>{nbsp("Автор тренинга")}</SectionLabel>
              <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-4xl md:text-6xl mb-6">
                {nbsp("Василий Мещеряков")}
              </h2>
              <p className="font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 mb-8">
                {nbsp(
                  "За 2,5 года корпоративных тренингов помог тысячам специалистов обрести контроль над личными финансами"
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {credentials.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-card border border-foreground/15 p-4 hard-shadow"
                  >
                    <div className="w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                    <p className="font-body text-sm text-foreground/80 leading-snug">{nbsp(c)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 font-body text-base text-foreground/75">
                <p>{nbsp("Без инфобизнеса и агрессивных продаж")}</p>
                <p>{nbsp("Чистая экспертиза без навязывания дополнительных продуктов")}</p>
                <p>{nbsp("Понятный язык для всех уровней — от рядовых специалистов до топ-менеджеров")}</p>
                <p>{nbsp("Фокус на практическое применение: каждый инструмент можно внедрить сразу")}</p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://t.me/nivz2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/20 hover:border-accent hover:text-accent transition-colors"
                >
                  <Send size={16} strokeWidth={1.5} />
                  <span className="font-mono text-xs uppercase tracking-widest">Telegram @nivz2</span>
                </a>
                <a
                  href="mailto:nivz@mail.ru"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/20 hover:border-accent hover:text-accent transition-colors"
                >
                  <Mail size={16} strokeWidth={1.5} />
                  <span className="font-mono text-xs uppercase tracking-widest">nivz@mail.ru</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="request" className="relative py-16 md:py-24 overflow-hidden scroll-mt-20">
        <div className="container-px max-w-7xl mx-auto">
          <div className="bg-board rounded-2xl p-8 md:p-14 lg:p-20 animate-fade-up">
            <div className="max-w-3xl">
              <h2 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
                {nbsp("Запросите программу для вашей компании")}
              </h2>
              <p className="font-serif-display text-lg md:text-2xl leading-snug text-primary-foreground/80 mb-10">
                {nbsp(
                  "Расскажу, какой формат подойдёт под ваши задачи, сколько это стоит и как внедрить без лишней нагрузки на HR"
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://t.me/Vasily_Mescheryakov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-primary-foreground transition-colors"
                >
                  <span>Запросить в Telegram</span>
                  <span className="text-base">→</span>
                </a>
                <a
                  href="mailto:nivz@mail.ru"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary-foreground/10 transition-colors"
                >
                  <span>Написать на e-mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Corporate;
