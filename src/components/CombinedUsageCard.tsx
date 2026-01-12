import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BookOpen, Monitor, Smartphone, Building2, FileText, Library, BookOpenCheck } from "lucide-react";

export const CombinedUsageCard = () => {
  const totalUsage = "21,250";
  
  const applicationBreakdown = [
    { label: "Web", value: "4,250", icon: Monitor, color: "text-primary", bg: "bg-primary/10" },
    { label: "Mobile", value: "3,150", icon: Smartphone, color: "text-chart-2", bg: "bg-chart-2/10" },
    { label: "School", value: "1,100", icon: Building2, color: "text-chart-3", bg: "bg-chart-3/10" },
  ];

  const contentBreakdown = [
    { label: "Lesson Plans", value: "5,100", icon: FileText, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Learning Resources", value: "4,850", icon: Library, color: "text-chart-4", bg: "bg-chart-4/10" },
    { label: "Ebooks", value: "2,800", icon: BookOpenCheck, color: "text-chart-5", bg: "bg-chart-5/10" },
  ];

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
        
        <div className="mt-6 grid md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Application Usage Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Application Usage</span>
              <span className="ml-auto text-lg font-bold text-primary">8,500 hrs</span>
            </div>
            <div className="space-y-2">
              {applicationBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-gradient-to-br from-background to-muted/30 border border-border/50 transition-all hover:shadow-sm"
                >
                  <div className={`p-1.5 rounded-md ${item.bg}`}>
                    <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground flex-1">{item.label}</span>
                  <span className="text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Usage Section */}
          <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <BookOpen className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold">Content Usage</span>
              <span className="ml-auto text-lg font-bold text-secondary">12,750 hrs</span>
            </div>
            <div className="space-y-2">
              {contentBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-gradient-to-br from-background to-muted/30 border border-border/50 transition-all hover:shadow-sm"
                >
                  <div className={`p-1.5 rounded-md ${item.bg}`}>
                    <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground flex-1">{item.label}</span>
                  <span className="text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
