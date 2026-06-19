import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ChapterBreakdown {
  chapter: string;
  lessonPlans: number;
  learningResources: number;
  questions: number;
  tests: number;
  lbq: number;
  assignments: number;
}

interface ClassSubjectData {
  classSubject: string;
  lessonPlans: number;
  learningResources: number;
  questions: number;
  tests: number;
  lbq: number;
  assignments: number;
  chapters: ChapterBreakdown[];
}

const makeChapters = (base: Omit<ClassSubjectData, "chapters" | "classSubject">): ChapterBreakdown[] => {
  const titles = ["Chapter 1: Foundations", "Chapter 2: Core Concepts", "Chapter 3: Applications", "Chapter 4: Advanced Topics"];
  const split = (n: number, i: number, total: number) => {
    const base = Math.floor(n / total);
    const rem = n % total;
    return base + (i < rem ? 1 : 0);
  };
  return titles.map((chapter, i) => ({
    chapter,
    lessonPlans: split(base.lessonPlans, i, titles.length),
    learningResources: split(base.learningResources, i, titles.length),
    questions: split(base.questions, i, titles.length),
    tests: split(base.tests, i, titles.length),
    lbq: split(base.lbq, i, titles.length),
    assignments: split(base.assignments, i, titles.length),
  }));
};

const withChapters = (rows: Omit<ClassSubjectData, "chapters">[]): ClassSubjectData[] =>
  rows.map((r) => ({ ...r, chapters: makeChapters(r) }));

const teacherContentDetail: Record<string, ClassSubjectData[]> = {
  "Ms. Sarah Johnson": withChapters([
    { classSubject: "Grade 8 - Mathematics", lessonPlans: 8, learningResources: 5, questions: 42, tests: 3, lbq: 6, assignments: 4 },
    { classSubject: "Grade 9 - Mathematics", lessonPlans: 10, learningResources: 7, questions: 58, tests: 5, lbq: 8, assignments: 6 },
    { classSubject: "Grade 10 - Mathematics", lessonPlans: 6, learningResources: 6, questions: 56, tests: 4, lbq: 5, assignments: 4 },
  ]),
  "Mr. David Williams": withChapters([
    { classSubject: "Grade 8 - Science", lessonPlans: 7, learningResources: 9, questions: 38, tests: 3, lbq: 4, assignments: 3 },
    { classSubject: "Grade 9 - Science", lessonPlans: 6, learningResources: 8, questions: 52, tests: 3, lbq: 7, assignments: 4 },
    { classSubject: "Grade 11 - Science", lessonPlans: 6, learningResources: 5, questions: 42, tests: 3, lbq: 5, assignments: 3 },
  ]),
  "Ms. Emily Davis": withChapters([
    { classSubject: "Grade 8 - English", lessonPlans: 11, learningResources: 4, questions: 65, tests: 5, lbq: 9, assignments: 6 },
    { classSubject: "Grade 9 - English", lessonPlans: 9, learningResources: 6, questions: 72, tests: 5, lbq: 7, assignments: 5 },
    { classSubject: "Grade 10 - English", lessonPlans: 11, learningResources: 5, questions: 61, tests: 5, lbq: 8, assignments: 6 },
  ]),
  "Mr. Robert Brown": withChapters([
    { classSubject: "Grade 9 - History", lessonPlans: 5, learningResources: 10, questions: 35, tests: 2, lbq: 3, assignments: 2 },
    { classSubject: "Grade 10 - History", lessonPlans: 6, learningResources: 9, questions: 40, tests: 3, lbq: 4, assignments: 3 },
    { classSubject: "Grade 11 - History", lessonPlans: 5, learningResources: 8, questions: 37, tests: 3, lbq: 3, assignments: 2 },
  ]),
  "Ms. Jennifer Miller": withChapters([
    { classSubject: "Grade 8 - Geography", lessonPlans: 8, learningResources: 7, questions: 55, tests: 4, lbq: 6, assignments: 5 },
    { classSubject: "Grade 9 - Geography", lessonPlans: 7, learningResources: 6, questions: 62, tests: 3, lbq: 5, assignments: 4 },
    { classSubject: "Grade 10 - Geography", lessonPlans: 7, learningResources: 7, questions: 58, tests: 4, lbq: 7, assignments: 4 },
  ]),
};

const CustomContentDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const teacherName = searchParams.get("teacher") || "";
  const data = teacherContentDetail[teacherName] || [];
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{teacherName}</h1>
              <p className="text-sm text-muted-foreground">
                Custom content creation details by class &amp; subject
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Created</CardTitle>
            <CardDescription>Click a class &amp; subject row to view chapter-wise breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[280px]">Class &amp; Subject</TableHead>
                    <TableHead>Lesson Plans</TableHead>
                    <TableHead>Learning Resources</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Tests</TableHead>
                    <TableHead>LBQ</TableHead>
                    <TableHead>Assignments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => {
                    const isOpen = !!expanded[row.classSubject];
                    return (
                      <React.Fragment key={row.classSubject}>
                        <TableRow
                          className="cursor-pointer"
                          onClick={() => toggle(row.classSubject)}
                          data-state={isOpen ? "selected" : undefined}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 text-muted-foreground transition-transform",
                                  isOpen && "rotate-90",
                                )}
                              />
                              {row.classSubject}
                            </div>
                          </TableCell>
                          <TableCell>{row.lessonPlans}</TableCell>
                          <TableCell>{row.learningResources}</TableCell>
                          <TableCell>{row.questions}</TableCell>
                          <TableCell>{row.tests}</TableCell>
                          <TableCell>{row.lbq}</TableCell>
                          <TableCell>{row.assignments}</TableCell>
                        </TableRow>
                        {isOpen && (
                          <TableRow key={`${row.classSubject}-expanded`} className="hover:bg-transparent bg-muted/20">
                            <TableCell colSpan={7} className="p-0">
                              <div className="px-6 py-4 animate-fade-in">
                                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
                                  Chapter-wise breakdown
                                </div>
                                <div className="rounded-md border bg-background">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-[280px]">Chapter</TableHead>
                                        <TableHead>Lesson Plans</TableHead>
                                        <TableHead>Learning Resources</TableHead>
                                        <TableHead>Questions</TableHead>
                                        <TableHead>Tests</TableHead>
                                        <TableHead>LBQ</TableHead>
                                        <TableHead>Assignments</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {row.chapters.map((ch) => (
                                        <TableRow key={ch.chapter}>
                                          <TableCell className="font-medium">{ch.chapter}</TableCell>
                                          <TableCell>{ch.lessonPlans}</TableCell>
                                          <TableCell>{ch.learningResources}</TableCell>
                                          <TableCell>{ch.questions}</TableCell>
                                          <TableCell>{ch.tests}</TableCell>
                                          <TableCell>{ch.lbq}</TableCell>
                                          <TableCell>{ch.assignments}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
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
