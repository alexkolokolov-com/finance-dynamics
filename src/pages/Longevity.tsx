import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Varioqub } from "@/components/Varioqub";
import { LifeTimeline } from "@/components/longevity/LifeTimeline";
import { Button } from "@/components/ui/button";
import { nbsp } from "@/lib/nbsp";
import longevityHero from "@/assets/longevity-hero.jpg";

const Longevity = () => {
  const [headlineWord, setHeadlineWord] = useState("сложнее");

  useEffect(() => {
    document.title = "Финансовое долголетие — интерактивный таймлайн";
    const description = "Интерактивная история о длинной жизни и финансовом горизонте от 0 до 120 лет.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeadlineWord("лучше");
      return;
    }

    const worseTimer = window.setTimeout(() => setHeadlineWord("хуже"), 1400);
    const betterTimer = window.setTimeout(() => setHeadlineWord("лучше"), 2800);
    return () => {
      window.clearTimeout(worseTimer);
      window.clearTimeout(betterTimer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <header className="px-5 pb-10 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="font-display text-[clamp(1.65rem,3vw,3rem)] font-semibold leading-none text-accent">{nbsp("Финансовое долголетие")}</p>
          <h1 aria-label="После 40 жизнь может стать лучше" className="mx-auto mt-7 max-w-7xl font-display text-[clamp(2.7rem,7.3vw,7rem)] font-semibold leading-[0.93]">
            <span className="block whitespace-nowrap">{nbsp("После 40 жизнь")}</span>
            <span className="mt-1 block whitespace-nowrap">
              {nbsp("может стать")}
              <span aria-hidden="true" className="ml-[0.04em] inline-flex w-[0.72em] justify-start text-accent">
                {[0, 1, 2].map((dot) => <span key={dot} className="longevity-dot">.</span>)}
              </span>
            </span>
            <span key={headlineWord} aria-hidden="true" className="mt-1 block animate-fade-in text-accent">{headlineWord}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-4xl font-body text-[clamp(1.125rem,2vw,1.7rem)] leading-snug text-foreground/80">{nbsp("Вторая половина жизни – это не подготовка к пенсии. Загляните вперёд – это не страшно.")}</p>
          <Button asChild size="lg" className="mt-7 rounded-full px-7 text-base">
            <a href="#timeline">{nbsp("Посмотреть")}</a>
          </Button>
          <div className="mx-auto mt-8 overflow-hidden rounded-lg border border-border bg-card sm:mt-12">
            <img
              src={longevityHero}
              alt="Одна линия жизни соединяет молодость, зрелость и активное долголетие"
              width={1536}
              height={1024}
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover sm:aspect-[3/1]"
            />
          </div>
        </div>
      </header>
      <LifeTimeline />
      <Varioqub antiFlicker />
      <Footer />
    </main>
  );
};

export default Longevity;