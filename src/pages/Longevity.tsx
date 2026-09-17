import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Varioqub } from "@/components/Varioqub";
import { LifeTimeline } from "@/components/longevity/LifeTimeline";
import { nbsp } from "@/lib/nbsp";

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
      <header className="grid min-h-screen place-items-center px-5 pb-14 pt-28 text-center sm:px-8">
        <div className="max-w-5xl">
          <p className="font-body text-sm text-muted-foreground">{nbsp("Интерактивная история о длинной жизни")}</p>
          <h1 className="mt-6 font-display text-[clamp(3.25rem,9vw,7.4rem)] font-semibold leading-[0.92]">{nbsp("А если в 40 всё только начинается?")}</h1>
          <p className="mx-auto mt-8 max-w-4xl font-body text-[clamp(1.125rem,2vw,1.7rem)] leading-snug text-foreground/80">{nbsp("Мы привыкли делить жизнь на две половины: до сорока — растём и зарабатываем, после — постепенно готовимся к пенсии. Но эта карта всё хуже описывает реальность.")}</p>
          <p className="mt-14 inline-flex items-center gap-2 font-body text-sm text-muted-foreground">{nbsp("Прокрутите вниз")} <ArrowDown className="h-4 w-4 animate-bounce" /></p>
        </div>
      </header>
      <LifeTimeline />
      <Varioqub antiFlicker />
      <Footer />
    </main>
  );
};

export default Longevity;