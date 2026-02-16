import { Card, CardContent } from "@/components/ui/card";
import { Activity, BookOpen } from "lucide-react";

export const CombinedUsageCard = () => {
  const totalUsage = "21,250";

  return (
    <Card className="transition-all hover:shadow-lg md:col-span-2">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Total Platform Usage</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight">{totalUsage}</span>
            <span className="text-sm text-muted-foreground">hours this month</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <BookOpen className="h-5 w-5 text-secondary" />
        </div>
      </CardContent>
    </Card>
  );
};
