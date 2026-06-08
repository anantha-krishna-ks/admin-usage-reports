import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Info } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { CombinedUsageCard } from "@/components/CombinedUsageCard";
import { UsageByUserTypeChart } from "@/components/UsageByUserTypeChart";
import { ApplicationTrendChart } from "@/components/ApplicationTrendChart";
import { UsageDistributionChart } from "@/components/UsageDistributionChart";
import { DetailedAnalytics } from "@/components/DetailedAnalytics";
import { SectionDrillDown } from "@/components/SectionDrillDown";
import { ContentUsageTable } from "@/components/ContentUsageTable";
import { CustomContentCreation } from "@/components/CustomContentCreation";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { ExportButton } from "@/components/proctoring/ExportButton";
import type { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [date, setDate] = useState<DateRange | undefined>();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Top info strip */}
      <div className="sticky top-0 z-50 border-b border-border bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Riverside Academy — Admin Dashboard</span>
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
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive usage analytics across schools and sections
          </p>
        </div>

        {/* Application Trend - full width */}
        <ApplicationTrendChart />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-lg border border-border bg-card/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <DateRangeFilter date={date} onDateChange={setDate} />
            <Select defaultValue="riverside">
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="riverside">Riverside Academy</SelectItem>
                <SelectItem value="lakeside">Lakeside High School</SelectItem>
                <SelectItem value="mountain">Mountain View School</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ExportButton dateRange={date ? { from: date.from, to: date.to } : undefined} />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <CombinedUsageCard />
          <StatCard
            title="Total Active Users"
            value="1,008"
            subtitle="across all user types"
            icon={Users}
            iconColor="text-chart-3"
            drillDown={[
              { label: "New Users", value: "324" },
              { label: "Repeat Users", value: "684" },
              { label: "Number of Schools", value: "12" }
            ]}
          />
        </div>

        {/* Charts */}


        {/* Detailed Analytics */}
        <DetailedAnalytics />

        {/* Section Drill Down */}
        <SectionDrillDown dateRange={date} />

        {/* Content Usage */}
        <ContentUsageTable />

        {/* Custom Content Creation */}
        <CustomContentCreation />
      </div>
    </div>
  );
};

export default Index;
