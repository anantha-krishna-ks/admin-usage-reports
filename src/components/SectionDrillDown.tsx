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

interface UserDetailData {
  userName: string;
  role: string;
  appUsage: string;
  contentUsage: string;
  totalUsage: string;
  lastActive: string;
}

const userDetailsBySection: Record<string, UserDetailData[]> = {
  "Grade 8-Section A": [
    { userName: "Mr. Robert Clark", role: "Teacher", appUsage: "12.5", contentUsage: "28.3", totalUsage: "40.8", lastActive: "2 hours ago" },
    { userName: "Alice Thompson", role: "Student", appUsage: "8.2", contentUsage: "14.6", totalUsage: "22.8", lastActive: "1 hour ago" },
    { userName: "Brian Lee", role: "Student", appUsage: "6.7", contentUsage: "11.2", totalUsage: "17.9", lastActive: "3 hours ago" },
    { userName: "Mrs. Thompson", role: "Parent", appUsage: "2.1", contentUsage: "4.5", totalUsage: "6.6", lastActive: "1 day ago" },
    { userName: "David Kim", role: "Student", appUsage: "9.4", contentUsage: "15.8", totalUsage: "25.2", lastActive: "30 min ago" },
  ],
  "Grade 9-Section A": [
    { userName: "Ms. Sarah Mitchell", role: "Teacher", appUsage: "15.3", contentUsage: "35.2", totalUsage: "50.5", lastActive: "1 hour ago" },
    { userName: "Emma Davis", role: "Student", appUsage: "10.1", contentUsage: "18.4", totalUsage: "28.5", lastActive: "2 hours ago" },
    { userName: "Frank Wilson", role: "Student", appUsage: "7.8", contentUsage: "12.9", totalUsage: "20.7", lastActive: "45 min ago" },
    { userName: "Mr. Davis", role: "Parent", appUsage: "3.2", contentUsage: "5.8", totalUsage: "9.0", lastActive: "5 hours ago" },
    { userName: "Grace Chen", role: "Student", appUsage: "11.5", contentUsage: "19.7", totalUsage: "31.2", lastActive: "20 min ago" },
  ],
  "Grade 9-Section B": [
    { userName: "Mr. James Brown", role: "Teacher", appUsage: "13.8", contentUsage: "30.1", totalUsage: "43.9", lastActive: "3 hours ago" },
    { userName: "Hannah Moore", role: "Student", appUsage: "9.6", contentUsage: "16.3", totalUsage: "25.9", lastActive: "1 hour ago" },
    { userName: "Ian Taylor", role: "Student", appUsage: "8.4", contentUsage: "13.7", totalUsage: "22.1", lastActive: "2 hours ago" },
    { userName: "Mrs. Moore", role: "Parent", appUsage: "2.8", contentUsage: "5.1", totalUsage: "7.9", lastActive: "1 day ago" },
  ],
  "Grade 10-Section A": [
    { userName: "Dr. Patricia Adams", role: "Teacher", appUsage: "18.2", contentUsage: "40.5", totalUsage: "58.7", lastActive: "30 min ago" },
    { userName: "Jack Robinson", role: "Student", appUsage: "12.3", contentUsage: "20.8", totalUsage: "33.1", lastActive: "1 hour ago" },
    { userName: "Katie Harris", role: "Student", appUsage: "10.7", contentUsage: "17.4", totalUsage: "28.1", lastActive: "4 hours ago" },
    { userName: "Mr. Robinson", role: "Parent", appUsage: "3.5", contentUsage: "6.2", totalUsage: "9.7", lastActive: "6 hours ago" },
  ],
  "Grade 11-Section A": [
    { userName: "Mrs. Linda Scott", role: "Teacher", appUsage: "16.9", contentUsage: "25.3", totalUsage: "42.2", lastActive: "2 hours ago" },
    { userName: "Leo Martinez", role: "Student", appUsage: "14.1", contentUsage: "12.8", totalUsage: "26.9", lastActive: "1 hour ago" },
    { userName: "Mia Johnson", role: "Student", appUsage: "11.6", contentUsage: "10.5", totalUsage: "22.1", lastActive: "3 hours ago" },
    { userName: "Mr. Martinez", role: "Parent", appUsage: "2.4", contentUsage: "3.9", totalUsage: "6.3", lastActive: "1 day ago" },
  ],
};

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

export const SectionDrillDown = ({ dateRange }: SectionDrillDownProps) => {
  const [expandedGrades, setExpandedGrades] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleGrade = (grade: string) => {
    const next = new Set(expandedGrades);
    if (next.has(grade)) next.delete(grade); else next.add(grade);
    setExpandedGrades(next);
  };

  const toggleSection = (key: string) => {
    const next = new Set(expandedSections);
    if (next.has(key)) next.delete(key); else next.add(key);
    setExpandedSections(next);
  };

  const handlePreview = (grade: string, section: string) => {
    const params = new URLSearchParams({ grade, section });
    if (dateRange?.from) params.set("from", dateRange.from.toISOString());
    if (dateRange?.to) params.set("to", dateRange.to.toISOString());
    navigate(`/section-detail?${params.toString()}`);
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
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => { e.stopPropagation(); handlePreview(grade.grade, grade.sections[0]?.name || ""); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
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
                                    {expandedSections.has(sectionKey) ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                                  </Button>
                                )}
                                {section.name}
                              </div>
                            </TableCell>
                            <TableCell>{section.totalUsers}</TableCell>
                            <TableCell>{section.appUsage}</TableCell>
                            <TableCell>{section.contentUsage}</TableCell>
                            <TableCell>{section.totalUsage}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => { e.stopPropagation(); handlePreview(grade.grade, section.name); }}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
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
                                <TableCell />
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
