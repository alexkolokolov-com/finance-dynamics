import type { ReactNode } from "react";
import expertAvatar from "@/assets/expert-vasily.jpg";
import { nbsp } from "@/lib/nbsp";

/**
 * Плашка с цитатой эксперта: текст, круглое фото и подпись.
 * Ставится в начале статьи, сразу после вводных абзацев.
 */
export const ExpertQuote = ({
  children,
  name = "Василий Мещеряков",
  role = "автор книги «Ленивый бюджет»",
}: {
  children: ReactNode;
  name?: string;
  role?: string;
}) => (
  <figure className="bg-card border border-border rounded-2xl p-6 md:p-10">
    <blockquote className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
      {children}
    </blockquote>
    <figcaption className="mt-5 flex items-center gap-3 md:gap-4">
      <span className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 block">
        <img
          src={expertAvatar}
          alt={name}
          className="w-full h-full object-cover object-top scale-125"
          loading="lazy"
        />
      </span>
      <span className="font-body text-[15px] md:text-base leading-snug text-foreground/80">
        <strong className="text-foreground">{nbsp(name)}</strong>
        {", "}
        {nbsp(role)}
      </span>
    </figcaption>
  </figure>
);
