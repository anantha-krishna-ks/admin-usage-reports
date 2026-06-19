import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { SectionInfoButton } from "@/components/SectionInfoButton";

interface TeacherContentData {
  teacherName: string;
  lessonPlans: number;
  learningResources: number;
  questions: number;
  tests: number;
  assignments: number;
}

const teacherContentData: TeacherContentData[] = [
  { teacherName: "Ms. Sarah Johnson", lessonPlans: 24, learningResources: 18, questions: 156, tests: 12, assignments: 14 },
  { teacherName: "Mr. David Williams", lessonPlans: 19, learningResources: 22, questions: 132, tests: 9, assignments: 10 },
  { teacherName: "Ms. Emily Davis", lessonPlans: 31, learningResources: 15, questions: 198, tests: 15, assignments: 17 },
  { teacherName: "Mr. Robert Brown", lessonPlans: 16, learningResources: 27, questions: 112, tests: 8, assignments: 7 },
  { teacherName: "Ms. Jennifer Miller", lessonPlans: 22, learningResources: 20, questions: 175, tests: 11, assignments: 13 },
];

export const CustomContentCreation = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Content Creation</CardTitle>
        <CardDescription>Content created by teachers across different categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Teacher Name</TableHead>
                <TableHead>Lesson Plans</TableHead>
                <TableHead>Learning Resources</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Assignments</TableHead>
                <TableHead className="w-[100px]">Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherContentData.map((row) => (
                <TableRow key={row.teacherName}>
                  <TableCell className="font-medium">{row.teacherName}</TableCell>
                  <TableCell>{row.lessonPlans}</TableCell>
                  <TableCell>{row.learningResources}</TableCell>
                  <TableCell>{row.questions}</TableCell>
                  <TableCell>{row.tests}</TableCell>
                  <TableCell>{row.assignments}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => navigate(`/custom-content-detail?teacher=${encodeURIComponent(row.teacherName)}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
