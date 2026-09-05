import type { ReactNode } from "react";
import expertAvatar from "@/assets/expert-vasily.jpg";
import { nbsp } from "@/lib/nbsp";
import { handleDiagnosticClick } from "@/lib/ymGoals";
import { ArticleSection } from "./ArticleSection";
import { ArticleFlow } from "./ArticleFlow";
import { H2 } from "./H2";

/**
 * Финальный блок статьи «Давайте поговорим»: текст, кнопка на диагностику
 * (цель Метрики + UTM), фото эксперта и дисклеймер.
 */
export const ArticleCta = ({
  heading = "Давайте поговорим",
  children,
  ctaLabel = "Записаться на диагностику",
  href = "https://nivz.getcourse.ru/diagnostic",
  note = "Диагностика бесплатна и ни к чему не обязывает",
}: {
  heading?: string;
  children?: ReactNode;
  ctaLabel?: string;
  href?: string;
  note?: string;
}) => (
  <ArticleSection>
    <ArticleFlow>
      <H2>{nbsp(heading)}</H2>

      {children ?? (
        <>
          <p className="font-body text-lg leading-relaxed text-foreground/80 mt-4">
            {nbsp("Многие ищут правильный инвестиционный продукт, не поняв сначала, чего хотят от жизни.")}
          </p>
          <p className="font-body text-lg leading-relaxed text-foreground/80 mt-4">
            {nbsp("Я помогу разобрать ваши доходы, расходы, цели и ценности – и найти, где деньги работают, а где текут.")}
          </p>
        </>
      )}

      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDiagnosticClick}
          className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-accent text-background font-body text-[15px] font-medium whitespace-nowrap hover:bg-foreground transition-colors"
        >
          {nbsp(ctaLabel)}
        </a>
        <span className="flex items-center gap-3">
          <span className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 block">
            <img
              src={expertAvatar}
              alt="Василий Мещеряков"
              className="w-full h-full object-cover object-top scale-125"
              loading="lazy"
            />
          </span>
          <span className="font-body text-[15px] leading-snug text-foreground/80">
            <strong className="text-foreground">{nbsp("Василий Мещеряков")}</strong>
            <br />
            {nbsp("автор книги «Ленивый бюджет»")}
          </span>
        </span>
      </div>

      {note ? (
        <p className="font-body text-sm text-foreground/70 mt-4">{nbsp(note)}</p>
      ) : null}
    </ArticleFlow>
  </ArticleSection>
);
