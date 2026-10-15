import { useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Gift } from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { CardAbout } from "@/components/sections/CardAbout";
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

const HrWeb = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  usePageMeta({ title: "Вебинар для HR: удержать без повышения зарплаты", description: "Бесплатный вебинар Василия Мещерякова 21 октября: финансовое благополучие сотрудников, удержание без изменения ФОТ и анонимная диагностика команды. 60 минут.", path: "/hr-web" });
  return (
    <>
      <SiteHeader pageNav={pageNav} />
      <main>
        <section className="relative overflow-hidden bg-grid pb-10 pt-36 md:pb-16 md:pt-40">
          <div className="container-px mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <span className="badge-tag mb-6">{nbsp("Вебинар для HR")}</span>
              <h1 className="text-4xl font-semibold leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl xl:text-8xl">Удержать<br /><span className="font-normal italic">{nbsp("без повышения")}</span></h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed md:text-2xl">{nbsp("Как снизить финансовый стресс сотрудников, не увеличивая ФОТ.")}</p>
              <div className="my-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-accent" /><time dateTime={hrWebOffer.date}>{nbsp(hrWebOffer.dateLabel)}</time></span>
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
              <p className="text-lg leading-relaxed">{nbsp("Анонимный опрос покажет, где деньги вызывают тревогу у вашей команды. Заберёте инструмент в конце эфира.")}</p>
            </div>
          </div>
        </section>

        <section id="speaker" className="scroll-mt-36">
          <CardAbout
            scale="article"
            hideEducation
            heading={nbsp("Василий Мещеряков")}
            quote={<><p>{nbsp("2,5 года провожу тренинги по личным финансам для сотрудников компаний. Помогаю перейти от «зарплаты до зарплаты» к понятному бюджету и плану.")}</p><p>{nbsp("Я доступным языком расскажу вам о законах, по которым приумножается капитал.")}</p></>}
          />
        </section>

        <section id="registration" className="scroll-mt-36 bg-primary text-primary-foreground">
          <div className={`${sectionClass} grid items-center gap-8 md:grid-cols-[1.4fr_1fr]`}>
            <div><p className="mb-4 text-primary-foreground/70">{nbsp("21 октября · 60 минут · бесплатно")}</p><h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Удержать без повышения")}</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">{nbsp("Заберите инструмент, с которым можно начать разговор о финансовом благополучии вашей команды.")}</p></div>
             <div className="md:justify-self-end"><Button onClick={() => setRegisterOpen(true)} className={`${ctaClass} bg-accent text-accent-foreground`}>Зарегистрироваться<ArrowRight /></Button><p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/65">{nbsp("Пока доступна пробная форма. Запись на вебинар ещё не открыта.")}</p></div>
          </div>
        </section>
      </main>
      <Footer />
      <HrWebRegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  );
};

export default HrWeb;