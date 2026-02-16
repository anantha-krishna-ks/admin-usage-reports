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

const roleColors = [
  "hsl(var(--chart-4))",
  "hsl(var(--chart-1))",
];

interface RoleData {
  role: string;
  visits: number;
  timeSpent: string;
  minutes: number;
}

const roleDataByDevice: Record<string, RoleData[]> = {
  Desktop: [
    { role: "Teacher", visits: 0, timeSpent: "00:00:00", minutes: 0 },
    { role: "Student", visits: 0, timeSpent: "00:00:00", minutes: 0 },
  ],
  Mobile: [
    { role: "Teacher", visits: 2145, timeSpent: "18:32:10", minutes: 1112 },
    { role: "Student", visits: 7433, timeSpent: "55:25:41", minutes: 3325 },
  ],
  School: [
    { role: "Teacher", visits: 0, timeSpent: "00:00:00", minutes: 0 },
    { role: "Student", visits: 0, timeSpent: "00:00:00", minutes: 0 },
  ],
  Web: [
    { role: "Teacher", visits: 1823, timeSpent: "214:12:38", minutes: 12852 },
    { role: "Student", visits: 4354, timeSpent: "644:32:46", minutes: 38672 },
  ],
};

export default function SectionDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const grade = searchParams.get("grade") || "";
  const section = searchParams.get("section") || "";
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const [startDate, setStartDate] = useState<Date | undefined>(fromParam ? new Date(fromParam) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(toParam ? new Date(toParam) : undefined);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const activeRoleData = selectedDevice ? roleDataByDevice[selectedDevice] || [] : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
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

          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left font-normal h-9 px-3 text-sm",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3.5 w-3.5 shrink-0" />
                    {startDate ? format(startDate, "dd MMM yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
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

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                End Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left font-normal h-9 px-3 text-sm",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3.5 w-3.5 shrink-0" />
                    {endDate ? format(endDate, "dd MMM yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
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

            <Button className="h-9 px-6 gap-2 self-end">
              <Search className="h-3.5 w-3.5" />
              Go
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {selectedDevice ? (
          <>
            {/* Role drill-down header */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDevice(null)}
                className="shrink-0 h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-foreground">{selectedDevice}</h2>
            </div>

            {/* Role Chart */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Usage by Role — {selectedDevice}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activeRoleData}
                      margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                      barSize={56}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="role"
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
                          style: { fill: "hsl(var(--muted-foreground))", fontSize: 12 },
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
                          props.payload.role,
                        ]}
                        labelFormatter={() => ""}
                      />
                      <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                        {activeRoleData.map((_entry, index) => (
                          <Cell key={index} fill={roleColors[index]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Role Table */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Role Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-t">
                      <TableHead className="font-semibold pl-6">Role</TableHead>
                      <TableHead className="font-semibold text-right">No. of Visits</TableHead>
                      <TableHead className="font-semibold text-right pr-6">Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeRoleData.map((row, i) => (
                      <TableRow key={row.role} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="pl-6">
                          <span className="font-medium" style={{ color: roleColors[i] }}>
                            {row.role}
                          </span>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {row.visits.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                            {row.timeSpent} Hours
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Device Chart */}
            <Card className="shadow-sm">
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
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
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
                          style: { fill: "hsl(var(--muted-foreground))", fontSize: 12 },
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

            {/* Device Table */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-t">
                      <TableHead className="font-semibold pl-6">Device</TableHead>
                      <TableHead className="font-semibold text-right">No. of Visits</TableHead>
                      <TableHead className="font-semibold text-right pr-6">Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deviceData.map((row, i) => (
                      <TableRow key={row.device} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="pl-6">
                          <button
                            className="font-medium hover:underline underline-offset-4 cursor-pointer transition-colors"
                            style={{ color: chartColors[i] }}
                            onClick={() => setSelectedDevice(row.device)}
                          >
                            {row.device}
                          </button>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {row.visits.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                            {row.timeSpent} Hours
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}