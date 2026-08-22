import type { ReactNode } from "react";

type StorySectionProps = {
  id?: string;
  title: ReactNode;
  image: string;
  alt: string;
  side?: "left" | "right";
  paragraphs: ReactNode[];
  /** Реплика эксперта — выводится акцентной плашкой в конце текста */
  comment: ReactNode | ReactNode[];
};


export const StorySection = ({
  id,
  title,
  image,
  alt,
  side = "right",
  paragraphs,
  comment,
}: StorySectionProps) => {
  const imageFirst = side === "left";

  return (
    <section id={id} className="py-10 md:py-14 scroll-mt-24">
      <div className="container-px max-w-6xl mx-auto">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-3 lg:items-center">
          {/* Текст: 2/3 */}
          <div className={`lg:col-span-2 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
            <h2 className="font-display font-semibold leading-[1.14] tracking-tight text-[clamp(1.5rem,3.4vw,2.2rem)] mb-5">
              {title}
            </h2>

            <div className="space-y-4 font-body text-[16px] md:text-lg leading-relaxed text-foreground/80">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Комментарий эксперта */}
            <div className="mt-6 rounded-xl border border-border border-l-2 border-l-accent bg-card px-5 py-4 space-y-3">
              {(Array.isArray(comment) ? comment : [comment]).map((c, i) => (
                <p
                  key={i}
                  className="font-body text-[15px] md:text-base leading-relaxed text-foreground/85"
                >
                  {c}
                </p>
              ))}
            </div>

          </div>

          {/* Иллюстрация: 1/3, на мобильном — квадрат под текстом */}
          <div className={`lg:col-span-1 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
            <img
              src={image}
              alt={alt}
              loading="lazy"
              width={1200}
              height={1200}
              className="w-full max-w-sm mx-auto lg:max-w-none aspect-square object-cover rounded-2xl border border-border bg-card"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
