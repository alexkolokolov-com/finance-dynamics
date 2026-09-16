import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { longevityPeople, type LongevityGroup, type LongevityPerson } from "@/data/longevityPeople";
import { nbsp } from "@/lib/nbsp";

const MAX_AGE = 120;
const pct = (age: number) => (age / MAX_AGE) * 100;

const eras = [
  {
    range: "0–40 лет",
    title: "Время и силы",
    text: "Мы учимся, пробуем и в основном обмениваем своё время на доход.",
  },
  {
    range: "40–80 лет",
    title: "Опыт начинает работать",
    text: "Растёт ценность решений, репутации, связей и накопленного капитала.",
  },
  {
    range: "80–120 лет",
    title: "Непосчитанная жизнь",
    text: "Отдельная эпоха, которой почти нет в финансовых планах.",
  },
] as const;

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

const yearsWord = (value: number) => {
  const lastTwo = value % 100;
  if (lastTwo > 10 && lastTwo < 20) return "лет";
  const last = value % 10;
  if (last === 1) return "год";
  if (last >= 2 && last <= 4) return "года";
  return "лет";
};

type Filter = "all" | LongevityGroup;

const PersonPoint = ({
  person,
  active,
  muted,
  lane,
  onSelect,
}: {
  person: LongevityPerson;
  active: boolean;
  muted: boolean;
  lane: number;
  onSelect: () => void;
}) => {
  const below = person.group === "after80";
  const offset = 42 + lane * 67;

  return (
    <Button
      type="button"
      variant="ghost"
      aria-pressed={active}
      aria-label={`${person.name}, ${person.age} ${yearsWord(person.age)}`}
      onClick={onSelect}
      className={`group absolute z-20 h-auto w-[108px] -translate-x-1/2 flex-col gap-1.5 whitespace-normal rounded-none p-0 text-center hover:bg-transparent focus-visible:ring-offset-4 ${
        muted ? "opacity-20" : "opacity-100"
      } ${below ? "top-1/2" : "bottom-1/2"}`}
      style={
        below
          ? { left: `${pct(person.age)}%`, marginTop: `${offset}px` }
          : { left: `${pct(person.age)}%`, marginBottom: `${offset}px` }
      }
    >
      {!below ? (
        <span className="order-1 font-body text-[12px] font-medium leading-tight text-foreground/70 group-hover:text-foreground">
          {nbsp(person.name)}
        </span>
      ) : null}
      <span
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-[13px] font-semibold transition duration-200 group-hover:scale-110 ${
          active
            ? "border-foreground bg-foreground text-primary-foreground shadow-hard"
            : person.group === "after45"
              ? "border-accent bg-background text-accent"
              : "border-foreground/35 bg-background text-foreground"
        }`}
      >
        {initials(person.name)}
        <span
          className={`absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full px-1 font-body text-[10px] font-semibold ${
            person.group === "after45"
              ? "bg-accent text-accent-foreground"
              : "bg-foreground text-primary-foreground"
          }`}
        >
          {person.age}
        </span>
      </span>
      {below ? (
        <span className="font-body text-[12px] font-medium leading-tight text-foreground/70 group-hover:text-foreground">
          {nbsp(person.name)}
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 w-px -translate-x-1/2 bg-border ${
          below ? "bottom-full h-10" : "top-full h-10"
        }`}
      />
    </Button>
  );
};

const PersonDetails = ({ person }: { person: LongevityPerson }) => (
  <aside className="border-t border-border bg-card p-5 sm:p-7 2xl:border-l 2xl:border-t-0 2xl:p-8" aria-live="polite">
    <div className="flex items-start gap-4">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent font-display text-lg font-semibold text-accent-foreground">
        {initials(person.name)}
      </span>
      <div className="min-w-0">
        <p className="font-body text-sm text-muted-foreground">
          {nbsp(`${person.age} ${yearsWord(person.age)} · ${person.profession}`)}
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">
          {nbsp(person.name)}
        </h2>
        <p className="mt-1 font-body text-sm text-muted-foreground">
          {nbsp(`${person.country} · ${person.years}`)}
        </p>
      </div>
    </div>

    <p className="mt-7 font-display text-xl font-medium leading-snug sm:text-2xl">
      {nbsp(person.headline)}
    </p>

    <div className="mt-7 space-y-4 border-t border-border pt-5">
      {person.facts.map((fact, index) => (
        <div key={fact} className="grid grid-cols-[1.5rem_1fr] gap-2">
          <span className="font-display text-sm font-semibold text-accent">{index + 1}</span>
          <p className="font-body text-[15px] leading-relaxed text-foreground/75">{nbsp(fact)}</p>
        </div>
      ))}
    </div>

    <a
      href={person.source}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-7 inline-flex items-center gap-2 font-body text-sm font-medium text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent"
    >
      {nbsp("Проверить источник")}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  </aside>
);

export const LifeTimeline = () => {
  const [age, setAge] = useState(38);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState("kroc");
  const viewportRef = useRef<HTMLDivElement>(null);

  const selected = longevityPeople.find((person) => person.id === selectedId) ?? longevityPeople[0];
  const laterThanYou = longevityPeople.filter((person) => person.age > age).length;
  const laneById = useMemo(() => {
    const result = new Map<string, number>();
    (["after45", "after80"] as const).forEach((group) => {
      const laneEnds: number[] = [];
      longevityPeople
        .filter((person) => person.group === group)
        .sort((a, b) => a.age - b.age)
        .forEach((person) => {
          const lane = laneEnds.findIndex((lastAge) => person.age - lastAge >= 9);
          const nextLane = lane === -1 ? laneEnds.length : lane;
          laneEnds[nextLane] = person.age;
          result.set(person.id, nextLane);
        });
    });
    return result;
  }, []);

  const scrollScene = (direction: -1 | 1) => {
    viewportRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  return (
    <section id="atlas" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid 2xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0 p-4 sm:p-7 lg:p-10">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
                  {nbsp("Найдите себя на шкале 0–120")}
                </h2>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/65">
                  {nbsp("Возраст внутри круга – момент позднего старта или активной работы. Нажмите на человека, чтобы открыть его историю.")}
                </p>
              </div>

              <div className="flex flex-wrap gap-2" aria-label="Фильтр биографий">
                {([
                  ["all", "Все 20"],
                  ["after45", "Главное после 45"],
                  ["after80", "Работали после 80"],
                ] as const).map(([value, label]) => (
                  <Button
                    key={value}
                    type="button"
                    variant={filter === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(value)}
                    className="rounded-full"
                  >
                    {nbsp(label)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-4 border-y border-border py-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor="life-age" className="font-body text-sm text-foreground/65">
                    {nbsp("Ваш возраст")}
                  </label>
                  <p className="font-display text-lg font-semibold">
                    {age} {nbsp(yearsWord(age))}
                  </p>
                </div>
                <input
                  id="life-age"
                  type="range"
                  min={18}
                  max={100}
                  value={age}
                  onChange={(event) => setAge(Number(event.target.value))}
                  className="mt-3 w-full accent-accent"
                />
              </div>
              <p className="max-w-xs font-body text-sm leading-relaxed text-foreground/65 sm:border-l sm:border-border sm:pl-5">
                <strong className="font-display text-2xl text-accent">{laterThanYou}</strong>{" "}
                {nbsp("человек сделал главное позже, чем вам сейчас")}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between sm:hidden">
              <p className="font-body text-xs text-muted-foreground">{nbsp("Листайте шкалу")}</p>
              <div className="flex gap-2">
                <Button type="button" size="icon" variant="outline" aria-label="Назад по шкале" onClick={() => scrollScene(-1)}>
                  <ChevronLeft />
                </Button>
                <Button type="button" size="icon" variant="outline" aria-label="Вперёд по шкале" onClick={() => scrollScene(1)}>
                  <ChevronRight />
                </Button>
              </div>
            </div>

            <div ref={viewportRef} className="mt-4 overflow-x-auto pb-3 [scrollbar-width:thin] sm:mt-8">
              <div className="relative h-[670px] min-w-[1120px] sm:h-[700px] lg:min-w-full">
                <div className="absolute inset-x-0 top-1/2 h-px bg-foreground/25" />

                {eras.map((era, index) => (
                  <div
                    key={era.range}
                    className={`absolute inset-y-0 border-l border-border px-5 pt-4 ${
                      index === 1 ? "bg-accent/[0.045]" : "bg-background/35"
                    } ${index === 2 ? "border-r" : ""}`}
                    style={{ left: `${index * 33.333}%`, width: "33.333%" }}
                  >
                    <p className="font-display text-[17px] font-semibold">{nbsp(era.range)}</p>
                    <p className="mt-1 max-w-[270px] font-body text-[13px] leading-relaxed text-foreground/55">
                      {nbsp(era.text)}
                    </p>
                    <p className="absolute bottom-4 left-5 font-display text-2xl font-semibold text-foreground/[0.12]">
                      {nbsp(era.title)}
                    </p>
                  </div>
                ))}

                <div
                  className="absolute inset-y-0 border-x border-dashed border-accent/45 bg-accent/[0.06]"
                  style={{ left: `${pct(35)}%`, width: `${pct(10)}%` }}
                >
                  <span className="absolute left-1/2 top-[118px] -translate-x-1/2 whitespace-nowrap font-body text-xs font-medium text-accent">
                    {nbsp("перелом 35–45")}
                  </span>
                </div>

                {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
                  <div
                    key={tick}
                    className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${pct(tick)}%` }}
                  >
                    <span className="block h-3 w-px bg-foreground/35" />
                    <span className="absolute left-1/2 top-5 -translate-x-1/2 font-body text-[11px] text-muted-foreground">
                      {tick}
                    </span>
                  </div>
                ))}

                <div
                  className="pointer-events-none absolute inset-y-0 z-30 w-px bg-accent transition-[left] duration-200"
                  style={{ left: `${pct(age)}%` }}
                >
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent px-3 py-1 font-body text-xs font-semibold text-accent-foreground shadow-hard">
                    {nbsp("вы здесь")}
                  </span>
                </div>

                {longevityPeople.map((person) => (
                  <PersonPoint
                    key={person.id}
                    person={person}
                    active={person.id === selected.id}
                    muted={filter !== "all" && filter !== person.group}
                    lane={laneById.get(person.id) ?? 0}
                    onSelect={() => setSelectedId(person.id)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 font-body text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent" />
                {nbsp("Главное дело после 45")}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-foreground" />
                {nbsp("Активная работа после 80")}
              </span>
            </div>
          </div>

          <PersonDetails person={selected} />
        </div>
      </div>
    </section>
  );
};