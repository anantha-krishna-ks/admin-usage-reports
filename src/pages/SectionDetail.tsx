import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const deviceData = [
  { device: "Desktop", visits: 0, timeSpent: "00:00:00", minutes: 0 },
  { device: "Mobile", visits: 9578, timeSpent: "73:57:51", minutes: 4437 },
  { device: "School", visits: 0, timeSpent: "00:00:00", minutes: 0 },
  { device: "Web", visits: 6177, timeSpent: "858:45:24", minutes: 51525 },
];

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-2))",
];

export default function SectionDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const grade = searchParams.get("grade") || "";
  const section = searchParams.get("section") || "";
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const [startDate, setStartDate] = useState<Date | undefined>(fromParam ? new Date(fromParam) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(toParam ? new Date(toParam) : undefined);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {grade} {section ? `— ${section}` : ""}
            </h1>
            <p className="text-sm text-muted-foreground">
              Device usage &amp; visit analytics
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Date Filters */}
        <Card className="shadow-sm">
          <CardContent className="py-5 px-6">
            <div className="flex flex-wrap items-end gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[220px] justify-start text-left font-normal h-10",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd MMM yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[220px] justify-start text-left font-normal h-10",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd MMM yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button className="gap-2 h-10 px-6">
                <Search className="h-4 w-4" />
                Go
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Usage by Device</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={deviceData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                  barSize={64}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="device"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Time (Min)",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 12,
                      },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: 13,
                    }}
                    formatter={(value: number, _name: string, props: any) => [
                      `${value.toLocaleString()} min`,
                      props.payload.device,
                    ]}
                    labelFormatter={() => ""}
                  />
                  <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                    {deviceData.map((_entry, index) => (
                      <Cell key={index} fill={chartColors[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="font-semibold">Device</TableHead>
                    <TableHead className="font-semibold">No. of Visits</TableHead>
                    <TableHead className="font-semibold">Time Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deviceData.map((row, i) => (
                    <TableRow key={row.device} className="hover:bg-muted/30">
                      <TableCell>
                        <span
                          className="font-medium"
                          style={{ color: chartColors[i] }}
                        >
                          {row.device}
                        </span>
                      </TableCell>
                      <TableCell>{row.visits.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {row.timeSpent} Hours
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
