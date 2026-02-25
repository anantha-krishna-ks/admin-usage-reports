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

const contentTypesByEnv: Record<string, { name: string; visits: number; timeSpent: string; minutes: number }[]> = {
  Mobile: [
    { name: "Animation", visits: 89, timeSpent: "29:29:48 Hours", minutes: 1769 },
    { name: "Audio", visits: 32, timeSpent: "06:21:56 Hours", minutes: 381 },
    { name: "Concept Animation", visits: 25, timeSpent: "06:37:48 Hours", minutes: 397 },
    { name: "Document", visits: 1, timeSpent: "00:40:11 Hours", minutes: 40 },
    { name: "Ebook", visits: 500, timeSpent: "338:08:39 Hours", minutes: 20288 },
    { name: "Short Answer", visits: 20, timeSpent: "05:10:52 Hours", minutes: 310 },
    { name: "Fill in the Blanks", visits: 79, timeSpent: "00:54:32 Hours", minutes: 54 },
    { name: "Game", visits: 27, timeSpent: "07:06:15 Hours", minutes: 426 },
    { name: "Image Drag Drop", visits: 4, timeSpent: "00:41:49 Hours", minutes: 41 },
    { name: "Interactivity", visits: 48, timeSpent: "83:02:49 Hours", minutes: 4982 },
    { name: "Lesson / Weekly / Concept Plans", visits: 206, timeSpent: "57:16:25 Hours", minutes: 3436 },
    { name: "Long Answer", visits: 7, timeSpent: "00:59:37 Hours", minutes: 59 },
    { name: "Matching", visits: 5, timeSpent: "52:16:19 Hours", minutes: 3136 },
    { name: "Multiple Choice Static", visits: 58, timeSpent: "06:26:21 Hours", minutes: 386 },
    { name: "Multiple Response Static", visits: 3, timeSpent: "00:00:00 Hours", minutes: 0 },
    { name: "Test", visits: 1, timeSpent: "00:40:15 Hours", minutes: 40 },
    { name: "True / False", visits: 12, timeSpent: "00:52:19 Hours", minutes: 52 },
    { name: "Video", visits: 9, timeSpent: "01:21:07 Hours", minutes: 81 },
  ],
  Web: [
    { name: "Animation", visits: 45, timeSpent: "14:20:10 Hours", minutes: 860 },
    { name: "Audio", visits: 18, timeSpent: "03:15:00 Hours", minutes: 195 },
    { name: "Concept Animation", visits: 12, timeSpent: "03:08:22 Hours", minutes: 188 },
    { name: "Document", visits: 0, timeSpent: "00:00:00 Hours", minutes: 0 },
    { name: "Ebook", visits: 280, timeSpent: "180:45:20 Hours", minutes: 10845 },
    { name: "Short Answer", visits: 10, timeSpent: "02:30:00 Hours", minutes: 150 },
    { name: "Fill in the Blanks", visits: 35, timeSpent: "00:28:15 Hours", minutes: 28 },
    { name: "Game", visits: 15, timeSpent: "03:42:00 Hours", minutes: 222 },
    { name: "Image Drag Drop", visits: 2, timeSpent: "00:18:30 Hours", minutes: 18 },
    { name: "Interactivity", visits: 22, timeSpent: "40:10:00 Hours", minutes: 2410 },
    { name: "Lesson / Weekly / Concept Plans", visits: 95, timeSpent: "28:40:10 Hours", minutes: 1720 },
    { name: "Long Answer", visits: 3, timeSpent: "00:25:00 Hours", minutes: 25 },
    { name: "Matching", visits: 2, timeSpent: "25:10:00 Hours", minutes: 1510 },
    { name: "Multiple Choice Static", visits: 30, timeSpent: "03:12:00 Hours", minutes: 192 },
    { name: "Multiple Response Static", visits: 1, timeSpent: "00:00:00 Hours", minutes: 0 },
    { name: "Test", visits: 0, timeSpent: "00:10:15 Hours", minutes: 10 },
    { name: "True / False", visits: 6, timeSpent: "00:28:00 Hours", minutes: 28 },
    { name: "Video", visits: 5, timeSpent: "00:42:30 Hours", minutes: 42 },
  ],
  School: [
    { name: "Animation", visits: 22, timeSpent: "08:15:00 Hours", minutes: 495 },
    { name: "Audio", visits: 10, timeSpent: "02:05:00 Hours", minutes: 125 },
    { name: "Concept Animation", visits: 8, timeSpent: "01:50:00 Hours", minutes: 110 },
    { name: "Document", visits: 0, timeSpent: "00:00:00 Hours", minutes: 0 },
    { name: "Ebook", visits: 150, timeSpent: "95:30:00 Hours", minutes: 5730 },
    { name: "Short Answer", visits: 5, timeSpent: "01:20:00 Hours", minutes: 80 },
    { name: "Fill in the Blanks", visits: 20, timeSpent: "00:15:00 Hours", minutes: 15 },
    { name: "Game", visits: 8, timeSpent: "02:10:00 Hours", minutes: 130 },
    { name: "Image Drag Drop", visits: 1, timeSpent: "00:10:00 Hours", minutes: 10 },
    { name: "Interactivity", visits: 12, timeSpent: "22:00:00 Hours", minutes: 1320 },
    { name: "Lesson / Weekly / Concept Plans", visits: 50, timeSpent: "14:20:00 Hours", minutes: 860 },
    { name: "Long Answer", visits: 2, timeSpent: "00:15:00 Hours", minutes: 15 },
    { name: "Matching", visits: 1, timeSpent: "12:00:00 Hours", minutes: 720 },
    { name: "Multiple Choice Static", visits: 15, timeSpent: "01:40:00 Hours", minutes: 100 },
    { name: "Multiple Response Static", visits: 1, timeSpent: "00:00:00 Hours", minutes: 0 },
    { name: "Test", visits: 0, timeSpent: "00:05:00 Hours", minutes: 5 },
    { name: "True / False", visits: 3, timeSpent: "00:15:00 Hours", minutes: 15 },
    { name: "Video", visits: 3, timeSpent: "00:30:00 Hours", minutes: 30 },
  ],
};

const barColors = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
  "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--primary))",
  "hsl(210, 60%, 50%)", "hsl(160, 50%, 45%)", "hsl(30, 60%, 50%)",
  "hsl(280, 40%, 55%)", "hsl(0, 50%, 55%)", "hsl(45, 70%, 50%)",
  "hsl(190, 60%, 45%)", "hsl(320, 50%, 50%)", "hsl(100, 40%, 45%)",
  "hsl(15, 65%, 55%)", "hsl(240, 45%, 55%)", "hsl(60, 55%, 45%)",
];

// Drill-down items per content type
const contentDrillDown: Record<string, { name: string; visits: number; timeSpent: string }[]> = {
  Animation: [
    { name: "English – Animation 1.1", visits: 12, timeSpent: "02:15:00 Hours" },
    { name: "English – Animation 1.2", visits: 8, timeSpent: "01:30:00 Hours" },
    { name: "English – Animation 2.1", visits: 15, timeSpent: "03:10:00 Hours" },
    { name: "Mathematics – Animation 1.1", visits: 10, timeSpent: "02:00:00 Hours" },
    { name: "Science – Animation 3.1", visits: 20, timeSpent: "05:20:00 Hours" },
  ],
  Ebook: [
    { name: "English – Ebook 1.1", visits: 45, timeSpent: "30:10:00 Hours" },
    { name: "English – Ebook 2.1", visits: 38, timeSpent: "25:40:00 Hours" },
    { name: "Mathematics – Ebook 1.1", visits: 52, timeSpent: "35:00:00 Hours" },
    { name: "Science – Ebook 1.1", visits: 60, timeSpent: "42:15:00 Hours" },
    { name: "Social Studies – Ebook 1.1", visits: 30, timeSpent: "20:30:00 Hours" },
  ],
  "Lesson / Weekly / Concept Plans": [
    { name: "English – Lesson Plan 1.1", visits: 1, timeSpent: "00:00:00 Hours" },
    { name: "English – Lesson Plan 1.1", visits: 1, timeSpent: "00:00:00 Hours" },
    { name: "English – Lesson Plan 1.2", visits: 1, timeSpent: "00:00:00 Hours" },
    { name: "English – Lesson Plan 10.1", visits: 1, timeSpent: "00:00:00 Hours" },
    { name: "English – Lesson Plan 10.1", visits: 2, timeSpent: "00:40:49 Hours" },
    { name: "English – Lesson Plan 10.2", visits: 1, timeSpent: "00:00:00 Hours" },
    { name: "English – Lesson Plan 10.3", visits: 1, timeSpent: "00:00:00 Hours" },
    { name: "English – Lesson Plan 10.4", visits: 1, timeSpent: "00:00:00 Hours" },
    { name: "English – Lesson Plan 10.5", visits: 2, timeSpent: "00:40:16 Hours" },
    { name: "English – Lesson Plan 10.6", visits: 1, timeSpent: "00:00:00 Hours" },
  ],
  Interactivity: [
    { name: "English – Interactivity 1.1", visits: 5, timeSpent: "08:20:00 Hours" },
    { name: "English – Interactivity 2.3", visits: 8, timeSpent: "12:15:00 Hours" },
    { name: "Mathematics – Interactivity 1.1", visits: 3, timeSpent: "05:00:00 Hours" },
    { name: "Science – Interactivity 4.2", visits: 10, timeSpent: "18:30:00 Hours" },
  ],
  "Learning Resources": [
    { name: "English – Learning Resource 1.1", visits: 120, timeSpent: "45:10:00 Hours" },
    { name: "English – Learning Resource 2.1", visits: 95, timeSpent: "35:20:00 Hours" },
    { name: "Mathematics – Learning Resource 1.1", visits: 80, timeSpent: "28:00:00 Hours" },
    { name: "Science – Learning Resource 1.1", visits: 110, timeSpent: "40:15:00 Hours" },
  ],
  Audio: [
    { name: "English – Audio 1.1", visits: 8, timeSpent: "01:30:00 Hours" },
    { name: "English – Audio 2.1", visits: 12, timeSpent: "02:15:00 Hours" },
    { name: "Science – Audio 1.1", visits: 6, timeSpent: "01:10:00 Hours" },
  ],
  "Concept Animation": [
    { name: "Science – Concept Animation 1.1", visits: 10, timeSpent: "03:00:00 Hours" },
    { name: "Science – Concept Animation 2.1", visits: 8, timeSpent: "02:10:00 Hours" },
  ],
  Game: [
    { name: "English – Game 1.1", visits: 10, timeSpent: "02:30:00 Hours" },
    { name: "Mathematics – Game 1.1", visits: 9, timeSpent: "02:15:00 Hours" },
    { name: "Mathematics – Game 2.1", visits: 8, timeSpent: "02:21:15 Hours" },
  ],
  Video: [
    { name: "English – Video 1.1", visits: 4, timeSpent: "00:35:00 Hours" },
    { name: "Science – Video 2.1", visits: 5, timeSpent: "00:46:07 Hours" },
  ],
};

export default function EnvironmentDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const env = searchParams.get("env") || "Web";
  const personName = searchParams.get("name") || "";
  const role = searchParams.get("role") || "Teacher";

  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);

  const data = contentTypesByEnv[env] || contentTypesByEnv["Web"];
  const drillData = selectedContentType ? contentDrillDown[selectedContentType] || [] : [];
  const chartData = data.map(d => ({
    name: d.name.length > 12 ? d.name.slice(0, 12) + "…" : d.name,
    value: d.minutes,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <button onClick={() => navigate("/")} className="group flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <LayoutDashboard className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Dashboard</span>
            </button>
            <span className="text-muted-foreground/40">/</span>
            <button onClick={() => navigate(`/content-usage-detail?role=${role}`)} className="rounded-md px-2.5 py-1 text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all">
              Content Usage — {role}
            </button>
            <span className="text-muted-foreground/40">/</span>
            <button onClick={() => navigate(`/person-usage-detail?name=${encodeURIComponent(personName)}&role=${role}`)} className="rounded-md px-2.5 py-1 text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all">
              {personName}
            </button>
            <span className="text-muted-foreground/40">/</span>
            <span className="rounded-md px-2.5 py-1 bg-primary/10 text-primary font-medium">{env}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Chart */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div style={{ height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 60 }} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} angle={-40} textAnchor="end" interval={0} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: "Time (Min)", angle: -90, position: "insideLeft", style: { fill: "hsl(var(--muted-foreground))", fontSize: 12 } }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)", fontSize: 13 }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={barColors[i % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-sm">
          <CardContent className="px-0 pb-0 pt-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="pl-6 font-semibold">Content Type</TableHead>
                  <TableHead className="text-right font-semibold">No. of Visits</TableHead>
                  <TableHead className="text-right font-semibold">Time Spent</TableHead>
                  <TableHead className="text-center pr-6 font-semibold w-[80px]">Preview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={i} className={cn("hover:bg-muted/20 transition-colors", selectedContentType === row.name && "bg-primary/5")}>
                    <TableCell className="pl-6 font-medium" style={{ color: barColors[i % barColors.length] }}>{row.name}</TableCell>
                    <TableCell className="text-right">{row.visits.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">{row.timeSpent}</span>
                    </TableCell>
                    <TableCell className="text-center pr-6">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedContentType(row.name)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Drill-down Sheet */}
      <Sheet open={!!selectedContentType} onOpenChange={(open) => !open && setSelectedContentType(null)}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-lg">{env} &gt; {selectedContentType}</SheetTitle>
            <SheetDescription>{drillData.length} items found</SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <Card className="shadow-sm">
              <CardContent className="px-0 pb-0 pt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="pl-4 font-semibold">Content Type</TableHead>
                      <TableHead className="text-right font-semibold">No. of Visits</TableHead>
                      <TableHead className="text-right pr-4 font-semibold">Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drillData.map((item, i) => (
                      <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="pl-4 font-medium text-foreground">{item.name}</TableCell>
                        <TableCell className="text-right">{item.visits}</TableCell>
                        <TableCell className="text-right pr-4">
                          <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium tabular-nums text-muted-foreground">{item.timeSpent}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
