import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DrillDownItem {
  label: string;
  value: string;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  drillDown?: DrillDownItem[];
}

export const StatCard = ({ title, value, subtitle, icon: Icon, iconColor, drillDown }: StatCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        {drillDown && drillDown.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border">
            <div className="grid grid-cols-3 gap-2">
              {drillDown.map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
