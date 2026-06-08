import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { subMonths, format } from "date-fns";


// Last 6 months avg usage (mins per user) — teacher vs student
const generateData = () => {
  const now = new Date();
  const teacherBase = [42, 48, 55, 51, 60, 64];
  const studentBase = [28, 32, 35, 38, 41, 46];
  return Array.from({ length: 6 }).map((_, i) => {
    const d = subMonths(now, 5 - i);
    return {
      month: format(d, "MMM yyyy"),
      teacherAvg: teacherBase[i],
      studentAvg: studentBase[i],
    };
  });
};

const data = generateData();

export const ApplicationTrendChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Usage Trend</CardTitle>
        <CardDescription>Average usage per user · Last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
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
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="studentAvg"
              name="Student"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2.5}
              fill="url(#studentFill)"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
