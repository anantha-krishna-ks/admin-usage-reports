import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface UserTypeBreakdown {
  label: string;
  active: number;
  total: number;
  percentage: number; // MoM change
  colorVar: string; // e.g. "--chart-3"
}

const breakdown: UserTypeBreakdown[] = [
  { label: "Teachers", active: 142, total: 160, percentage: 5.2, colorVar: "--chart-2" },
  { label: "Students", active: 866, total: 1090, percentage: -6.1, colorVar: "--chart-4" },
];

export const ActiveUsersCard = () => {
  const activeUsers = 1008;
  const totalUsers = 1250;
  const previousActive = 1052;
  const overallPct = ((activeUsers - previousActive) / previousActive) * 100;
  const isUp = overallPct >= 0;
  const activeRate = (activeUsers / totalUsers) * 100;

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="p-6 space-y-5">
        {/* Top section */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
              Total Active Users
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight tabular-nums">
                {activeUsers.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                of {totalUsers.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              vs{" "}
              <span className="tabular-nums font-medium text-foreground/70">
                {previousActive.toLocaleString()}
              </span>{" "}
              active last month
            </p>
          </div>
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isUp
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
            title={`Previous month: ${previousActive}`}
          >
            {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span className="tabular-nums">
              {isUp ? "+" : ""}
              {overallPct.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Active vs Total — engagement bar with breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Engagement rate
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-semibold tabular-nums">
                {activeRate.toFixed(1)}%
              </span>
              <span className="text-[11px] text-muted-foreground">engaged</span>
            </div>
          </div>
          <div
            className="relative flex h-3 w-full overflow-hidden rounded-full bg-muted"
            title={`${activeUsers.toLocaleString()} active of ${totalUsers.toLocaleString()}`}
          >
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${activeRate}%` }}
            />
            {[25, 50, 75].map((t) => (
              <div
                key={t}
                className="absolute top-0 h-full w-px bg-background/60"
                style={{ left: `${t}%` }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>
                Active{" "}
                <span className="tabular-nums font-medium text-foreground/80">
                  {activeUsers.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
              <span>
                Inactive{" "}
                <span className="tabular-nums font-medium text-foreground/80">
                  {(totalUsers - activeUsers).toLocaleString()}
                </span>
              </span>
            </div>
            <span className="tabular-nums">
              Total {totalUsers.toLocaleString()}
            </span>
          </div>
        </div>

        {/* By user type — compact two-column row */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {breakdown.map((item) => {
            const pct = (item.active / item.total) * 100;
            const up = item.percentage >= 0;
            return (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-lg border border-border bg-muted/30 p-5 pl-4 space-y-3"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ backgroundColor: `hsl(var(${item.colorVar}))` }}
                />
                <div
                  className={`absolute top-3 right-3 flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    up
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {up ? (
                    <TrendingUp className="h-2.5 w-2.5" />
                  ) : (
                    <TrendingDown className="h-2.5 w-2.5" />
                  )}
                  <span className="tabular-nums">
                    {up ? "+" : ""}
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium truncate">{item.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-semibold tabular-nums leading-none">
                    {item.active.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    / {item.total.toLocaleString()}
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: `hsl(var(${item.colorVar}))`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
