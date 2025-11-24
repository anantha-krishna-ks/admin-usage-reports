import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Teachers", applicationUsage: 980, contentUsage: 1470 },
  { name: "Students", applicationUsage: 6890, contentUsage: 9280 },
  { name: "Parents", applicationUsage: 630, contentUsage: 2000 },
];

export const UsageByUserTypeChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage by User Type</CardTitle>
        <CardDescription>Application and content usage breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Legend />
            <Bar dataKey="applicationUsage" name="Application Usage (hrs)" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
            <Bar dataKey="contentUsage" name="Content Usage (hrs)" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
