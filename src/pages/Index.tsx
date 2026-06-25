import { Ticker } from "@/components/Ticker";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expert } from "@/components/sections/Expert";
import { Marathon } from "@/components/sections/Marathon";
import { Courses } from "@/components/sections/Courses";
import { Laws } from "@/components/sections/Laws";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Вася и финансы · Василий Мещеряков";
    const desc = document.querySelector('meta[name="description"]');
    const content = "Вася и финансы — авторский проект Василия Мещерякова. Курсы, марафон «Теория большого бюджета» и спокойный блог о личных финансах.";
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Ticker />
      <About />
      <Expert />
      <Marathon />
      <Courses />
      <Laws />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
