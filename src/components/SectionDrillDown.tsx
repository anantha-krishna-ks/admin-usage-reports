import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionEntry {
  name: string;
  totalUsers: number;
  appUsage: string;
  contentUsage: string;
  totalUsage: string;
  subSections?: {
    name: string;
    users: number;
    appUsage: string;
    contentUsage: string;
    totalUsage: string;
  }[];
}

interface GradeData {
  grade: string;
  totalUsers: number;
  appUsage: string;
  contentUsage: string;
  totalUsage: string;
  sections: SectionEntry[];
}

const gradesData: GradeData[] = [
  {
    grade: "Grade 8",
    totalUsers: 86,
    appUsage: "288.74",
    contentUsage: "518.252",
    totalUsage: "806.992",
    sections: [
      { name: "Section A", totalUsers: 86, appUsage: "288.74", contentUsage: "518.252", totalUsage: "806.992" },
    ],
  },
  {
    grade: "Grade 9",
    totalUsers: 157,
    appUsage: "536.241",
    contentUsage: "963.696",
    totalUsage: "1,499.937",
    sections: [
      {
        name: "Section A",
        totalUsers: 78,
        appUsage: "276.65",
        contentUsage: "467.729",
        totalUsage: "744.379",
        subSections: [
          { name: "Teachers", users: 4, appUsage: "41.539", contentUsage: "104.678", totalUsage: "146.217" },
          { name: "Students", users: 54, appUsage: "206.864", contentUsage: "309.881", totalUsage: "516.745" },
          { name: "Parents", users: 20, appUsage: "28.247", contentUsage: "53.17", totalUsage: "81.416" },
        ],
      },
      { name: "Section B", totalUsers: 79, appUsage: "259.591", contentUsage: "495.967", totalUsage: "755.558" },
    ],
  },
  {
    grade: "Grade 10",
    totalUsers: 65,
    appUsage: "387.598",
    contentUsage: "618.939",
    totalUsage: "1,006.537",
    sections: [
      { name: "Section A", totalUsers: 65, appUsage: "387.598", contentUsage: "618.939", totalUsage: "1,006.537" },
    ],
  },
  {
    grade: "Grade 11",
    totalUsers: 83,
    appUsage: "428.392",
    contentUsage: "391.384",
    totalUsage: "819.776",
    sections: [
      { name: "Section A", totalUsers: 83, appUsage: "428.392", contentUsage: "391.384", totalUsage: "819.776" },
    ],
  },
];

export const SectionDrillDown = () => {
  const [expandedGrades, setExpandedGrades] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleGrade = (grade: string) => {
    const next = new Set(expandedGrades);
    if (next.has(grade)) {
      next.delete(grade);
    } else {
      next.add(grade);
    }
    setExpandedGrades(next);
  };

  const toggleSection = (key: string) => {
    const next = new Set(expandedSections);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setExpandedSections(next);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section-wise Drill Down</CardTitle>
        <CardDescription>Detailed usage metrics for each grade and section within the school</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Grade</TableHead>
                <TableHead>Total Users</TableHead>
                <TableHead>App Usage (hrs)</TableHead>
                <TableHead>Content Usage (hrs)</TableHead>
                <TableHead>Total Usage (hrs)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradesData.map((grade) => (
                <>
                  <TableRow key={grade.grade} className="cursor-pointer hover:bg-muted/50" onClick={() => toggleGrade(grade.grade)}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          {expandedGrades.has(grade.grade) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        {grade.grade}
                      </div>
                    </TableCell>
                    <TableCell>{grade.totalUsers}</TableCell>
                    <TableCell>{grade.appUsage}</TableCell>
                    <TableCell>{grade.contentUsage}</TableCell>
                    <TableCell className="font-semibold">{grade.totalUsage}</TableCell>
                  </TableRow>

                  {expandedGrades.has(grade.grade) &&
                    grade.sections.map((section) => {
                      const sectionKey = `${grade.grade}-${section.name}`;
                      return (
                        <>
                          <TableRow key={sectionKey} className="bg-muted/20 cursor-pointer hover:bg-muted/40" onClick={() => section.subSections && toggleSection(sectionKey)}>
                            <TableCell className="pl-12">
                              <div className="flex items-center gap-2">
                                {section.subSections && (
                                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                    {expandedSections.has(sectionKey) ? (
                                      <ChevronDown className="h-3 w-3" />
                                    ) : (
                                      <ChevronRight className="h-3 w-3" />
                                    )}
                                  </Button>
                                )}
                                {section.name}
                              </div>
                            </TableCell>
                            <TableCell>{section.totalUsers}</TableCell>
                            <TableCell>{section.appUsage}</TableCell>
                            <TableCell>{section.contentUsage}</TableCell>
                            <TableCell>{section.totalUsage}</TableCell>
                          </TableRow>

                          {section.subSections &&
                            expandedSections.has(sectionKey) &&
                            section.subSections.map((sub) => (
                              <TableRow key={`${sectionKey}-${sub.name}`} className="bg-muted/40">
                                <TableCell className="pl-20 text-muted-foreground">{sub.name}</TableCell>
                                <TableCell>{sub.users}</TableCell>
                                <TableCell>{sub.appUsage}</TableCell>
                                <TableCell>{sub.contentUsage}</TableCell>
                                <TableCell>{sub.totalUsage}</TableCell>
                              </TableRow>
                            ))}
                        </>
                      );
                    })}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
