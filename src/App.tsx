
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Vilkår from "./pages/Vilkår";
import Personvern from "./pages/Personvern";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll til toppen av siden når path endres
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

const App = () => (
  <div className="min-h-screen w-full max-w-full overflow-x-hidden">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <TooltipProvider>
              <ErrorBoundary>
                <div className="min-h-screen flex flex-col">
                  <ScrollToTop />
                  <Toaster />
                  <Sonner />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/om-prispilot" element={<About />} />
                      <Route path="/hvordan-det-fungerer" element={<HowItWorks />} />
                      <Route path="/kontakt-oss" element={<Contact />} />
                      <Route path="/blogg" element={<Blog />} />
                      <Route path="/vilkår" element={<Vilkår />} />
                      <Route path="/personvern" element={<Personvern />} />
                      <Route path="/:kategori" element={<CategoryPage />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                  <Footer />
                  <CookieBanner />
                </div>
              </ErrorBoundary>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </div>
);

export default App;
