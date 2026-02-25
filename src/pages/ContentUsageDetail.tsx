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

// ── Parent table data per tab ──
const userAppParents = [
  { name: "Mr. Venkat Patel", learningResource: 30, ebook: 8, test: 5 },
  { name: "Mrs. Sudha Krishnan", learningResource: 42, ebook: 14, test: 10 },
  { name: "Mr. Arjun Reddy", learningResource: 25, ebook: 6, test: 3 },
  { name: "Mrs. Kavitha Sundaram", learningResource: 38, ebook: 11, test: 7 },
  { name: "Mr. Ramesh Gupta", learningResource: 28, ebook: 7, test: 4 },
];

const mobileAppParents = [
  { name: "Mr. Venkat Patel", learningResource: 15, ebook: 4, test: 2 },
  { name: "Mrs. Sudha Krishnan", learningResource: 20, ebook: 7, test: 5 },
  { name: "Mr. Arjun Reddy", learningResource: 12, ebook: 3, test: 1 },
  { name: "Mrs. Kavitha Sundaram", learningResource: 18, ebook: 5, test: 3 },
  { name: "Mr. Ramesh Gupta", learningResource: 14, ebook: 4, test: 2 },
];

const schoolAppParents = [
  { name: "Mr. Venkat Patel", learningResource: 8, ebook: 2, test: 1 },
  { name: "Mrs. Sudha Krishnan", learningResource: 10, ebook: 3, test: 2 },
  { name: "Mr. Arjun Reddy", learningResource: 6, ebook: 1, test: 0 },
  { name: "Mrs. Kavitha Sundaram", learningResource: 9, ebook: 3, test: 1 },
  { name: "Mr. Ramesh Gupta", learningResource: 7, ebook: 2, test: 1 },
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
  { name: "Mobile", visits: 3769, timeSpent: "1,785:45:11 Mins", minutes: 107145 },
  { name: "Web", visits: 550, timeSpent: "539:42:50 Mins", minutes: 32382 },
];
const deviceColors = ["hsl(var(--chart-1))", "hsl(var(--chart-3))"];

const roleData = [
  { name: "Student", visits: 8861, timeSpent: "1,571:49:28 Mins", minutes: 94309 },
  { name: "Teacher", visits: 538, timeSpent: "510:48:13 Mins", minutes: 30648 },
];
const roleColors = ["hsl(var(--chart-2))", "hsl(var(--chart-4))"];

const contentTypeData = [
  { name: "Ebook", visits: 481, timeSpent: "273:40:05 Mins", minutes: 16420 },
  { name: "Learning Resources", visits: 3065, timeSpent: "395:34:56 Mins", minutes: 23734 },
  { name: "Test", visits: 43, timeSpent: "15:46:36 Mins", minutes: 946 },
  { name: "Question Bank", visits: 17, timeSpent: "01:33:54 Mins", minutes: 93 },
  { name: "Lesson / Weekly / Concept Plans", visits: 132, timeSpent: "22:02:16 Mins", minutes: 1322 },
  { name: "Answer Key", visits: 1, timeSpent: "00:00:30 Mins", minutes: 0 },
];
const contentColors = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
  "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--primary))",
];

const classSubjectData = [
  { name: "I-2024 - Embracing Harmony", visits: 10, timeSpent: "00:01:48 Mins" },
  { name: "I-2024 - English", visits: 1095, timeSpent: "445:09:19 Mins" },
  { name: "I-2024 - Mathematics", visits: 506, timeSpent: "53:06:35 Mins" },
  { name: "I-2024 - Magizhchi", visits: 8, timeSpent: "00:02:16 Mins" },
  { name: "I-2024 - My Art Palette", visits: 15, timeSpent: "00:06:16 Mins" },
  { name: "I-2024 - World Around Us", visits: 579, timeSpent: "34:48:11 Mins" },
  { name: "II-2024 - Embracing Harmony", visits: 10, timeSpent: "00:00:43 Mins" },
  { name: "II-2024 - English", visits: 233, timeSpent: "08:49:52 Mins" },
  { name: "II-2024 - Mathematics", visits: 250, timeSpent: "15:14:17 Mins" },
  { name: "II-2024 - Magizhchi", visits: 6, timeSpent: "00:02:27 Mins" },
  { name: "II-2024 - My Art Palette", visits: 4, timeSpent: "00:16:42 Mins" },
  { name: "II-2024 - World Around Us", visits: 489, timeSpent: "29:47:34 Mins" },
  { name: "III-2025 - English", visits: 86, timeSpent: "04:38:55 Mins" },
  { name: "III-2025 - Mathematics", visits: 25, timeSpent: "02:59:01 Mins" },
  { name: "III-2025 - Science", visits: 129, timeSpent: "10:42:43 Mins" },
  { name: "III-2025 - Social Studies", visits: 121, timeSpent: "09:55:22 Mins" },
  { name: "IV-2025 - Embracing Harmony", visits: 6, timeSpent: "00:02:52 Mins" },
  { name: "IV-2025 - English", visits: 26, timeSpent: "01:16:38 Mins" },
  { name: "IV-2025 - Mathematics", visits: 8, timeSpent: "01:08:05 Mins" },
  { name: "IV-2025 - My Art Palette", visits: 2, timeSpent: "00:04:34 Mins" },
  { name: "IV-2025 - Science", visits: 106, timeSpent: "04:49:19 Mins" },
  { name: "IV-2025 - Social Studies", visits: 48, timeSpent: "02:20:30 Mins" },
  { name: "Level 1-2025 - English", visits: 129, timeSpent: "38:51:56 Mins" },
  { name: "Level 1-2025 - General Awareness", visits: 21, timeSpent: "02:49:07 Mins" },
  { name: "Level 1-2025 - Mathematics", visits: 3, timeSpent: "00:40:22 Mins" },
  { name: "Level 2-2025 - English", visits: 72, timeSpent: "13:52:27 Mins" },
  { name: "Level 2-2025 - General Awareness", visits: 46, timeSpent: "08:24:51 Mins" },
  { name: "Level 3-2025 - Mathematics", visits: 13, timeSpent: "05:32:56 Mins" },
  { name: "V-2025 - English", visits: 16, timeSpent: "02:23:15 Mins" },
  { name: "V-2025 - Mathematics", visits: 28, timeSpent: "04:27:31 Mins" },
  { name: "V-2025 - My Art Palette", visits: 19, timeSpent: "00:55:32 Mins" },
  { name: "V-2025 - Science", visits: 10, timeSpent: "01:07:14 Mins" },
  { name: "V-2025 - Social Studies", visits: 115, timeSpent: "03:26:43 Mins" },
];

const classSubjectChartData = classSubjectData.map((d) => ({
  name: d.name.length > 18 ? d.name.slice(0, 18) + "…" : d.name,
  fullName: d.name,
  visits: d.visits,
}));

// ── Teacher Table Component ──
function TeacherTable({ data, onPreview }: { data: typeof userAppTeachers; onPreview?: (name: string) => void }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="px-0 pb-0 pt-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6 font-semibold">Teacher Name</TableHead>
               <TableHead className="text-right font-semibold">Lesson Plan (mins)</TableHead>
               <TableHead className="text-right font-semibold">Learning Resource (mins)</TableHead>
               <TableHead className="text-right font-semibold">Items (mins)</TableHead>
               <TableHead className="text-right font-semibold">Tests (mins)</TableHead>
               <TableHead className="text-right font-semibold">Ebook (mins)</TableHead>
               <TableHead className="text-center pr-6 font-semibold w-[80px]">Preview</TableHead>
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
                <TableCell className="text-right">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                    {t.ebook}
                  </span>
                </TableCell>
                <TableCell className="text-center pr-6">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onPreview?.(t.name)}>
                    <Eye className="h-4 w-4" />
                  </Button>
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
function StudentTable({ data, onPreview }: { data: typeof userAppStudents; onPreview?: (name: string) => void }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="px-0 pb-0 pt-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6 font-semibold">Student Name</TableHead>
               <TableHead className="text-right font-semibold">Learning Resource (mins)</TableHead>
               <TableHead className="text-right font-semibold">Ebook (mins)</TableHead>
               <TableHead className="text-right font-semibold">Test (mins)</TableHead>
               <TableHead className="text-right font-semibold">LBQ (mins)</TableHead>
               <TableHead className="text-right font-semibold">PT (mins)</TableHead>
               <TableHead className="text-center pr-6 font-semibold w-[80px]">Preview</TableHead>
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
                <TableCell className="text-right">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                    {s.pt}
                  </span>
                </TableCell>
                <TableCell className="text-center pr-6">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onPreview?.(s.name)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ── Parent Table Component ──
function ParentTable({ data, onPreview }: { data: typeof userAppParents; onPreview?: (name: string) => void }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="px-0 pb-0 pt-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6 font-semibold">Parent Name</TableHead>
               <TableHead className="text-right font-semibold">Learning Resource (mins)</TableHead>
               <TableHead className="text-right font-semibold">Ebook (mins)</TableHead>
               <TableHead className="text-right font-semibold">Test (mins)</TableHead>
               <TableHead className="text-center pr-6 font-semibold w-[80px]">Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((p, i) => (
              <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                <TableCell className="pl-6 font-medium">{p.name}</TableCell>
                <TableCell className="text-right">{p.learningResource}</TableCell>
                <TableCell className="text-right">{p.ebook}</TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
                    {p.test}
                  </span>
                </TableCell>
                <TableCell className="text-center pr-6">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onPreview?.(p.name)}>
                    <Eye className="h-4 w-4" />
                  </Button>
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

  const isStudent = role === "Student";
  const isParent = role === "Parent";
  const needsSection = isStudent || isParent;

  const [selectedClass, setSelectedClass] = useState<string>(classOptions[0]);
  const [selectedSection, setSelectedSection] = useState<string>(needsSection ? sectionOptions[0] : "");
  const [showReports, setShowReports] = useState(false);

  const handlePreview = (name: string) => {
    navigate(`/person-usage-detail?name=${encodeURIComponent(name)}&role=${role}&class=${encodeURIComponent(selectedClass)}`);
  };

  // Main view with dropdowns in header
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="shrink-0">
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
            {needsSection && (
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
            {isStudent ? <StudentTable data={userAppStudents} onPreview={handlePreview} /> : isParent ? <ParentTable data={userAppParents} onPreview={handlePreview} /> : <TeacherTable data={userAppTeachers} onPreview={handlePreview} />}
          </TabsContent>
          <TabsContent value="mobile" className="space-y-6">
            {isStudent ? <StudentTable data={mobileAppStudents} onPreview={handlePreview} /> : isParent ? <ParentTable data={mobileAppParents} onPreview={handlePreview} /> : <TeacherTable data={mobileAppTeachers} onPreview={handlePreview} />}
          </TabsContent>
          <TabsContent value="school" className="space-y-6">
            {isStudent ? <StudentTable data={schoolAppStudents} onPreview={handlePreview} /> : isParent ? <ParentTable data={schoolAppParents} onPreview={handlePreview} /> : <TeacherTable data={schoolAppTeachers} onPreview={handlePreview} />}
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

             <AnalyticsSection title="Environment" chartData={deviceData.map((d) => ({ name: d.name, visits: d.minutes }))} dataKey="visits" yLabel="Time (Min)" colors={deviceColors} tableHeaders={["Devices", "No. of Visits", "Time Spent (mins)"]} tableRows={deviceData.map((d) => ({ cells: [d.name, d.visits, d.timeSpent] }))} />
             <AnalyticsSection title="Roles" chartData={roleData.map((d) => ({ name: d.name, visits: d.minutes }))} dataKey="visits" yLabel="Time (Min)" colors={roleColors} tableHeaders={["Roles", "No. of Visits", "Time Spent (mins)"]} tableRows={roleData.map((d) => ({ cells: [d.name, d.visits, d.timeSpent] }))} />
             <AnalyticsSection title="Content Type" chartData={contentTypeData.map((d) => ({ name: d.name.length > 14 ? d.name.slice(0, 14) + "…" : d.name, visits: d.minutes }))} dataKey="visits" yLabel="Time (Min)" colors={contentColors} tableHeaders={["Content Type", "No. of Visits", "Time Spent (mins)"]} tableRows={contentTypeData.map((d) => ({ cells: [d.name, d.visits, d.timeSpent] }))} chartHeight={320} barSize={40} />
             <AnalyticsSection title="Class - Subject" chartData={classSubjectChartData} dataKey="visits" yLabel="Visits" colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--primary))"]} tableHeaders={["Class - Subject", "No. of Visits", "Time Spent (mins)"]} tableRows={classSubjectData.map((d) => ({ cells: [d.name, d.visits, d.timeSpent] }))} chartHeight={360} barSize={16} />
          </div>
        )}
      </div>
    </div>
  );
}
