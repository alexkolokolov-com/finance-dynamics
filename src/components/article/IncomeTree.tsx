import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { nbsp } from "@/lib/nbsp";

type Leaf = { title: string; notes?: string[] };
type Group = { title: string; items: Leaf[] };
type Branch = { title: string; groups: Group[] };

const branches: Branch[] = [
  {
    title: "Найм",
    groups: [
      {
        title: "Текущая карьера",
        items: [
          {
            title: "Карьерный план",
            notes: ["самостоятельно", "консультант", "тренинги"],
          },
          {
            title: "Ментор (подойдёт всем)",
            notes: ["на текущей работе", "вне работы", "контакты менторов"],
          },
          {
            title: "«Разговор с руководителем»",
            notes: ["«Деньги»", "«Развитие»", "«Обстоятельства»"],
          },
        ],
      },
      {
        title: "Альтернативная карьера",
        items: [
          { title: "Карьерный план", notes: ["консультант"] },
          {
            title: "Поиск вакансий и executive search",
            notes: ["список агентств и сайтов", "спросить у того, кто ушёл"],
          },
          {
            title: "Бывшие коллеги",
            notes: ["актуально и для тех, кто работает на себя: партнёры, конкуренты"],
          },
        ],
      },
      {
        title: "Новая профессия",
        items: [
          { title: "Аналитик данных" },
          { title: "IT", notes: ["получается у 2–3 из 10, но зарплата 300К+"] },
        ],
      },
    ],
  },
  {
    title: "На себя",
    groups: [
      {
        title: "Фриланс / работа на себя",
        items: [
          { title: "План на 5–10 лет" },
          {
            title: "Нетворкинг",
            notes: [
              "минимум 1 новый контакт в неделю",
              "форумы, выступления, соцсети",
            ],
          },
          {
            title: "«Фоном» смотреть, где можно консультировать",
            notes: ["сделать визитку себя или своего бизнеса"],
          },
        ],
      },
      {
        title: "Бизнес",
        items: [
          { title: "Нужно выбирать одно направление" },
          { title: "Партнёрства" },
        ],
      },
      {
        title: "Социальные инструменты",
        items: [
          {
            title: "Экспертный блог",
            notes: [
              "мессенджеры и соцсети",
              "платформы услуг",
              "инфопродукт или реклама",
            ],
          },
          { title: "Форумы и мастермайнды" },
          {
            title: "Друзья: говорить про деньги",
            notes: ["дружба и партнёрство", "кофе раз в 2 недели"],
          },
        ],
      },
    ],
  },
  {
    title: "Общие",
    groups: [
      {
        title: "Инструменты в бюджете",
        items: [
          {
            title: "Что актуально через 5 лет?",
            notes: ["сколько часов в неделю перерабатываешь?"],
          },
          { title: "Базовое", notes: ["НДФЛ-вычеты, кешбэки, ИИС, ДМС"] },
          {
            title: "Финансовые услуги как инструмент",
            notes: ["20–30 тыс/мес при работе 2 ч/день"],
          },
        ],
      },
      {
        title: "Монетизация хобби",
        items: [
          {
            title: "Тематические сообщества",
            notes: ["активность — поиск партнёров и клиентов"],
          },
          {
            title: "Монетизация обучений",
            notes: ["план монетизации ДО начала обучения"],
          },
          { title: "Бизнес" },
        ],
      },
      {
        title: "«Государство»",
        items: [
          { title: "Гранты", notes: ["учёные", "для детей", "стартапы"] },
          { title: "Тендеры" },
        ],
      },
      {
        title: "Творчество",
        items: [{ title: "Выступления" }, { title: "Книги и музыка" }],
      },
      {
        title: "Семья",
        items: [{ title: "Поиск мужа" }, { title: "Детские каналы и контент" }],
      },
    ],
  },
];

const GroupNode = ({ group }: { group: Group }) => (
  <li className="mm-node pt-0">
    <div className="inline-flex rounded-lg bg-background/70 border border-border/70 px-3 py-1">
      <h4 className="font-display text-[14px] md:text-[15px] font-semibold leading-snug text-foreground">
        {nbsp(group.title)}
      </h4>
    </div>
    <ul className="mm-tree mm-tree--twig mt-1.5 ml-2 md:ml-3 space-y-1.5">
      {group.items.map((item) => (
        <li key={item.title} className="mm-node">
          <p className="font-body text-sm md:text-[15px] leading-snug text-foreground/85 hyphens-auto">
            {nbsp(item.title)}
          </p>
          {item.notes && (
            <p className="mt-0.5 font-body text-[13px] md:text-sm leading-snug text-foreground/50 hyphens-auto">
              {nbsp(item.notes.join(" · "))}
            </p>
          )}
        </li>
      ))}
    </ul>
  </li>
);

const BranchRow = ({ branch, index }: { branch: Branch; index: number }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="md:flex md:items-start md:gap-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mm-stem flex w-full md:w-[9.5rem] shrink-0 items-center justify-between gap-3 text-left md:pointer-events-none md:mt-0.5"
      >
        <span className="inline-flex items-center rounded-full bg-accent px-3.5 py-1.5 font-display text-[13px] md:text-sm font-semibold uppercase tracking-wide text-accent-foreground">
          {branch.title}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-foreground/50 transition-transform md:hidden ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <ul
        className={`${open ? "block" : "hidden"} md:block mm-tree mm-tree--trunk mt-2.5 md:mt-0 ml-1 md:ml-0 flex-1 space-y-3`}
      >
        {branch.groups.map((group) => (
          <GroupNode key={group.title} group={group} />
        ))}
      </ul>
    </div>
  );
};

export const IncomeTree = ({ caption }: { caption?: string }) => (
  <figure className="container-px max-w-5xl mx-auto mt-6 md:mt-8">
    <div className="rounded-2xl border border-border bg-card/60 p-4 md:p-6">
      <div className="flex flex-wrap gap-2">
        <span className="badge-tag">
          {nbsp("Максимизация эффективности текущих доходов")}
        </span>
        <span className="badge-tag">{nbsp("Финансовый план на 5–10 лет")}</span>
      </div>

      <div className="mt-5 space-y-5 md:mt-6 md:space-y-7 divide-y divide-border/60 [&>*+*]:pt-5 md:[&>*+*]:pt-7">
        {branches.map((branch, i) => (
          <BranchRow key={branch.title} branch={branch} index={i} />
        ))}
      </div>
    </div>
    {caption && (
      <figcaption className="mt-3 text-center font-body text-sm text-foreground/55">
        {caption}
      </figcaption>
    )}
  </figure>
);
