import { Card, CardContent } from "@/components/ui/card";
import { Activity, BookOpen, TrendingUp } from "lucide-react";

export const CombinedUsageCard = () => {
  const totalUsage = "21,250";

  return (
    <Card className="transition-all hover:shadow-lg md:col-span-2 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-stretch">
          {/* Main metric */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Total Platform Usage</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">{totalUsage}</span>
              <span className="text-sm text-muted-foreground">hours this month</span>
            </div>
          </div>

          {/* Split metrics */}
          <div className="flex border-l border-border">
            <div className="flex flex-col items-center justify-center px-6 py-5 border-r border-border gap-1.5">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-lg font-semibold text-primary">8,500</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">App Usage</span>
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-5 gap-1.5">
              <BookOpen className="h-4 w-4 text-secondary" />
              <span className="text-lg font-semibold text-secondary">12,750</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Content</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
