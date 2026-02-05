import { Users } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { CombinedUsageCard } from "@/components/CombinedUsageCard";
import { UsageByUserTypeChart } from "@/components/UsageByUserTypeChart";
import { UsageDistributionChart } from "@/components/UsageDistributionChart";
import { DetailedAnalytics } from "@/components/DetailedAnalytics";
import { SectionDrillDown } from "@/components/SectionDrillDown";
 import { ContentUsageTable } from "@/components/ContentUsageTable";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin Reports</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive usage analytics across schools and sections
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <DateRangeFilter />
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
              { label: "Repeat Users", value: "684" }
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
        <SectionDrillDown />
 
         {/* Content Usage */}
         <ContentUsageTable />
      </div>
    </div>
  );
};

export default Index;
