import { useEffect, type ReactNode } from "react";
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
  useEffect(() => {
    document.title = `${title} · Вася и финансы`;
    if (!description) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
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
