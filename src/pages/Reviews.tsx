import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { reviews, type Review } from "@/data/reviewsData";

const resultLabels: Record<string, string> = {
  "появилась_система": "Появилась система",
  "доход_вырос": "Вырос доход",
  "спокойствие_и_контроль": "Спокойствие и контроль",
  "появился_долгосрочный_план": "Долгосрочный план",
  "финансовая_подушка": "Подушка безопасности",
  "инвестиции": "Инвестиции",
};

const painLabels: Record<string, string> = {
  "нет_системы": "Нет системы",
  "тревога_и_стресс": "Тревога и стресс",
  "расходы_превышают_доходы": "Расходы > доходы",
  "нет_целей_и_плана": "Нет целей и плана",
};

const labelFor = (tag: string, dict: Record<string, string>) =>
  dict[tag] ?? tag.replace(/_/g, " ");

const driveImage = (id?: string) =>
  id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : undefined;
const driveVideoEmbed = (id?: string) =>
  id ? `https://drive.google.com/file/d/${id}/preview` : undefined;

const splitText = (text: string) => {
  // Разбиваем на "Точка А" / "Точка Б" если есть
  const parts: { label?: string; body: string[] }[] = [];
  let current: { label?: string; body: string[] } = { body: [] };
  text.split(/\n/).forEach((line) => {
    const t = line.trim();
    if (!t) return;
    const m = t.match(/^Точка\s+[АБAB]:?\s*$/i);
    if (m) {
      if (current.body.length || current.label) parts.push(current);
      current = { label: t.replace(/:\s*$/, ""), body: [] };
    } else {
      current.body.push(t);
    }
  });
  if (current.body.length || current.label) parts.push(current);
  return parts;
};

const ReviewCard = ({ r, index }: { r: Review; index: number }) => {
  const [open, setOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const img = r.avatar ?? driveImage(r.photoId);
  const video = driveVideoEmbed(r.videoId);
  const sections = useMemo(() => splitText(r.text), [r.text]);

  return (
    <article className="col-span-12 md:col-span-6 lg:col-span-4 border border-foreground/15 bg-background flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-foreground/15 bg-muted">
        {showVideo && video ? (
          <iframe
            src={video}
            allow="autoplay"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            title={`Видео отзыв · ${r.name}`}
          />
        ) : img ? (
          <img
            src={img}
            alt={`${r.name} — ${r.role}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-display text-6xl text-foreground/20">
            {r.name.charAt(0)}
          </div>
        )}

        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-background/85 backdrop-blur px-2 py-1 border border-foreground/15">
          №&nbsp;{String(index + 1).padStart(2, "0")}
        </span>

        {video && !showVideo && (
          <button
            type="button"
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label="Смотреть видео-отзыв"
          >
            <span className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <header className="flex items-center gap-4">
          {img ? (
            <img
              src={img}
              alt=""
              loading="lazy"
              aria-hidden
              className="w-12 h-12 rounded-full object-cover border border-foreground/15 shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span
              aria-hidden
              className="w-12 h-12 rounded-full bg-muted border border-foreground/15 grid place-items-center font-display text-lg text-foreground/55 shrink-0"
            >
              {r.name.charAt(0)}
            </span>
          )}
          <div className="min-w-0">
            <h2 className="font-display font-bold text-xl leading-tight">{r.name}</h2>
            <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/55 mt-1">
              {r.role || "—"}
            </p>
          </div>
        </header>

        {r.quote && (
          <blockquote className="mt-5 font-display text-lg leading-snug text-foreground border-l-2 border-accent pl-4">
            «{r.quote}»
          </blockquote>
        )}

        {(r.pains.length > 0 || r.results.length > 0) && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {r.pains.map((p) => (
              <span
                key={`p-${p}`}
                className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-foreground/20 text-foreground/60"
              >
                {labelFor(p, painLabels)}
              </span>
            ))}
            {r.results.map((p) => (
              <span
                key={`r-${p}`}
                className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-accent text-accent"
              >
                {labelFor(p, resultLabels)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-[11px] uppercase tracking-widest text-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            {open ? "Свернуть" : "Читать полностью"}
            <span aria-hidden>{open ? "−" : "→"}</span>
          </button>
        </div>

        {open && (
          <div className="mt-5 pt-5 border-t border-foreground/10 space-y-4 font-body text-[15px] leading-relaxed text-foreground/85">
            {sections.map((s, i) => (
              <div key={i}>
                {s.label && (
                  <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/55 mb-2">
                    {s.label}
                  </div>
                )}
                {s.body.map((line, j) => (
                  <p key={j} className="mb-1.5">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

const Reviews = () => {
  const allResults = useMemo(() => {
    const s = new Set<string>();
    reviews.forEach((r) => r.results.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const [filter, setFilter] = useState<string | null>(null);
  const filtered = useMemo(
    () => (filter ? reviews.filter((r) => r.results.includes(filter)) : reviews),
    [filter],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pt-32 md:pt-40 pb-24">
        <section className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-14 md:mb-20">
            <div className="col-span-12 md:col-span-3">
              <span className="badge-tag">§&nbsp;галерея</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
                Галерея
                <br />
                <span className="text-accent">отзывов.</span>
              </h1>
              <p className="mt-6 font-body text-lg md:text-xl text-foreground/70 max-w-2xl">
                {reviews.length}&nbsp;историй учеников: как было до, что изменилось после, и какие
                инструменты сработали. Фото, видео и полные тексты&nbsp;— без&nbsp;монтажа.
              </p>
            </div>
          </div>

          {allResults.length > 0 && (
            <div className="mb-10 md:mb-14 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter(null)}
                className={`badge-tag transition-colors ${
                  !filter
                    ? "border-accent text-accent"
                    : "hover:border-accent hover:text-accent"
                }`}
              >
                Все · {reviews.length}
              </button>
              {allResults.map((t) => {
                const count = reviews.filter((r) => r.results.includes(t)).length;
                const active = filter === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(active ? null : t)}
                    className={`badge-tag transition-colors ${
                      active
                        ? "border-accent text-accent"
                        : "hover:border-accent hover:text-accent"
                    }`}
                  >
                    {labelFor(t, resultLabels)} · {count}
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {filtered.map((r, i) => (
              <ReviewCard key={`${r.name}-${i}`} r={r} index={reviews.indexOf(r)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="font-body text-foreground/60">По этому фильтру пока пусто.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;
