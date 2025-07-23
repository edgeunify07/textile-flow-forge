import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Organizations from "./pages/Organizations";
import Variables from "./pages/Variables";
import BOMCosting from "./pages/BOMCosting";
import Production from "./pages/Production";
import Inventory from "./pages/Inventory";
import Quality from "./pages/Quality";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Payments from "./pages/Payments";
import AIAssistant from "./pages/AIAssistant";
import Suppliers from "./pages/Suppliers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/organizations" element={<MainLayout><Organizations /></MainLayout>} />
          <Route path="/variables" element={<MainLayout><Variables /></MainLayout>} />
          <Route path="/bom" element={<MainLayout><BOMCosting /></MainLayout>} />
          <Route path="/production" element={<MainLayout><Production /></MainLayout>} />
          <Route path="/inventory" element={<MainLayout><Inventory /></MainLayout>} />
          <Route path="/quality" element={<MainLayout><Quality /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
          <Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>} />
          <Route path="/payments" element={<MainLayout><Payments /></MainLayout>} />
          <Route path="/ai" element={<MainLayout><AIAssistant /></MainLayout>} />
          <Route path="/suppliers" element={<MainLayout><Suppliers /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
