import { useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Gift, ShieldCheck, Check } from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HrWebRegisterDialog } from "@/components/hrweb/HrWebRegisterDialog";
import { usePageMeta } from "@/hooks/usePageMeta";
import { hrWebOffer, hrWebProgram } from "@/data/hrWeb";
import { nbsp } from "@/lib/nbsp";
import vasily from "@/assets/vasily-hero.png.asset.json";
import retentionImage from "@/assets/hr-web-retention.jpg";

const pageNav: HeaderNavLink[] = [
  { href: "#for-whom", label: "Для кого", id: "for-whom" },
  { href: "#program", label: "Программа", id: "program" },
  { href: "#bonus", label: "Диагностика", id: "bonus" },
  { href: "#speaker", label: "Ведущий", id: "speaker" },
  { href: "#registration", label: "Регистрация", id: "registration", cta: true },
];
const ctaClass = "h-auto min-h-14 whitespace-normal bg-accent px-7 py-4 text-base text-accent-foreground hover:bg-accent/90";
const sectionClass = "container-px mx-auto max-w-7xl py-12 md:py-16";

const HrWeb = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  usePageMeta({ title: "Вебинар для HR: удержать без повышения зарплаты", description: "Бесплатный вебинар Василия Мещерякова 21 октября: финансовое благополучие сотрудников, удержание без изменения ФОТ и анонимная диагностика команды. 60 минут.", path: "/hr-web" });
  return (
    <>
      <SiteHeader pageNav={pageNav} />
      <main>
        <section className="container-px mx-auto max-w-7xl pb-12 pt-40 md:pb-16 md:pt-44">
          <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
            <div className="min-w-0">
              <span className="badge-tag mb-6">{nbsp("Вебинар для HR")}</span>
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-normal sm:text-6xl lg:text-7xl">Удержать<br /><span className="text-accent">{nbsp("без повышения")}</span></h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed md:text-2xl">{nbsp("Как снизить финансовый стресс сотрудников, не увеличивая ФОТ.")}</p>
              <div className="my-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-accent" /><time dateTime={hrWebOffer.date}>{nbsp(hrWebOffer.dateLabel)}</time></span>
                <span className="inline-flex items-center gap-2"><Clock3 size={18} className="text-accent" />{nbsp(`${hrWebOffer.durationMinutes} минут`)}</span>
                <span className="font-medium text-accent">Бесплатно</span>
              </div>
              <Button onClick={() => setRegisterOpen(true)} className={ctaClass}>Зарегистрироваться<ArrowRight /></Button>
            </div>
            <figure className="relative mx-auto w-full max-w-md self-end overflow-hidden rounded-lg bg-accent-soft/40">
              <img src={vasily.url} alt="Василий Мещеряков, ведущий вебинара" className="aspect-[4/5] w-full object-cover object-top" fetchPriority="high" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-background/95 px-5 py-4">
                <p className="font-display text-xl font-medium tracking-normal">{nbsp("Василий Мещеряков")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{nbsp("Автор «Вася и финансы» · ex-P&G")}</p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="for-whom" className="scroll-mt-36 border-y border-border bg-card">
          <div className={sectionClass}>
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              <div>
                <h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Сотрудник незаменим.")}<br /><span className="text-accent">{nbsp("Бюджет не резиновый.")}</span></h2>
                <p className="mt-5 text-xl leading-relaxed">{nbsp("Что предложить вместо очередной прибавки? Инструменты, чтобы зарплаты хватало, а тревоги о деньгах стало меньше.")}</p>
                <p className="mt-5 leading-relaxed text-muted-foreground">{nbsp("Для HR и руководителей: когда оклады в рынке, но люди всё равно уходят за деньгами.")}</p>
              </div>
              <img src={retentionImage} alt="Работодатель показывает пустые карманы, а незаменимый сотрудник уходит, оставляя команду без опоры" width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full rounded-lg object-contain" />
            </div>
          </div>
        </section>

        <section id="program" className={`${sectionClass} scroll-mt-36`}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">{nbsp("Что разберём на вебинаре")}</h2>
          </div>
          <Accordion type="multiple" className="border-t border-border">
            {hrWebProgram.map((part, index) => (
              <AccordionItem key={part.title} value={`part-${index}`}>
                <AccordionTrigger className="gap-5 py-6 text-left font-display text-xl leading-snug tracking-normal hover:text-accent hover:no-underline md:text-2xl">
                  <span>{nbsp(part.title)}</span>
                </AccordionTrigger>
                <AccordionContent className="max-w-4xl pb-6 text-base motion-reduce:animate-none">
                  <p className="mb-4 text-sm text-accent">{nbsp(`${part.minutes} минут`)}</p>
                  <ul className="space-y-3 text-muted-foreground">{part.points.map((point) => <li key={point} className="flex items-start gap-3 leading-relaxed"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" /><span>{nbsp(point)}</span></li>)}</ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              <p className="text-lg leading-relaxed">{nbsp("Анонимный опрос покажет, где деньги вызывают тревогу у вашей команды. Заберёте инструмент в конце эфира.")}</p>
            </div>
          </div>
        </section>

        <section id="speaker" className={`${sectionClass} scroll-mt-36`}>
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div><p className="mb-3 text-accent">{nbsp("Ведущий вебинара")}</p><h2 className="text-3xl font-semibold tracking-normal md:text-4xl">{nbsp("Василий Мещеряков")}</h2><p className="mt-4 text-lg text-muted-foreground">{nbsp("Автор «Вася и финансы», ex-P&G")}</p></div>
            <div className="space-y-5 text-lg leading-relaxed">
              <p>{nbsp("2,5 года провожу тренинги по личным финансам для сотрудников компаний. Помогаю перейти от «зарплаты до зарплаты» к понятному бюджету и плану.")}</p>
            </div>
          </div>
          <div className="mt-10 flex items-start gap-4 border-t border-border pt-7">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-accent" />
            <div className="max-w-4xl"><h3 className="text-xl font-medium tracking-normal">{nbsp("Финансовая программа не заменяет конкурентную зарплату")}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{nbsp("Если оклады ниже рынка, сначала нужно решать вопрос оплаты.")}</p></div>
          </div>
        </section>

        <section id="registration" className="scroll-mt-36 bg-primary text-primary-foreground">
          <div className={`${sectionClass} grid items-center gap-8 md:grid-cols-[1.4fr_1fr]`}>
            <div><p className="mb-4 text-primary-foreground/70">{nbsp("21 октября · 60 минут · бесплатно")}</p><h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Удержать без повышения")}</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">{nbsp("Заберите инструмент, с которым можно начать разговор о финансовом благополучии вашей команды.")}</p></div>
            <div className="md:justify-self-end"><Button onClick={() => setRegisterOpen(true)} className={ctaClass}>Зарегистрироваться<ArrowRight /></Button><p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/65">{nbsp("Пока доступна пробная форма. Запись на вебинар ещё не открыта.")}</p></div>
          </div>
        </section>
      </main>
      <Footer />
      <HrWebRegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  );
};

export default HrWeb;