import { Card, CardContent } from "@/components/ui/card";
import { Activity, BookOpen, Monitor, Smartphone } from "lucide-react";

export const CombinedUsageCard = () => {
  const totalUsage = "21,250";

  return (
    <Card className="transition-all hover:shadow-lg md:col-span-2">
      <CardContent className="p-6 space-y-5">
        {/* Top section */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Total Platform Usage</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">{totalUsage}</span>
              <span className="text-sm text-muted-foreground">mins this month</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <BookOpen className="h-5 w-5 text-secondary" />
          </div>
        </div>

        {/* Bottom section — visual usage bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Usage distribution</span>
            <span className="tabular-nums">4 platforms</span>
          </div>
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="bg-primary transition-all" style={{ width: "58%" }} title="Web — 58%" />
            <div className="bg-[hsl(var(--chart-5))]" style={{ width: "24%" }} title="Mobile — 24%" />
            <div className="bg-[hsl(var(--chart-3))]" style={{ width: "12%" }} title="School — 12%" />
            <div className="bg-[hsl(var(--chart-4))]" style={{ width: "6%" }} title="Desktop — 6%" />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Web</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[hsl(var(--chart-5))]" />
              <span className="text-xs text-muted-foreground">Mobile</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[hsl(var(--chart-3))]" />
              <span className="text-xs text-muted-foreground">School</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[hsl(var(--chart-4))]" />
              <span className="text-xs text-muted-foreground">Desktop</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
