import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
        <CardTitle>Application Trend</CardTitle>
        <CardDescription>
          Average usage per user (mins) — Teachers vs Students · Last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-sm" />
            <YAxis
              className="text-sm"
              label={{ value: "Avg mins / user", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "hsl(var(--muted-foreground))" } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => [`${value} mins`, ""]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="teacherAvg"
              name="Teacher Avg Usage"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="studentAvg"
              name="Student Avg Usage"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
