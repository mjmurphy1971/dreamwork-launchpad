import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Meditation from "./pages/Meditation";
import Vlogs from "./pages/Vlogs";
import Breathwork from "./pages/Breathwork";
import HomeopathicHealing from "./pages/HomeopathicHealing";
import WeeklyStillness from "./pages/WeeklyStillness";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering');
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/breathwork" element={<Breathwork />} />
            <Route path="/vlogs" element={<Vlogs />} />
            <Route path="/homeopathic-healing" element={<HomeopathicHealing />} />
            <Route path="/weekly-stillness" element={<WeeklyStillness />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
