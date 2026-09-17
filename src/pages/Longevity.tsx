import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Varioqub } from "@/components/Varioqub";
import { LifeTimeline } from "@/components/longevity/LifeTimeline";
import { nbsp } from "@/lib/nbsp";
import longevityHero from "@/assets/longevity-hero.jpg";

const Longevity = () => {
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <header className="px-5 pb-10 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-[1400px] text-center">
          <h1 className="mx-auto max-w-6xl font-display text-[clamp(3.25rem,9vw,7.4rem)] font-semibold leading-[0.92]">{nbsp("А если в 40 всё только начинается?")}</h1>
          <p className="mx-auto mt-7 max-w-4xl font-body text-[clamp(1.125rem,2vw,1.7rem)] leading-snug text-foreground/80">{nbsp("Мы привыкли делить жизнь на две половины: до сорока — растём и зарабатываем, после — постепенно готовимся к пенсии. Но эта карта всё хуже описывает реальность.")}</p>
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