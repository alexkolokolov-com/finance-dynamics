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

// Глобальное меню сайта (используется на всех контентных/служебных страницах:
// блог, статьи, оферта, 404). Лендинги (Card, BigBudget, Landing) передают свой
// pageNav с якорями секций + CTA.
export const globalNav: HeaderNavLink[] = [
  { href: "/#about", label: "О проекте" },
  { href: "/#consultations", label: "Консультации" },
  { href: "/bigbudget", label: "Марафон" },
  { href: "/cashback", label: "Кэшбэк-гайд" },
  { href: "/landing", label: "Обучение" },
  { href: "/blog", label: "Блог" },
];

export const SiteHeader = ({ pageNav = globalNav }: { pageNav?: HeaderNavLink[] }) => {
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
    const sections = pageNav
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
  const pageLinks = pageNav.filter((l) => l.href && l.label);

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
              <div className="font-display font-bold text-sm tracking-tight">Физика финансов</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                василий&nbsp;мещеряков
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {pageLinks.map((l) => {
              const isCta = !!l.cta;
              const isActive = active === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`${isCta ? ctaPill : pill} ${
                    !isCta && isActive ? "border-accent text-accent" : ""
                  } ${l.className ?? ""}`}
                >
                  <span className={l.mono ? "font-mono uppercase tracking-widest" : "normal-case tracking-normal font-body"}>{l.label}</span>
                </a>
              );
            })}
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
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={() => setOpen(false)} />
        <div className="relative h-full pt-24 px-8 overflow-y-auto">
          {pageLinks.length > 0 && (
            <ul className="space-y-1">
              {pageLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2 font-serif-display text-3xl hover:text-accent transition-colors ${
                      active === l.id ? "text-accent" : ""
                    } ${l.cta ? "text-accent" : ""}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
