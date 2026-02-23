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

const teacherDataByGrade: Record<string, { name: string; appUsage: string; contentUsage: string; totalUsage: string }[]> = {
  "Grade 8": [
    { name: "Ms. Priya Sharma", appUsage: "12.30", contentUsage: "28.50", totalUsage: "40.80" },
    { name: "Mr. Rajesh Kumar", appUsage: "10.42", contentUsage: "24.18", totalUsage: "34.60" },
    { name: "Ms. Anitha Devi", appUsage: "14.20", contentUsage: "32.45", totalUsage: "46.65" },
    { name: "Mr. Karthik Rajan", appUsage: "8.10", contentUsage: "18.90", totalUsage: "27.00" },
    { name: "Ms. Lakshmi Narayanan", appUsage: "7.12", contentUsage: "16.32", totalUsage: "23.44" },
  ],
  "Grade 9": [
    { name: "Ms. Priya Sharma", appUsage: "18.50", contentUsage: "42.10", totalUsage: "60.60" },
    { name: "Mr. Rajesh Kumar", appUsage: "15.20", contentUsage: "38.72", totalUsage: "53.92" },
    { name: "Ms. Anitha Devi", appUsage: "20.08", contentUsage: "55.30", totalUsage: "75.38" },
    { name: "Mr. Karthik Rajan", appUsage: "12.60", contentUsage: "30.14", totalUsage: "42.74" },
    { name: "Ms. Lakshmi Narayanan", appUsage: "9.40", contentUsage: "22.80", totalUsage: "32.20" },
    { name: "Mr. Suresh Menon", appUsage: "3.80", contentUsage: "10.15", totalUsage: "13.95" },
    { name: "Ms. Deepa Iyer", appUsage: "2.10", contentUsage: "5.85", totalUsage: "7.95" },
    { name: "Mr. Ganesh Pillai", appUsage: "1.40", contentUsage: "4.30", totalUsage: "5.70" },
  ],
  "Grade 10": [
    { name: "Ms. Priya Sharma", appUsage: "20.10", contentUsage: "45.30", totalUsage: "65.40" },
    { name: "Mr. Rajesh Kumar", appUsage: "18.40", contentUsage: "40.60", totalUsage: "59.00" },
    { name: "Ms. Anitha Devi", appUsage: "22.50", contentUsage: "52.80", totalUsage: "75.30" },
    { name: "Mr. Karthik Rajan", appUsage: "11.30", contentUsage: "23.40", totalUsage: "34.70" },
  ],
  "Grade 11": [
    { name: "Ms. Priya Sharma", appUsage: "22.40", contentUsage: "16.20", totalUsage: "38.60" },
    { name: "Mr. Rajesh Kumar", appUsage: "18.90", contentUsage: "12.80", totalUsage: "31.70" },
    { name: "Ms. Anitha Devi", appUsage: "24.10", contentUsage: "18.50", totalUsage: "42.60" },
    { name: "Mr. Karthik Rajan", appUsage: "10.20", contentUsage: "8.40", totalUsage: "18.60" },
    { name: "Ms. Lakshmi Narayanan", appUsage: "9.30", contentUsage: "7.28", totalUsage: "16.58" },
  ],
};

const studentDataByGrade: Record<string, { name: string; section: string; appUsage: string; contentUsage: string; totalUsage: string }[]> = {
  "Grade 8": [
    { name: "Aarav Mehta", section: "A", appUsage: "5.20", contentUsage: "12.40", totalUsage: "17.60" },
    { name: "Diya Nair", section: "A", appUsage: "4.80", contentUsage: "10.90", totalUsage: "15.70" },
    { name: "Rohan Gupta", section: "B", appUsage: "6.10", contentUsage: "14.30", totalUsage: "20.40" },
    { name: "Sneha Patel", section: "B", appUsage: "3.50", contentUsage: "8.60", totalUsage: "12.10" },
    { name: "Vikram Singh", section: "C", appUsage: "4.00", contentUsage: "9.80", totalUsage: "13.80" },
  ],
  "Grade 9": [
    { name: "Ananya Rao", section: "A", appUsage: "7.30", contentUsage: "15.20", totalUsage: "22.50" },
    { name: "Ishaan Verma", section: "A", appUsage: "5.90", contentUsage: "13.40", totalUsage: "19.30" },
    { name: "Kavya Joshi", section: "B", appUsage: "8.10", contentUsage: "18.60", totalUsage: "26.70" },
    { name: "Nikhil Reddy", section: "B", appUsage: "4.50", contentUsage: "11.20", totalUsage: "15.70" },
    { name: "Pooja Iyer", section: "C", appUsage: "6.40", contentUsage: "14.80", totalUsage: "21.20" },
    { name: "Rahul Mishra", section: "C", appUsage: "3.20", contentUsage: "7.90", totalUsage: "11.10" },
  ],
  "Grade 10": [
    { name: "Aditya Kapoor", section: "A", appUsage: "9.10", contentUsage: "20.30", totalUsage: "29.40" },
    { name: "Meera Shankar", section: "A", appUsage: "7.80", contentUsage: "17.50", totalUsage: "25.30" },
    { name: "Siddharth Das", section: "B", appUsage: "6.50", contentUsage: "15.10", totalUsage: "21.60" },
    { name: "Tanvi Kulkarni", section: "B", appUsage: "5.40", contentUsage: "12.80", totalUsage: "18.20" },
  ],
  "Grade 11": [
    { name: "Arjun Nambiar", section: "A", appUsage: "8.40", contentUsage: "6.20", totalUsage: "14.60" },
    { name: "Divya Menon", section: "A", appUsage: "7.10", contentUsage: "5.30", totalUsage: "12.40" },
    { name: "Harsh Trivedi", section: "B", appUsage: "9.20", contentUsage: "7.80", totalUsage: "17.00" },
    { name: "Lakshmi Pillai", section: "B", appUsage: "5.60", contentUsage: "4.10", totalUsage: "9.70" },
    { name: "Manish Agarwal", section: "C", appUsage: "6.30", contentUsage: "5.50", totalUsage: "11.80" },
  ],
};

export default function SectionDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const grade = searchParams.get("grade") || "";
  const role = searchParams.get("role") || "";
  const section = searchParams.get("section") || "";
  const isStudentRole = role === "Students";
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
              onClick={() => {
                if (selectedDevice) {
                  setSelectedDevice(null);
                } else {
                  navigate("/");
                }
              }}
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
                            {row.timeSpent} Mins
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
            {/* Usage Table */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>{isStudentRole ? "Student Usage Details" : "Teacher Usage Details"}</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-t">
                      <TableHead className="font-semibold pl-6">{isStudentRole ? "Student Name" : "Teacher Name"}</TableHead>
                      {isStudentRole && <TableHead className="font-semibold">Section</TableHead>}
                      <TableHead className="font-semibold text-right">App Usage (mins)</TableHead>
                      <TableHead className="font-semibold text-right">Content Usage (mins)</TableHead>
                      <TableHead className="font-semibold text-right pr-6">Total Usage (mins)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isStudentRole
                      ? (studentDataByGrade[grade] || studentDataByGrade["Grade 8"]).map((s, i) => (
                          <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                            <TableCell className="pl-6 font-medium">{s.name}</TableCell>
                            <TableCell>{s.section}</TableCell>
                            <TableCell className="text-right tabular-nums">{s.appUsage}</TableCell>
                            <TableCell className="text-right tabular-nums">{s.contentUsage}</TableCell>
                            <TableCell className="text-right pr-6">
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                                {s.totalUsage}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      : (teacherDataByGrade[grade] || teacherDataByGrade["Grade 8"]).map((t, i) => (
                          <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                            <TableCell className="pl-6 font-medium">{t.name}</TableCell>
                            <TableCell className="text-right tabular-nums">{t.appUsage}</TableCell>
                            <TableCell className="text-right tabular-nums">{t.contentUsage}</TableCell>
                            <TableCell className="text-right pr-6">
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                                {t.totalUsage}
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