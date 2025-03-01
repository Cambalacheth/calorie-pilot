
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import FoodDetail from "./pages/FoodDetail";
import SettingsPage from "./pages/SettingsPage";
import AnalysisPage from "./pages/AnalysisPage";
import NotFound from "./pages/NotFound";
import { FoodProvider } from "./context/FoodContext";
import { AnimatePresence } from "./components/AnimatePresence";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FoodProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" closeButton theme="light" />
        <BrowserRouter>
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/food/:id" element={<FoodDetail />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </FoodProvider>
  </QueryClientProvider>
);

export default App;
