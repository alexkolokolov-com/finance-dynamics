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
          { title: "Карьерный план", notes: ["самостоятельно", "консультант", "тренинги"] },
          { title: "Ментор (подойдёт всем)", notes: ["на работе", "вне работы", "контакты менторов"] },
          { title: "«Разговор с руководителем»", notes: ["«Деньги»", "«Развитие»", "«Обстоятельства»"] },
        ],
      },
      {
        title: "Альтернативная карьера",
        items: [
          { title: "Карьерный план", notes: ["консультант"] },
          { title: "Вакансии и executive search", notes: ["агентства и сайты", "спросить у того, кто ушёл"] },
          { title: "Бывшие коллеги", notes: ["партнёры, конкуренты"] },
        ],
      },
      {
        title: "Новая профессия",
        items: [
          { title: "Аналитик данных" },
          { title: "IT", notes: ["получается у 2–3 из 10, зарплата 300К+"] },
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
          { title: "Нетворкинг", notes: ["1 новый контакт в неделю", "форумы, выступления, соцсети"] },
          { title: "Смотреть, где можно консультировать", notes: ["визитка себя или бизнеса"] },
        ],
      },
      {
        title: "Бизнес",
        items: [{ title: "Выбрать одно направление" }, { title: "Партнёрства" }],
      },
      {
        title: "Социальные инструменты",
        items: [
          { title: "Экспертный блог", notes: ["соцсети", "платформы услуг", "инфопродукт или реклама"] },
          { title: "Форумы и мастермайнды" },
          { title: "Друзья: говорить про деньги", notes: ["кофе раз в 2 недели"] },
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
          { title: "Что актуально через 5 лет?", notes: ["сколько часов перерабатываешь?"] },
          { title: "Базовое", notes: ["НДФЛ-вычеты, кешбэки, ИИС, ДМС"] },
          { title: "Финансовые услуги как инструмент", notes: ["20–30 тыс/мес при 2 ч/день"] },
        ],
      },
      {
        title: "Монетизация хобби",
        items: [
          { title: "Тематические сообщества", notes: ["поиск партнёров и клиентов"] },
          { title: "Монетизация обучений", notes: ["план монетизации ДО обучения"] },
          { title: "Бизнес" },
        ],
      },
      {
        title: "«Государство»",
        items: [{ title: "Гранты", notes: ["учёные", "для детей", "стартапы"] }, { title: "Тендеры" }],
      },
      {
        title: "Творчество",
        items: [{ title: "Выступления" }, { title: "Книги и музыка" }],
      },
      {
        title: "Семья",
        items: [{ title: "Поиск партнёра" }, { title: "Детские каналы и контент" }],
      },
    ],
  },
];

/* ---------- layout ---------- */

const W = 1200;
const COL_W = 360;
const COL_GAP = 60;
const ROOT_Y = 46;
const BRANCH_Y = 150;
const GROUP_GAP = 22;
const TITLE_LH = 21;
const ITEM_LH = 18;
const NOTE_LH = 15;

const wrap = (text: string, maxChars: number) => {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
};

type LaidItem = { lines: string[]; noteLines: string[]; y: number; h: number };
type LaidGroup = { titleLines: string[]; y: number; h: number; items: LaidItem[] };
type LaidCol = { x: number; groups: LaidGroup[]; bottom: number };

const layout = (): { cols: LaidCol[]; height: number } => {
  const cols = branches.map((branch, ci) => {
    const x = (W - (COL_W * 3 + COL_GAP * 2)) / 2 + ci * (COL_W + COL_GAP);
    let y = BRANCH_Y + 54;
    const groups: LaidGroup[] = branch.groups.map((g) => {
      const titleLines = wrap(g.title, 30);
      let gy = y;
      let inner = titleLines.length * TITLE_LH + 8;
      const items: LaidItem[] = g.items.map((it) => {
        const lines = wrap(it.title, 38);
        const noteLines = it.notes ? wrap(it.notes.join(" · "), 44) : [];
        const h = lines.length * ITEM_LH + noteLines.length * NOTE_LH + 6;
        const iy = gy + inner;
        inner += h;
        return { lines, noteLines, y: iy, h };
      });
      const laid: LaidGroup = { titleLines, y: gy, h: inner, items };
      y = gy + inner + GROUP_GAP;
      return laid;
    });
    return { x, groups, bottom: y - GROUP_GAP };
  });
  return { cols, height: Math.max(...cols.map((c) => c.bottom)) + 30 };
};

const { cols, height: H } = layout();

const Map = () => (
  <svg
    viewBox={`0 0 ${W} ${H}`}
    className="w-full h-auto"
    role="img"
    aria-label="Майнд-карта дерева роста доходов: три направления — найм, работа на себя и общие инструменты"
  >
    {/* root */}
    <g>
      <rect
        x={W / 2 - 250}
        y={ROOT_Y - 24}
        width={500}
        height={48}
        rx={24}
        fill="hsl(var(--accent))"
      />
      <text
        x={W / 2}
        y={ROOT_Y + 6}
        textAnchor="middle"
        fill="hsl(var(--accent-foreground))"
        className="font-display"
        fontSize={19}
        fontWeight={600}
      >
        Дерево роста доходов
      </text>
    </g>

    {cols.map((col, ci) => {
      const cx = col.x + COL_W / 2;
      const spineX = col.x + 8;
      return (
        <g key={branches[ci].title}>
          {/* root -> branch */}
          <path
            d={`M ${W / 2} ${ROOT_Y + 26} C ${W / 2} ${BRANCH_Y - 40}, ${cx} ${ROOT_Y + 40}, ${cx} ${BRANCH_Y - 20}`}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* branch pill */}
          <rect
            x={cx - 90}
            y={BRANCH_Y - 20}
            width={180}
            height={40}
            rx={20}
            fill="hsl(var(--foreground))"
          />
          <text
            x={cx}
            y={BRANCH_Y + 6}
            textAnchor="middle"
            fill="hsl(var(--background))"
            className="font-display"
            fontSize={17}
            fontWeight={600}
          >
            {branches[ci].title}
          </text>
          {/* spine */}
          <path
            d={`M ${cx} ${BRANCH_Y + 22} C ${cx} ${BRANCH_Y + 40}, ${spineX} ${BRANCH_Y + 30}, ${spineX} ${BRANCH_Y + 54} L ${spineX} ${col.bottom - 6}`}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {col.groups.map((g, gi) => {
            const gx = col.x + 30;
            return (
              <g key={gi}>
                {/* twig to group */}
                <path
                  d={`M ${spineX} ${g.y + 4} C ${spineX + 10} ${g.y + 4}, ${gx - 18} ${g.y + 4}, ${gx - 8} ${g.y + 4}`}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <circle cx={gx - 8} cy={g.y + 4} r={3.5} fill="hsl(var(--accent))" />
                {g.titleLines.map((line, li) => (
                  <text
                    key={li}
                    x={gx}
                    y={g.y + 9 + li * TITLE_LH}
                    fill="hsl(var(--foreground))"
                    className="font-display"
                    fontSize={16}
                    fontWeight={600}
                  >
                    {nbsp(line)}
                  </text>
                ))}
                {/* items */}
                {g.items.map((it, ii) => (
                  <g key={ii}>
                    <path
                      d={`M ${gx + 4} ${it.y - 4} L ${gx + 4} ${it.y + 6} L ${gx + 14} ${it.y + 6}`}
                      fill="none"
                      stroke="hsl(var(--accent) / 0.45)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                    />
                    {it.lines.map((line, li) => (
                      <text
                        key={li}
                        x={gx + 20}
                        y={it.y + 10 + li * ITEM_LH}
                        fill="hsl(var(--foreground) / 0.85)"
                        className="font-body"
                        fontSize={14}
                      >
                        {nbsp(line)}
                      </text>
                    ))}
                    {it.noteLines.map((line, li) => (
                      <text
                        key={`n${li}`}
                        x={gx + 20}
                        y={it.y + 10 + it.lines.length * ITEM_LH + li * NOTE_LH}
                        fill="hsl(var(--foreground) / 0.5)"
                        className="font-body"
                        fontSize={12}
                      >
                        {nbsp(line)}
                      </text>
                    ))}
                  </g>
                ))}
              </g>
            );
          })}
        </g>
      );
    })}
  </svg>
);

export const IncomeTree = ({ caption }: { caption?: string }) => (
  <figure className="container-px max-w-5xl mx-auto mt-6 md:mt-8">
    {/* desktop / tablet: full vertical mind map */}
    <div className="hidden sm:block rounded-2xl border border-border bg-card/60 p-4 md:p-6">
      <Map />
    </div>

    {/* mobile: square frame, pan to explore */}
    <div className="sm:hidden">
      <div className="relative aspect-square overflow-auto rounded-2xl border border-border bg-card/60">
        <div className="w-[860px] p-4">
          <Map />
        </div>
      </div>
      <p className="mt-2 text-center font-body text-xs text-foreground/45">
        {nbsp("Проведите по карте, чтобы рассмотреть детали")}
      </p>
    </div>

    {caption && (
      <figcaption className="mt-3 text-center font-body text-sm text-foreground/55">
        {caption}
      </figcaption>
    )}
  </figure>
);
