import { useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Gift, ShieldCheck, Wallet, Users, BriefcaseBusiness, Check } from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { HrWebRegisterDialog } from "@/components/hrweb/HrWebRegisterDialog";
import { usePageMeta } from "@/hooks/usePageMeta";
import { hrWebOffer, hrWebProgram } from "@/data/hrWeb";
import { nbsp } from "@/lib/nbsp";
import vasily from "@/assets/vasily-hero.png.asset.json";

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
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-normal sm:text-5xl lg:text-6xl">{nbsp(hrWebOffer.title)}</h1>
              <p className="mt-5 max-w-2xl font-display text-2xl leading-snug tracking-normal md:text-3xl">{nbsp(hrWebOffer.subtitle)}</p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{nbsp("Почему прибавка к окладу быстро перестаёт радовать, и что держит людей сильнее.")}</p>
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
            <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
              <h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Повысить зарплату нельзя. Удержать нужно. Что делать?")}</h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>{nbsp("Хороший специалист, оклад в рынке, уходит к конкуренту на +20 тысяч. Причина — «денег не хватает».")}</p>
                <p>{nbsp("Но на новом месте прибавка может снова раствориться в расходах. Когда нет подушки, бюджета и плана, сама цифра в зарплатном листке не даёт ощущения финансовой устойчивости.")}</p>
              </div>
            </div>
            <div className="mt-10 grid gap-7 sm:grid-cols-3">
              {[
                { icon: Users, title: "HR и HR-директорам", text: "Когда оклады в рынке, а разговоры о деньгах и риск ухода не прекращаются." },
                { icon: Wallet, title: "Специалистам по C&B", text: "Когда нужен бенефит, которым сотрудники пользуются каждый месяц." },
                { icon: BriefcaseBusiness, title: "Руководителям команд", text: "Когда ФОТ заморожен, а хочется поддержать команду без вмешательства в личное." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="border-t border-border pt-5">
                  <Icon className="mb-4 h-6 w-6 text-accent" />
                  <h3 className="text-xl font-medium tracking-normal">{nbsp(title)}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{nbsp(text)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="program" className={`${sectionClass} scroll-mt-36`}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">{nbsp("Что разберём на вебинаре")}</h2>
            <p className="text-muted-foreground">{nbsp("60 минут: от причин до инструментов")}</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {hrWebProgram.map((part) => (
              <article key={part.title} className="grid gap-5 py-7 md:grid-cols-[1fr_1.4fr] md:gap-12">
                <div><p className="mb-2 text-sm text-accent">{nbsp(`${part.minutes} минут`)}</p><h3 className="text-2xl font-medium leading-snug tracking-normal">{nbsp(part.title)}</h3></div>
                <ul className="space-y-3 text-muted-foreground">{part.points.map((point) => <li key={point} className="flex items-start gap-3 leading-relaxed"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" /><span>{nbsp(point)}</span></li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="bonus" className="scroll-mt-36 bg-accent-soft/30">
          <div className={`${sectionClass} grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16`}>
            <div>
              <Gift className="mb-5 h-8 w-8 text-accent" />
              <p className="mb-3 text-accent">{nbsp("Подарок участникам в конце эфира")}</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-normal md:text-4xl">{nbsp("Индекс финансового спокойствия команды")}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{nbsp("Анонимная диагностика, которую вы сможете запустить у себя, даже если дальше ничего не покупаете.")}</p>
            </div>
            <div className="space-y-5">
              <div className="flex gap-8 border-b border-foreground/15 pb-5">
                <div><p className="font-display text-4xl font-semibold tracking-normal">10</p><p className="mt-1 text-muted-foreground">вопросов</p></div>
                <div><p className="font-display text-4xl font-semibold tracking-normal">5</p><p className="mt-1 text-muted-foreground">{nbsp("минут на запуск")}</p></div>
              </div>
              <p className="leading-relaxed">{nbsp("Итог — один индекс по команде и три самые острые зоны: бюджет, подушка, долги, цели, горизонт и финансовый стресс.")}</p>
              <p className="leading-relaxed text-muted-foreground">{nbsp("Опрос и ключ к результатам в PDF, шаблон формы по ссылке. На эфире разберём, как провести опрос анонимно и прочитать ответы.")}</p>
            </div>
          </div>
        </section>

        <section id="speaker" className={`${sectionClass} scroll-mt-36`}>
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div><p className="mb-3 text-accent">{nbsp("Ведущий вебинара")}</p><h2 className="text-3xl font-semibold tracking-normal md:text-4xl">{nbsp("Василий Мещеряков")}</h2><p className="mt-4 text-lg text-muted-foreground">{nbsp("Автор «Вася и финансы», ex-P&G")}</p></div>
            <div className="space-y-5 text-lg leading-relaxed">
              <p>{nbsp("«2,5 года провожу тренинги по личным финансам для сотрудников компаний. „Получает нормально, а живёт от зарплаты до зарплаты“ — самая частая ситуация, с которой я работаю».")}</p>
              <p className="text-muted-foreground">{nbsp("На вебинаре — честный, практичный разговор о том, что компания может дать сотруднику, не меняя фонд оплаты труда.")}</p>
            </div>
          </div>
          <div className="mt-10 flex items-start gap-4 border-t border-border pt-7">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-accent" />
            <div className="max-w-4xl"><h3 className="text-xl font-medium tracking-normal">{nbsp("Финансовая программа не заменяет конкурентную зарплату")}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{nbsp("Если вы платите сильно ниже рынка, люди уйдут, и никакой тренинг этого не исправит. Вебинар для тех, у кого оклады в рынке, а разговоры о деньгах всё равно не прекращаются.")}</p></div>
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