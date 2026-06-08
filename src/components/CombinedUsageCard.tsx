import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export const CombinedUsageCard = () => {
  const totalUsage = "21,250";
  const previousUsage = "19,420";
  const percentage = ((21250 - 19420) / 19420) * 100;
  const isUp = percentage >= 0;

  return (
    <Card className="transition-all hover:shadow-lg md:col-span-2">
      <CardContent className="p-6 space-y-5">
        {/* Top section */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Total Platform Usage</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">{totalUsage}</span>
              <span className="text-sm text-muted-foreground">mins this month</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              vs <span className="tabular-nums font-medium text-foreground/70">{previousUsage}</span> mins last month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                isUp
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
              title={`Previous month: ${previousUsage}`}
            >
              {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span className="tabular-nums">{isUp ? "+" : ""}{percentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Average usage by user type — matches ActiveUsersCard totals */}
        <div className="grid grid-cols-3 gap-3">
          {(() => {
            const teacherTotal = 160;
            const studentTotal = 1090;
            const allUsers = teacherTotal + studentTotal;
            const teacherUsage = 6800;
            const studentUsage = 14450;
            const overall = teacherUsage + studentUsage;
            const tiles = [
              {
                label: "Avg / Teacher",
                value: teacherUsage / teacherTotal,
                sub: `${teacherUsage.toLocaleString()} mins · ${teacherTotal} users`,
                colorVar: "--chart-3",
              },
              {
                label: "Avg / Student",
                value: studentUsage / studentTotal,
                sub: `${studentUsage.toLocaleString()} mins · ${studentTotal} users`,
                colorVar: "--chart-5",
              },
              {
                label: "Avg / User",
                value: overall / allUsers,
                sub: `${overall.toLocaleString()} mins · ${allUsers.toLocaleString()} users`,
                colorVar: "--primary",
              },
            ];
            return tiles.map((t) => (
              <div
                key={t.label}
                className="rounded-lg border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: `hsl(var(${t.colorVar}))` }}
                  />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {t.label}
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-xl font-semibold tabular-nums leading-none">
                    {t.value.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">mins</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground tabular-nums">
                  {t.sub}
                </p>
              </div>
            ));
          })()}
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
