import { useState } from "react";
import { ArrowRight, Briefcase, CalendarDays, Clock3, Gift } from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { CardAbout, type FactCard } from "@/components/sections/CardAbout";
import { HrWebRegisterDialog } from "@/components/hrweb/HrWebRegisterDialog";
import { usePageMeta } from "@/hooks/usePageMeta";
import { hrWebOffer, hrWebProgram } from "@/data/hrWeb";
import { nbsp } from "@/lib/nbsp";
import expertPhoto from "@/assets/expert-vasily.jpg";
import retentionImage from "@/assets/hr-web-retention.jpg";

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
                <span className="badge-tag bg-card/95 text-xs">{nbsp("Онлайн · бесплатно")}</span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-3 px-3">
                <p className="badge-tag max-w-full bg-card/95 text-xs md:text-sm">{nbsp("Василий Мещеряков · ex-P&G")}</p>
              </figcaption>
            </figure>
            <div className="min-w-0">
              <span className="badge-tag mb-5 hidden md:inline-flex">{nbsp("Вебинар для HR")}</span>
              <h1 className="text-[clamp(2rem,9vw,2.75rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-normal">{nbsp("Финансовое благополучие")} <span className="font-normal italic">сотрудников</span></h1>
              <p className="mt-4 max-w-xl text-lg leading-snug md:mt-6 md:text-2xl">{nbsp(`${hrWebOffer.subtitle.split(". ")[0]}.`)}</p>
              <div className="my-6 hidden flex-wrap items-center gap-x-6 gap-y-3 text-sm md:flex">
                <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-accent" /><time dateTime={`${hrWebOffer.date}T${hrWebOffer.time}`}>{nbsp(`${hrWebOffer.dateLabel} · ${hrWebOffer.timeLabel}`)}</time></span>
                <span className="inline-flex items-center gap-2"><Clock3 size={18} className="text-accent" />{nbsp(`${hrWebOffer.durationMinutes} минут`)}</span>
                <span className="font-medium text-accent">Бесплатно</span>
              </div>
              <Button onClick={() => setRegisterOpen(true)} className={`${ctaClass} mt-5 w-full sm:w-auto md:mt-0`}>Зарегистрироваться<ArrowRight /></Button>
            </div>
          </div>
        </section>

        <section id="for-whom" className="scroll-mt-36">
          <div className={sectionClass}>
            <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              <div>
                <h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Хорошая зарплата")} <span className="text-accent">{nbsp("не гарантирует финансового спокойствия")}</span></h2>
                <p className="mt-5 text-lg leading-relaxed md:text-xl">{nbsp("Сотрудник может получать достойную зарплату, иметь ДМС и льготы, но жить от зарплаты до зарплаты, тревожиться из-за кредитов и не иметь накоплений.")}</p>
              </div>
              <img src={retentionImage} alt="Работодатель показывает пустые карманы, а незаменимый сотрудник уходит, оставляя команду без опоры" width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full rounded-lg object-contain" />
            </div>
          </div>
        </section>

        <section id="program" className={`${sectionClass} scroll-mt-36`}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">{nbsp("Что разберём на вебинаре")}</h2>
          </div>
          <ul className="grid gap-x-12 md:grid-cols-2">
            {hrWebProgram.map((thesis) => (
              <li key={thesis} className="flex items-start gap-3 border-t border-border py-4">
                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base leading-snug md:text-lg">{nbsp(thesis)}</span>
              </li>
            ))}
          </ul>
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