import type { ReactNode } from "react";

/**
 * Шапка статьи блога: заголовок с курсивным акцентным «хвостом»,
 * подзаголовок и большая обложка (моб. — во всю ширину 16:10,
 * десктоп — натуральные пропорции в рамке).
 */
export const ArticleHero = ({
  title,
  accent,
  lead,
  image,
  imageAlt,
}: {
  /** Основная часть заголовка */
  title: ReactNode;
  /** Хвост заголовка — курсивом в акцентном цвете */
  accent?: ReactNode;
  /** Подзаголовок под H1 */
  lead?: ReactNode;
  image?: string;
  imageAlt?: string;
}) => (
  <section className="pt-28 md:pt-36 pb-10 md:pb-14">
    <div className="container-px max-w-4xl mx-auto text-center animate-fade-up">
      <h1 className="font-display font-semibold leading-[1.08] tracking-tight text-[clamp(2rem,5.4vw,3.6rem)]">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="italic font-normal text-accent">{accent}</span>
          </>
        ) : null}
      </h1>
      {lead ? (
        <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-foreground/75 max-w-2xl mx-auto">
          {lead}
        </p>
      ) : null}
    </div>

    {image ? (
      <div className="md:container-px md:max-w-5xl md:mx-auto mt-10 md:mt-14">
        <img
          src={image}
          alt={imageAlt ?? ""}
          width={1600}
          height={912}
          className="w-full h-auto aspect-[16/10] object-cover object-center bg-card md:aspect-auto md:object-contain md:rounded-2xl md:border md:border-border"
        />
      </div>
    ) : null}
  </section>
);
