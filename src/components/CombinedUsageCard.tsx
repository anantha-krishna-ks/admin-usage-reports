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
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* Application Usage Section */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <div className="p-2 rounded-md bg-primary/10">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Application Usage</p>
              <p className="text-xl font-bold text-primary">8,500 hrs</p>
            </div>
          </div>

          {/* Content Usage Section */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20">
            <div className="p-2 rounded-md bg-secondary/10">
              <BookOpen className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Content Usage</p>
              <p className="text-xl font-bold text-secondary">12,750 hrs</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
