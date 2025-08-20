import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Meditation from "./pages/Meditation";
import Vlogs from "./pages/Vlogs";
import Breathwork from "./pages/Breathwork";
import HomeopathicHealing from "./pages/HomeopathicHealing";
import Herbology from "./pages/Herbology";
import WeeklyStillness from "./pages/WeeklyStillness";
import MorningRituals from "./pages/MorningRituals";
import WorkTransitions from "./pages/WorkTransitions";
import EveningWinddowns from "./pages/EveningWinddowns";
import DreamJournal from "./pages/DreamJournal";
import OracleCards from "./pages/OracleCards";
import ThoughtBubbles from "./pages/ThoughtBubbles";
import SingingBowls from "./pages/SingingBowls";
import GratitudeGarden from "./pages/GratitudeGarden";
import ChakraBalancing from "./pages/ChakraBalancing";
import MindfulColoring from "./pages/MindfulColoring";
import Phase4Dashboard from "./pages/Phase4Dashboard";
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
            <Route path="/articles" element={<Articles />} />
            <Route path="/about" element={<About />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/breathwork" element={<Breathwork />} />
            <Route path="/vlogs" element={<Vlogs />} />
            <Route path="/natural-healing/homeopathy" element={<HomeopathicHealing />} />
            <Route path="/natural-healing/herbology" element={<Herbology />} />
            {/* Legacy route redirect */}
            <Route path="/homeopathic-healing" element={<HomeopathicHealing />} />
            <Route path="/weekly-stillness" element={<WeeklyStillness />} />
            <Route path="/morning-rituals" element={<MorningRituals />} />
            <Route path="/work-transitions" element={<WorkTransitions />} />
            <Route path="/evening-winddowns" element={<EveningWinddowns />} />
            <Route path="/dream-journal" element={<DreamJournal />} />
            <Route path="/oracle-cards" element={<OracleCards />} />
            <Route path="/thought-bubbles" element={<ThoughtBubbles />} />
            <Route path="/singing-bowls" element={<SingingBowls />} />
            <Route path="/gratitude-garden" element={<GratitudeGarden />} />
            <Route path="/chakra-balancing" element={<ChakraBalancing />} />
            <Route path="/mindful-coloring" element={<MindfulColoring />} />
            <Route path="/phase4-dashboard" element={<Phase4Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
