import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClassSubjectData {
  classSubject: string;
  lessonPlans: number;
  learningResources: number;
  questions: number;
  tests: number;
  lbq: number;
}

const teacherContentDetail: Record<string, ClassSubjectData[]> = {
  "Ms. Sarah Johnson": [
    { classSubject: "Grade 8 - Mathematics", lessonPlans: 8, learningResources: 5, questions: 42, tests: 3, lbq: 6 },
    { classSubject: "Grade 9 - Mathematics", lessonPlans: 10, learningResources: 7, questions: 58, tests: 5, lbq: 8 },
    { classSubject: "Grade 10 - Mathematics", lessonPlans: 6, learningResources: 6, questions: 56, tests: 4, lbq: 5 },
  ],
  "Mr. David Williams": [
    { classSubject: "Grade 8 - Science", lessonPlans: 7, learningResources: 9, questions: 38, tests: 3, lbq: 4 },
    { classSubject: "Grade 9 - Science", lessonPlans: 6, learningResources: 8, questions: 52, tests: 3, lbq: 7 },
    { classSubject: "Grade 11 - Science", lessonPlans: 6, learningResources: 5, questions: 42, tests: 3, lbq: 5 },
  ],
  "Ms. Emily Davis": [
    { classSubject: "Grade 8 - English", lessonPlans: 11, learningResources: 4, questions: 65, tests: 5, lbq: 9 },
    { classSubject: "Grade 9 - English", lessonPlans: 9, learningResources: 6, questions: 72, tests: 5, lbq: 7 },
    { classSubject: "Grade 10 - English", lessonPlans: 11, learningResources: 5, questions: 61, tests: 5, lbq: 8 },
  ],
  "Mr. Robert Brown": [
    { classSubject: "Grade 9 - History", lessonPlans: 5, learningResources: 10, questions: 35, tests: 2, lbq: 3 },
    { classSubject: "Grade 10 - History", lessonPlans: 6, learningResources: 9, questions: 40, tests: 3, lbq: 4 },
    { classSubject: "Grade 11 - History", lessonPlans: 5, learningResources: 8, questions: 37, tests: 3, lbq: 3 },
  ],
  "Ms. Jennifer Miller": [
    { classSubject: "Grade 8 - Geography", lessonPlans: 8, learningResources: 7, questions: 55, tests: 4, lbq: 6 },
    { classSubject: "Grade 9 - Geography", lessonPlans: 7, learningResources: 6, questions: 62, tests: 3, lbq: 5 },
    { classSubject: "Grade 10 - Geography", lessonPlans: 7, learningResources: 7, questions: 58, tests: 4, lbq: 7 },
  ],
};

const CustomContentDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const teacherName = searchParams.get("teacher") || "";
  const data = teacherContentDetail[teacherName] || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{teacherName}</h1>
            <p className="text-muted-foreground mt-1">Custom content creation details by class & subject</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Created</CardTitle>
            <CardDescription>Breakdown by class & subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Class & Subject</TableHead>
                    <TableHead>Lesson Plans</TableHead>
                    <TableHead>Learning Resources</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Tests</TableHead>
                    <TableHead>LBQ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.classSubject}>
                      <TableCell className="font-medium">{row.classSubject}</TableCell>
                      <TableCell>{row.lessonPlans}</TableCell>
                      <TableCell>{row.learningResources}</TableCell>
                      <TableCell>{row.questions}</TableCell>
                      <TableCell>{row.tests}</TableCell>
                      <TableCell>{row.lbq}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomContentDetail;
