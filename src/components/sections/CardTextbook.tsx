import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export const CardTextbook = () => {
  return (
    <section id="textbook" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      <div className="container-px max-w-7xl mx-auto relative">
        <div className="mb-16 animate-fade-up flex items-end justify-between gap-6 flex-wrap">
          <h2 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
            Блог
          </h2>
          <Link
            to="/blog"
            className="text-sm text-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            все статьи <span className="text-base">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {blogPosts.map((p, i) => {
            const inner = (
              <>
                <h3 className="font-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl mb-8">
                  {p.title}
                </h3>

                <div
                  className="w-full mb-8 p-5 border border-dashed rounded-xl"
                  style={{ borderColor: "hsl(var(--foreground) / 0.2)" }}
                >
                  {p.illustration}
                </div>

                <p
                  className="font-body text-base md:text-[17px] leading-relaxed text-foreground/75 flex-1"
                  dangerouslySetInnerHTML={{ __html: p.text }}
                />

                <div className="mt-8 pt-6 border-t border-dashed border-foreground/20">
                  <span className="text-sm text-foreground/80 group-hover:text-accent transition-colors inline-flex items-center gap-2">
                    {p.cta} <span className="text-base">→</span>
                  </span>
                </div>
              </>
            );

            const baseClass =
              "col-span-12 md:col-span-6 group relative bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col animate-fade-up hover:border-accent transition-colors";

            return p.href ? (
              <Link
                key={p.title}
                to={p.href}
                className={baseClass}
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                {inner}
              </Link>
            ) : (
              <article
                key={p.title}
                className={baseClass}
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
