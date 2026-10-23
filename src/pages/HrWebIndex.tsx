import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { HrWebQuiz } from "@/components/hrweb/HrWebQuiz";
import { usePageMeta } from "@/hooks/usePageMeta";

const HrWebIndex = () => {
  usePageMeta({
    title: "Индекс финансового спокойствия команды — диагностика для HR",
    description: "9 ситуаций из жизни HR: узнайте, на каком уровне находится поддержка финансового благополучия сотрудников в вашей компании.",
    path: "/hr-web-index",
  });
  return (
    <>
      <SiteHeader />
      <main className="bg-grid">
        <section className="container-px mx-auto max-w-7xl pb-16 pt-36 md:pb-24 md:pt-40">
          <HrWebQuiz />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HrWebIndex;
