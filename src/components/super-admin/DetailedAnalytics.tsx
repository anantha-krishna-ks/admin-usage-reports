import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight, LayoutGrid, Globe, Smartphone, Building2, School, Clock, BarChart3, type LucideIcon } from "lucide-react";
import { SectionInfoButton } from "@/components/SectionInfoButton";
import { TrendChip } from "@/components/TrendChip";
import { cn } from "@/lib/utils";

type Channel = "all" | "web" | "mobile" | "school";

interface SchoolRow {
  school: string;
  totalUsers: number;
  activeUsers: number;
  teachers: number;
  students: number;
  otherUsers: number;
  usage: Record<Exclude<Channel, "all">, number>;
}

interface SchoolContentRow {
  school: string;
  lessonPlan: number;
  learningResource: number;
  items: number;
  tests: number;
  ebook: number;
  trendValue: number;
  trendPrev: number;
}

const applicationData: SchoolRow[] = [
  { school: "Riverside Academy", totalUsers: 1250, activeUsers: 1008, teachers: 490, students: 3100, otherUsers: 340, usage: { web: 2359, mobile: 983, school: 590 } },
  { school: "Lakeside High School", totalUsers: 980, activeUsers: 812, teachers: 380, students: 2450, otherUsers: 260, usage: { web: 1731, mobile: 865, school: 494 } },
  { school: "Mountain View School", totalUsers: 1420, activeUsers: 1180, teachers: 520, students: 3480, otherUsers: 390, usage: { web: 2394, mobile: 1207, school: 790 } },
  { school: "Sunrise International", totalUsers: 870, activeUsers: 690, teachers: 310, students: 2100, otherUsers: 220, usage: { web: 1526, mobile: 710, school: 395 } },
  { school: "Green Valley School", totalUsers: 1105, activeUsers: 905, teachers: 420, students: 2780, otherUsers: 290, usage: { web: 2027, mobile: 906, school: 558 } },
];

const channelFilters: { id: Channel; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "web", label: "Web", icon: Globe },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "school", label: "School", icon: Building2 },
];

const contentData: SchoolContentRow[] = [
  { school: "Riverside Academy", lessonPlan: 124, learningResource: 86, items: 340, tests: 28, ebook: 55, trendValue: 633, trendPrev: 565 },
  { school: "Lakeside High School", lessonPlan: 98, learningResource: 72, items: 285, tests: 22, ebook: 41, trendValue: 518, trendPrev: 480 },
  { school: "Mountain View School", lessonPlan: 156, learningResource: 94, items: 410, tests: 35, ebook: 62, trendValue: 757, trendPrev: 658 },
  { school: "Sunrise International", lessonPlan: 82, learningResource: 58, items: 220, tests: 18, ebook: 34, trendValue: 412, trendPrev: 434 },
  { school: "Green Valley School", lessonPlan: 110, learningResource: 78, items: 305, tests: 25, ebook: 48, trendValue: 566, trendPrev: 515 },
];

const getUsage = (row: SchoolRow, channel: Channel) =>
  channel === "all"
    ? Object.values(row.usage).reduce((s, v) => s + v, 0)
    : row.usage[channel];

const totalSchools = applicationData.length;
const totalUsageMins = applicationData.reduce((sum, row) => sum + getUsage(row, "all"), 0);
const totalUsageHours = totalUsageMins / 60;
const avgUsageMins = Math.round(totalUsageMins / totalSchools);

const ApplicationTable = ({ rows, channel }: { rows: SchoolRow[]; channel: Channel }) => {
  const navigate = useNavigate();
  const activeLabel = channel === "all" ? "Total" : channelFilters.find((c) => c.id === channel)?.label;
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">School</TableHead>
            <TableHead>Total Users</TableHead>
            <TableHead>Active Users</TableHead>
            <TableHead>Teachers</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Other Users</TableHead>
            <TableHead>{activeLabel} Usage</TableHead>
            <TableHead className="w-[90px]">Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.school}>
              <TableCell className="font-medium">{r.school}</TableCell>
              <TableCell className="tabular-nums">{r.totalUsers.toLocaleString()}</TableCell>
              <TableCell className="tabular-nums">{r.activeUsers.toLocaleString()}</TableCell>
              <TableCell className="tabular-nums">{r.teachers.toLocaleString()}</TableCell>
              <TableCell className="tabular-nums">{r.students.toLocaleString()}</TableCell>
              <TableCell className="tabular-nums">{r.otherUsers.toLocaleString()}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium tabular-nums">
                  {getUsage(r, channel).toLocaleString()} mins
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => navigate(`/?school=${encodeURIComponent(r.school)}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ContentTable = ({ rows }: { rows: SchoolContentRow[] }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">School</TableHead>
            <TableHead>Lesson Plan</TableHead>
            <TableHead>Learning Resource</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Tests</TableHead>
            <TableHead>Ebook</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead className="w-[90px]">Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.school}>
              <TableCell className="font-medium">{r.school}</TableCell>
              <TableCell className="tabular-nums">{r.lessonPlan.toLocaleString()}</TableCell>
              <TableCell className="tabular-nums">{r.learningResource.toLocaleString()}</TableCell>
              <TableCell className="tabular-nums">{r.items.toLocaleString()}</TableCell>
              <TableCell className="tabular-nums">{r.tests.toLocaleString()}</TableCell>
              <TableCell className="tabular-nums">{r.ebook.toLocaleString()}</TableCell>
              <TableCell>
                <TrendChip value={r.trendValue} prev={r.trendPrev} />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => navigate(`/?school=${encodeURIComponent(r.school)}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const DetailedAnalytics = () => {
  const [tab, setTab] = useState<"application" | "content">("application");
  const [channel, setChannel] = useState<Channel>("all");

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle>Detailed Analytics</CardTitle>
            <Badge className="text-xs font-medium h-6 px-2.5 tracking-wide bg-primary/15 text-[#0043af] hover:bg-primary/15 hover:text-[#0043af]">
              mins
            </Badge>
          </div>
          <CardDescription>School-wise usage breakdown across the network</CardDescription>
        </div>
        <SectionInfoButton description="Network-wide breakdown of application and content usage segmented by school." />
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(v) => setTab(v as "application" | "content")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="application" className="pt-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {channelFilters.map((f) => {
                const Icon = f.icon;
                const active = channel === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setChannel(f.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {f.label}
                  </button>
                );
              })}
            </div>
            <ApplicationTable rows={applicationData} channel={channel} />
          </TabsContent>
          <TabsContent value="content" className="pt-4">
            <ContentTable rows={contentData} />
          </TabsContent>
        </Tabs>
        <div className="mt-4 flex justify-end">
          <Button
            variant="default"
            size="sm"
            className="group rounded-full px-4 shadow-sm hover:shadow-md transition-all"
          >
            View More
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
