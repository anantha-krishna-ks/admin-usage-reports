import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BookOpen } from "lucide-react";

export const CombinedUsageCard = () => {
  const totalUsage = "21,250";

  return (
    <Card className="transition-all hover:shadow-lg md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Platform Usage</CardTitle>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <BookOpen className="h-5 w-5 text-secondary" />
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="text-3xl font-bold">{totalUsage}</div>
        <p className="text-xs text-muted-foreground mt-1">hours this month</p>
        
      </CardContent>
    </Card>
  );
};
