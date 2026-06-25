import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-serif-display text-6xl">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">
            Страница&nbsp;не&nbsp;найдена
          </p>
          <a href="/" className="badge-tag hover:border-accent hover:text-accent transition-colors">
            На&nbsp;главную
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
