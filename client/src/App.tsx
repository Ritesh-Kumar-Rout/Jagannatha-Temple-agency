
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmoothScroll } from "./components/ui/SmoothScroll";
import Index from "./pages/Index";
import Rituals from "./pages/Rituals";
import Travel from "./pages/Travel";
import NotFound from "./pages/NotFound";
import FestivalCalendar from "./pages/rathayatracalender";
import  Sos from "./pages/SOS";
import HotelsNearJagannathTemple from "./pages/Accomodation"
import PuriExcursions from "./pages/PuriExcursions";
import SweetList from "./pages/Food";
import LiveStream from "./components/LiveStream";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";

import { ScrollToTop } from "./components/ui/ScrollToTop";
import { Preloader } from "./components/ui/Preloader";

// Admin Imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SmoothScroll>
        <Preloader />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rituals" element={<Rituals />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/rathayatracalender" element={<FestivalCalendar />} />
            <Route path="/sos" element={<Sos />} />
            <Route path="/stay" element={< HotelsNearJagannathTemple />} />
            <Route path="/attractions" element={<  PuriExcursions />} />
            <Route path="/food" element={<SweetList />} />
            <Route path="/chat" element={<NotFound />} />
            <Route path="/live" element={<LiveStream />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWidget />
        </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
