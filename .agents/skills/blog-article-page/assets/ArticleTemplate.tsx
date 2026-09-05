// Заготовка страницы-статьи блога «Вася и финансы».
// Скопировать в src/pages/<Name>.tsx, заменить тексты и картинки,
// добавить маршрут в src/App.tsx и карточку в src/data/blogPosts.tsx.

import { ArticlePage } from "@/components/article/ArticlePage";
import { ArticleHero } from "@/components/article/ArticleHero";
import { ArticleSection } from "@/components/article/ArticleSection";
import { ArticleFlow } from "@/components/article/ArticleFlow";
import { ExpertQuote } from "@/components/article/ExpertQuote";
import { ArticleCta } from "@/components/article/ArticleCta";
import { H2 } from "@/components/article/H2";
import { Pull } from "@/components/article/Pull";
import { Figure } from "@/components/article/Figure";
import { nbsp } from "@/lib/nbsp";
import heroImg from "@/assets/plan-hero.jpg";

const ArticleTemplate = () => (
  <ArticlePage
    title="Заголовок статьи"
    description="Короткое описание статьи до 160 символов."
  >
    <ArticleHero
      title={<>Первая часть заголовка –</>}
      accent={<>акцентный хвост</>}
      lead={nbsp("Подзаголовок в одно-два предложения: о чём статья и зачем её читать.")}
      image={heroImg}
      imageAlt="Описание обложки"
    />

    <ArticleSection>
      <ArticleFlow>
        <p>{nbsp("Вводный абзац: ситуация читателя.")}</p>
        <p>
          <strong>{nbsp("Короткий вывод из вводной части.")}</strong>
        </p>
      </ArticleFlow>
    </ArticleSection>

    <ArticleSection>
      <ArticleFlow>
        <ExpertQuote>
          {nbsp("В этой статье расскажу, …")}
        </ExpertQuote>
      </ArticleFlow>
    </ArticleSection>

    <ArticleSection id="razdel-1">
      <ArticleFlow>
        <H2>{nbsp("Заголовок первого раздела")}</H2>
        <p>{nbsp("Текст раздела.")}</p>
      </ArticleFlow>
    </ArticleSection>

    <Figure
      src={heroImg}
      alt="Что изображено"
      caption="Подпись к иллюстрации"
    />

    <ArticleSection>
      <ArticleFlow>
        <p>{nbsp("Продолжение мысли после иллюстрации.")}</p>
        <Pull>{nbsp("Ключевой вывод раздела одной фразой.")}</Pull>
      </ArticleFlow>
    </ArticleSection>

    <ArticleCta />
  </ArticlePage>
);

export default ArticleTemplate;
