import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";

export type HeaderNavLink = {
  href: string;
  label: string;
  id?: string;
  cta?: boolean;
  className?: string;
  mono?: boolean;
};

// Единое глобальное меню сайта. pageNav, если передан, всегда выводится
// отдельным вторым уровнем и не заменяет основные ссылки.
export const globalNav: HeaderNavLink[] = [
  { href: "/consultations", label: "Консультации" },
  { href: "/landing", label: "Сопровождение" },
  { href: "/profit", label: "Профит" },
  { href: "/corporate", label: "Для компаний" },
  { href: "/cashback", label: "Кэшбэк-гайд" },
  { href: "/blog", label: "Блог" },
  { href: "/reviews", label: "Отзывы" },
];

export const SiteHeader = ({ pageNav }: { pageNav?: HeaderNavLink[] }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = (pageNav ?? [])
      .map((p) => (p.id ? document.getElementById(p.id) : null))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [pageNav]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pill =
    "badge-tag whitespace-nowrap hover:border-accent hover:text-accent transition-colors";
  const ctaPill =
    "badge-tag whitespace-nowrap border-accent text-foreground hover:bg-accent hover:text-accent-foreground transition-colors";
  const pageLinks = (pageNav ?? []).filter((l) => l.href && l.label);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-background/90 backdrop-blur-md border-b border-foreground/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-px max-w-7xl mx-auto flex items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-2.5 group shrink-0">
            <LogoMark size="sm" />

            <div className="leading-tight block">
              <div className="font-display font-semibold text-base tracking-tight">Вася и&nbsp;финансы</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {globalNav.map((l) => (
              <a key={l.href} href={l.href} className={pill}>
                <span className="normal-case tracking-normal font-body">{l.label}</span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-foreground/20 hover:border-accent hover:text-accent transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {pageLinks.length > 0 && (
          <nav
            aria-label="Навигация по странице"
            className="absolute left-0 right-0 top-full border-b border-foreground/10 bg-background/95 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
              {pageLinks.map((l) => {
                const isCta = !!l.cta;
                const isActive = active === l.id;
                return (
                  <a
                    key={`${l.href}-${l.label}`}
                    href={l.href}
                    className={`${isCta ? ctaPill : pill} ${
                      !isCta && isActive ? "border-accent text-accent" : ""
                    } ${l.className ?? ""}`}
                  >
                    <span className="normal-case tracking-normal font-body">{l.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={() => setOpen(false)} />
        <div className="relative h-full pt-24 px-8 overflow-y-auto">
          <ul className="space-y-1">
              {globalNav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-serif-display text-3xl hover:text-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
