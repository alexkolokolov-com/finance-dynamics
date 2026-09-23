import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Varioqub } from "@/components/Varioqub";
import { LifeTimeline } from "@/components/longevity/LifeTimeline";
import { Button } from "@/components/ui/button";
import { nbsp } from "@/lib/nbsp";
import longevityHero from "@/assets/longevity-hero.jpg";
import { usePageMeta } from "@/hooks/usePageMeta";

const Longevity = () => {
  usePageMeta({ title: "Финансовое долголетие — интерактивный таймлайн", description: "Финансовое долголетие: как планировать деньги на горизонте 120 лет. Интерактивный таймлайн и примеры известных людей." });
  const [headlineWord, setHeadlineWord] = useState("");
  const [headlineIsFinal, setHeadlineIsFinal] = useState(false);

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
      setHeadlineWord("Лучше");
      setHeadlineIsFinal(true);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const wait = (duration: number) => new Promise<void>((resolve) => {
      const timer = window.setTimeout(resolve, duration);
      timers.push(timer);
    });

    const typeWord = async (word: string) => {
      for (let index = 1; index <= word.length; index += 1) {
        if (cancelled) return;
        setHeadlineWord(word.slice(0, index));
        await wait(105);
      }
    };

    const eraseWord = async (word: string) => {
      for (let index = word.length - 1; index >= 0; index -= 1) {
        if (cancelled) return;
        setHeadlineWord(word.slice(0, index));
        await wait(60);
      }
    };

    const runTypewriter = async () => {
      await wait(1150);
      await typeWord("Сложнее");
      await wait(650);
      await eraseWord("Сложнее");
      await wait(180);
      await typeWord("Тяжелее");
      await wait(650);
      await eraseWord("Тяжелее");
      await wait(180);
      await typeWord("Лучше");
      if (!cancelled) setHeadlineIsFinal(true);
    };

    void runTypewriter();
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <header className="px-5 pb-10 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="font-display text-[clamp(1.1rem,2vw,2rem)] font-semibold leading-none text-accent">{nbsp("Финансовое долголетие")}</p>
          <div className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-lg border border-border bg-card sm:mt-8">
            <img
              src={longevityHero}
              alt="Одна линия жизни соединяет молодость, зрелость и активное долголетие"
              width={1536}
              height={1024}
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover sm:aspect-[3/1]"
            />
          </div>
          <h1 aria-label="После 40 жизнь может стать лучше" className="mx-auto mt-8 max-w-7xl font-display text-[clamp(2.7rem,7.3vw,7rem)] font-semibold leading-[0.93] sm:mt-12">
            <span className="block whitespace-nowrap">{nbsp("После 40 жизнь")}</span>
            <span className="mt-1 block whitespace-nowrap">
              {nbsp("может стать")}
              <span aria-hidden="true" className="ml-[0.04em] inline-flex w-[0.72em] justify-start text-accent">
                {[0, 1, 2].map((dot) => <span key={dot} className="longevity-dot">.</span>)}
              </span>
              <span
                aria-hidden="true"
                className={`longevity-typewriter mt-1 block min-h-[0.93em] text-center sm:ml-[0.13em] sm:mt-0 sm:inline-block sm:min-w-[4.8em] sm:text-left ${headlineIsFinal ? "longevity-typewriter-final text-accent" : "text-muted-foreground"}`}
              >
                {headlineWord}
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-4xl font-body text-[clamp(1.125rem,2vw,1.7rem)] leading-snug text-foreground/80">{nbsp("Вторая половина жизни – это не подготовка к пенсии. Загляните вперёд – это не страшно.")}</p>
          <Button asChild size="lg" className="mt-7 rounded-full px-7 text-base">
            <a href="#timeline">{nbsp("Посмотреть")}</a>
          </Button>
        </div>
      </header>
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[0.95]">
            <span className="text-accent">{nbsp("Три")}</span> {nbsp("половины жизни")}
          </h2>
          <p className="mx-auto mt-7 max-w-3xl font-body text-[clamp(1.125rem,2vw,1.6rem)] leading-snug text-foreground/80">{nbsp("Вероятно, вы находитесь в переходном периоде 35–45 лет, который часто называют кризисом среднего возраста. Но я называю это периодом осознания, что прошлый подход к жизни не работает. Осознание, что ресурсы вашего организма ограничены, и просто работать ещё больше уже невозможно. И невозможно всё успеть.")}</p>
        </div>
      </section>
      <LifeTimeline />
      <Varioqub antiFlicker />
      <Footer />
    </main>
  );
};

export default Longevity;