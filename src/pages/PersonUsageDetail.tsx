import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LayoutDashboard, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ── Mock data ──
const environmentData = [
  { name: "Mobile", visits: 36627, timeSpent: "1091:40:11 Hours", minutes: 65500 },
  { name: "Web", visits: 1126, timeSpent: "598:07:02 Hours", minutes: 35887 },
  { name: "School", visits: 842, timeSpent: "312:25:18 Hours", minutes: 18745 },
];

const contentTypeData = [
  { name: "Ebook", visits: 13604, timeSpent: "919:17:22 Hours", minutes: 55157 },
  { name: "Test", visits: 1, timeSpent: "00:40:15 Hours", minutes: 40 },
  { name: "Lesson / Weekly / Concept Plans", visits: 206, timeSpent: "57:16:25 Hours", minutes: 3436 },
  { name: "Question Bank", visits: 188, timeSpent: "67:21:49 Hours", minutes: 4041 },
  { name: "Learning Resources", visits: 23754, timeSpent: "645:11:22 Hours", minutes: 38711 },
];

const classSubjectData = [
  { name: "I-2024 - Embracing Harmony", visits: 82, timeSpent: "03:46:46 Hours" },
  { name: "I-2024 - English", visits: 605, timeSpent: "50:37:19 Hours" },
  { name: "I-2024 - Mathematics", visits: 314, timeSpent: "33:20:11 Hours" },
  { name: "I-2024 - Megabyte", visits: 8, timeSpent: "00:01:54 Hours" },
  { name: "I-2024 - My Art Palette", visits: 103, timeSpent: "02:42:31 Hours" },
  { name: "I-2024 - World Around Us", visits: 357, timeSpent: "34:23:38 Hours" },
  { name: "II-2024 - Embracing Harmony", visits: 359, timeSpent: "19:52:42 Hours" },
  { name: "II-2024 - English", visits: 1271, timeSpent: "150:16:18 Hours" },
  { name: "II-2024 - Mathematics", visits: 495, timeSpent: "79:32:24 Hours" },
  { name: "II-2024 - Megabyte", visits: 293, timeSpent: "02:16:45 Hours" },
  { name: "II-2024 - My Art Palette", visits: 416, timeSpent: "06:31:19 Hours" },
  { name: "II-2024 - World Around Us", visits: 1190, timeSpent: "92:35:27 Hours" },
  { name: "III-2025 - Embracing Harmony", visits: 661, timeSpent: "13:02:16 Hours" },
  { name: "III-2025 - English", visits: 3876, timeSpent: "152:28:38 Hours" },
  { name: "III-2025 - Mathematics", visits: 1031, timeSpent: "73:32:13 Hours" },
  { name: "III-2025 - My Art Palette", visits: 664, timeSpent: "22:33:19 Hours" },
  { name: "III-2025 - Science", visits: 3992, timeSpent: "150:52:11 Hours" },
  { name: "III-2025 - Social Studies", visits: 2661, timeSpent: "140:58:30 Hours" },
  { name: "IV-2025 - Embracing Harmony", visits: 871, timeSpent: "17:11:13 Hours" },
  { name: "IV-2025 - English", visits: 3419, timeSpent: "99:39:39 Hours" },
  { name: "IV-2025 - Mathematics", visits: 1713, timeSpent: "77:04:07 Hours" },
  { name: "IV-2025 - My Art Palette", visits: 721, timeSpent: "13:05:17 Hours" },
  { name: "IV-2025 - Science", visits: 2267, timeSpent: "60:47:31 Hours" },
  { name: "IV-2025 - Social Studies", visits: 2796, timeSpent: "94:39:31 Hours" },
  { name: "V-2025 - Embracing Harmony", visits: 416, timeSpent: "05:01:42 Hours" },
  { name: "V-2025 - English", visits: 2952, timeSpent: "115:52:15 Hours" },
  { name: "V-2025 - Mathematics", visits: 1095, timeSpent: "38:08:36 Hours" },
  { name: "V-2025 - My Art Palette", visits: 497, timeSpent: "11:03:07 Hours" },
  { name: "V-2025 - Science", visits: 1007, timeSpent: "54:00:51 Hours" },
  { name: "V-2025 - Social Studies", visits: 1621, timeSpent: "73:49:03 Hours" },
];

const envColors = ["hsl(var(--chart-1))", "hsl(var(--chart-3))", "hsl(var(--chart-2))"];
const contentColors = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
  "hsl(var(--chart-4))", "hsl(var(--chart-5))",
];
const classColors = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
  "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--primary))",
];

// ── Drill-down detail data for Environment ──
const envDrillDown: Record<string, { contentType: string; visits: number; timeSpent: string }[]> = {
  Mobile: [
    { contentType: "Ebook", visits: 10200, timeSpent: "680:10:00 Hours" },
    { contentType: "Learning Resources", visits: 18500, timeSpent: "490:20:00 Hours" },
    { contentType: "Lesson / Weekly / Concept Plans", visits: 150, timeSpent: "40:00:00 Hours" },
    { contentType: "Question Bank", visits: 140, timeSpent: "50:10:00 Hours" },
    { contentType: "Test", visits: 1, timeSpent: "00:30:00 Hours" },
  ],
  Web: [
    { contentType: "Ebook", visits: 3404, timeSpent: "239:07:22 Hours" },
    { contentType: "Learning Resources", visits: 5254, timeSpent: "154:51:22 Hours" },
    { contentType: "Lesson / Weekly / Concept Plans", visits: 56, timeSpent: "17:16:25 Hours" },
    { contentType: "Question Bank", visits: 48, timeSpent: "17:11:49 Hours" },
    { contentType: "Test", visits: 0, timeSpent: "00:10:15 Hours" },
  ],
  School: [
    { contentType: "Ebook", visits: 1800, timeSpent: "120:05:00 Hours" },
    { contentType: "Learning Resources", visits: 3200, timeSpent: "95:30:00 Hours" },
    { contentType: "Lesson / Weekly / Concept Plans", visits: 42, timeSpent: "12:10:00 Hours" },
    { contentType: "Question Bank", visits: 35, timeSpent: "10:45:00 Hours" },
    { contentType: "Test", visits: 0, timeSpent: "00:05:18 Hours" },
  ],
};

// ── Drill-down for Content Type ──
const contentDrillDown: Record<string, { classSubject: string; visits: number; timeSpent: string }[]> = {
  Ebook: [
    { classSubject: "I-2024 - English", visits: 420, timeSpent: "35:10:00 Hours" },
    { classSubject: "II-2024 - English", visits: 890, timeSpent: "105:20:00 Hours" },
    { classSubject: "III-2025 - Science", visits: 1500, timeSpent: "60:40:00 Hours" },
    { classSubject: "IV-2025 - Mathematics", visits: 800, timeSpent: "38:15:00 Hours" },
  ],
  "Learning Resources": [
    { classSubject: "III-2025 - English", visits: 3200, timeSpent: "120:00:00 Hours" },
    { classSubject: "IV-2025 - English", visits: 2800, timeSpent: "80:30:00 Hours" },
    { classSubject: "V-2025 - Science", visits: 900, timeSpent: "48:00:00 Hours" },
  ],
  "Lesson / Weekly / Concept Plans": [
    { classSubject: "I-2024 - World Around Us", visits: 60, timeSpent: "15:00:00 Hours" },
    { classSubject: "II-2024 - World Around Us", visits: 80, timeSpent: "22:00:00 Hours" },
  ],
  "Question Bank": [
    { classSubject: "III-2025 - Mathematics", visits: 95, timeSpent: "35:00:00 Hours" },
    { classSubject: "IV-2025 - Science", visits: 93, timeSpent: "32:21:49 Hours" },
  ],
  Test: [
    { classSubject: "I-2024 - Mathematics", visits: 1, timeSpent: "00:40:15 Hours" },
  ],
};

// ── Reusable chart+table section ──
interface SectionProps {
  title: string;
  chartData: { name: string; value: number }[];
  colors: string[];
  tableHeaders: string[];
  tableRows: { cells: (string | number)[]; key: string }[];
  onRowClick?: (key: string) => void;
  selectedKey?: string | null;
  chartHeight?: number;
  barSize?: number;
}

function AnalyticsSection({ title, chartData, colors, tableHeaders, tableRows, onRowClick, selectedKey, chartHeight = 300, barSize = 48 }: SectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }} barSize={barSize}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} angle={-30} textAnchor="end" interval={0} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: "Time (Min)", angle: -90, position: "insideLeft", style: { fill: "hsl(var(--muted-foreground))", fontSize: 12 } }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)", fontSize: 13 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
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
              <TableRow className="bg-muted/30">
                {tableHeaders.map((h, i) => (
                  <TableHead key={h} className={cn(
                    "font-semibold",
                    i === 0 ? "pl-6" : "text-right",
                    i === tableHeaders.length - 1 && "pr-6",
                    onRowClick && i === tableHeaders.length - 1 && "text-center w-[80px]"
                  )}>{h}</TableHead>
                ))}
                {onRowClick && <TableHead className="font-semibold text-center pr-6 w-[80px]">Preview</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows.map((row, i) => (
                <TableRow
                  key={i}
                  className={cn(
                    "hover:bg-muted/20 transition-colors",
                    selectedKey === row.key && "bg-primary/5"
                  )}
                >
                  {row.cells.map((cell, j) => (
                    <TableCell
                      key={j}
                      className={cn(
                        j === 0 ? "pl-6 font-medium" : "text-right",
                        j === row.cells.length - 1 && !onRowClick && "pr-6"
                      )}
                      style={j === 0 ? { color: colors[i % colors.length] } : undefined}
                    >
                      {j === row.cells.length - 1 ? (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">{cell}</span>
                      ) : typeof cell === "number" ? cell.toLocaleString() : cell}
                    </TableCell>
                  ))}
                  {onRowClick && (
                    <TableCell className="text-center pr-6">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onRowClick(row.key)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Drill-down sheet ──
function DrillDownSheet({
  open, onClose, title, headers, rows, colors,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  headers: string[];
  rows: { cells: (string | number)[] }[];
  colors: string[];
}) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-lg">{title}</SheetTitle>
          <SheetDescription>Detailed breakdown for {title}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <Card className="shadow-sm">
            <CardContent className="px-0 pb-0 pt-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    {headers.map((h, i) => (
                      <TableHead key={h} className={cn("font-semibold", i === 0 ? "pl-4" : "text-right", i === headers.length - 1 && "pr-4")}>{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                      {row.cells.map((cell, j) => (
                        <TableCell
                          key={j}
                          className={cn(j === 0 ? "pl-4 font-medium" : "text-right", j === row.cells.length - 1 && "pr-4")}
                          style={j === 0 ? { color: colors[i % colors.length] } : undefined}
                        >
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// ── Main Page ──
export default function PersonUsageDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const personName = searchParams.get("name") || "Unknown";
  const role = searchParams.get("role") || "Teacher";
  const className = searchParams.get("class") || "";

  const [envDrill, setEnvDrill] = useState<string | null>(null);
  const [contentDrill, setContentDrill] = useState<string | null>(null);

  // Breadcrumb segments
  const breadcrumbs = [
    { label: "Dashboard", onClick: () => navigate("/") },
    { label: `Content Usage — ${role}`, onClick: () => navigate(`/content-usage-detail?role=${role}`) },
    { label: personName, onClick: undefined },
  ];

  const envDrillData = envDrill ? envDrillDown[envDrill] || [] : [];
  const contentDrillData = contentDrill ? contentDrillDown[contentDrill] || [] : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb nav — no header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate("/")} className="group flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <LayoutDashboard className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Dashboard</span>
            </button>
            {breadcrumbs.slice(1).map((bc, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-muted-foreground/40">/</span>
                {bc.onClick ? (
                  <button onClick={bc.onClick} className="rounded-md px-2.5 py-1 text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all">
                    {bc.label}
                  </button>
                ) : (
                  <span className="rounded-md px-2.5 py-1 bg-primary/10 text-primary font-medium">{bc.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Environment */}
        <AnalyticsSection
          title="Environment"
          chartData={environmentData.map(d => ({ name: d.name, value: d.minutes }))}
          colors={envColors}
          tableHeaders={["Devices", "No. of Visits", "Time Spent"]}
          tableRows={environmentData.map(d => ({ cells: [d.name, d.visits, d.timeSpent], key: d.name }))}
          onRowClick={(key) => setEnvDrill(key)}
          selectedKey={envDrill}
        />

        {/* Content Type */}
        <AnalyticsSection
          title="Content Type"
          chartData={contentTypeData.map(d => ({ name: d.name.length > 14 ? d.name.slice(0, 14) + "…" : d.name, value: d.minutes }))}
          colors={contentColors}
          tableHeaders={["Content Type", "No. of Visits", "Time Spent"]}
          tableRows={contentTypeData.map(d => ({ cells: [d.name, d.visits, d.timeSpent], key: d.name }))}
          onRowClick={(key) => setContentDrill(key)}
          selectedKey={contentDrill}
          chartHeight={320}
          barSize={40}
        />

        {/* Class - Subject */}
        <AnalyticsSection
          title="Class - Subject"
          chartData={classSubjectData.map(d => ({ name: d.name.length > 18 ? d.name.slice(0, 18) + "…" : d.name, value: d.visits }))}
          colors={classColors}
          tableHeaders={["Class - Subject", "No. of Visits", "Time Spent"]}
          tableRows={classSubjectData.map(d => ({ cells: [d.name, d.visits, d.timeSpent], key: d.name }))}
          chartHeight={360}
          barSize={16}
        />
      </div>

      {/* Drill-down sheets */}
      <DrillDownSheet
        open={!!envDrill}
        onClose={() => setEnvDrill(null)}
        title={envDrill || ""}
        headers={["Content Type", "No. of Visits", "Time Spent"]}
        rows={envDrillData.map(d => ({ cells: [d.contentType, d.visits, d.timeSpent] }))}
        colors={contentColors}
      />
      <DrillDownSheet
        open={!!contentDrill}
        onClose={() => setContentDrill(null)}
        title={contentDrill || ""}
        headers={["Class - Subject", "No. of Visits", "Time Spent"]}
        rows={contentDrillData.map(d => ({ cells: [d.classSubject, d.visits, d.timeSpent] }))}
        colors={classColors}
      />
    </div>
  );
}
