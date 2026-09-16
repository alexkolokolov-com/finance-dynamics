import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Varioqub } from "@/components/Varioqub";
import { LifeTimeline } from "@/components/longevity/LifeTimeline";
import { nbsp } from "@/lib/nbsp";

const Longevity = () => {
  useEffect(() => {
    document.title = "Финансовое долголетие · Вася и финансы";
    const description =
      "Интерактивная карта жизни 0–120 лет и двадцать биографий людей, которые начали главное дело после 45 или продолжали работать после 80.";
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

      <header className="px-5 pb-10 pt-28 text-center sm:px-8 sm:pb-14 sm:pt-36">
        <h1 className="mx-auto max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.88]">
          {nbsp("Финансовое долголетие")}
        </h1>
        <p className="mx-auto mt-7 max-w-3xl font-body text-lg leading-relaxed text-foreground/70 sm:text-xl">
          {nbsp(
            "Мы привыкли считать жизнь до пенсии. Но у неё может быть три половины. Посмотрите на двадцать биографий и найдите своё место на шкале от нуля до 120 лет."
          )}
        </p>
      </header>

      <LifeTimeline />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
              {nbsp("Пенсия не финал. Это только отметка внутри длинной жизни")}
            </h2>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground/75">
              {nbsp(
                "В первой части жизни доход растёт вместе с количеством часов и сил. Во второй начинает работать накопленное: опыт, репутация, связи и капитал. Третью часть почти никто не считает, хотя именно она может занять ещё сорок лет."
              )}
            </p>
          </div>

          <div className="border-l-2 border-accent pl-6 sm:pl-8">
            <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
              {nbsp(
                "После 45 человек редко начинает с нуля. Он начинает с накопленного."
              )}
            </p>
            <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground">
              {nbsp(
                "Шкала не доказывает, что поздний успех гарантирован каждому. Она показывает другое: верхняя граница активного возраста намного дальше той, которую мы обычно закладываем в финансовый план."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl font-semibold">{nbsp("Как читать данные")}</h2>
          <div className="space-y-4 font-body text-[15px] leading-relaxed text-foreground/65">
            <p>
              {nbsp(
                "В выборке десять людей, чьё главное дело или большое признание пришло после 45, и десять людей, которые продолжали активно работать после 80. Возраст в круге – конкретная точка биографии, описанная в карточке."
              )}
            </p>
            <p>
              {nbsp(
                "Это набор проверяемых случаев, а не репрезентативная статистика. У каждой истории есть ссылка на источник."
              )}
            </p>
          </div>
        </div>
      </section>

      <Varioqub antiFlicker />
      <Footer />
    </main>
  );
};

export default Longevity;