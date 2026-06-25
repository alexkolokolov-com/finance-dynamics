import { Link } from "react-router-dom";
import { BigBudgetBoard } from "@/components/bigbudget/BigBudgetBoard";

export const CardSoon = () => {
  return (
    <section
      id="marathon"
      className="relative py-24 md:py-32 overflow-hidden bg-grid scroll-mt-20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--grad-chalk)" }}
      />

      <div className="container-px max-w-7xl mx-auto relative">
        <BigBudgetBoard
          cta={
            <Link
              to="/bigbudget#register"
              className="btn-chalk !font-sans !font-medium !tracking-normal inline-flex items-center gap-2"
            >
              Регистрация →
            </Link>
          }
        />
      </div>
    </section>
  );
};
