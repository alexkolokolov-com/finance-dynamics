import { useEffect, type ReactNode } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Varioqub } from "@/components/Varioqub";
import { ArticleToc } from "./ArticleToc";

/**
 * Каркас страницы-статьи блога: шапка сайта, содержание статьи,
 * контент, антифликер Varioqub и подвал. Заголовок вкладки и описание
 * страницы проставляются автоматически.
 */
export const ArticlePage = ({
  title,
  description,
  toc = true,
  children,
}: {
  /** Заголовок вкладки, без суффикса бренда */
  title: string;
  /** Описание страницы для поиска и соцсетей */
  description?: string;
  toc?: boolean;
  children: ReactNode;
}) => {
  usePageMeta({ title, description });

  // Разметка статьи для поисковиков и AI-ассистентов
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.article = "true";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      inLanguage: "ru-RU",
      mainEntityOfPage: `https://vasyaifin.ru${window.location.pathname}`,
      author: { "@type": "Person", name: "Василий Мещеряков" },
      publisher: { "@type": "Organization", name: "Вася и финансы", url: "https://vasyaifin.ru/" },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [title, description]);

  return (
    <main className="bg-background text-foreground">
      <SiteHeader />
      {toc ? <ArticleToc title="Содержание" /> : null}

      {children}

      <Varioqub antiFlicker />
      <Footer />
    </main>
  );
};
