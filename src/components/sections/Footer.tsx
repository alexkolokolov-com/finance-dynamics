import { LogoMark } from "@/components/LogoMark";

const services = [
  { href: "/consultations", label: "Консультации" },
  { href: "/landing", label: "Сопровождение «Профит»" },
  { href: "/profit", label: "Курс «Профит»" },
  { href: "/support-2026", label: "Сопровождение 2026" },
  { href: "/bigbudget", label: "Марафон" },
  { href: "/corporate", label: "Для компаний" },
  { href: "/lectures", label: "Лекции" },
  { href: "/decisions", label: "Бизнес-решения" },
  { href: "/negotiations", label: "Переговоры" },
  { href: "/event", label: "Бизнес-завтрак" },
  { href: "/conference", label: "Конференция" },
];

const materials = [
  { href: "/cashback", label: "Кэшбэк-гайд" },
  { href: "/checklist", label: "Чек-лист" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/oferta", label: "Оферта" },
];

const articles = [
  { href: "/blog", label: "Блог" },
  { href: "/financial-plan", label: "Личный финансовый план" },
  { href: "/financial-horizon", label: "Финансовый горизонт" },
  { href: "/longevity", label: "Финансовое долголетие" },
  { href: "/crisis-decisions", label: "Решения в кризис" },
  { href: "/budget-methods", label: "Способы вести бюджет" },
  { href: "/gears", label: "Шестерёнки финансов" },
];

const linkCls = "hover:text-accent transition";

const Column = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => (
  <div className="col-span-6 md:col-span-3">
    <div className="text-xs uppercase tracking-wider text-foreground/50 mb-4">{title}</div>
    <ul className="space-y-2 text-sm">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} className={linkCls}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer className="bg-background border-t border-foreground/15">
    <div className="container-px max-w-7xl mx-auto py-14">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <div className="flex items-center gap-3">
            <LogoMark size="md" />
            <div>
              <div className="font-display font-semibold">Вася и&nbsp;финансы</div>
              <div className="text-xs text-muted-foreground mt-0.5">© 2026 · Василий Мещеряков</div>
            </div>
          </div>

          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <a href="/" className={linkCls}>
                Главная
              </a>
            </li>
            <li>
              <a
                href="https://t.me/Vasily_Mescheryakov"
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                @Vasily_Mescheryakov
              </a>
            </li>
            <li>
              <a href="mailto:nivz@mail.ru" className={linkCls}>
                nivz@mail.ru
              </a>
            </li>
          </ul>
        </div>

        <Column title="Услуги" links={services} />
        <Column title="Материалы" links={materials} />
        <Column title="Статьи" links={articles} />
      </div>

      <div className="mt-10 pt-6 border-t border-foreground/10 flex flex-col md:flex-row md:items-center md:justify-between md:flex-wrap gap-2 md:gap-4 text-xs text-foreground/55">
        <div>ООО «ВАСЯ и&nbsp;ФИНАНСЫ»</div>
        <div>ИНН&nbsp;5040197296</div>
        <div>ОГРН&nbsp;1255000069213</div>
        <a
          href="https://nivz.getcourse.ru/PDP_Policy"
          target="_blank"
          rel="noopener noreferrer"
          className={linkCls}
        >
          Политика обработки персональных&nbsp;данных
        </a>
        <a href="/oferta" className={linkCls}>
          Оферта
        </a>
      </div>
    </div>
  </footer>
);
