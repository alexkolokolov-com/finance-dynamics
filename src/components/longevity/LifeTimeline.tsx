import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { longevityPeople, type LongevityGroup, type LongevityPerson } from "@/data/longevityPeople";
import { nbsp } from "@/lib/nbsp";

const MAX_AGE = 120;
const pct = (age: number) => (age / MAX_AGE) * 100;

const eras = [
  {
    range: "0–40 лет",
    title: "Жизнь на своих силах",
    text: "Мы учимся, пробуем, строим профессию и чаще всего обмениваем своё время на доход.",
  },
  {
    range: "40–80 лет",
    title: "Работает накопленное",
    text: "К личной энергии добавляются опыт, репутация, связи и капитал. Начинать новое уже не значит начинать с нуля.",
  },
  {
    range: "80–120 лет",
    title: "Третья половина",
    text: "Ещё сорок лет, которых почти нет в финансовых планах. Но у жизни, работы и решений здесь есть продолжение.",
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
  onClose,
}: {
  person: LongevityPerson;
  active: boolean;
  muted: boolean;
  lane: number;
  onSelect: () => void;
  onClose: () => void;
}) => {
  const below = person.group === "after80";
  const offset = 46 + lane * 68;

  return (
    <div
      className={`group absolute z-20 w-[108px] -translate-x-1/2 text-center transition-opacity ${
        muted ? "pointer-events-none opacity-15" : "opacity-100"
      } ${below ? "top-1/2" : "bottom-1/2"}`}
      style={
        below
          ? { left: `${pct(person.age)}%`, marginTop: `${offset}px` }
          : { left: `${pct(person.age)}%`, marginBottom: `${offset}px` }
      }
    >
      <Button
        type="button"
        variant="ghost"
        aria-expanded={active}
        aria-label={`${person.name}, ${person.age} ${yearsWord(person.age)}`}
        onClick={onSelect}
        className="peer h-auto w-full flex-col gap-1.5 whitespace-normal rounded-none p-0 text-center hover:bg-transparent focus-visible:ring-offset-4"
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
      </Button>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 w-px -translate-x-1/2 bg-border ${
          below ? "bottom-full h-10" : "top-full h-10"
        }`}
      />

      <aside
        aria-live="polite"
        className={`absolute left-1/2 z-50 hidden w-[310px] -translate-x-1/2 border border-border bg-card p-4 text-left shadow-hard transition duration-150 sm:block ${
          below ? "bottom-[calc(100%+14px)]" : "top-[calc(100%+14px)]"
        } ${
          active
            ? "visible translate-y-0 opacity-100"
            : `invisible opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                below ? "translate-y-2" : "-translate-y-2"
              }`
        }`}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Закрыть историю"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="absolute right-2 top-2 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
        <p className="pr-8 font-body text-xs text-muted-foreground">
          {nbsp(`${person.age} ${yearsWord(person.age)} · ${person.profession}`)}
        </p>
        <h3 className="mt-1 pr-8 font-display text-xl font-semibold leading-tight">{nbsp(person.name)}</h3>
        <p className="mt-3 font-body text-sm font-medium leading-snug">{nbsp(person.headline)}</p>
        <p className="mt-3 border-t border-border pt-3 font-body text-xs leading-relaxed text-foreground/65">
          {nbsp(person.facts[0])}
        </p>
        <a
          href={person.source}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 font-body text-xs font-medium text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent"
        >
          {nbsp("Источник")}
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </aside>
    </div>
  );
};

const MobilePersonPopup = ({ person, onClose }: { person: LongevityPerson; onClose: () => void }) => (
  <aside
    aria-live="polite"
    className="fixed inset-x-4 bottom-4 z-[70] border border-border bg-card p-4 text-left shadow-hard sm:hidden"
  >
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Закрыть историю"
      onClick={onClose}
      className="absolute right-2 top-2 h-8 w-8"
    >
      <X className="h-4 w-4" />
    </Button>
    <p className="pr-9 font-body text-xs text-muted-foreground">
      {nbsp(`${person.age} ${yearsWord(person.age)} · ${person.profession}`)}
    </p>
    <h3 className="mt-1 pr-9 font-display text-xl font-semibold leading-tight">{nbsp(person.name)}</h3>
    <p className="mt-3 font-body text-sm font-medium leading-snug">{nbsp(person.headline)}</p>
    <p className="mt-3 border-t border-border pt-3 font-body text-xs leading-relaxed text-foreground/65">
      {nbsp(person.facts[0])}
    </p>
    <a
      href={person.source}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1.5 font-body text-xs font-medium text-accent underline decoration-accent/35 underline-offset-4"
    >
      {nbsp("Источник")}
      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
    </a>
  </aside>
);

export const LifeTimeline = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const selected = selectedId ? longevityPeople.find((person) => person.id === selectedId) : undefined;

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
    <section id="atlas" className="border-y border-border bg-card py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
        <div className="max-w-4xl">
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">
            {nbsp("У длинной жизни может быть три половины")}
          </h2>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-foreground/70 sm:text-lg">
            {nbsp(
              "Обычно финансовый план строят вокруг одной границы – пенсии. Но если смотреть на жизнь как на горизонт в 120 лет, после привычной первой и второй половины возникает ещё один полноценный отрезок. Шкала ниже показывает не абстрактную возможность, а реальные биографии."
            )}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-body text-sm leading-relaxed text-foreground/65">
            {nbsp("Возраст в круге – момент позднего старта или активной работы. Наведите на человека или нажмите, чтобы прочитать историю.")}
          </p>
          <div className="flex flex-wrap gap-2" aria-label="Фильтр биографий">
            {([
              ["all", "Все истории"],
              ["after45", "Главное после 45"],
              ["after80", "Работали после 80"],
            ] as const).map(([value, label]) => (
              <Button
                key={value}
                type="button"
                variant={filter === value ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setFilter(value);
                  setSelectedId(null);
                }}
                className="rounded-full"
              >
                {nbsp(label)}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between sm:hidden">
          <p className="font-body text-xs text-muted-foreground">{nbsp("Листайте шкалу по горизонтали")}</p>
          <div className="flex gap-2">
            <Button type="button" size="icon" variant="outline" aria-label="Назад по шкале" onClick={() => scrollScene(-1)}>
              <ChevronLeft />
            </Button>
            <Button type="button" size="icon" variant="outline" aria-label="Вперёд по шкале" onClick={() => scrollScene(1)}>
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div ref={viewportRef} className="mt-4 overflow-x-auto pb-3 [scrollbar-width:thin] sm:mt-7">
          <div className="relative h-[760px] min-w-[1120px] lg:min-w-full">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-foreground/30" />

            {eras.map((era, index) => (
              <div
                key={era.range}
                className={`pointer-events-none absolute inset-y-0 border-l border-border px-5 pt-5 ${
                  index === 1 ? "bg-accent/[0.04]" : index === 2 ? "border-r bg-foreground/[0.035]" : "bg-background/35"
                }`}
                style={{ left: `${index * 33.333}%`, width: "33.333%" }}
              >
                <p className={`font-display text-lg font-semibold ${index === 2 ? "text-accent" : "text-foreground"}`}>
                  {nbsp(era.range)}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{nbsp(era.title)}</h3>
                <p className="mt-2 max-w-[290px] font-body text-[13px] leading-relaxed text-foreground/60">
                  {nbsp(era.text)}
                </p>
                <p className={`absolute bottom-5 left-5 font-display text-5xl font-semibold ${index === 2 ? "text-accent/20" : "text-foreground/[0.09]"}`}>
                  {index + 1}
                </p>
              </div>
            ))}

            <div
              className="pointer-events-none absolute inset-y-0 border-x border-dashed border-accent/45 bg-accent/[0.06]"
              style={{ left: `${pct(35)}%`, width: `${pct(10)}%` }}
            >
              <span className="absolute left-1/2 top-[168px] -translate-x-1/2 whitespace-nowrap bg-card px-2 py-1 font-body text-xs font-medium text-accent">
                {nbsp("35–45: меняется источник ценности")}
              </span>
            </div>

            {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
              <div
                key={tick}
                className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pct(tick)}%` }}
              >
                <span className="block h-3 w-px bg-foreground/40" />
                <span className="absolute left-1/2 top-5 -translate-x-1/2 font-body text-[11px] text-muted-foreground">
                  {tick}
                </span>
              </div>
            ))}

            {longevityPeople.map((person) => (
              <PersonPoint
                key={person.id}
                person={person}
                active={person.id === selectedId}
                muted={filter !== "all" && filter !== person.group}
                lane={laneById.get(person.id) ?? 0}
                onSelect={() => setSelectedId((current) => (current === person.id ? null : person.id))}
                onClose={() => setSelectedId(null)}
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
      {selected ? <MobilePersonPopup person={selected} onClose={() => setSelectedId(null)} /> : null}
    </section>
  );
};