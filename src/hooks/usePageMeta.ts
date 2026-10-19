import { useEffect } from "react";

const SITE_URL = "https://vasyaifin.ru";
const BRAND = "Вася и финансы";

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export type PageMeta = {
  /** Заголовок вкладки без суффикса бренда */
  title: string;
  /** Описание страницы для поиска и соцсетей */
  description?: string;
  /** Закрыть страницу от индексации (служебные страницы, презентации) */
  noindex?: boolean;
  /** Путь страницы для canonical; по умолчанию текущий */
  path?: string;
  /** Изображение для соцсетей с доступным абсолютным HTTPS-адресом. */
  image?: string;
  imageAlt?: string;
};

/**
 * Проставляет заголовок, описание, canonical и (при необходимости) запрет
 * индексации. Используется на страницах, у которых нет своего шаблона
 * с метаданными.
 */
export const usePageMeta = ({ title, description, noindex, path, image, imageAlt }: PageMeta) => {
  useEffect(() => {
    const fullTitle = title.includes(BRAND) ? title : `${title} · ${BRAND}`;
    document.title = fullTitle;
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("name", "twitter:title", fullTitle);

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }

    // Сервер отдаёт адреса с завершающим слэшем — canonical должен совпадать.
    const rawPath = path ?? window.location.pathname;
    const normalized = rawPath === "/" ? "/" : rawPath.replace(/\/+$/, "") + "/";
    const url = `${SITE_URL}${normalized}`;
    upsertCanonical(url);
    upsertMeta("property", "og:url", url);

    const imageTags = [
      ["property", "og:image"],
      ["name", "twitter:image"],
      ["property", "og:image:alt"],
    ] as const;
    const previousImages = imageTags.map(([attr, key]) => ({ attr, key, content: document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)?.content }));
    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
      upsertMeta("property", "og:image:alt", imageAlt ?? title);
    }

    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      upsertMeta("name", "robots", "noindex, nofollow");
    } else if (robots) {
      robots.remove();
    }
    return () => {
      if (!image) return;
      previousImages.forEach(({ attr, key, content }) => {
        if (content !== undefined) upsertMeta(attr, key, content);
        else document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
      });
    };
  }, [title, description, noindex, path, image, imageAlt]);
};
