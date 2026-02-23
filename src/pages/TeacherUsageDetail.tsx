import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TeacherRow {
  name: string;
  appUsage: string;
  contentUsage: string;
  totalUsage: string;
}

const teacherDataByGrade: Record<string, TeacherRow[]> = {
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

export default function TeacherUsageDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const grade = searchParams.get("grade") || "Grade 8";

  const teachers = teacherDataByGrade[grade] || teacherDataByGrade["Grade 8"];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Teacher Usage Details — {grade}</h1>
            <p className="text-sm text-muted-foreground">Individual teacher usage breakdown</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card className="shadow-sm">
          <CardContent className="px-0 pb-0 pt-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="pl-6 font-semibold">Teacher Name</TableHead>
                  <TableHead className="text-right font-semibold">App Usage (hrs)</TableHead>
                  <TableHead className="text-right font-semibold">Content Usage (hrs)</TableHead>
                  <TableHead className="text-right pr-6 font-semibold">Total Usage (hrs)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((t, i) => (
                  <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="pl-6 font-medium">{t.name}</TableCell>
                    <TableCell className="text-right">{t.appUsage}</TableCell>
                    <TableCell className="text-right">{t.contentUsage}</TableCell>
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
      </div>
    </div>
  );
}
