import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Building2 } from "lucide-react";
import { CombinedUsageCard } from "@/components/super-admin/CombinedUsageCard";
import { ActiveUsersCard } from "@/components/super-admin/ActiveUsersCard";
import { ApplicationTrendChart } from "@/components/super-admin/ApplicationTrendChart";
import { DetailedAnalytics } from "@/components/super-admin/DetailedAnalytics";
import { CustomContentCreation } from "@/components/super-admin/CustomContentCreation";
import { DateRangeFilter } from "@/components/super-admin/DateRangeFilter";
import { ExportButton } from "@/components/proctoring/ExportButton";
import type { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SuperAdminDashboard = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Top info strip */}
      <div className="sticky top-0 z-50 border-b border-border bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Global Network — Super Admin Dashboard</span>
          </div>
          <button
            onClick={() => navigate("/dashboard-guide")}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <Info className="h-3.5 w-3.5" />
            Dashboard Guide
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8" data-export-root>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Super Admin Analytical Reports</h1>
            <p className="text-muted-foreground mt-1">
              Network-wide usage analytics across organizations, schools and sections
            </p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 w-[280px] border-primary/40 bg-primary/5 shadow-sm hover:bg-primary/10 hover:border-primary/60 transition-colors">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                  <Building2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <SelectValue placeholder="Select organization" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              <SelectItem value="north">Northern Region</SelectItem>
              <SelectItem value="south">Southern Region</SelectItem>
              <SelectItem value="east">Eastern Region</SelectItem>
              <SelectItem value="west">Western Region</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Application Trend - full width */}
        <ApplicationTrendChart />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-lg border border-border bg-card/40 px-4 py-3">
          <DateRangeFilter date={date} onDateChange={setDate} />
          <ExportButton dateRange={date ? { from: date.from, to: date.to } : undefined} />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <CombinedUsageCard />
          <ActiveUsersCard />
        </div>

        {/* Detailed Analytics */}
        <DetailedAnalytics />

        {/* Content Usage */}
        <ContentUsageTable />

        {/* Custom Content Creation */}
        <CustomContentCreation />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
