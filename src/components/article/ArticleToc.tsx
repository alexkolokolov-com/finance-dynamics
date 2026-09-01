import { useEffect, useState } from "react";
import { List, X } from "lucide-react";

type TocItem = { id: string; text: string; level: 2 | 3 };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u00A0]/g, " ")
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

/**
 * Навигация по лонгриду: плавающая кнопка «Содержание» + панель со
 * списком разделов (H2) и подзаголовков (H3). Заголовки собираются
 * из DOM, id при необходимости проставляются автоматически.
 */
export const ArticleToc = ({ title = "Содержание" }: { title?: string }) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("h2, h3")
    ).filter(
      (n) =>
        n.dataset.toc !== "skip" &&
        !n.closest("header") &&
        !n.closest("footer") &&
        (n.textContent || "").trim().length > 2
    );

    const used = new Set<string>();
    const collected: TocItem[] = nodes.map((n) => {
      const text = (n.textContent || "").replace(/\u00A0/g, " ").trim();
      let id = n.id || slugify(text);
      while (used.has(id)) id = `${id}-x`;
      used.add(id);
      if (!n.id) n.id = id;
      n.classList.add("scroll-mt-24");
      return { id, text, level: n.tagName === "H3" ? 3 : 2 };
    });
    setItems(collected);

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);

      let current = "";
      for (const it of collected) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 120) current = it.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (items.length < 3) return null;

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Прогресс чтения */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-40 pointer-events-none">
        <div
          className="h-full bg-accent transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Кнопка */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={title}
        className="fixed z-50 bottom-5 right-5 md:bottom-8 md:right-8 inline-flex items-center gap-2
          rounded-full border border-border bg-card/95 backdrop-blur px-4 py-3
          font-body text-sm text-foreground shadow-[var(--shadow-paper)]
          hover:border-accent/60 transition-colors"
      >
        {open ? <X className="w-4 h-4" /> : <List className="w-4 h-4" />}
        <span>{open ? "Закрыть" : title}</span>
      </button>

      {/* Панель */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <nav
            aria-label={title}
            className="fixed z-40 left-3 right-3 bottom-20 md:left-auto md:right-8 md:bottom-24 md:w-[360px]
              max-h-[65vh] overflow-y-auto rounded-2xl border border-border bg-card
              shadow-[var(--shadow-paper)] p-4"
          >
            <div className="font-display font-semibold text-base mb-3">{title}</div>
            <ul className="space-y-1">
              {items.map((it) => (
                <li key={it.id}>
                  <button
                    type="button"
                    onClick={() => go(it.id)}
                    className={`w-full text-left font-body rounded-lg px-3 py-2 transition-colors
                      ${it.level === 3 ? "text-[13px] pl-6 text-foreground/65" : "text-[15px] text-foreground/85"}
                      ${activeId === it.id ? "bg-secondary text-accent" : "hover:bg-secondary/70"}`}
                  >
                    {it.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};
