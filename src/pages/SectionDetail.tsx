import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Search, Eye, ChevronDown, ChevronUp, Globe, Smartphone, School, ChevronRight, Home, LayoutDashboard } from "lucide-react";
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

interface PersonDeviceData {
  device: string;
  visits: number;
  timeSpent: string;
}

interface DeviceDetailData {
  lessonPlans: number;
  learningResources: number;
  ebooks: number;
  avgSessionDuration: string;
  totalSessions: number;
  lastActive: string;
}

interface SectionUsageData {
  sectionName: string;
  visits: number;
  timeSpent: string;
  minutes: number;
}

const sectionUsageByDevice: Record<string, SectionUsageData[]> = {
  Web: [
    { sectionName: "View notifications", visits: 24, timeSpent: "01:24:30", minutes: 84 },
    { sectionName: "Group management", visits: 2, timeSpent: "00:00:13", minutes: 1 },
    { sectionName: "Dashboard", visits: 41, timeSpent: "01:35:34", minutes: 95 },
    { sectionName: "Test evaluation", visits: 25, timeSpent: "01:03:59", minutes: 64 },
    { sectionName: "Digital Repository", visits: 21, timeSpent: "01:30:41", minutes: 90 },
    { sectionName: "Resource preview", visits: 2, timeSpent: "00:44:34", minutes: 44 },
    { sectionName: "Assessment reports", visits: 1, timeSpent: "00:00:06", minutes: 1 },
    { sectionName: "BookMark", visits: 1, timeSpent: "00:00:02", minutes: 1 },
    { sectionName: "Ebook Preview", visits: 4, timeSpent: "01:48:07", minutes: 108 },
    { sectionName: "Leaderboard Quiz Lists", visits: 1, timeSpent: "00:00:04", minutes: 1 },
  ],
  Mobile: [
    { sectionName: "Dashboard", visits: 38, timeSpent: "00:52:10", minutes: 52 },
    { sectionName: "Notifications", visits: 15, timeSpent: "00:18:45", minutes: 18 },
    { sectionName: "Digital Repository", visits: 12, timeSpent: "00:35:20", minutes: 35 },
    { sectionName: "Test evaluation", visits: 8, timeSpent: "00:28:15", minutes: 28 },
    { sectionName: "Ebook Preview", visits: 6, timeSpent: "00:42:30", minutes: 42 },
    { sectionName: "Resource preview", visits: 3, timeSpent: "00:15:00", minutes: 15 },
  ],
  School: [
    { sectionName: "Dashboard", visits: 10, timeSpent: "00:22:15", minutes: 22 },
    { sectionName: "Digital Repository", visits: 5, timeSpent: "00:18:40", minutes: 18 },
    { sectionName: "Test evaluation", visits: 3, timeSpent: "00:12:05", minutes: 12 },
    { sectionName: "Ebook Preview", visits: 2, timeSpent: "00:08:30", minutes: 8 },
  ],
};

const sectionBarColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(210, 60%, 50%)",
  "hsl(160, 50%, 45%)",
  "hsl(30, 60%, 50%)",
  "hsl(280, 40%, 55%)",
  "hsl(0, 40%, 55%)",
];

const teacherDeviceData: Record<string, PersonDeviceData[]> = {
  "Ms. Priya Sharma": [
    { device: "Web", visits: 1842, timeSpent: "214:30:00" },
    { device: "Mobile", visits: 956, timeSpent: "48:12:15" },
    { device: "School", visits: 320, timeSpent: "18:45:00" },
  ],
  "Mr. Rajesh Kumar": [
    { device: "Web", visits: 1523, timeSpent: "180:20:00" },
    { device: "Mobile", visits: 812, timeSpent: "35:45:30" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Ms. Anitha Devi": [
    { device: "Web", visits: 2105, timeSpent: "245:10:00" },
    { device: "Mobile", visits: 1230, timeSpent: "62:18:45" },
    { device: "School", visits: 185, timeSpent: "10:30:00" },
  ],
  "Mr. Karthik Rajan": [
    { device: "Web", visits: 980, timeSpent: "112:05:00" },
    { device: "Mobile", visits: 540, timeSpent: "28:40:20" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Ms. Lakshmi Narayanan": [
    { device: "Web", visits: 870, timeSpent: "98:15:00" },
    { device: "Mobile", visits: 420, timeSpent: "22:10:30" },
    { device: "School", visits: 110, timeSpent: "6:20:00" },
  ],
  "Mr. Suresh Menon": [
    { device: "Web", visits: 310, timeSpent: "35:40:00" },
    { device: "Mobile", visits: 180, timeSpent: "9:25:10" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Ms. Deepa Iyer": [
    { device: "Web", visits: 190, timeSpent: "22:10:00" },
    { device: "Mobile", visits: 95, timeSpent: "5:15:00" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Mr. Ganesh Pillai": [
    { device: "Web", visits: 120, timeSpent: "14:30:00" },
    { device: "Mobile", visits: 65, timeSpent: "3:45:00" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
};

const studentDeviceData: Record<string, PersonDeviceData[]> = {
  "Aarav Mehta": [
    { device: "Web", visits: 420, timeSpent: "45:20:00" },
    { device: "Mobile", visits: 680, timeSpent: "32:10:15" },
    { device: "School", visits: 150, timeSpent: "8:30:00" },
  ],
  "Diya Nair": [
    { device: "Web", visits: 380, timeSpent: "38:50:00" },
    { device: "Mobile", visits: 520, timeSpent: "28:05:30" },
    { device: "School", visits: 95, timeSpent: "5:15:00" },
  ],
  "Rohan Gupta": [
    { device: "Web", visits: 510, timeSpent: "52:40:00" },
    { device: "Mobile", visits: 740, timeSpent: "38:25:10" },
    { device: "School", visits: 210, timeSpent: "12:00:00" },
  ],
  "Sneha Patel": [
    { device: "Web", visits: 280, timeSpent: "28:10:00" },
    { device: "Mobile", visits: 390, timeSpent: "18:45:20" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Vikram Singh": [
    { device: "Web", visits: 350, timeSpent: "34:00:00" },
    { device: "Mobile", visits: 480, timeSpent: "24:30:00" },
    { device: "School", visits: 120, timeSpent: "7:10:00" },
  ],
  "Ananya Rao": [
    { device: "Web", visits: 560, timeSpent: "58:30:00" },
    { device: "Mobile", visits: 820, timeSpent: "42:15:00" },
    { device: "School", visits: 180, timeSpent: "10:20:00" },
  ],
  "Ishaan Verma": [
    { device: "Web", visits: 440, timeSpent: "46:10:00" },
    { device: "Mobile", visits: 610, timeSpent: "30:50:00" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Kavya Joshi": [
    { device: "Web", visits: 620, timeSpent: "65:20:00" },
    { device: "Mobile", visits: 890, timeSpent: "48:40:00" },
    { device: "School", visits: 250, timeSpent: "14:00:00" },
  ],
  "Nikhil Reddy": [
    { device: "Web", visits: 320, timeSpent: "32:00:00" },
    { device: "Mobile", visits: 460, timeSpent: "22:15:00" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Pooja Iyer": [
    { device: "Web", visits: 480, timeSpent: "50:10:00" },
    { device: "Mobile", visits: 680, timeSpent: "35:25:00" },
    { device: "School", visits: 140, timeSpent: "8:00:00" },
  ],
  "Rahul Mishra": [
    { device: "Web", visits: 210, timeSpent: "20:30:00" },
    { device: "Mobile", visits: 340, timeSpent: "16:10:00" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Aditya Kapoor": [
    { device: "Web", visits: 680, timeSpent: "72:00:00" },
    { device: "Mobile", visits: 920, timeSpent: "50:30:00" },
    { device: "School", visits: 300, timeSpent: "16:40:00" },
  ],
  "Meera Shankar": [
    { device: "Web", visits: 580, timeSpent: "60:20:00" },
    { device: "Mobile", visits: 780, timeSpent: "42:00:00" },
    { device: "School", visits: 220, timeSpent: "12:30:00" },
  ],
  "Siddharth Das": [
    { device: "Web", visits: 450, timeSpent: "46:40:00" },
    { device: "Mobile", visits: 620, timeSpent: "32:15:00" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Tanvi Kulkarni": [
    { device: "Web", visits: 380, timeSpent: "38:00:00" },
    { device: "Mobile", visits: 510, timeSpent: "26:45:00" },
    { device: "School", visits: 160, timeSpent: "9:10:00" },
  ],
  "Arjun Nambiar": [
    { device: "Web", visits: 520, timeSpent: "54:30:00" },
    { device: "Mobile", visits: 710, timeSpent: "38:00:00" },
    { device: "School", visits: 190, timeSpent: "10:50:00" },
  ],
  "Divya Menon": [
    { device: "Web", visits: 440, timeSpent: "45:10:00" },
    { device: "Mobile", visits: 590, timeSpent: "30:20:00" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Harsh Trivedi": [
    { device: "Web", visits: 600, timeSpent: "62:40:00" },
    { device: "Mobile", visits: 830, timeSpent: "44:15:00" },
    { device: "School", visits: 270, timeSpent: "15:00:00" },
  ],
  "Lakshmi Pillai": [
    { device: "Web", visits: 340, timeSpent: "34:20:00" },
    { device: "Mobile", visits: 470, timeSpent: "24:00:00" },
    { device: "School", visits: 0, timeSpent: "00:00:00" },
  ],
  "Manish Agarwal": [
    { device: "Web", visits: 400, timeSpent: "40:30:00" },
    { device: "Mobile", visits: 560, timeSpent: "28:45:00" },
    { device: "School", visits: 130, timeSpent: "7:30:00" },
  ],
};

const deviceColors: Record<string, string> = {
  Web: "hsl(var(--chart-2))",
  Mobile: "hsl(var(--chart-1))",
  School: "hsl(var(--chart-3))",
};

const deviceBgColors: Record<string, string> = {
  Web: "bg-chart-2",
  Mobile: "bg-chart-1",
  School: "bg-chart-3",
};

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
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);
  const [selectedDeviceDetail, setSelectedDeviceDetail] = useState<string | null>(null);

  const activeRoleData = selectedDevice ? roleDataByDevice[selectedDevice] || [] : [];
  const activePersonDevices = selectedPerson
    ? (isStudentRole ? studentDeviceData[selectedPerson] : teacherDeviceData[selectedPerson]) || []
    : [];

  return (
    <div className="min-h-screen bg-background">

       <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="animate-fade-in">
          <nav className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <LayoutDashboard className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Dashboard</span>
            </button>

            <span className="text-muted-foreground/40">/</span>

            <button
              onClick={() => {
                setSelectedDeviceDetail(null);
                setSelectedPerson(null);
                setSelectedDevice(null);
              }}
              className={cn(
                "rounded-md px-2.5 py-1 transition-all",
                !selectedPerson && !selectedDevice
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {grade}{section ? ` · ${section}` : ""} — {role}
            </button>

            {selectedPerson && (
              <>
                <span className="text-muted-foreground/40">/</span>
                <button
                  onClick={() => setSelectedDeviceDetail(null)}
                  className={cn(
                    "rounded-md px-2.5 py-1 transition-all",
                    !selectedDeviceDetail
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {selectedPerson}
                </button>
              </>
            )}

            {selectedDeviceDetail && (
              <>
                <span className="text-muted-foreground/40">/</span>
                <span className="rounded-md px-2.5 py-1 bg-primary/10 text-primary font-medium">
                  {selectedDeviceDetail}
                </span>
              </>
            )}
          </nav>
        </div>

        {selectedDeviceDetail ? (
          <div className="animate-fade-in space-y-8">
            {/* Section usage header */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDeviceDetail(null)}
                className="shrink-0 h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {selectedPerson} — {selectedDeviceDetail}
                </h2>
                <p className="text-sm text-muted-foreground">Section-wise usage breakdown</p>
              </div>
            </div>

            {/* Section Usage Chart */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Usage by Section — {selectedDeviceDetail}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sectionUsageByDevice[selectedDeviceDetail] || []}
                      margin={{ top: 10, right: 30, left: 10, bottom: 60 }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="sectionName"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                        tickLine={false}
                        angle={-35}
                        textAnchor="end"
                        interval={0}
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
                          `${value} min`,
                          props.payload.sectionName,
                        ]}
                        labelFormatter={() => ""}
                      />
                      <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                        {(sectionUsageByDevice[selectedDeviceDetail] || []).map((_entry, index) => (
                          <Cell key={index} fill={sectionBarColors[index % sectionBarColors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Section Usage Table */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Section Details</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-t">
                      <TableHead className="font-semibold pl-6">Section Names</TableHead>
                      <TableHead className="font-semibold text-center">No. of Visits</TableHead>
                      <TableHead className="font-semibold text-right pr-6">Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(sectionUsageByDevice[selectedDeviceDetail] || []).map((row, i) => (
                      <TableRow key={row.sectionName} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="pl-6">
                          <span className="font-medium" style={{ color: sectionBarColors[i % sectionBarColors.length] }}>
                            {row.sectionName}
                          </span>
                        </TableCell>
                        <TableCell className="text-center tabular-nums">
                          {row.visits.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium tabular-nums w-[200px] justify-center bg-muted text-muted-foreground">
                            {row.timeSpent} Hours
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : selectedPerson ? (
          <div className="animate-fade-in space-y-8">
            {/* Person device breakdown header */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPerson(null)}
                className="shrink-0 h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-foreground">{selectedPerson}</h2>
            </div>

            {/* Device Chart for Person */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Device Usage — {selectedPerson}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activePersonDevices}
                      margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                      barSize={56}
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
                          value: "No. of Visits",
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
                          `${value.toLocaleString()}`,
                          props.payload.device,
                        ]}
                        labelFormatter={() => ""}
                      />
                      <Bar dataKey="visits" radius={[6, 6, 0, 0]}>
                        {activePersonDevices.map((entry, index) => (
                          <Cell key={index} fill={deviceColors[entry.device] || "hsl(var(--chart-4))"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Device Table for Person */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-t">
                      <TableHead className="font-semibold pl-6">Devices</TableHead>
                      <TableHead className="font-semibold text-center">No. of Visits</TableHead>
                      <TableHead className="font-semibold text-right">Time Spent</TableHead>
                      <TableHead className="font-semibold text-center pr-6">View Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activePersonDevices.map((row) => (
                      <TableRow key={row.device} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="pl-6">
                          <span className="font-medium" style={{ color: deviceColors[row.device] }}>
                            {row.device}
                          </span>
                        </TableCell>
                        <TableCell className="text-center tabular-nums">
                          {row.visits.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium tabular-nums w-[200px] justify-center bg-muted text-muted-foreground">
                            {row.timeSpent} Hours
                          </span>
                        </TableCell>
                        <TableCell className="text-center pr-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => setSelectedDeviceDetail(row.device)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : selectedDevice ? (
          <>
            {/* Role drill-down header */}
            <div className="flex items-center gap-3 animate-fade-in">
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
            <Card className="shadow-sm animate-fade-in">
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
            <Card className="shadow-sm animate-fade-in">
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
            <Card className="shadow-sm animate-fade-in">
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
                      <TableHead className="font-semibold text-right">Total Usage (mins)</TableHead>
                      <TableHead className="font-semibold text-center pr-6">Preview</TableHead>
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
                            <TableCell className="text-right">
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                                {s.totalUsage}
                              </span>
                            </TableCell>
                            <TableCell className="text-center pr-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setSelectedPerson(s.name)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      : (teacherDataByGrade[grade] || teacherDataByGrade["Grade 8"]).map((t, i) => (
                          <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                            <TableCell className="pl-6 font-medium">{t.name}</TableCell>
                            <TableCell className="text-right tabular-nums">{t.appUsage}</TableCell>
                            <TableCell className="text-right tabular-nums">{t.contentUsage}</TableCell>
                            <TableCell className="text-right">
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                                {t.totalUsage}
                              </span>
                            </TableCell>
                            <TableCell className="text-center pr-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setSelectedPerson(t.name)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
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