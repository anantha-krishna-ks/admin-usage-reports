import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { StatCard } from "@/components/StatCard";
import { CombinedUsageCard } from "@/components/CombinedUsageCard";
import { UsageByUserTypeChart } from "@/components/UsageByUserTypeChart";
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
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Riverside Academy — Admin Dashboard</span>
          </div>
          <button
            onClick={() => navigate("/dashboard-guide")}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <Info className="h-3.5 w-3.5" />
            Dashboard Guide
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8" data-export-root>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin Reports</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive usage analytics across schools and sections
            </p>
          </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <DateRangeFilter date={date} onDateChange={setDate} />
            <Select defaultValue="riverside">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="riverside">Riverside Academy</SelectItem>
                <SelectItem value="lakeside">Lakeside High School</SelectItem>
                <SelectItem value="mountain">Mountain View School</SelectItem>
              </SelectContent>
            </Select>
            <ExportButton dateRange={date ? { from: date.from, to: date.to } : undefined} />
          </div>
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
        <div className="grid gap-6 md:grid-cols-2">
          <UsageByUserTypeChart />
          <UsageDistributionChart />
        </div>

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
