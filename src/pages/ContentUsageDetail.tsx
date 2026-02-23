import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ── Class options ──
const classOptions = [
  "I-2024", "II-2024", "III-2025", "IV-2025", "V-2025",
  "Level 1-2025", "Level 2-2025", "Level 3-2025",
];

// ── Section options (for Student role) ──
const sectionOptions = ["Section A", "Section B", "Section C", "Section D"];

// ── Student table data per tab ──
const userAppStudents = [
  { name: "Aarav Patel", learningResource: 45, ebook: 12, test: 8, lbq: 5, pt: 2 },
  { name: "Diya Krishnan", learningResource: 62, ebook: 18, test: 14, lbq: 9, pt: 3 },
  { name: "Ishaan Reddy", learningResource: 38, ebook: 8, test: 6, lbq: 3, pt: 1 },
  { name: "Meera Sundaram", learningResource: 55, ebook: 15, test: 11, lbq: 7, pt: 4 },
  { name: "Rohan Gupta", learningResource: 41, ebook: 10, test: 9, lbq: 4, pt: 2 },
];

const mobileAppStudents = [
  { name: "Aarav Patel", learningResource: 22, ebook: 6, test: 4, lbq: 3, pt: 1 },
  { name: "Diya Krishnan", learningResource: 30, ebook: 9, test: 7, lbq: 5, pt: 2 },
  { name: "Ishaan Reddy", learningResource: 18, ebook: 4, test: 3, lbq: 1, pt: 0 },
  { name: "Meera Sundaram", learningResource: 28, ebook: 8, test: 5, lbq: 4, pt: 2 },
  { name: "Rohan Gupta", learningResource: 20, ebook: 5, test: 4, lbq: 2, pt: 1 },
];

const schoolAppStudents = [
  { name: "Aarav Patel", learningResource: 10, ebook: 3, test: 2, lbq: 1, pt: 0 },
  { name: "Diya Krishnan", learningResource: 15, ebook: 5, test: 3, lbq: 2, pt: 1 },
  { name: "Ishaan Reddy", learningResource: 8, ebook: 2, test: 1, lbq: 0, pt: 0 },
  { name: "Meera Sundaram", learningResource: 12, ebook: 4, test: 2, lbq: 2, pt: 1 },
  { name: "Rohan Gupta", learningResource: 9, ebook: 3, test: 2, lbq: 1, pt: 0 },
];

// ── Teacher table data per tab ──
const userAppTeachers = [
  { name: "Ms. Priya Sharma", lessonPlan: 42, learningResource: 85, items: 120, tests: 15, ebook: 8 },
  { name: "Mr. Rajesh Kumar", lessonPlan: 38, learningResource: 72, items: 95, tests: 12, ebook: 5 },
  { name: "Ms. Anitha Devi", lessonPlan: 55, learningResource: 110, items: 140, tests: 20, ebook: 12 },
  { name: "Mr. Karthik Rajan", lessonPlan: 30, learningResource: 60, items: 78, tests: 8, ebook: 3 },
  { name: "Ms. Lakshmi Narayanan", lessonPlan: 48, learningResource: 92, items: 115, tests: 18, ebook: 10 },
];

const mobileAppTeachers = [
  { name: "Ms. Priya Sharma", lessonPlan: 20, learningResource: 45, items: 60, tests: 8, ebook: 4 },
  { name: "Mr. Rajesh Kumar", lessonPlan: 15, learningResource: 38, items: 50, tests: 5, ebook: 2 },
  { name: "Ms. Anitha Devi", lessonPlan: 28, learningResource: 55, items: 70, tests: 10, ebook: 6 },
  { name: "Mr. Karthik Rajan", lessonPlan: 12, learningResource: 30, items: 40, tests: 4, ebook: 1 },
  { name: "Ms. Lakshmi Narayanan", lessonPlan: 22, learningResource: 48, items: 58, tests: 9, ebook: 5 },
];

const schoolAppTeachers = [
  { name: "Ms. Priya Sharma", lessonPlan: 10, learningResource: 22, items: 30, tests: 4, ebook: 2 },
  { name: "Mr. Rajesh Kumar", lessonPlan: 8, learningResource: 18, items: 25, tests: 3, ebook: 1 },
  { name: "Ms. Anitha Devi", lessonPlan: 14, learningResource: 28, items: 35, tests: 5, ebook: 3 },
  { name: "Mr. Karthik Rajan", lessonPlan: 6, learningResource: 15, items: 20, tests: 2, ebook: 0 },
  { name: "Ms. Lakshmi Narayanan", lessonPlan: 11, learningResource: 24, items: 29, tests: 4, ebook: 2 },
];

// ── Report data (existing) ──
const deviceData = [
  { name: "Mobile", visits: 3769, timeSpent: "1,785:45:11 Hours", minutes: 107145 },
  { name: "Web", visits: 550, timeSpent: "539:42:50 Hours", minutes: 32382 },
];
const deviceColors = ["hsl(var(--chart-1))", "hsl(var(--chart-3))"];

const roleData = [
  { name: "Student", visits: 8861, timeSpent: "1,571:49:28 Hours", minutes: 94309 },
  { name: "Teacher", visits: 538, timeSpent: "510:48:13 Hours", minutes: 30648 },
];
const roleColors = ["hsl(var(--chart-2))", "hsl(var(--chart-4))"];

const contentTypeData = [
  { name: "Ebook", visits: 481, timeSpent: "273:40:05 Hours", minutes: 16420 },
  { name: "Learning Resources", visits: 3065, timeSpent: "395:34:56 Hours", minutes: 23734 },
  { name: "Test", visits: 43, timeSpent: "15:46:36 Hours", minutes: 946 },
  { name: "Question Bank", visits: 17, timeSpent: "01:33:54 Hours", minutes: 93 },
  { name: "Lesson / Weekly / Concept Plans", visits: 132, timeSpent: "22:02:16 Hours", minutes: 1322 },
  { name: "Answer Key", visits: 1, timeSpent: "00:00:30 Hours", minutes: 0 },
];
const contentColors = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
  "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--primary))",
];

const classSubjectData = [
  { name: "I-2024 - Embracing Harmony", visits: 10, timeSpent: "00:01:48 Hours" },
  { name: "I-2024 - English", visits: 1095, timeSpent: "445:09:19 Hours" },
  { name: "I-2024 - Mathematics", visits: 506, timeSpent: "53:06:35 Hours" },
  { name: "I-2024 - Magizhchi", visits: 8, timeSpent: "00:02:16 Hours" },
  { name: "I-2024 - My Art Palette", visits: 15, timeSpent: "00:06:16 Hours" },
  { name: "I-2024 - World Around Us", visits: 579, timeSpent: "34:48:11 Hours" },
  { name: "II-2024 - Embracing Harmony", visits: 10, timeSpent: "00:00:43 Hours" },
  { name: "II-2024 - English", visits: 233, timeSpent: "08:49:52 Hours" },
  { name: "II-2024 - Mathematics", visits: 250, timeSpent: "15:14:17 Hours" },
  { name: "II-2024 - Magizhchi", visits: 6, timeSpent: "00:02:27 Hours" },
  { name: "II-2024 - My Art Palette", visits: 4, timeSpent: "00:16:42 Hours" },
  { name: "II-2024 - World Around Us", visits: 489, timeSpent: "29:47:34 Hours" },
  { name: "III-2025 - English", visits: 86, timeSpent: "04:38:55 Hours" },
  { name: "III-2025 - Mathematics", visits: 25, timeSpent: "02:59:01 Hours" },
  { name: "III-2025 - Science", visits: 129, timeSpent: "10:42:43 Hours" },
  { name: "III-2025 - Social Studies", visits: 121, timeSpent: "09:55:22 Hours" },
  { name: "IV-2025 - Embracing Harmony", visits: 6, timeSpent: "00:02:52 Hours" },
  { name: "IV-2025 - English", visits: 26, timeSpent: "01:16:38 Hours" },
  { name: "IV-2025 - Mathematics", visits: 8, timeSpent: "01:08:05 Hours" },
  { name: "IV-2025 - My Art Palette", visits: 2, timeSpent: "00:04:34 Hours" },
  { name: "IV-2025 - Science", visits: 106, timeSpent: "04:49:19 Hours" },
  { name: "IV-2025 - Social Studies", visits: 48, timeSpent: "02:20:30 Hours" },
  { name: "Level 1-2025 - English", visits: 129, timeSpent: "38:51:56 Hours" },
  { name: "Level 1-2025 - General Awareness", visits: 21, timeSpent: "02:49:07 Hours" },
  { name: "Level 1-2025 - Mathematics", visits: 3, timeSpent: "00:40:22 Hours" },
  { name: "Level 2-2025 - English", visits: 72, timeSpent: "13:52:27 Hours" },
  { name: "Level 2-2025 - General Awareness", visits: 46, timeSpent: "08:24:51 Hours" },
  { name: "Level 3-2025 - Mathematics", visits: 13, timeSpent: "05:32:56 Hours" },
  { name: "V-2025 - English", visits: 16, timeSpent: "02:23:15 Hours" },
  { name: "V-2025 - Mathematics", visits: 28, timeSpent: "04:27:31 Hours" },
  { name: "V-2025 - My Art Palette", visits: 19, timeSpent: "00:55:32 Hours" },
  { name: "V-2025 - Science", visits: 10, timeSpent: "01:07:14 Hours" },
  { name: "V-2025 - Social Studies", visits: 115, timeSpent: "03:26:43 Hours" },
];

const classSubjectChartData = classSubjectData.map((d) => ({
  name: d.name.length > 18 ? d.name.slice(0, 18) + "…" : d.name,
  fullName: d.name,
  visits: d.visits,
}));

// ── Teacher Table Component ──
function TeacherTable({ data }: { data: typeof userAppTeachers }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="px-0 pb-0 pt-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6 font-semibold">Teacher Name</TableHead>
              <TableHead className="text-right font-semibold">Lesson Plan</TableHead>
              <TableHead className="text-right font-semibold">Learning Resource</TableHead>
              <TableHead className="text-right font-semibold">Items</TableHead>
              <TableHead className="text-right font-semibold">Tests</TableHead>
              <TableHead className="text-right pr-6 font-semibold">Ebook</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((t, i) => (
              <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                <TableCell className="pl-6 font-medium">{t.name}</TableCell>
                <TableCell className="text-right">{t.lessonPlan}</TableCell>
                <TableCell className="text-right">{t.learningResource}</TableCell>
                <TableCell className="text-right">{t.items}</TableCell>
                <TableCell className="text-right">{t.tests}</TableCell>
                <TableCell className="text-right pr-6">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                    {t.ebook}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ── Student Table Component ──
function StudentTable({ data }: { data: typeof userAppStudents }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="px-0 pb-0 pt-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6 font-semibold">Student Name</TableHead>
              <TableHead className="text-right font-semibold">Learning Resource</TableHead>
              <TableHead className="text-right font-semibold">Ebook</TableHead>
              <TableHead className="text-right font-semibold">Test</TableHead>
              <TableHead className="text-right font-semibold">LBQ</TableHead>
              <TableHead className="text-right pr-6 font-semibold">PT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((s, i) => (
              <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                <TableCell className="pl-6 font-medium">{s.name}</TableCell>
                <TableCell className="text-right">{s.learningResource}</TableCell>
                <TableCell className="text-right">{s.ebook}</TableCell>
                <TableCell className="text-right">{s.test}</TableCell>
                <TableCell className="text-right">{s.lbq}</TableCell>
                <TableCell className="text-right pr-6">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                    {s.pt}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ── Report Section Component ──
interface AnalyticsSectionProps {
  title: string;
  chartData: { name: string; [key: string]: any }[];
  dataKey: string;
  yLabel: string;
  colors: string[];
  tableHeaders: string[];
  tableRows: { cells: (string | number)[] }[];
  chartHeight?: number;
  barSize?: number;
}

const AnalyticsSection = ({
  title, chartData, dataKey, yLabel, colors, tableHeaders, tableRows, chartHeight = 300, barSize = 48,
}: AnalyticsSectionProps) => (
  <div className="space-y-6">
    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }} barSize={barSize}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} angle={-30} textAnchor="end" interval={0} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: yLabel, angle: -90, position: "insideLeft", style: { fill: "hsl(var(--muted-foreground))", fontSize: 12 } }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)", fontSize: 13 }} />
              <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    <Card className="shadow-sm">
      <CardContent className="px-0 pb-0 pt-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 border-t">
              {tableHeaders.map((h) => (
                <TableHead key={h} className={`font-semibold ${h !== tableHeaders[0] ? "text-right" : "pl-6"} ${h === tableHeaders[tableHeaders.length - 1] ? "pr-6" : ""}`}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows.map((row, i) => (
              <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                {row.cells.map((cell, j) => (
                  <TableCell key={j} className={`${j === 0 ? "pl-6 font-medium" : "text-right"} ${j === row.cells.length - 1 ? "pr-6" : ""}`} style={j === 0 ? { color: colors[i % colors.length] } : undefined}>
                    {j === row.cells.length - 1 ? (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">{cell}</span>
                    ) : typeof cell === "number" ? cell.toLocaleString() : cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

// ── Main Page ──
export default function ContentUsageDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") || "Teacher";

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [showReports, setShowReports] = useState(false);
  const isStudent = role === "Student";

  // Step 1: Class (and section for Student) not selected → show dropdown
  if (!selectedClass || (isStudent && !selectedSection)) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Content Usage — {role}</h1>
              <p className="text-sm text-muted-foreground">Select a class to view detailed reports</p>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto px-6 py-16 space-y-6">
          <Card className="shadow-md">
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">{isStudent ? "Choose Class & Section" : "Choose a Class"}</h2>
              <p className="text-sm text-muted-foreground">Select the class you want to analyse usage for.</p>
              <div className="space-y-3">
                <Select onValueChange={(v) => { setSelectedClass(v); if (!isStudent) setSelectedSection(""); }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select class…" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {classOptions.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isStudent && selectedClass && (
                  <Select onValueChange={(v) => setSelectedSection(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select section…" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {sectionOptions.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2+: Class selected → tabs + table + optional reports
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => { setSelectedClass(""); setSelectedSection(""); setShowReports(false); }} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Content Usage — {role}</h1>
            <p className="text-sm text-muted-foreground">
              Class: {selectedClass}{isStudent && selectedSection ? ` — ${selectedSection}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedClass} onValueChange={(v) => { setSelectedClass(v); setShowReports(false); }}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {classOptions.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isStudent && (
              <Select value={selectedSection} onValueChange={(v) => setSelectedSection(v)}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {sectionOptions.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="user">User Application</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Application</TabsTrigger>
            <TabsTrigger value="school">School Application</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="space-y-6">
            {isStudent ? <StudentTable data={userAppStudents} /> : <TeacherTable data={userAppTeachers} />}
          </TabsContent>
          <TabsContent value="mobile" className="space-y-6">
            {isStudent ? <StudentTable data={mobileAppStudents} /> : <TeacherTable data={mobileAppTeachers} />}
          </TabsContent>
          <TabsContent value="school" className="space-y-6">
            {isStudent ? <StudentTable data={schoolAppStudents} /> : <TeacherTable data={schoolAppTeachers} />}
          </TabsContent>
        </Tabs>

        {/* View More Details toggle */}
        {!showReports ? (
          <div className="flex justify-center">
            <Button variant="outline" className="gap-2" onClick={() => setShowReports(true)}>
              <Eye className="h-4 w-4" />
              View More Details
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex justify-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setShowReports(false)}>
                Hide Details
              </Button>
            </div>

            <AnalyticsSection title="Environment" chartData={deviceData.map((d) => ({ name: d.name, visits: d.minutes }))} dataKey="visits" yLabel="Time (Min)" colors={deviceColors} tableHeaders={["Devices", "No. of Visits", "Time Spent"]} tableRows={deviceData.map((d) => ({ cells: [d.name, d.visits, d.timeSpent] }))} />
            <AnalyticsSection title="Roles" chartData={roleData.map((d) => ({ name: d.name, visits: d.minutes }))} dataKey="visits" yLabel="Time (Min)" colors={roleColors} tableHeaders={["Roles", "No. of Visits", "Time Spent"]} tableRows={roleData.map((d) => ({ cells: [d.name, d.visits, d.timeSpent] }))} />
            <AnalyticsSection title="Content Type" chartData={contentTypeData.map((d) => ({ name: d.name.length > 14 ? d.name.slice(0, 14) + "…" : d.name, visits: d.minutes }))} dataKey="visits" yLabel="Time (Min)" colors={contentColors} tableHeaders={["Content Type", "No. of Visits", "Time Spent"]} tableRows={contentTypeData.map((d) => ({ cells: [d.name, d.visits, d.timeSpent] }))} chartHeight={320} barSize={40} />
            <AnalyticsSection title="Class - Subject" chartData={classSubjectChartData} dataKey="visits" yLabel="Visits" colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--primary))"]} tableHeaders={["Class - Subject", "No. of Visits", "Time Spent"]} tableRows={classSubjectData.map((d) => ({ cells: [d.name, d.visits, d.timeSpent] }))} chartHeight={360} barSize={16} />
          </div>
        )}
      </div>
    </div>
  );
}
