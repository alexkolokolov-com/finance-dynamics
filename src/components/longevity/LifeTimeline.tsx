import { useMemo, useState } from "react";
import { nbsp } from "@/lib/nbsp";
import { longevityPeople } from "@/data/longevityPeople";

type Half = {
  id: "first" | "second" | "third";
  range: string;
  from: number;
  to: number;
  title: string;
  lead: string;
  points: string[];
};

const HALVES: Half[] = [
  {
    id: "first",
    range: "0–40",
    from: 0,
    to: 40,
    title: "Первая половина: вы растёте",
    lead:
      "Учёба, профессия, семья, карьера. Главный актив – вы сами: время, силы и способность зарабатывать больше, чем вчера.",
    points: [
      "Доход растёт быстрее, чем капитал",
      "Почти весь доход – активный: перестали работать, деньги закончились",
      "Ошибки ещё можно исправить временем",
    ],
  },
  {
    id: "second",
    range: "40–80",
    from: 40,
    to: 80,
    title: "Вторая половина: вы перестраиваетесь",
    lead:
      "Ресурс организма и темп работы замедляются, а цели меняются. Расти дальше только за счёт своих часов уже не получится.",
    points: [
      "Доля пассивного дохода должна расти каждый год",
      "Экстенсивный рост заканчивается: важнее качество решений, а не количество усилий",
      "Появляются долгие обязательства: дети, родители, здоровье",
    ],
  },
  {
    id: "third",
    range: "80–120",
    from: 80,
    to: 120,
    title: "Третья половина: она у вас, скорее всего, будет",
    lead:
      "Медицина, профилактика и бережное отношение к здоровью делают долгую и полноценную жизнь реальным сценарием, а не мечтой. Её тоже нужно оплатить.",
    points: [
      "Капитал живёт дольше вас и работает на вас, а не наоборот",
      "Деньги нужны на здоровье и помощь, а не только на быт",
      "Смысл и занятость важны не меньше денег",
    ],
  },
];

const CRISIS = { from: 35, to: 45 };

const SCENARIOS = [
  {
    id: "down" as const,
    label: "Жизнь пошла на спад",
    text:
      "Кажется, что возможности упущены, а дальше остаётся дотянуть до пенсии. Решения принимаются от страха: лишь бы не потерять то, что есть.",
    marks: [
      "Доход упирается в потолок должности",
      "Капитал не формируется, всё уходит на текущий уровень жизни",
      "Горизонт планирования сжимается до года",
    ],
  },
  {
    id: "up" as const,
    label: "Вторая молодость",
    text:
      "Опыт и связи начинают приносить деньги без вашего постоянного присутствия. Капитал и пассивный доход растут, а вместе с ними и свобода выбора.",
    marks: [
      "Часть дохода приходит от капитала, а не от часов",
      "Есть план на 20–40 лет вперёд, а не до конца года",
      "Появляется выбор: чем заниматься, а не где платят",
    ],
  },
];

const pct = (age: number) => (age / 120) * 100;

export const LifeTimeline = () => {
  const [openId, setOpenId] = useState<Half["id"]>("second");
  const [age, setAge] = useState(38);
  const [scenario, setScenario] = useState<"down" | "up">("up");
  const [person, setPerson] = useState<string | null>(null);

  const open = HALVES.find((h) => h.id === openId)!;
  const inCrisis = age >= CRISIS.from && age <= CRISIS.to;
  const ahead = Math.max(0, 120 - age);
  const activePerson = useMemo(
    () => longevityPeople.find((p) => p.name === person) ?? null,
    [person]
  );

  return (
    <div className="container-px max-w-5xl mx-auto">
      <div className="rounded-2xl border border-border bg-card p-5 md:p-8">
        {/* Ползунок возраста */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="longevity-age"
            className="font-body text-[15px] text-foreground/70"
          >
            {nbsp("Сколько вам лет")}
          </label>
          <div className="font-body text-[15px] text-foreground/70">
            <strong className="text-foreground">{age}</strong>
            {nbsp(" лет · впереди ещё ")}
            <strong className="text-accent">{ahead}</strong>
            {nbsp(" лет по этой схеме")}
          </div>
        </div>
        <input
          id="longevity-age"
          type="range"
          min={18}
          max={100}
          step={1}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="mt-3 w-full accent-accent"
        />

        {/* Горизонтальная шкала: планшет и десктоп */}
        <div className="hidden sm:block mt-8">
          <div className="relative h-24">
            {/* три половины */}
            <div className="absolute inset-x-0 top-6 flex gap-1">
              {HALVES.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setOpenId(h.id)}
                  style={{ width: `${pct(h.to - h.from)}%` }}
                  className={`h-12 rounded-lg border text-left px-3 transition-colors ${
                    openId === h.id
                      ? "border-accent bg-accent/10"
                      : "border-border bg-background hover:border-accent/60"
                  }`}
                >
                  <span className="block font-display font-semibold text-sm">
                    {h.range}
                  </span>
                  <span className="block font-body text-xs text-foreground/60 truncate">
                    {h.id === "first"
                      ? nbsp("рост")
                      : h.id === "second"
                      ? nbsp("перестройка")
                      : nbsp("долголетие")}
                  </span>
                </button>
              ))}
            </div>

            {/* переходный интервал */}
            <div
              className="absolute top-4 h-16 rounded-md border border-dashed border-accent/70 bg-accent/5 pointer-events-none"
              style={{
                left: `${pct(CRISIS.from)}%`,
                width: `${pct(CRISIS.to - CRISIS.from)}%`,
              }}
            />
            <div
              className="absolute top-0 -translate-x-1/2 font-body text-[11px] text-accent whitespace-nowrap"
              style={{ left: `${pct((CRISIS.from + CRISIS.to) / 2)}%` }}
            >
              {nbsp("перелом 35–45")}
            </div>

            {/* маркер возраста */}
            <div
              className="absolute top-3 bottom-2 w-px bg-foreground"
              style={{ left: `${pct(age)}%` }}
            >
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground" />
            </div>
          </div>

          {/* люди на шкале */}
          {longevityPeople.length > 0 && (
            <div className="relative h-16 mt-2 border-t border-dashed border-border">
              {longevityPeople.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onMouseEnter={() => setPerson(p.name)}
                  onFocus={() => setPerson(p.name)}
                  onClick={() => setPerson(p.name)}
                  aria-label={p.name}
                  className="absolute top-2 -translate-x-1/2 flex flex-col items-center gap-1 group"
                  style={{ left: `${pct(p.age)}%` }}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      person === p.name
                        ? "bg-accent"
                        : "bg-foreground/30 group-hover:bg-accent"
                    }`}
                  />
                  <span className="font-body text-[11px] text-foreground/60 group-hover:text-accent">
                    {p.age}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Подпись выбранного человека: планшет и десктоп */}
        {longevityPeople.length > 0 && (
          <p className="hidden sm:block mt-2 font-body text-[15px] leading-relaxed text-foreground/75 min-h-[3rem]">
            {activePerson
              ? nbsp(`${activePerson.name}, ${activePerson.age}: ${activePerson.note}`)
              : nbsp("Наведите на точку внизу шкалы: это люди, которые оставались в деле после 80.")}
          </p>
        )}

        {/* Вертикальный выбор половины: телефон */}
        <div className="sm:hidden mt-6 space-y-2">
          {HALVES.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setOpenId(h.id)}
              className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                openId === h.id ? "border-accent bg-accent/10" : "border-border"
              }`}
            >
              <span className="font-display font-semibold text-[15px]">
                {nbsp(`${h.range} лет`)}
              </span>
            </button>
          ))}
        </div>

        {/* Раскрытая половина */}
        <div className="mt-6 md:mt-8 border-t border-border pt-6">
          <h3 className="font-display font-semibold text-xl md:text-2xl leading-snug">
            {nbsp(open.title)}
          </h3>
          <p className="mt-3 font-body text-[17px] leading-relaxed text-foreground/80">
            {nbsp(open.lead)}
          </p>
          <ul className="mt-4 space-y-2">
            {open.points.map((t) => (
              <li
                key={t}
                className="font-body text-[15px] md:text-base leading-relaxed text-foreground/75 pl-4 relative"
              >
                <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-accent" />
                {nbsp(t)}
              </li>
            ))}
          </ul>
        </div>

        {/* Переломный момент и два сценария */}
        <div className="mt-6 md:mt-8 rounded-xl border border-border bg-background p-5 md:p-6">
          <p className="font-body text-[15px] text-foreground/70">
            {inCrisis
              ? nbsp("В вашем возрасте развилка происходит прямо сейчас. Какой сценарий вам ближе?")
              : nbsp("Между первой и второй половиной есть развилка: 35–45 лет. Два сценария из одной точки:")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScenario(s.id)}
                className={`rounded-full border px-4 py-2 font-body text-[14px] transition-colors ${
                  scenario === s.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-foreground/70 hover:border-accent/60"
                }`}
              >
                {nbsp(s.label)}
              </button>
            ))}
          </div>
          {SCENARIOS.filter((s) => s.id === scenario).map((s) => (
            <div key={s.id} className="mt-4">
              <p className="font-body text-[16px] leading-relaxed text-foreground/85">
                {nbsp(s.text)}
              </p>
              <ul className="mt-3 space-y-1.5">
                {s.marks.map((m) => (
                  <li
                    key={m}
                    className="font-body text-[14px] leading-relaxed text-foreground/70 pl-4 relative"
                  >
                    <span className="absolute left-0 top-[0.65em] w-1 h-1 rounded-full bg-foreground/40" />
                    {nbsp(m)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
