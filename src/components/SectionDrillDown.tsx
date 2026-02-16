import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DateRange } from "react-day-picker";

interface SectionDrillDownProps {
  dateRange?: DateRange;
}

interface RoleEntry {
  name: string;
  users: number;
  appUsage: string;
  contentUsage: string;
  totalUsage: string;
}

interface GradeData {
  grade: string;
  totalUsers: number;
  appUsage: string;
  contentUsage: string;
  totalUsage: string;
  roles: RoleEntry[];
}

const gradesData: GradeData[] = [
  {
    grade: "Grade 8",
    totalUsers: 86,
    appUsage: "288.74",
    contentUsage: "518.252",
    totalUsage: "806.992",
    roles: [
      { name: "Teachers", users: 5, appUsage: "52.14", contentUsage: "120.35", totalUsage: "172.49" },
      { name: "Students", users: 60, appUsage: "208.36", contentUsage: "342.90", totalUsage: "551.26" },
      { name: "Parents", users: 21, appUsage: "28.24", contentUsage: "55.00", totalUsage: "83.24" },
    ],
  },
  {
    grade: "Grade 9",
    totalUsers: 157,
    appUsage: "536.241",
    contentUsage: "963.696",
    totalUsage: "1,499.937",
    roles: [
      { name: "Teachers", users: 8, appUsage: "83.08", contentUsage: "209.36", totalUsage: "292.43" },
      { name: "Students", users: 108, appUsage: "413.73", contentUsage: "619.76", totalUsage: "1,033.49" },
      { name: "Parents", users: 41, appUsage: "39.43", contentUsage: "134.58", totalUsage: "174.02" },
    ],
  },
  {
    grade: "Grade 10",
    totalUsers: 65,
    appUsage: "387.598",
    contentUsage: "618.939",
    totalUsage: "1,006.537",
    roles: [
      { name: "Teachers", users: 4, appUsage: "72.30", contentUsage: "162.10", totalUsage: "234.40" },
      { name: "Students", users: 45, appUsage: "284.80", contentUsage: "408.84", totalUsage: "693.64" },
      { name: "Parents", users: 16, appUsage: "30.50", contentUsage: "48.00", totalUsage: "78.50" },
    ],
  },
  {
    grade: "Grade 11",
    totalUsers: 83,
    appUsage: "428.392",
    contentUsage: "391.384",
    totalUsage: "819.776",
    roles: [
      { name: "Teachers", users: 5, appUsage: "84.90", contentUsage: "63.18", totalUsage: "148.08" },
      { name: "Students", users: 58, appUsage: "313.09", contentUsage: "295.80", totalUsage: "608.89" },
      { name: "Parents", users: 20, appUsage: "30.40", contentUsage: "32.40", totalUsage: "62.80" },
    ],
  },
];

export const SectionDrillDown = ({ dateRange }: SectionDrillDownProps) => {
  const [expandedGrades, setExpandedGrades] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleGrade = (grade: string) => {
    const next = new Set(expandedGrades);
    if (next.has(grade)) next.delete(grade); else next.add(grade);
    setExpandedGrades(next);
  };

  const handlePreview = (grade: string, role: string) => {
    const params = new URLSearchParams({ grade, role });
    if (dateRange?.from) params.set("from", dateRange.from.toISOString());
    if (dateRange?.to) params.set("to", dateRange.to.toISOString());
    navigate(`/section-detail?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section-wise Drill Down</CardTitle>
        <CardDescription>Detailed usage metrics for each grade and role within the school</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Grade / Role</TableHead>
                <TableHead>Total Users</TableHead>
                <TableHead>App Usage (hrs)</TableHead>
                <TableHead>Content Usage (hrs)</TableHead>
                <TableHead>Total Usage (hrs)</TableHead>
                <TableHead className="w-[100px]">Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradesData.map((grade) => (
                <>
                  <TableRow key={grade.grade} className="cursor-pointer hover:bg-muted/50" onClick={() => toggleGrade(grade.grade)}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          {expandedGrades.has(grade.grade) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                        {grade.grade}
                      </div>
                    </TableCell>
                    <TableCell>{grade.totalUsers}</TableCell>
                    <TableCell>{grade.appUsage}</TableCell>
                    <TableCell>{grade.contentUsage}</TableCell>
                    <TableCell className="font-semibold">{grade.totalUsage}</TableCell>
                    <TableCell />
                  </TableRow>

                  {expandedGrades.has(grade.grade) &&
                    grade.roles.map((role) => (
                      <TableRow key={`${grade.grade}-${role.name}`} className="bg-muted/20 hover:bg-muted/40">
                        <TableCell className="pl-12 text-muted-foreground">{role.name}</TableCell>
                        <TableCell>{role.users}</TableCell>
                        <TableCell>{role.appUsage}</TableCell>
                        <TableCell>{role.contentUsage}</TableCell>
                        <TableCell>{role.totalUsage}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => { e.stopPropagation(); handlePreview(grade.grade, role.name); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
