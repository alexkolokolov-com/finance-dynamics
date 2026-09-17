import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  longevityStoryPeople,
  type StoryCategory,
  type StoryPerson,
} from "@/data/longevityStoryPeople";
import { nbsp } from "@/lib/nbsp";

const MAX_AGE = 120;
const xPct = (age: number) => 4 + (Math.min(age, MAX_AGE) / MAX_AGE) * 92;
const yByLevel = { 1: 34, 2: 47, 3: 60 } as const;

const chapters = [
  {
    id: 1,
    range: "0–40",
    title: "Первая половина",
    paragraphs: [
      "Учимся. Получаем профессию. Ошибаемся. Строим карьеру или бизнес. Создаём семью. Растим доход.",
      "Главный экономический актив в этот период — мы сами: время, здоровье, знания, связи и способность много работать.",
    ],
  },
  {
    id: 2,
    range: "35–45",
    title: "Точка перелома",
    paragraphs: [
      "К этому возрасту опыта и ресурсов становится больше. Но одновременно становится больше обязательств — дети, жильё, родители, страна проживания, бизнес, здоровье.",
      "И впервые возникает вопрос: хочу ли я ещё двадцать лет жить по той же финансовой модели?",
    ],
    quote: true,
  },
  {
    id: 3,
    range: "данные вместо мотивации",
    title: "45 — не возраст «после успеха»",
    paragraphs: [
      "Исследование 2,7 млн основателей в США показало: у самых быстрорастущих новых компаний средний возраст основателя — около 45 лет.",
      "Поэтому дальше на шкале будут не «звёзды, которые хорошо сохранились», а люди, у которых после 45 началась новая крупная глава.",
    ],
  },
  {
    id: 4,
    range: "45–80",
    title: "Второй акт",
    paragraphs: [
      "Новый бизнес. Новая профессия. Новый масштаб. Иногда — после провала первой карьеры.",
      "Нажмите на любую фотографию: внутри — короткая траектория «до → перелом → после».",
    ],
  },
  {
    id: 5,
    range: "80",
    title: "Обычно карта заканчивается здесь",
    paragraphs: [
      "Наши финансовые планы редко пытаются представить человека после восьмидесяти кем-то кроме получателя пенсии и медицинских услуг.",
      "Но сама линия жизни на этом не заканчивается.",
    ],
  },
  {
    id: 6,
    range: "80–100",
    title: "Роль меняется. Субъектность остаётся.",
    paragraphs: [
      "Здесь уже меньше историй «начал с нуля». Зато много разных моделей профессионального долголетия: оставаться CEO, перейти в председатели, продолжать создавать, консультировать, инвестировать или менять формат работы.",
    ],
  },
  {
    id: 7,
    range: "100+",
    title: "После ста меняется сам тип доказательства",
    paragraphs: [
      "Мы перестаём искать «новый единорог в 107». Важнее другое: способность учиться, создавать, работать, соревноваться и ставить новые задачи не обрывается автоматически в день столетия.",
    ],
  },
  {
    id: 8,
    range: "110–122",
    title: "Дальше точек мало — и это важно",
    paragraphs: [
      "После 110 лет активная деятельность становится исключительной редкостью. Поэтому шкала здесь остаётся почти пустой.",
      "Её край — 122 года 164 дня, максимальная документально подтверждённая продолжительность человеческой жизни Жанны Кальман.",
    ],
  },
] as const;

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

const visibleForChapter = (person: StoryPerson, chapter: number) => {
  if (chapter === 4 || chapter === 5) return person.chapter === 4;
  if (chapter === 6) return person.chapter === 6;
  if (chapter === 7) return person.chapter === 7;
  if (chapter === 8) return person.chapter === 7 && person.age >= 102;
  return false;
};

const chapterTitle = (chapter: number) => {
  if (chapter === 4) return "45–80 · новые большие главы";
  if (chapter === 6) return "80–100 · разные модели профессионального долголетия";
  if (chapter === 7) return "100+ · деятельность не обрывается автоматически";
  if (chapter === 8) return "После 110 точек становится мало";
  return "Жизнь как временная шкала";
};

const axisWidth = (chapter: number) => {
  if (chapter === 1) return 30;
  if (chapter === 2 || chapter === 3) return 34;
  if (chapter === 4 || chapter === 5) return 61;
  return chapter >= 6 ? 96 : 30;
};

const pathPeopleForChapter = (chapter: number) => {
  const ids = chapter === 4 ? ["duffield", "parsons", "huffington", "kroc"] : chapter === 7 ? ["hawkins", "kramer"] : [];
  return ids
    .map((id) => longevityStoryPeople.find((person) => person.id === id))
    .filter((person): person is StoryPerson => Boolean(person) && (person?.events.length ?? 0) > 1);
};

const Zone = ({ className, label, visible }: { className: string; label: string; visible: boolean }) => (
  <div
    className={`absolute bottom-[10%] top-[12%] rounded-lg border border-dashed border-border transition-all duration-700 ${className} ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <span className="absolute left-3 top-3 whitespace-nowrap font-body text-[10px] font-semibold text-foreground/65 sm:text-xs">
      {nbsp(label)}
    </span>
  </div>
);

const PersonButton = ({ person, visible, onSelect, compact = false }: { person: StoryPerson; visible: boolean; onSelect: () => void; compact?: boolean }) => (
  <Button
    type="button"
    variant="ghost"
    aria-label={`${person.name}, ${person.age}`}
    onClick={onSelect}
    className={`group absolute z-20 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full p-0 transition-all duration-500 hover:z-30 hover:scale-110 hover:bg-transparent sm:h-[58px] sm:w-[58px] ${
      compact || visible ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
    }`}
    style={{ left: `${xPct(person.age)}%`, top: `${compact ? 31 + (person.level - 1) * 22 : yByLevel[person.level]}%` }}
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
      <Button type="button" size="icon" variant="outline" aria-label="Закрыть" onClick={onClose} className="sticky left-full top-4 z-10 mr-4 mt-4 rounded-full bg-card">
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
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setChapter(Number((entry.target as HTMLElement).dataset.chapter));
        });
      },
      { threshold: 0.55 },
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelected(undefined);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const zoneVisibility = useMemo(
    () => ({
      first: chapter >= 1 && chapter <= 5,
      turn: chapter === 2 || chapter === 3,
      second: chapter >= 3 && chapter <= 6,
      third: chapter >= 6,
    }),
    [chapter],
  );

  return (
    <>
      <div className="relative">
        <div className="pointer-events-none sticky top-16 z-10 flex h-[calc(100vh-4rem)] items-center justify-center px-2 sm:px-5">
          <div className="relative h-[min(650px,80vh)] w-full max-w-[1420px] overflow-hidden rounded-lg border border-border bg-card shadow-paper">
            <div className="absolute left-4 right-4 top-5 z-10 flex items-start justify-between gap-6 sm:left-8 sm:right-8 sm:top-7">
              <h2 className="font-display text-base font-semibold sm:text-lg">{nbsp(chapterTitle(chapter))}</h2>
              <p className="hidden max-w-lg text-right font-body text-xs leading-relaxed text-muted-foreground md:block">
                {nbsp("Возраст здесь — не прогноз и не норматив. Это способ увидеть горизонт, который обычно остаётся за пределами наших решений.")}
              </p>
            </div>
            <div className="absolute inset-x-3 bottom-7 top-20 sm:inset-x-8 sm:bottom-8 sm:top-24">
              <Zone className="left-[4%] w-[30%] bg-accent/[0.045]" label="0–40 · капитализация себя" visible={zoneVisibility.first} />
              <Zone className="left-[30%] w-[9%] bg-accent/[0.08]" label="35–45" visible={zoneVisibility.turn} />
              <Zone className="left-[34%] w-[31%] bg-foreground/[0.035]" label="45–80 · второй акт" visible={zoneVisibility.second} />
              <Zone className="left-[65%] w-[31%] bg-accent-soft/15" label="80–120 · длинная жизнь" visible={zoneVisibility.third} />
              <div className="absolute left-[4%] right-[4%] top-[46%] h-px bg-border" />
              <div className="absolute left-[4%] top-[46%] h-0.5 bg-foreground transition-all duration-700" style={{ width: `${axisWidth(chapter)}%` }} />
              <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                {pathPeopleForChapter(chapter).map((person) => {
                  const points = person.events.map((age, index) => `${xPct(age)},${yByLevel[person.level] + (index === 0 ? 0 : index % 2 ? -6 : 5)}`).join(" ");
                  return (
                    <g key={person.id} className="animate-fade-in">
                      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="1.2 1.1" vectorEffect="non-scaling-stroke" className="text-muted-foreground" />
                      {person.events.slice(1).map((age, index) => (
                        <circle key={age} cx={xPct(age)} cy={yByLevel[person.level] + ((index + 1) % 2 ? -6 : 5)} r="0.8" fill="hsl(var(--card))" stroke="currentColor" strokeWidth="0.35" className="text-muted-foreground" />
                      ))}
                    </g>
                  );
                })}
              </svg>
              {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
                <div key={tick} className="absolute top-[calc(46%+14px)] -translate-x-1/2 font-body text-[10px] text-muted-foreground sm:text-xs" style={{ left: `${xPct(tick)}%` }}>
                  <span className="absolute -top-[14px] left-1/2 h-2 w-px bg-muted-foreground" />{tick}
                </div>
              ))}
              <div className={`absolute left-[38%] top-[22%] w-44 -translate-x-1/2 text-center transition-all duration-700 sm:w-56 ${chapter === 3 ? "opacity-100" : "opacity-0"}`}>
                <p className="font-display text-5xl font-semibold leading-none sm:text-6xl">45</p>
                <p className="mt-2 font-body text-[10px] leading-snug text-foreground/65 sm:text-xs">{nbsp("Средний возраст основателя одной из 0,1% самых быстрорастущих новых компаний в исследовании NBER.")}</p>
              </div>
              {longevityStoryPeople.map((person) => (
                <PersonButton key={person.id} person={person} visible={visibleForChapter(person, chapter)} onSelect={() => setSelected(person)} />
              ))}
              <div className="absolute bottom-0 left-1 flex flex-wrap gap-x-4 gap-y-1 font-body text-[9px] text-muted-foreground sm:text-[11px]">
                {(Object.entries(categoryLabels) as [StoryCategory, string][]).map(([category, label]) => (
                  <span key={category} className="inline-flex items-center gap-1.5"><i className={`h-2 w-2 rounded-full border-2 ${categoryRing[category]}`} />{nbsp(label)}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-30 -mt-[calc(100vh-4rem)] pointer-events-none">
          {chapters.map((item, index) => (
            <section
              key={item.id}
              data-chapter={item.id}
              ref={(node) => { stepRefs.current[index] = node; }}
              className={`flex min-h-[88vh] items-center px-4 py-[10vh] sm:px-[5vw] ${index % 2 ? "justify-end" : "justify-start"}`}
            >
              <div className="pointer-events-auto w-[min(470px,92vw)] rounded-lg border border-border bg-card/95 p-5 shadow-hard backdrop-blur-md sm:p-7">
                <p className="font-body text-xs font-semibold text-muted-foreground">{nbsp(item.range)}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold leading-none sm:text-4xl">{nbsp(item.title)}</h3>
                <div className="mt-4 space-y-3">
                  {item.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraph} className={`font-body leading-relaxed ${"quote" in item && item.quote && paragraphIndex === 1 ? "text-xl font-semibold" : "text-base"}`}>{nbsp(paragraph)}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="relative z-40 border-t border-border bg-card px-4 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-4xl">
            <p className="font-body text-sm text-muted-foreground">{nbsp("Explore mode")}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-none sm:text-7xl">{nbsp("Исследуйте шкалу самостоятельно")}</h2>
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
              {longevityStoryPeople.map((person) => filter === "all" || person.cat === filter ? <PersonButton key={person.id} person={person} visible onSelect={() => setSelected(person)} compact /> : null)}
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