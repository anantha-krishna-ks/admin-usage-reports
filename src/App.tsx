import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProctorAnalytics from "./pages/ProctorAnalytics";
import SectionDetail from "./pages/SectionDetail";
import ContentUsageDetail from "./pages/ContentUsageDetail";
import CustomContentDetail from "./pages/CustomContentDetail";
import PersonUsageDetail from "./pages/PersonUsageDetail";
import EnvironmentDetail from "./pages/EnvironmentDetail";
import DashboardGuide from "./pages/DashboardGuide";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import GreeterDashboard from "./pages/greeter/GreeterDashboard";
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
          <Route path="/dashboard-guide" element={<DashboardGuide />} />
          <Route path="/proctor-analytics" element={<ProctorAnalytics />} />
          <Route path="/section-detail" element={<SectionDetail />} />
          <Route path="/content-usage-detail" element={<ContentUsageDetail />} />
          <Route path="/custom-content-detail" element={<CustomContentDetail />} />
          <Route path="/person-usage-detail" element={<PersonUsageDetail />} />
          <Route path="/environment-detail" element={<EnvironmentDetail />} />
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/greeter" element={<GreeterDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
