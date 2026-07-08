import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, School, TrendingUp } from "lucide-react";
import { TrendChip } from "@/components/TrendChip";
import { SectionInfoButton } from "@/components/SectionInfoButton";

interface SchoolContentData {
  schoolTitle: string;
  lessonPlan: number;
  learningResource: number;
  items: number;
  tests: number;
  ebook: number;
  assignments: number;
  prevTotal: number;
}

const schoolContentData: SchoolContentData[] = [
  { schoolTitle: "Riverside Academy", lessonPlan: 142, learningResource: 98, items: 620, tests: 74, ebook: 46, assignments: 88, prevTotal: 985 },
  { schoolTitle: "Lakeside High School", lessonPlan: 118, learningResource: 132, items: 510, tests: 62, ebook: 38, assignments: 71, prevTotal: 995 },
  { schoolTitle: "Mountain View School", lessonPlan: 176, learningResource: 108, items: 745, tests: 89, ebook: 52, assignments: 102, prevTotal: 1120 },
  { schoolTitle: "Sunrise International", lessonPlan: 94, learningResource: 76, items: 432, tests: 51, ebook: 29, assignments: 58, prevTotal: 785 },
  { schoolTitle: "Green Valley School", lessonPlan: 128, learningResource: 115, items: 588, tests: 68, ebook: 41, assignments: 79, prevTotal: 1035 },
];

const totalSchools = schoolContentData.length;
const totalCreated = schoolContentData.reduce(
  (sum, r) => sum + r.lessonPlan + r.learningResource + r.items + r.tests + r.ebook + r.assignments,
  0,
);

export const CustomContentCreation = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Custom Content Creation</CardTitle>
          <CardDescription>Content created by schools across different categories</CardDescription>
        </div>
        <SectionInfoButton description="Content created by schools across different categories including lesson plans, resources, items, tests, ebooks, and assignments." />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary widgets */}
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <School className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Total Schools Created</p>
                <p className="text-xl font-semibold tabular-nums">{totalSchools}</p>
                <p className="text-xs text-muted-foreground">across the network</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Total Content Created</p>
                <p className="text-xl font-semibold tabular-nums">{totalCreated.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">items this month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/15 text-chart-3">
                <School className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Avg / School</p>
                <p className="text-xl font-semibold tabular-nums">{Math.round(totalCreated / totalSchools).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">items per school</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[220px]">School Title</TableHead>
                <TableHead>Lesson Plan</TableHead>
                <TableHead>Learning Resource</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Ebook</TableHead>
                <TableHead>Assignments</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead className="w-[90px]">Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schoolContentData.map((row) => {
                const total =
                  row.lessonPlan + row.learningResource + row.items + row.tests + row.ebook + row.assignments;
                return (
                  <TableRow key={row.schoolTitle}>
                    <TableCell className="font-medium">{row.schoolTitle}</TableCell>
                    <TableCell className="tabular-nums">{row.lessonPlan}</TableCell>
                    <TableCell className="tabular-nums">{row.learningResource}</TableCell>
                    <TableCell className="tabular-nums">{row.items}</TableCell>
                    <TableCell className="tabular-nums">{row.tests}</TableCell>
                    <TableCell className="tabular-nums">{row.ebook}</TableCell>
                    <TableCell className="tabular-nums">{row.assignments}</TableCell>
                    <TableCell>
                      <TrendChip value={total} prev={row.prevTotal} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          navigate(`/custom-content-detail?school=${encodeURIComponent(row.schoolTitle)}`)
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
