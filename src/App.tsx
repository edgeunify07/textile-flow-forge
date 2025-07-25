import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/organizations" element={<ProtectedRoute><MainLayout><Organizations /></MainLayout></ProtectedRoute>} />
          <Route path="/variables" element={<ProtectedRoute><MainLayout><Variables /></MainLayout></ProtectedRoute>} />
          <Route path="/bom" element={<ProtectedRoute><MainLayout><BOMCosting /></MainLayout></ProtectedRoute>} />
          <Route path="/production" element={<ProtectedRoute><MainLayout><Production /></MainLayout></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><MainLayout><Inventory /></MainLayout></ProtectedRoute>} />
          <Route path="/quality" element={<ProtectedRoute><MainLayout><Quality /></MainLayout></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><MainLayout><Reports /></MainLayout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><MainLayout><Analytics /></MainLayout></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><MainLayout><Payments /></MainLayout></ProtectedRoute>} />
          <Route path="/ai" element={<ProtectedRoute><MainLayout><AIAssistant /></MainLayout></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><MainLayout><Suppliers /></MainLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
