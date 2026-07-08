import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";
import { SectionInfoButton } from "@/components/SectionInfoButton";

interface SchoolRow {
  school: string;
  totalUsers: number;
  activeUsers: number;
  teachers: number;
  students: number;
  otherUsers: number;
  totalUsage: number;
}

const applicationData: SchoolRow[] = [
  { school: "Riverside Academy", totalUsers: 1250, activeUsers: 1008, teachers: 490, students: 3100, otherUsers: 340, totalUsage: 3930 },
  { school: "Lakeside High School", totalUsers: 980, activeUsers: 812, teachers: 380, students: 2450, otherUsers: 260, totalUsage: 3090 },
  { school: "Mountain View School", totalUsers: 1420, activeUsers: 1180, teachers: 520, students: 3480, otherUsers: 390, totalUsage: 4390 },
  { school: "Sunrise International", totalUsers: 870, activeUsers: 690, teachers: 310, students: 2100, otherUsers: 220, totalUsage: 2630 },
  { school: "Green Valley School", totalUsers: 1105, activeUsers: 905, teachers: 420, students: 2780, otherUsers: 290, totalUsage: 3490 },
];

const contentData: SchoolRow[] = [
  { school: "Riverside Academy", totalUsers: 1250, activeUsers: 1008, teachers: 590, students: 3850, otherUsers: 420, totalUsage: 4860 },
  { school: "Lakeside High School", totalUsers: 980, activeUsers: 812, teachers: 460, students: 3020, otherUsers: 315, totalUsage: 3795 },
  { school: "Mountain View School", totalUsers: 1420, activeUsers: 1180, teachers: 640, students: 4290, otherUsers: 470, totalUsage: 5400 },
  { school: "Sunrise International", totalUsers: 870, activeUsers: 690, teachers: 380, students: 2610, otherUsers: 275, totalUsage: 3265 },
  { school: "Green Valley School", totalUsers: 1105, activeUsers: 905, teachers: 510, students: 3450, otherUsers: 360, totalUsage: 4320 },
];

const SchoolTable = ({ rows }: { rows: SchoolRow[] }) => {
  const navigate = useNavigate();
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
            <TableHead>Total Usage</TableHead>
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
                  {r.totalUsage.toLocaleString()} mins
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

export const DetailedAnalytics = () => {
  const [tab, setTab] = useState<"application" | "content">("application");
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
          <TabsContent value="application" className="pt-4">
            <SchoolTable rows={applicationData} />
          </TabsContent>
          <TabsContent value="content" className="pt-4">
            <SchoolTable rows={contentData} />
          </TabsContent>
        </Tabs>
        <div className="mt-5">
          <Button
            variant="default"
            className="w-full group shadow-sm hover:shadow-md transition-all"
          >
            View More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
