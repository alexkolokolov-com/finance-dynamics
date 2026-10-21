import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";
import Book3 from "@/pages/book3/Book3";

/* /book-3 — перенесённая страница книги; разметка и стили берутся из
   src/pages/book3 без изменений, здесь только шапка и подвал сайта. */
const Book3Page = () => {
  usePageMeta({
    title: "Ленивый бюджет — книга Василия Мещерякова",
    description:
      "Книга «Ленивый бюджет»: как собрать личный бюджет, который не забросить, и превратить его в спокойные деньги.",
    path: "/book-3",
  });

  useEffect(() => {
    document.title = "Ленивый бюджет — книга Василия Мещерякова";
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <Book3 />
      </main>
      <Footer />
    </>
  );
};

export default Book3Page;
