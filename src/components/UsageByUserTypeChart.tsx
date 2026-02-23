import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Teachers", totalUsage: 2450, appUsage: 980, contentUsage: 1470 },
  { name: "Students", totalUsage: 16170, appUsage: 6470, contentUsage: 9700 },
  { name: "Parents", totalUsage: 2630, appUsage: 1050, contentUsage: 1580 },
];

export const UsageByUserTypeChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage by User Type</CardTitle>
        <CardDescription>Total platform usage breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
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
            <Bar yAxisId="left" dataKey="totalUsage" name="Total Usage (mins)" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="appUsage" name="App Usage (mins)" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="contentUsage" name="Content Usage (mins)" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
