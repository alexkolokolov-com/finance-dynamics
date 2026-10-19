import { useState } from "react";
import { ExpertPhotoBadge } from "@/components/ExpertPhotoBadge";
import { ArrowRight, Briefcase, CalendarDays, Gift } from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { CardAbout, type FactCard } from "@/components/sections/CardAbout";
import { HrWebRegisterDialog } from "@/components/hrweb/HrWebRegisterDialog";
import { WellbeingSprout } from "@/components/hrweb/WellbeingSprout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { hrWebOffer, hrWebProgram } from "@/data/hrWeb";
import { nbsp } from "@/lib/nbsp";
import expertPhoto from "@/assets/expert-vasily.jpg";
import authorPhoto from "@/assets/hero-photo.png";

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
  const [registerOpen, setRegisterOpen] = useState(false);
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
              <Button onClick={() => setRegisterOpen(true)} className={`${ctaClass} mt-5 w-full sm:w-auto md:mt-8`}>Зарегистрироваться<ArrowRight /></Button>
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
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {hrWebProgram.map((topic) => (
              <article key={topic.title} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 md:p-7 lg:p-8">
                <h3 className="text-xl font-semibold leading-snug tracking-normal md:text-2xl">{nbsp(topic.title)}</h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">{nbsp(topic.text)}</p>
              </article>
            ))}
          </div>
        </section>


        <section id="speaker" className="scroll-mt-36">
          <CardAbout
            scale="article"
            hideEducation
            factsOverride={expertFacts}
            heading={nbsp("Василий Мещеряков")}
            quote={<p>{nbsp("Автор книги «Ленивый бюджет».")}</p>}
          />
        </section>

        <section id="registration" className="scroll-mt-36 bg-primary text-primary-foreground">
          <div className={`${sectionClass} grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16`}>
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Что вы получите при регистрации")}</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4 border-t border-primary-foreground/20 pt-6">
                  <CalendarDays className="mt-1 h-6 w-6 shrink-0 text-accent" />
                  <div>
                    <p className="text-xl font-semibold">{nbsp("Участие в прямом эфире")}</p>
                    <p className="mt-1 text-lg text-primary-foreground/80">{nbsp("Разбор и ответы на вопросы")}</p>
                  </div>
                </li>
                <li className="flex gap-4 border-t border-primary-foreground/20 pt-6">
                  <Gift className="mt-1 h-6 w-6 shrink-0 text-accent" />
                  <div>
                    <p className="text-accent">{nbsp("Подарок участникам в конце эфира")}</p>
                    <p className="mt-1 text-xl font-semibold">{nbsp("Индекс финансового спокойствия команды")}</p>
                    <p className="mt-2 text-lg leading-relaxed text-primary-foreground/80">{nbsp("Готовая анонимная диагностика: 10 вопросов, 5 минут на запуск. Поможет понять, какие финансовые проблемы беспокоят сотрудников и какая поддержка им действительно нужна.")}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:justify-self-end">
              <p className="mb-4 text-lg text-primary-foreground/80"><time dateTime={`${hrWebOffer.date}T${hrWebOffer.time}`}>{nbsp(`${hrWebOffer.dateLabel} · ${hrWebOffer.timeLabel}`)}</time>{nbsp(` · ${hrWebOffer.durationMinutes} минут · онлайн`)}</p>
              <Button onClick={() => setRegisterOpen(true)} className={`${ctaClass} w-full bg-accent text-accent-foreground sm:w-auto`}>Зарегистрироваться<ArrowRight /></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <HrWebRegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  );
};

export default HrWeb;