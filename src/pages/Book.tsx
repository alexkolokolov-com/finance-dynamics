import { ArrowDown, BookOpen, Check } from "lucide-react";
import { SiteHeader, type HeaderNavLink } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { book, bookChapters } from "@/data/book";
import { usePageMeta } from "@/hooks/usePageMeta";
import { nbsp } from "@/lib/nbsp";
import authorPhoto from "@/assets/expert-vasily.jpg";
import avatar from "@/assets/hero-photo.png";

const pageNav: HeaderNavLink[] = [
  { href: "#about", id: "about", label: "О книге" },
  { href: "#contents", id: "contents", label: "Содержание" },
  { href: "#useful", id: "useful", label: "Польза", cta: true },
];
const inner = "container-px mx-auto max-w-7xl";
const heading = "font-display text-3xl font-semibold leading-tight tracking-normal md:text-4xl";

const Book = () => {
  usePageMeta({ title: "Ленивый бюджет — книга Василия Мещерякова", description: "Книга «Ленивый бюджет»: личный бюджет, умные расходы, рост дохода, активы для жизни и инвестиции. Вступление автора и содержание 11 глав.", path: "/book" });

  return (
    <>
      <SiteHeader pageNav={pageNav} />
      <main className="bg-background text-foreground">
        <section className="bg-grid pb-10 pt-36 md:pb-16 md:pt-40">
          <div className={`${inner} grid items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16`}>
            <figure className="relative order-first mx-auto w-full max-w-md overflow-hidden rounded-lg md:order-last">
              <img src={authorPhoto} alt="Василий Мещеряков, автор книги «Ленивый бюджет»" width={800} height={1000} loading="eager" fetchPriority="high" className="h-[28svh] min-h-40 w-full object-cover object-[50%_25%] md:aspect-[4/5] md:h-auto md:max-h-[480px]" />
              <div className="absolute left-3 top-3 md:hidden"><span className="badge-tag bg-card/95"><BookOpen size={15} className="text-accent" />Книга</span></div>
              <figcaption className="absolute inset-x-3 bottom-3"><span className="badge-tag bg-card/95">{nbsp(book.author)}</span></figcaption>
            </figure>
            <div className="min-w-0">
              <span className="badge-tag mb-6 hidden md:inline-flex"><BookOpen size={16} className="text-accent" />Книга</span>
              <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-normal md:text-5xl lg:text-7xl">{nbsp(book.title)}</h1>
              <p className="mt-4 max-w-lg text-lg leading-snug md:mt-6 md:text-2xl">{nbsp(book.lead)}</p>
              <Button asChild size="lg" className="mt-5 h-auto min-h-14 w-full whitespace-normal px-7 py-4 text-base sm:w-auto md:mt-8"><a href="#contents">{nbsp("Смотреть содержание")}<ArrowDown /></a></Button>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-36 py-12 md:py-16">
          <div className={inner}>
            <h2 className={heading}>{nbsp("От автора")}</h2>
            <figure className="mt-8 rounded-lg border border-border bg-card p-6 md:p-10">
              <div className="grid gap-6 md:grid-cols-[160px_1fr] md:gap-10">
                <figcaption className="flex items-center gap-4 md:flex-col md:items-start">
                  <img src={avatar} alt={book.author} loading="lazy" width={144} height={144} className="h-16 w-16 shrink-0 rounded-full object-cover object-top md:h-36 md:w-36" />
                  <span className="text-base font-semibold">{nbsp(book.author)}</span>
                </figcaption>
                <div>
                  <blockquote className="text-xl font-semibold leading-snug text-accent md:text-3xl">{nbsp(book.quote)}</blockquote>
                  <div className="mt-6 space-y-4 text-lg leading-relaxed md:text-xl">{book.introduction.map(text => <p key={text}>{nbsp(text)}</p>)}</div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section id="contents" className="scroll-mt-36 bg-accent-soft/30 py-12 md:py-16">
          <div className={inner}>
            <h2 className={heading}>{nbsp("Содержание книги")}</h2>
            <ol className="mt-8 grid gap-x-12 md:grid-cols-2">
              {bookChapters.map((chapter, index) => (
                <li key={chapter.title} className="flex gap-4 border-t border-foreground/15 py-6 md:gap-5">
                  <span aria-hidden="true" className="w-7 shrink-0 pt-1 font-display text-lg tabular-nums text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold leading-snug tracking-normal md:text-2xl">{nbsp(chapter.title)}</h3>
                    <p className="mt-3 text-base leading-relaxed md:text-lg">{nbsp(chapter.description)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="useful" className="scroll-mt-36 bg-primary py-12 text-primary-foreground md:py-16">
          <div className={inner}>
            <h2 className={heading}>{nbsp("Чем будет полезно?")}</h2>
            <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              {book.benefits.map(benefit => <li key={benefit.title} className="border-t border-primary-foreground/25 pt-6"><Check className="mb-5 text-accent" size={28} aria-hidden="true" /><h3 className="text-xl font-semibold leading-snug tracking-normal md:text-2xl">{nbsp(benefit.title)}</h3><p className="mt-3 text-lg leading-relaxed text-primary-foreground/90">{nbsp(benefit.text)}</p></li>)}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Book;