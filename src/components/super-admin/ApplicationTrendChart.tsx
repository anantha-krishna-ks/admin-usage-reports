import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { subMonths, format } from "date-fns";
import { Monitor, Smartphone, Building2, LayoutGrid, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Channel = "all" | "web" | "mobile" | "school";

// Last 6 months avg usage (mins per user) — teacher vs student, split by channel
const channelSplit = {
  teacher: { web: 0.55, mobile: 0.3, school: 0.15 },
  student: { web: 0.5, mobile: 0.35, school: 0.15 },
};

const generateData = (channel: Channel) => {
  const now = new Date();
  const teacherBase = [42, 48, 55, 51, 60, 64];
  const studentBase = [28, 32, 35, 38, 41, 46];
  const tShare = channel === "all" ? 1 : channelSplit.teacher[channel];
  const sShare = channel === "all" ? 1 : channelSplit.student[channel];
  return Array.from({ length: 6 }).map((_, i) => {
    const d = subMonths(now, 5 - i);
    return {
      month: format(d, "MMM yyyy"),
      teacherAvg: Math.round(teacherBase[i] * tShare),
      studentAvg: Math.round(studentBase[i] * sShare),
    };
  });
};

const formatNum = (n: number) => n.toLocaleString();

const filters: { id: Channel; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "web", label: "Web", icon: Monitor },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "school", label: "School", icon: Building2 },
];

export const ApplicationTrendChart = () => {
  const [channel, setChannel] = useState<Channel>("all");
  const data = generateData(channel);
  const teacherTotal = data.reduce((s, d) => s + d.teacherAvg, 0);
  const studentTotal = data.reduce((s, d) => s + d.studentAvg, 0);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>Average Application Usage Trend</CardTitle>
          <CardDescription>Usage  · Last 6 months</CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "hsl(var(--primary))" }} />
            <span className="text-muted-foreground">Teacher</span>
            <span className="font-semibold tabular-nums">{formatNum(teacherTotal)} mins</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-4))" }} />
            <span className="text-muted-foreground">Student</span>
            <span className="font-semibold tabular-nums">{formatNum(studentTotal)} mins</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const Icon = f.icon;
            const active = channel === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setChannel(f.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {f.label}
              </button>
            );
          })}
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="teacherFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="studentFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-4))" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(var(--chart-4))" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: "12px",
              }}
              formatter={(value: number, name: string) => [`${value} mins`, name]}
            />
            <Area
              type="monotone"
              dataKey="teacherAvg"
              name="Teacher"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fill="url(#teacherFill)"
              dot={{ r: 3, fill: "hsl(var(--primary))" }}
              activeDot={{ r: 5 }}
            >
              <LabelList dataKey="teacherAvg" position="top" style={{ fontSize: 11, fill: "hsl(var(--foreground))" }} />
            </Area>
            <Area
              type="monotone"
              dataKey="studentAvg"
              name="Student"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2.5}
              fill="url(#studentFill)"
              dot={{ r: 3, fill: "hsl(var(--chart-4))" }}
              activeDot={{ r: 5 }}
            >
              <LabelList dataKey="studentAvg" position="bottom" style={{ fontSize: 11, fill: "hsl(var(--foreground))" }} />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
