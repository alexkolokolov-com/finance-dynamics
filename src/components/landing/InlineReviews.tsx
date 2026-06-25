import { useMemo, useState } from "react";
import { reviews } from "@/data/reviewsData";

const driveImage = (id?: string) =>
  id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : undefined;
const driveVideoEmbed = (id?: string) =>
  id ? `https://drive.google.com/file/d/${id}/preview` : undefined;

const splitText = (text: string) => {
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

type Tone = "paper" | "board";

const toneClasses = (tone: Tone) =>
  tone === "board"
    ? {
        card: "border-background/20 bg-background/[0.04]",
        cardHover: "hover:border-background/60",
        name: "text-background",
        role: "text-background/55",
        quote: "text-background border-l-2 border-accent",
        toggle: "text-background hover:text-accent",
        section: "text-background/85",
        sectionLabel: "text-background/55",
        avatarFallback: "bg-background/10 border-background/20 text-background/60",
        avatarBorder: "border-background/20",
        divider: "border-background/15",
      }
    : {
        card: "border-foreground/15 bg-card",
        cardHover: "hover:border-foreground",
        name: "text-foreground",
        role: "text-muted-foreground",
        quote: "text-foreground border-l-2 border-accent",
        toggle: "text-foreground hover:text-accent",
        section: "text-foreground/85",
        sectionLabel: "text-foreground/55",
        avatarFallback: "bg-muted border-foreground/15 text-foreground/55",
        avatarBorder: "border-foreground/15",
        divider: "border-foreground/10",
      };

const Avatar = ({
  src,
  name,
  tone,
  size = "md",
}: {
  src?: string;
  name: string;
  tone: Tone;
  size?: "md" | "lg";
}) => {
  const t = toneClasses(tone);
  const cls =
    size === "lg"
      ? "w-14 h-14 md:w-16 md:h-16"
      : "w-12 h-12";
  return src ? (
    <img
      src={src}
      alt={name}
      loading="lazy"
      className={`${cls} rounded-full object-cover border ${t.avatarBorder} shrink-0`}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  ) : (
    <span
      aria-hidden
      className={`${cls} rounded-full border grid place-items-center font-display text-lg shrink-0 ${t.avatarFallback}`}
    >
      {name.charAt(0)}
    </span>
  );
};

const InlineReviewCard = ({ index, tone }: { index: number; tone: Tone }) => {
  const r = reviews[index];
  const [open, setOpen] = useState(false);
  const sections = useMemo(() => (r ? splitText(r.text) : []), [r]);
  if (!r) return null;
  const t = toneClasses(tone);
  const img = r.avatar ?? driveImage(r.photoId);
  const quote = r.quote && r.quote.trim().length > 0 ? r.quote : r.text.split("\n")[0];

  return (
    <figure
      className={`border ${t.card} ${t.cardHover} transition-colors duration-300 p-6 md:p-7 flex flex-col`}
    >
      <header className="flex items-center gap-4">
        <Avatar src={img} name={r.name} tone={tone} size="lg" />
        <div className="min-w-0">
          <div className={`font-display font-bold text-xl leading-tight ${t.name}`}>
            {r.name}
          </div>
          {r.role && (
            <div
              className={`font-mono text-[11px] uppercase tracking-widest mt-1 ${t.role}`}
            >
              {r.role}
            </div>
          )}
        </div>
      </header>

      <blockquote
        className={`mt-5 mb-6 font-display text-lg leading-snug pl-4 ${t.quote}`}
      >
        {quote}
      </blockquote>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`self-end font-mono text-[11px] uppercase tracking-widest transition-colors inline-flex items-center gap-2 mt-0 ${t.toggle}`}
      >
        {open ? "Свернуть" : "Читать полностью"}
        <span aria-hidden>{open ? "−" : "→"}</span>
      </button>

      {open && (
        <div
          className={`mt-1 pt-1 border-t ${t.divider} space-y-3 font-body text-[15px] leading-relaxed ${t.section}`}
        >
          {sections.map((s, i) => (
            <div key={i}>
              {s.label && (
                <div
                  className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${t.sectionLabel}`}
                >
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
    </figure>
  );
};

type WrapProps = { tone?: Tone; bgClass?: string };

export const InlineReviewPair = ({
  indices,
  tone = "paper",
  bgClass,
}: { indices: [number, number] } & WrapProps) => (
  <section className={`relative -mt-16 md:-mt-24 pt-0 pb-16 md:pb-24 ${bgClass ?? ""}`}>
    <div className="container-px max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {indices.map((i) => (
          <InlineReviewCard key={i} index={i} tone={tone} />
        ))}
      </div>
    </div>
  </section>
);

export const InlineReviewGrid = ({
  indices,
  tone = "paper",
  bgClass,
  columns = 3,
  className,
}: { indices: number[]; columns?: 2 | 3; className?: string } & WrapProps) => (
  <section className={`relative ${className ?? "py-16 md:py-24"} ${bgClass ?? ""}`}>
    <div className="container-px max-w-7xl mx-auto">
      <div className={`grid grid-cols-1 md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""} gap-6 lg:gap-8`}>
        {indices.map((i) => (
          <InlineReviewCard key={i} index={i} tone={tone} />
        ))}
      </div>
    </div>
  </section>
);

export const InlineReviewFeature = ({
  index,
  tone = "paper",
  bgClass,
}: { index: number } & WrapProps) => {
  const r = reviews[index];
  const [open, setOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const sections = useMemo(() => (r ? splitText(r.text) : []), [r]);
  if (!r) return null;
  const t = toneClasses(tone);
  const img = r.avatar ?? driveImage(r.photoId);
  const thumb = driveImage(r.photoId);
  const video = driveVideoEmbed(r.videoId);
  const quote = r.quote && r.quote.trim().length > 0 ? r.quote : r.text.split("\n")[0];

  return (
    <section className={`relative -mt-16 md:-mt-24 pt-0 pb-16 md:pb-24 ${bgClass ?? ""}`}>
      <div className="container-px max-w-7xl mx-auto">
        <figure
          className={`border ${t.card} overflow-hidden grid grid-cols-1 md:grid-cols-12`}
        >
          {/* Видео/фото слева */}
          <div className="relative md:col-span-5 aspect-video md:aspect-auto md:min-h-[360px] bg-muted overflow-hidden group">
            {showVideo && video ? (
              <iframe
                src={video}
                allow="autoplay"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title={`Видео отзыв · ${r.name}`}
              />
            ) : (
              <>
                {thumb ? (
                  <img
                    src={thumb}
                    alt={`${r.name} — видео отзыв`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-foreground/30" />
                )}
                {video && (
                  <button
                    type="button"
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Смотреть видео-отзыв"
                  >
                    <span className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Контент справа */}
          <div className="md:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col">
            <header className="flex items-center gap-4">
              <Avatar src={img} name={r.name} tone={tone} size="lg" />
              <div className="min-w-0">
                <div className={`font-display font-bold text-xl md:text-2xl leading-tight ${t.name}`}>
                  {r.name}
                </div>
                {r.role && (
                  <div className={`font-mono text-[11px] uppercase tracking-widest mt-1 ${t.role}`}>
                    {r.role}
                  </div>
                )}
              </div>
            </header>

            <blockquote className={`mt-5 font-display text-lg md:text-xl leading-snug pl-4 ${t.quote}`}>
              {quote}
            </blockquote>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`self-end font-mono text-[11px] uppercase tracking-widest transition-colors inline-flex items-center gap-2 mt-0 ${t.toggle}`}
            >
              {open ? "Свернуть" : "Читать полностью"}
              <span aria-hidden>{open ? "−" : "→"}</span>
            </button>

            {open && (
              <div
                className={`mt-3 pt-3 border-t ${t.divider} space-y-3 font-body text-[15px] leading-relaxed ${t.section}`}
              >
                {sections.map((s, i) => (
                  <div key={i}>
                    {s.label && (
                      <div
                        className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${t.sectionLabel}`}
                      >
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
        </figure>
      </div>
    </section>
  );
};
