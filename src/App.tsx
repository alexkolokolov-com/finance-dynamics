import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToHash } from "./components/ScrollToHash";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Card from "./pages/Card.tsx";
import BigBudget from "./pages/BigBudget.tsx";
import Checklist from "./pages/Checklist.tsx";
import BudgetMethods from "./pages/BudgetMethods.tsx";
import Blog from "./pages/Blog.tsx";
import Landing from "./pages/Landing.tsx";
import LandingDeck from "./pages/LandingDeck.tsx";
import Support2026 from "./pages/Support2026.tsx";
import Traffic from "./pages/Traffic.tsx";
import Calculator from "./pages/Calculator.tsx";
import Cashback from "./pages/Cashback.tsx";
import Conference from "./pages/Conference.tsx";
import Consultations from "./pages/Consultations.tsx";
import Lectures from "./pages/Lectures.tsx";
import Decisions from "./pages/Decisions.tsx";
import Event from "./pages/Event.tsx";
import Negotiations from "./pages/Negotiations.tsx";
import Oferta from "./pages/Oferta.tsx";
import Reviews from "./pages/Reviews.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/bigbudget" element={<BigBudget />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/budget-methods" element={<BudgetMethods />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/landing-deck" element={<LandingDeck />} />
          <Route path="/support-2026" element={<Support2026 />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/cashback" element={<Cashback />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/decisions" element={<Decisions />} />
          <Route path="/event" element={<Event />} />
          <Route path="/negotiations" element={<Negotiations />} />
          <Route path="/oferta" element={<Oferta />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/old" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
