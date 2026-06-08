import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DrillDownItem {
  label: string;
  value: string;
}

interface TrendInfo {
  percentage: number;
  previousValue: string;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  drillDown?: DrillDownItem[];
  trend?: TrendInfo;
}

export const StatCard = ({ title, value, subtitle, icon: Icon, iconColor, drillDown, trend }: StatCardProps) => {
  const isUp = trend ? trend.percentage >= 0 : false;
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {trend && (
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                isUp
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
              title={`Previous month: ${trend.previousValue}`}
            >
              {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span className="tabular-nums">{isUp ? "+" : ""}{trend.percentage.toFixed(1)}%</span>
            </div>
          )}
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="text-3xl font-semibold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {subtitle}
          {trend && (
            <span className="ml-1">
              · vs <span className="tabular-nums font-medium text-foreground/70">{trend.previousValue}</span> last month
            </span>
          )}
        </p>
        <div className="mt-4 pt-3 border-t border-border" style={{ minHeight: '60px' }}>
          {drillDown && drillDown.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {drillDown.map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
