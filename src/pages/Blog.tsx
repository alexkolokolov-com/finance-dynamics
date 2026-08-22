import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { blogPosts } from "@/data/blogPosts";


const posts = blogPosts;


const Blog = () => {
  useEffect(() => {
    document.title = "Блог · Вася и финансы";
  }, []);

  return (
    <main className="bg-background text-foreground">
      <SiteHeader />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="animate-fade-up">
            <h1 className="font-serif-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
              <span className="italic font-normal">Блог</span>.
            </h1>
            <p className="mt-8 font-serif-display text-xl md:text-2xl leading-snug text-foreground/80 max-w-3xl">
              Заметки, инструменты и&nbsp;разборы — то, что помогает увидеть деньги
              как&nbsp;систему, а&nbsp;не&nbsp;как&nbsp;череду случайностей.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32 overflow-hidden bg-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-chalk)" }}
        />
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {posts.map((p, i) => {
              const inner = (
                <>
                  <h2 className="font-serif-display font-semibold leading-[1.05] tracking-tight text-3xl md:text-4xl mb-8">
                    {p.title}
                  </h2>

                  <div
                    className="w-full mb-8 p-5 border border-dashed"
                    style={{ borderColor: "hsl(var(--foreground) / 0.25)" }}
                  >
                    {p.illustration}
                  </div>

                  <p
                    className="font-body text-base md:text-[17px] leading-relaxed text-foreground/75 flex-1"
                    dangerouslySetInnerHTML={{ __html: p.text }}
                  />

                  <div className="mt-8 pt-6 border-t border-dashed border-foreground/20">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/90 group-hover:text-accent transition-colors inline-flex items-center gap-2">
                      {p.cta} <span className="text-base">→</span>
                    </span>
                  </div>
                </>
              );

              const baseClass =
                "col-span-12 md:col-span-4 group relative bg-card border border-foreground/15 p-8 md:p-10 flex flex-col animate-fade-up hover:border-accent transition-colors";

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

      <Footer />
    </main>
  );
};

export default Blog;
