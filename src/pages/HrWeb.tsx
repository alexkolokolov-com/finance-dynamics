import { ExpertPhotoBadge } from "@/components/ExpertPhotoBadge";
import { ArrowRight, Briefcase, CalendarDays } from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { CardAbout, type FactCard } from "@/components/sections/CardAbout";
import { HrWebRegisterForm } from "@/components/hrweb/HrWebRegisterForm";
import { WellbeingSprout } from "@/components/hrweb/WellbeingSprout";
import { RegistrationChecklist } from "@/components/hrweb/RegistrationChecklist";
import { usePageMeta } from "@/hooks/usePageMeta";
import { hrWebOffer, hrWebProgram } from "@/data/hrWeb";
import { nbsp } from "@/lib/nbsp";
import expertPhoto from "@/assets/expert-vasily.jpg";
import authorPhoto from "@/assets/hero-photo.png";
import programIllustration1 from "@/assets/hr-web-card-1.jpg";
import programIllustration2 from "@/assets/hr-web-card-2.jpg";
import programIllustration3 from "@/assets/hr-web-card-3.jpg";

const programIllustrations: { src: string; alt: string }[] = [
  { src: programIllustration1, alt: "Сотрудник за ноутбуком устало опирается на руку, над головой тают монеты и купюры" },
  { src: programIllustration2, alt: "Сотрудник держит корпоративный пакет заботы, а из его кошелька выпадает последняя монета" },
  { src: programIllustration3, alt: "Человек раскладывает монеты по возрастающим стопкам рядом с бюджетным блокнотом и конвертами" },
];

const pageNav: HeaderNavLink[] = [
  { href: "#for-whom", label: "О вебинаре", id: "for-whom" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#registration", label: "Регистрация", id: "registration", cta: true },
];
const ctaClass = "h-auto min-h-14 whitespace-normal rounded-none bg-primary px-8 py-4 text-base text-primary-foreground hover:bg-accent hover:text-accent-foreground";
const sectionClass = "container-px mx-auto max-w-7xl py-12 md:py-16";
const expertFacts: FactCard[] = [
  { kind: "bio", label: "карьера", title: "Procter & Gamble", sub: nbsp("Директор по продажам (Band 3)"), icon: Briefcase },
  { kind: "metric", value: "14", unit: "лет", sub: nbsp("в Procter & Gamble") },
  { kind: "metric", value: "3", unit: "года", sub: nbsp("консалтинга по личным финансам") },
  { kind: "metric", value: "1500", sub: nbsp("семей прошли программы и консультации") },
  { kind: "metric", value: "200", unit: "тыс.", sub: nbsp("от 200 тысяч до 1,2 млн рублей — ежемесячные бюджеты семей") },
];

const HrWeb = () => {
   usePageMeta({ title: "Финансовое благополучие сотрудников — вебинар для HR", description: "Бесплатный вебинар Василия Мещерякова 23 октября в 19:00 Мск: как financial wellbeing дополняет корпоративные бенефиты. Практические упражнения и диагностика команды. 60 минут.", path: "/hr-web" });
  return (
    <>
      <SiteHeader pageNav={pageNav} />
      <main>
        <section className="relative overflow-hidden bg-grid pb-10 pt-36 md:pb-16 md:pt-40">
          <div className="container-px mx-auto grid max-w-7xl items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <figure className="relative order-first mx-auto w-full max-w-[380px] overflow-hidden rounded-2xl md:order-last md:max-w-md">
              <img src={expertPhoto} alt="Василий Мещеряков, ведущий вебинара" className="aspect-[4/3] w-full object-cover object-[50%_18%] md:aspect-[4/5] lg:aspect-square" fetchPriority="high" />
              <div className="absolute inset-x-3 top-3 flex flex-wrap gap-2 md:hidden">
                <span className="badge-tag bg-card/95 text-xs"><time dateTime={`${hrWebOffer.date}T${hrWebOffer.time}`}>{nbsp(`${hrWebOffer.dateLabel} · ${hrWebOffer.timeLabel}`)}</time></span>
              </div>
              <ExpertPhotoBadge />
            </figure>
            <div className="min-w-0">
              <div className="mb-5 hidden flex-wrap gap-2 md:flex">
                <span className="badge-tag inline-flex items-center gap-2"><CalendarDays size={16} className="text-accent" /><time dateTime={`${hrWebOffer.date}T${hrWebOffer.time}`}>{nbsp(`${hrWebOffer.dateLabel} · ${hrWebOffer.timeLabel}`)}</time></span>
                <span className="badge-tag">{nbsp("Вебинар для HR")}</span>
              </div>
              <h1 className="text-[clamp(2rem,9vw,2.75rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-normal">{nbsp("Финансовое благополучие")} <span className="font-normal italic">сотрудников</span></h1>
              <p className="mt-4 max-w-xl text-lg leading-snug md:mt-6 md:text-2xl">{nbsp(`${hrWebOffer.subtitle.split(". ")[0]}.`)}</p>
              <Button asChild className={`${ctaClass} mt-5 w-full sm:w-auto md:mt-8`}><a href="#registration">Зарегистрироваться<ArrowRight /></a></Button>
            </div>
          </div>
        </section>

        <section id="for-whom" className="scroll-mt-36">
          <div className={sectionClass}>
            <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal md:text-5xl">{nbsp("Хорошая зарплата не гарантирует")} <span className="text-accent">{nbsp("финансового спокойствия")}</span></h2>
            <figure className="mt-8 rounded-2xl border border-border bg-card p-6 md:mt-12 md:p-10 lg:p-12">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-12">
                <blockquote className="lg:order-last lg:col-span-9">
                  <p className="text-lg leading-relaxed md:text-2xl">{nbsp("Сотрудник может получать достойную зарплату, иметь ДМС и льготы, но жить от зарплаты до зарплаты и не иметь накоплений.")}</p>
                  <p className="mt-4 text-lg leading-relaxed md:mt-6 md:text-2xl">{nbsp("И в какой-то момент он уходит в компанию, где ему предложили на 30 тысяч больше. Но свои финансовые проблемы он так и не решает")}</p>
                </blockquote>
                <div className="flex items-center gap-4 border-t border-border pt-6 lg:col-span-3 lg:flex-col lg:items-start lg:border-0 lg:pt-0">
                  <img src={authorPhoto} alt="Василий Мещеряков" loading="lazy" className="h-16 w-16 shrink-0 rounded-full object-cover object-top md:h-20 md:w-20 lg:h-36 lg:w-36" />
                  <figcaption className="text-sm leading-snug md:text-base">
                    <div className="text-base font-semibold md:text-lg">{nbsp("Василий Мещеряков")}</div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-widest md:text-xs"><span className="font-light text-foreground/55">канал</span> <a href="https://t.me/vasya_lfp" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-semibold text-foreground transition-colors hover:text-accent">Вася и&nbsp;финансы</a></div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-widest md:text-xs"><span className="font-light text-foreground/55">книга</span> <a href="/book" className="whitespace-nowrap font-semibold text-foreground transition-colors hover:text-accent">Ленивый бюджет</a></div>
                  </figcaption>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <WellbeingSprout className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-auto text-accent" />
          <div className={`${sectionClass} relative z-10 md:py-20`}>
            <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">{nbsp("Financial well-being")}</h2>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-snug text-accent md:mt-8 md:text-2xl">{nbsp("Можно жить лучше за те же деньги!")}</p>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-primary-foreground/80 md:text-2xl">{nbsp("Продолжая работать в вашей компании, сотрудники станут увеличивать свой капитал и лояльность к работодателю.")}</p>
          </div>
        </section>


        <section id="program" className={`${sectionClass} scroll-mt-36`}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">{nbsp("Что разберём на вебинаре")}</h2>
          </div>
          <div className="grid gap-5 xl:gap-6">
            {hrWebProgram.map((topic, i) => (
              <article
                key={topic}
                className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-card md:items-stretch ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                <div
                  className={`relative shrink-0 border-b border-border md:w-[240px] md:border-b-0 lg:w-[280px] ${i % 2 === 1 ? "md:border-l" : "md:border-r"}`}
                >
                  <img
                    src={programIllustrations[i].src}
                    alt={programIllustrations[i].alt}
                    loading="lazy"
                    width={1200}
                    height={896}
                    className="block aspect-[4/3] h-auto w-full object-cover md:absolute md:inset-0 md:aspect-auto md:h-full md:object-contain md:p-2"
                  />
                </div>
                <p className="flex-1 p-6 text-lg leading-relaxed md:self-center md:p-8 md:text-2xl">{nbsp(topic)}</p>
              </article>
            ))}
          </div>
        </section>


        <section id="speaker" className="relative scroll-mt-36 overflow-hidden bg-grid">
          <div className="pointer-events-none absolute inset-0" style={{ background: "var(--grad-chalk)" }} />
          <div className={`${sectionClass} relative grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-12`}>
            <h2 className="text-3xl font-semibold tracking-normal md:hidden">{nbsp("Василий Мещеряков")}</h2>
            <div className="md:col-span-5">
              <div className="relative mx-auto aspect-[4/5] max-w-[380px] overflow-hidden rounded-2xl border border-foreground/10 md:mx-0 md:max-w-md">
                <img src={expertPhoto} alt="Василий Мещеряков" loading="lazy" className="h-full w-full object-cover object-center" />
                <ExpertPhotoBadge />
              </div>
            </div>
            <div className="md:col-span-7">
              <h2 className="hidden font-semibold tracking-normal md:block md:text-4xl">{nbsp("Василий Мещеряков")}</h2>
              <p className="mt-5 text-xl leading-snug md:text-2xl">
                {nbsp("Помог тысячам людей обрести контроль над личными финансами")}
              </p>
              <div className="mt-8 space-y-3 border-t border-border pt-8">
                <p className="text-xl font-semibold md:text-2xl">{nbsp("Никаких продаж сотрудникам")}</p>
                <p className="text-lg leading-relaxed">
                  {nbsp("В рамках корпоративной программы не продаю участникам инвестиционные, страховые, банковские и другие финансовые продукты")}
                </p>
              </div>
              <p className="mt-6 text-lg leading-relaxed">
                {nbsp("Понятный язык для всех уровней — от рядовых специалистов до топ\u2011менеджеров")}
              </p>
            </div>
          </div>
        </section>

        <section id="registration" className="scroll-mt-36 bg-primary text-primary-foreground">
          <div className={`${sectionClass} grid items-start gap-8 md:grid-cols-2 md:gap-x-10 lg:gap-x-16`}>
            <div className="min-w-0">
              <h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">Регистрация</h2>
            </div>
            <div className="min-w-0 md:col-start-2 md:row-start-1 md:row-span-2">
              <HrWebRegisterForm />
            </div>
            <div className="relative isolate min-w-0 overflow-hidden md:col-start-1 md:row-start-2">
              <RegistrationChecklist className="pointer-events-none absolute right-0 top-0 -z-10 h-full max-h-64 w-auto text-accent" />
              <p className="text-lg leading-relaxed">{nbsp("Подарок участника вебинара")}</p>
              <p className="mt-3 text-2xl font-semibold leading-snug">{nbsp("Индекс финансового спокойствия команды")}</p>
              <p className="mt-4 text-lg leading-relaxed">{nbsp("Анонимная диагностика: 10 вопросов, 5 минут на запуск.")}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HrWeb;