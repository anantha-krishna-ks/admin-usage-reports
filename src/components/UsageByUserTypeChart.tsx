import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, ReferenceLine } from "recharts";

const data = [
  { name: "Teachers", totalUsage: 2450, appUsage: 980, contentUsage: 1470 },
  { name: "Students", totalUsage: 16170, appUsage: 6470, contentUsage: 9700 },
  { name: "Parents", totalUsage: 2630, appUsage: 1050, contentUsage: 1580 },
];

const avgTotal = Math.round(data.reduce((s, d) => s + d.totalUsage, 0) / data.length);
const avgApp = Math.round(data.reduce((s, d) => s + d.appUsage, 0) / data.length);
const avgContent = Math.round(data.reduce((s, d) => s + d.contentUsage, 0) / data.length);

const labelStyle = { fontSize: 11, fill: "hsl(var(--foreground))" } as const;

export const UsageByUserTypeChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage by User Type</CardTitle>
        <CardDescription>Total platform usage breakdown · Avg per role marked</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data} margin={{ top: 24, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-sm" />
            <YAxis yAxisId="left" className="text-sm" />
            <YAxis yAxisId="right" orientation="right" className="text-sm" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Legend />
            <ReferenceLine
              yAxisId="left"
              y={avgTotal}
              stroke="hsl(var(--primary))"
              strokeDasharray="4 4"
              strokeOpacity={0.6}
              label={{ value: `Avg Total ${avgTotal.toLocaleString()}`, position: "insideTopRight", fontSize: 11, fill: "hsl(var(--primary))" }}
            />
            <ReferenceLine
              yAxisId="right"
              y={avgApp}
              stroke="hsl(var(--chart-2))"
              strokeDasharray="2 4"
              strokeOpacity={0.5}
            />
            <ReferenceLine
              yAxisId="right"
              y={avgContent}
              stroke="hsl(var(--chart-4))"
              strokeDasharray="2 4"
              strokeOpacity={0.5}
            />
            <Bar yAxisId="left" dataKey="totalUsage" name="Total Usage (mins)" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="totalUsage" position="top" style={labelStyle} formatter={(v: number) => v.toLocaleString()} />
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="appUsage" name="App Usage (mins)" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }}>
              <LabelList dataKey="appUsage" position="top" style={labelStyle} formatter={(v: number) => v.toLocaleString()} />
            </Line>
            <Line yAxisId="right" type="monotone" dataKey="contentUsage" name="Content Usage (mins)" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 4 }}>
              <LabelList dataKey="contentUsage" position="bottom" style={labelStyle} formatter={(v: number) => v.toLocaleString()} />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
