import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import firstHalfIllustration from "@/assets/longevity-first-half.jpg";
import turnIllustration from "@/assets/longevity-turn.jpg";
import secondActIllustration from "@/assets/longevity-second-act.jpg";
import thirdHalfIllustration from "@/assets/longevity-third-half.jpg";
import {
  longevityStoryPeople,
  type StoryCategory,
  type StoryPerson,
} from "@/data/longevityStoryPeople";
import { nbsp } from "@/lib/nbsp";

const MAX_AGE = 120;
const xPct = (age: number) => 4 + (Math.min(age, MAX_AGE) / MAX_AGE) * 92;
const yByLevel = { 1: 54, 2: 65, 3: 76 } as const;
const TIMELINE_GEOMETRY = {
  start: 4,
  end: 96,
  firstEnd: xPct(40),
  secondEnd: xPct(80),
  crisisStart: xPct(35),
  crisisEnd: xPct(45),
  crisisCenter: xPct(40),
} as const;

const chapters = [
  {
    id: 1,
    range: "0–40",
    title: "Первая половина",
    paragraphs: [
      "Примерно с 20 вы работаете — это ваш активный доход. Достигаете базовых целей — семья, жильё и т. д. Ставите новые цели.",
    ],
    accent: true,
  },
  {
    id: 2,
    range: "35–45",
    title: "Точка перелома",
    paragraphs: [
      "Опыта и ресурсов становится больше. Но вместе с ними растут обязательства — дети, жильё, родители, бизнес, здоровье.",
      "Хочу ли я ещё двадцать лет жить по той же финансовой модели?",
    ],
    quote: true,
  },
  {
    id: 4,
    range: "40–80",
    title: "Второй акт",
    paragraphs: [
      "Новый бизнес. Новая профессия. Новый масштаб. Иногда — после провала первой карьеры.",
    ],
  },
  {
    id: 5,
    range: "80",
    title: "Обычно карта заканчивается здесь",
    paragraphs: [
      "Финансовые планы редко представляют человека после восьмидесяти кем-то кроме пенсионера. Но линия жизни на этом не заканчивается.",
    ],
  },
  {
    id: 6,
    range: "80–100",
    title: "Роль меняется. Субъектность остаётся.",
    paragraphs: [
      "Можно передать операционную роль, но продолжать создавать, консультировать, инвестировать и влиять.",
    ],
  },
  {
    id: 7,
    range: "100+",
    title: "После ста меняется сам тип доказательства",
    paragraphs: [
      "Способность учиться, создавать, работать и ставить новые задачи не обрывается в день столетия.",
    ],
  },
  {
    id: 8,
    range: "110–122",
    title: "Дальше точек мало — и это важно",
    paragraphs: [
      "После 110 лет активная деятельность становится исключительной редкостью. Край шкалы — документально подтверждённые 122 года Жанны Кальман.",
    ],
  },
] as const;

const storySteps = chapters.flatMap((item) => [
  { key: `${item.id}-zone`, item, phase: "zone" as const },
  { key: `${item.id}-card`, item, phase: "card" as const },
]);

const categoryLabels: Record<StoryCategory, string> = {
  business: "бизнес / технологии",
  culture: "культура / медиа",
  sport: "спорт / физическая активность",
  science: "образование / наука",
};

const categoryRing: Record<StoryCategory, string> = {
  business: "border-accent",
  culture: "border-foreground",
  sport: "border-muted-foreground",
  science: "border-accent/55",
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

const pointTop = (person: StoryPerson, compact: boolean) => {
  const base = compact ? 31 + (person.level - 1) * 22 : yByLevel[person.level];
  const peers = longevityStoryPeople
    .filter((candidate) => candidate.chapter === person.chapter && candidate.level === person.level)
    .sort((first, second) => first.age - second.age);
  const index = peers.findIndex((candidate) => candidate.id === person.id);
  const offsets = [-6, 6, 0] as const;
  return base + offsets[index % offsets.length];
};

const chapterImage = (chapter: number) => {
  if (chapter === 1) return firstHalfIllustration;
  if (chapter === 2) return turnIllustration;
  if (chapter === 4 || chapter === 5) return secondActIllustration;
  return thirdHalfIllustration;
};

const axisWidth = (chapter: number) => {
  if (chapter === 1) return 30;
  if (chapter === 2) return 34;
  if (chapter === 4 || chapter === 5) return 61;
  if (chapter === 6) return 88;
  return chapter >= 7 ? 96 : 30;
};

const Zone = ({ className, visible, range, title, start, end, labelClassName = "", delay = 0 }: { className: string; visible: boolean; range: string; title: string; start: number; end: number; labelClassName?: string; delay?: number }) => (
  <div
    className={`absolute bottom-0 origin-left rounded-lg border border-dashed border-border transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${className} ${
      visible ? "scale-x-100 opacity-100" : "scale-x-[0.94] opacity-0"
    }`}
    style={{ left: `${start}%`, width: `${end - start}%`, transitionDelay: visible ? `${delay}ms` : "0ms" }}
  >
    <div className={`absolute inset-x-2 top-4 text-left sm:inset-x-4 sm:top-6 ${labelClassName}`}>
      <p className="whitespace-nowrap font-display text-[clamp(2rem,4.2vw,4rem)] font-semibold leading-none text-accent">{nbsp(range)}</p>
      <p className="mt-3 font-display text-[clamp(0.95rem,1.7vw,1.5rem)] font-semibold leading-[0.95] text-foreground">
        {title.split(" ").map((word) => <span key={word} className="block sm:inline">{nbsp(word)}<span className="hidden sm:inline"> </span></span>)}
      </p>
    </div>
  </div>
);

const CrisisMarker = ({ visible }: { visible: boolean }) => {
  const left = TIMELINE_GEOMETRY.crisisStart;
  const width = TIMELINE_GEOMETRY.crisisEnd - TIMELINE_GEOMETRY.crisisStart;

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute bottom-0 z-[5] h-[70%] rounded-lg border border-dashed border-accent/25 bg-accent/[0.07] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${visible ? "scale-x-100 opacity-100" : "scale-x-[0.94] opacity-0"}`}
        style={{ left: `${left}%`, width: `${width}%` }}
      />

      <div
        className={`absolute bottom-[70%] z-20 flex -translate-x-1/2 flex-col items-center transition-[opacity,transform] duration-500 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        style={{ left: `${TIMELINE_GEOMETRY.crisisCenter}%` }}
      >
        <div className="rounded-md bg-accent px-3 py-2 text-center text-accent-foreground shadow-paper sm:px-4">
          <p className="whitespace-nowrap font-display text-xl font-semibold leading-none sm:text-2xl">{nbsp("35-45")}</p>
          <p className="mt-1 whitespace-nowrap font-display text-sm font-semibold leading-none">{nbsp("Кризис")}</p>
        </div>
        <span aria-hidden="true" className="h-4 w-px bg-accent sm:h-5" />
      </div>
    </>
  );
};

const PersonButton = ({ person, onSelect, compact = false, delay = 0 }: { person: StoryPerson; onSelect: () => void; compact?: boolean; delay?: number }) => (
  <Button
    type="button"
    variant="ghost"
    aria-label={`${person.name}, ${person.age}`}
    onClick={onSelect}
    className="pointer-events-auto group absolute z-20 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full p-0 hover:z-30 hover:bg-transparent sm:h-[58px] sm:w-[58px]"
    style={{ left: `${xPct(person.age)}%`, top: `${pointTop(person, compact)}%` }}
  >
    <span
      className={`${compact ? "" : "animate-timeline-point-in"} relative flex h-full w-full transition-transform duration-200 group-hover:scale-110 motion-reduce:animate-none ${compact ? "opacity-100" : "opacity-0"}`}
      style={{ animationDelay: compact ? undefined : `${delay}ms` }}
    >
      <span className={`flex h-full w-full items-center justify-center rounded-full border-[3px] bg-card font-display text-xs font-semibold shadow-hard sm:text-base ${categoryRing[person.cat]}`}>
        {initials(person.name)}
      </span>
      <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card px-1.5 py-0.5 font-body text-[9px] text-foreground sm:text-[11px]">
        {person.age}
      </span>
      <span className="absolute left-1/2 top-[calc(100%+7px)] w-24 -translate-x-1/2 text-center font-body text-[9px] font-semibold leading-tight text-foreground sm:w-32 sm:text-[11px]">
        {nbsp(person.name)}
      </span>
    </span>
  </Button>
);

const PersonDrawer = ({ person, onClose }: { person?: StoryPerson; onClose: () => void }) => (
  <>
    <div
      aria-hidden="true"
      onClick={onClose}
      className={`fixed inset-0 z-[90] bg-foreground/25 transition-opacity duration-300 ${person ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    />
    <aside
      role="dialog"
      aria-modal="true"
      aria-label={person?.name ?? "История"}
      className={`fixed inset-y-0 right-0 z-[100] w-[min(560px,94vw)] overflow-y-auto border-l border-border bg-card shadow-hard transition-transform duration-300 ${
        person ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Button type="button" size="icon" variant="outline" aria-label="Закрыть" onClick={onClose} className="absolute right-4 top-4 z-[110] rounded-full bg-card">
        <X className="h-4 w-4" />
      </Button>
      {person ? (
        <div className="px-6 pb-14 pt-12 sm:px-9">
          <div className={`mb-8 flex h-28 w-28 items-center justify-center rounded-full border-[5px] bg-background font-display text-4xl font-semibold ${categoryRing[person.cat]}`}>
            {initials(person.name)}
          </div>
          <p className="font-body text-sm font-semibold text-muted-foreground">{nbsp(`${person.age} лет · ${person.country}`)}</p>
          <h3 className="mt-2 font-display text-4xl font-semibold leading-none sm:text-5xl">{nbsp(person.name)}</h3>
          <p className="mt-3 font-body text-base text-foreground/70">{nbsp(person.role)}</p>
          {[
            ["До", person.before],
            ["Перелом / точка на шкале", person.turn],
            ["После", person.after],
          ].map(([label, text]) => (
            <div key={label} className="mt-7 border-t border-border pt-5">
              <p className="font-body text-xs font-semibold text-muted-foreground">{nbsp(label)}</p>
              <p className="mt-2 font-body text-base leading-relaxed">{nbsp(text)}</p>
            </div>
          ))}
          <a href={person.source} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold text-accent underline underline-offset-4">
            {nbsp("Источник")} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      ) : null}
    </aside>
  </>
);

export const LifeTimeline = () => {
  const [chapter, setChapter] = useState(1);
  const [selected, setSelected] = useState<StoryPerson>();
  const [filter, setFilter] = useState<"all" | StoryCategory>("all");
  const [phase, setPhase] = useState<"zone" | "card">("zone");
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const syncChapter = () => {
      frame = 0;
      const viewportAnchor = window.innerHeight * 0.5;
      let nearestChapter = 1;
      let nearestPhase: "zone" | "card" = "zone";
      let nearestDistance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((node) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportAnchor);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestChapter = Number(node.dataset.chapter);
          nearestPhase = node.dataset.phase === "card" ? "card" : "zone";
        }
      });

      setChapter((current) => current === nearestChapter ? current : nearestChapter);
      setPhase((current) => current === nearestPhase ? current : nearestPhase);
    };
    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncChapter);
    };

    syncChapter();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("pageshow", scheduleSync);
    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("pageshow", scheduleSync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelected(undefined);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const zoneVisibility = useMemo(
    () => ({
      first: chapter >= 1,
      turn: chapter >= 2,
      second: chapter >= 4,
      third: chapter >= 6,
    }),
    [chapter],
  );

  return (
    <>
      <div id="timeline" className="relative scroll-mt-16">
        <div data-timeline-scene className="pointer-events-none sticky top-16 z-10 flex h-[calc(100vh-4rem)] items-center justify-center px-2 sm:px-5">
          <div className="relative h-[min(590px,76vh)] w-full max-w-[1420px] overflow-hidden rounded-lg border border-border bg-card shadow-paper">
            <div className="absolute inset-x-3 bottom-5 top-5 sm:inset-x-8 sm:bottom-7 sm:top-7">
              <div className="absolute inset-x-0 bottom-[10%] top-[16%] sm:top-[12%]">
                <Zone className="h-[40%] bg-accent/[0.045]" start={TIMELINE_GEOMETRY.start} end={TIMELINE_GEOMETRY.firstEnd} visible={zoneVisibility.first} range="0-40" title="Первая половина" />
                <Zone className="h-[70%] bg-foreground/[0.035]" start={TIMELINE_GEOMETRY.firstEnd} end={TIMELINE_GEOMETRY.secondEnd} labelClassName="pl-2 sm:pl-5" visible={zoneVisibility.second} range="40-80" title="Второй акт" delay={140} />
                <Zone className="h-full bg-accent-soft/15" start={TIMELINE_GEOMETRY.secondEnd} end={TIMELINE_GEOMETRY.end} visible={zoneVisibility.third} range="80-120" title="Третья половина" delay={180} />
                <CrisisMarker visible={zoneVisibility.turn} />
              </div>
              <div className="absolute left-[4%] right-[4%] top-[90%] h-px bg-border" />
              <div className="absolute left-[4%] top-[90%] h-0.5 bg-foreground transition-[width] duration-1000 ease-out motion-reduce:transition-none" style={{ width: `${axisWidth(chapter)}%` }} />
              {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
                 <div key={tick} className="absolute top-[calc(90%+14px)] -translate-x-1/2 font-body text-[10px] text-muted-foreground sm:text-xs" style={{ left: `${xPct(tick)}%` }}>
                  <span className="absolute -top-[14px] left-1/2 h-2 w-px bg-muted-foreground" />{tick}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-30 -mt-[calc(100vh-4rem)] pointer-events-none">
          {storySteps.map(({ key, item, phase: stepPhase }, index) => (
            <section
              key={key}
              data-story-step
              data-chapter={item.id}
              data-phase={stepPhase}
              ref={(node) => { stepRefs.current[index] = node; }}
              className={`flex items-center px-4 sm:px-[5vw] ${stepPhase === "zone" ? "min-h-[62vh]" : "min-h-[92vh] py-[10vh]"} ${item.id % 2 ? "justify-start" : "justify-end"}`}
            >
              {stepPhase === "card" ? (
                <div className={`pointer-events-none w-[92vw] overflow-hidden rounded-lg border border-border bg-card/95 shadow-hard backdrop-blur-md transition-[opacity,transform] duration-500 motion-reduce:transition-none sm:w-[50vw] lg:w-[33vw] ${chapter === item.id && phase === "card" ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                  <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                    <img src={chapterImage(item.id)} alt="" aria-hidden="true" loading="lazy" width={1536} height={1024} className="h-full w-full scale-125 object-cover mix-blend-multiply" />
                  </div>
                  <div className="p-5 sm:p-7">
                    {item.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraph} className={`font-body leading-snug ${"accent" in item && item.accent || "quote" in item && item.quote && paragraphIndex === 1 ? "text-[clamp(1.15rem,2.3vw,1.8rem)] font-semibold" : "text-base sm:text-lg"} ${paragraphIndex ? "mt-4" : ""}`}>{nbsp(paragraph)}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <section className="relative z-40 border-t border-border bg-card px-4 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-4xl">
            <h2 className="font-display text-4xl font-semibold leading-none sm:text-7xl">{nbsp("Исследуйте шкалу самостоятельно")}</h2>
            <p className="mt-5 max-w-3xl font-body text-lg leading-relaxed text-foreground/75">{nbsp("После истории таймлайн превращается в карту. Фильтруйте людей по сфере и открывайте карточки. Для нескольких героев показаны повторные точки — так видно, что «второй акт» сам может состоять из нескольких глав.")}</p>
            <div className="mt-7 flex flex-wrap gap-2" aria-label="Фильтр">
              {([['all', 'Все'], ...Object.entries(categoryLabels)] as ["all" | StoryCategory, string][]).map(([value, label]) => (
                <Button key={value} type="button" size="sm" variant={filter === value ? "default" : "outline"} onClick={() => setFilter(value)} className="rounded-full">{nbsp(label === "бизнес / технологии" ? "Бизнес / tech" : label.charAt(0).toUpperCase() + label.slice(1))}</Button>
              ))}
            </div>
          </div>
          <div className="mt-10 overflow-x-auto rounded-lg border border-border bg-background">
            <div className="relative h-[470px] min-w-[940px]">
              <div className="absolute left-[4%] right-[4%] top-[53%] h-px bg-muted-foreground/60" />
              {[0, 20, 40, 60, 80, 100, 120].map((tick) => <span key={tick} className="absolute top-[calc(53%+16px)] -translate-x-1/2 font-body text-[11px] text-muted-foreground" style={{ left: `${xPct(tick)}%` }}>{tick}</span>)}
               {longevityStoryPeople.map((person) => filter === "all" || person.cat === filter ? <PersonButton key={person.id} person={person} onSelect={() => setSelected(person)} compact /> : null)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-40 grid min-h-[88vh] place-items-center bg-background px-5 py-24 text-center">
        <div className="max-w-5xl">
          <h2 className="font-display text-5xl font-semibold leading-[0.94] sm:text-8xl">{nbsp("Долгая жизнь требует длинных денег.")}</h2>
          <p className="mx-auto mt-8 max-w-3xl font-body text-xl leading-relaxed text-foreground/75">{nbsp("Чем длиннее возможная активная жизнь, тем хуже работает финансовая стратегия, построенная вокруг идеи «до шестидесяти зарабатываю, потом как-нибудь живу на накопленное».")}</p>
          <p className="mx-auto mt-9 max-w-3xl font-body text-xs leading-relaxed text-muted-foreground">{nbsp("120 лет на этой странице — не прогноз продолжительности жизни. Это предельный сценарий, который помогает увидеть цену слишком короткого финансового горизонта.")}</p>
        </div>
      </section>
      <PersonDrawer person={selected} onClose={() => setSelected(undefined)} />
    </>
  );
};