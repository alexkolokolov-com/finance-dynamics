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
  { href: "#for-whom", label: "Для кого", id: "for-whom" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#bonus", label: "Диагностика", id: "bonus" },
  { href: "#speaker", label: "Ведущий", id: "speaker" },
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
          <div className="container-px mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <span className="badge-tag mb-6">{nbsp("Вебинар для HR")}</span>
               <h1 className="text-4xl font-semibold leading-[0.95] tracking-normal sm:text-6xl lg:text-6xl xl:text-7xl">Финансовое<br />благополучие<br /><span className="font-normal italic">сотрудников</span></h1>
               <p className="mt-6 max-w-xl text-xl leading-relaxed md:text-2xl">{nbsp(`${hrWebOffer.subtitle}.`)}</p>
              <div className="my-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-accent" /><time dateTime={`${hrWebOffer.date}T${hrWebOffer.time}`}>{nbsp(`${hrWebOffer.dateLabel} · ${hrWebOffer.timeLabel}`)}</time></span>
                <span className="inline-flex items-center gap-2"><Clock3 size={18} className="text-accent" />{nbsp(`${hrWebOffer.durationMinutes} минут`)}</span>
                <span className="font-medium text-accent">Бесплатно</span>
              </div>
              <Button onClick={() => setRegisterOpen(true)} className={ctaClass}>Зарегистрироваться<ArrowRight /></Button>
            </div>
            <figure className="relative mx-auto w-full max-w-[380px] overflow-hidden rounded-2xl lg:max-w-md">
              <img src={expertPhoto} alt="Василий Мещеряков, ведущий вебинара" className="aspect-square w-full object-cover object-[50%_18%]" fetchPriority="high" />
              <figcaption className="absolute inset-x-0 bottom-4 px-4">
                <p className="badge-tag max-w-full bg-card/95 text-sm">{nbsp("Василий Мещеряков · ex-P&G")}</p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="for-whom" className="scroll-mt-36">
          <div className={sectionClass}>
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              <div>
                 <h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Хорошая зарплата")}<br /><span className="text-accent">{nbsp("не гарантирует финансового спокойствия")}</span></h2>
                 <p className="mt-5 text-xl leading-relaxed">{nbsp("Сотрудник может получать достойную зарплату, иметь ДМС, корпоративные льготы и интересную работу, но продолжать жить от зарплаты до зарплаты, тревожиться из-за кредитов и не иметь накоплений.")}</p>
                 <p className="mt-5 leading-relaxed text-muted-foreground">{nbsp("Повышение зарплаты далеко не всегда решает проблему. Финансовый стресс влияет на вовлечённость, продуктивность и отношение к работодателю.")}</p>
                 <p className="mt-5 leading-relaxed text-muted-foreground">{nbsp("Финансовая грамотность — ещё один инструмент корпоративной заботы, который дополняет существующие benefits.")}</p>
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


        <section id="bonus" className="scroll-mt-36 bg-accent-soft/30">
          <div className={`${sectionClass} grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16`}>
            <div>
              <Gift className="mb-5 h-8 w-8 text-accent" />
              <p className="mb-3 text-accent">{nbsp("Подарок участникам в конце эфира")}</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Индекс финансового спокойствия команды")}</h2>
            </div>
            <div className="space-y-5">
              <div className="flex gap-8 border-b border-foreground/15 pb-5">
                <div><p className="font-display text-4xl font-semibold tracking-normal">10</p><p className="mt-1 text-muted-foreground">вопросов</p></div>
                <div><p className="font-display text-4xl font-semibold tracking-normal">5</p><p className="mt-1 text-muted-foreground">{nbsp("минут на запуск")}</p></div>
              </div>
               <p className="text-lg leading-relaxed">{nbsp("Готовая анонимная диагностика из 10 вопросов. Поможет понять, какие финансовые проблемы беспокоят сотрудников, насколько они уверены в своих финансовых решениях и какая поддержка им действительно нужна.")}</p>
            </div>
          </div>
        </section>

        <section id="speaker" className="scroll-mt-36">
          <CardAbout
            scale="article"
            hideEducation
             factsOverride={expertFacts}
            heading={nbsp("Василий Мещеряков")}
             quote={<><p>{nbsp("Василий Мещеряков — 14 лет в Procter & Gamble, директор по продажам (Band 3). Последние 3 года занимается консалтингом по личным финансам.")}</p><p>{nbsp("Через программы и консультации прошли 1500 семей с ежемесячными бюджетами от 200 тысяч до 1,2 млн рублей. Автор книги «Ленивый бюджет».")}</p></>}
          />
        </section>

        <section id="registration" className="scroll-mt-36 bg-primary text-primary-foreground">
          <div className={`${sectionClass} grid items-center gap-8 md:grid-cols-[1.4fr_1fr]`}>
             <div><p className="mb-4 text-primary-foreground/70">{nbsp("23 октября · 19:00 Мск · 60 минут · бесплатно")}</p><h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Финансовое благополучие — новый инструмент корпоративной заботы")}</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">{nbsp("Узнайте, как помочь сотрудникам увереннее управлять личными финансами и повысить ценность корпоративных бенефитов")}</p></div>
              <div className="md:justify-self-end"><Button onClick={() => setRegisterOpen(true)} className={`${ctaClass} bg-accent text-accent-foreground`}>{nbsp("Зарегистрироваться бесплатно")}<ArrowRight /></Button><p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/65">{nbsp("Пока доступна пробная форма. Запись на вебинар ещё не открыта.")}</p></div>
          </div>
        </section>
      </main>
      <Footer />
      <HrWebRegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  );
};

export default HrWeb;