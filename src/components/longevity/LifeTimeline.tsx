import { useMemo, useState } from "react";
import { longevityPeople, type LongevityPerson } from "@/data/longevityPeople";
import { nbsp } from "@/lib/nbsp";

const MIN_AGE = 0;
const MAX_AGE = 120;

const pct = (age: number) => ((age - MIN_AGE) / (MAX_AGE - MIN_AGE)) * 100;

const BANDS = [
  {
    id: "first",
    from: 0,
    to: 40,
    title: "0–40",
    note: "Доход растёт за счёт времени и сил: учимся, работаем руками и часами",
  },
  {
    id: "second",
    from: 40,
    to: 80,
    title: "40–80",
    note: "Часов больше не станет. Растёт то, что работает без вашего присутствия",
  },
  {
    id: "third",
    from: 80,
    to: 120,
    title: "80–120",
    note: "Эпоха, которой нет ни в одном пенсионном расчёте, а прожить её придётся",
  },
] as const;

const CRISIS = { from: 35, to: 45 };

/** Раскладывает точки по дорожкам, чтобы близкие возрасты не наезжали друг на друга */
const toLanes = (people: LongevityPerson[], minGap: number) => {
  const lanes: LongevityPerson[][] = [];
  [...people]
    .sort((a, b) => a.age - b.age)
    .forEach((p) => {
      const lane = lanes.find((l) => p.age - l[l.length - 1].age >= minGap);
      if (lane) lane.push(p);
      else lanes.push([p]);
    });
  return lanes;
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

const yearsWord = (n: number) => {
  const t = n % 100;
  if (t > 10 && t < 20) return "лет";
  const o = n % 10;
  if (o === 1) return "год";
  if (o >= 2 && o <= 4) return "года";
  return "лет";
};

export const LifeTimeline = () => {
  const [age, setAge] = useState(38);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const after45 = useMemo(
    () => longevityPeople.filter((p) => p.group === "after45"),
    []
  );
  const after80 = useMemo(
    () => longevityPeople.filter((p) => p.group === "after80"),
    []
  );

  const selected =
    longevityPeople.find((p) => p.id === selectedId) ?? null;

  const laterThanYou = longevityPeople.filter((p) => p.age > age).length;

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Ваш возраст */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <label
              htmlFor="age"
              className="font-body text-[15px] text-foreground/70"
            >
              {nbsp("Сколько вам лет")}
            </label>
            <p className="font-body text-[15px] text-foreground/70">
              <span className="font-display font-semibold text-foreground">
                {age}
              </span>{" "}
              {nbsp(`${yearsWord(age)} · впереди ещё`)}{" "}
              <span className="font-display font-semibold text-accent">
                {MAX_AGE - age}
              </span>{" "}
              {nbsp(`${yearsWord(MAX_AGE - age)} по этой шкале`)}
            </p>
          </div>
          <input
            id="age"
            type="range"
            min={18}
            max={100}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-3 w-full accent-accent"
          />
          <p className="mt-3 font-body text-[15px] leading-relaxed text-foreground/75">
            <span className="font-display font-semibold text-accent">
              {laterThanYou}
            </span>{" "}
            {nbsp(
              `из ${longevityPeople.length} людей на этой шкале сделали своё главное дело позже, чем вам сейчас.`
            )}
          </p>
        </div>

        {/* Шкала: планшет и десктоп */}
        <div className="hidden sm:block mt-8">
          <div className="relative">
            {/* полосы половин */}
            <div className="relative h-11 rounded-md overflow-hidden border border-border">
              {BANDS.map((b, i) => (
                <div
                  key={b.id}
                  className={`absolute inset-y-0 flex items-center justify-center ${
                    i === 1 ? "bg-accent/10" : "bg-foreground/[0.04]"
                  } ${i > 0 ? "border-l border-border" : ""}`}
                  style={{
                    left: `${pct(b.from)}%`,
                    width: `${pct(b.to) - pct(b.from)}%`,
                  }}
                >
                  <span className="font-display font-semibold text-[13px] text-foreground/70">
                    {nbsp(`${b.title} лет`)}
                  </span>
                </div>
              ))}
              {/* зона перелома */}
              <div
                className="absolute inset-y-0 border-x border-dashed border-accent/70 bg-accent/15"
                style={{
                  left: `${pct(CRISIS.from)}%`,
                  width: `${pct(CRISIS.to) - pct(CRISIS.from)}%`,
                }}
              />
            </div>

            {/* деления */}
            <div className="relative h-5 mt-1">
              {[0, 20, 40, 60, 80, 100, 120].map((t) => (
                <span
                  key={t}
                  className="absolute -translate-x-1/2 font-body text-[11px] text-foreground/45"
                  style={{ left: `${pct(t)}%` }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* вы здесь */}
            <div
              className="absolute -top-6 bottom-6 w-px bg-foreground"
              style={{ left: `${pct(age)}%` }}
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[11px] text-foreground">
                {nbsp("вы здесь")}
              </span>
            </div>
          </div>

          {/* точки людей */}
          <div className="mt-6 space-y-6">
            {[
              {
                key: "after45",
                label: "Главное дело пришло после 45",
                people: after45,
                dark: false,
              },
              {
                key: "after80",
                label: "Работают и после 80",
                people: after80,
                dark: true,
              },
            ].map((row) => (
              <div key={row.key}>
                <p className="font-body text-[13px] text-foreground/55">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle ${
                      row.dark ? "bg-foreground/70" : "bg-accent"
                    }`}
                  />
                  {nbsp(row.label)}
                </p>
                <div className="mt-2 space-y-1.5">
                  {toLanes(row.people, 5).map((lane, li) => (
                    <div key={li} className="relative h-11">
                      {lane.map((p) => {
                        const active = selectedId === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() =>
                              setSelectedId(active ? null : p.id)
                            }
                            aria-label={`${p.name}, ${p.age}`}
                            className="absolute top-0 -translate-x-1/2 group"
                            style={{ left: `${pct(p.age)}%` }}
                          >
                            <span
                              className={`flex w-10 h-10 items-center justify-center rounded-full border font-display font-semibold text-[13px] transition-all ${
                                active
                                  ? "border-accent bg-accent text-background scale-110"
                                  : row.dark
                                    ? "border-border bg-card text-foreground/75 group-hover:border-accent group-hover:text-accent"
                                    : "border-accent/40 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background"
                              }`}
                            >
                              {initials(p.name)}
                            </span>
                            <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 font-body text-[11px] text-foreground/50 group-hover:text-accent">
                              {p.age}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Списки людей: телефон */}
        <div className="sm:hidden mt-8 space-y-6">
          {[
            { key: "after45", label: "Главное дело пришло после 45", people: after45 },
            { key: "after80", label: "Работают и после 80", people: after80 },
          ].map((row) => (
            <div key={row.key}>
              <p className="font-body text-[13px] text-foreground/55">
                {nbsp(row.label)}
              </p>
              <div className="mt-2 space-y-1.5">
                {[...row.people]
                  .sort((a, b) => a.age - b.age)
                  .map((p) => {
                    const active = selectedId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedId(active ? null : p.id)}
                        className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors ${
                          active ? "border-accent bg-accent/10" : "border-border"
                        }`}
                      >
                        <span
                          className={`flex w-9 h-9 shrink-0 items-center justify-center rounded-full border font-display font-semibold text-[13px] ${
                            active
                              ? "border-accent bg-accent text-background"
                              : "border-border text-foreground/70"
                          }`}
                        >
                          {initials(p.name)}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display font-semibold text-[15px]">
                            {nbsp(p.name)}
                          </span>
                          <span className="block font-body text-[13px] text-foreground/60">
                            {nbsp(`${p.age} ${yearsWord(p.age)} · ${p.profession}`)}
                          </span>
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Панель выбранного человека */}
        <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-6">
          {selected ? (
            <div>
              <div className="flex items-start gap-3">
                <span className="flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-accent font-display font-semibold text-[15px] text-background">
                  {initials(selected.name)}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-xl md:text-2xl leading-tight">
                    {nbsp(selected.name)}
                  </h3>
                  <p className="mt-1 font-body text-[14px] text-foreground/60">
                    {nbsp(
                      `${selected.profession} · ${selected.country} · ${selected.years}`
                    )}
                  </p>
                </div>
              </div>
              <p className="mt-4 font-body text-[17px] leading-relaxed text-foreground/85">
                <span className="font-display font-semibold text-accent">
                  {nbsp(`${selected.age} ${yearsWord(selected.age)}`)}
                </span>{" "}
                {nbsp(`– ${selected.headline}`)}
              </p>
              <ul className="mt-3 space-y-1.5">
                {selected.facts.map((f) => (
                  <li
                    key={f}
                    className="font-body text-[15px] leading-relaxed text-foreground/75 pl-4 relative"
                  >
                    <span className="absolute left-0 top-[0.65em] w-1 h-1 rounded-full bg-accent" />
                    {nbsp(f)}
                  </li>
                ))}
              </ul>
              <a
                href={selected.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-body text-[13px] text-foreground/50 underline underline-offset-2 hover:text-accent"
              >
                {nbsp("источник")}
              </a>
            </div>
          ) : (
            <p className="font-body text-[15px] leading-relaxed text-foreground/60">
              {nbsp(
                "Нажмите на любой круг: внутри – возраст, в котором человек начал главное дело или продолжал работать, и что за этим стояло."
              )}
            </p>
          )}
        </div>

        {/* Пояснение к половинам */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {BANDS.map((b) => (
            <div key={b.id} className="rounded-lg border border-border p-4">
              <p className="font-display font-semibold text-[15px]">
                {nbsp(`${b.title} лет`)}
              </p>
              <p className="mt-1.5 font-body text-[14px] leading-relaxed text-foreground/70">
                {nbsp(b.note)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
