import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionData {
  section: string;
  grade: string;
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

const sectionsData: SectionData[] = [
  {
    section: "Grade 8 - Section A",
    grade: "Grade 8",
    totalUsers: 86,
    appUsage: "288.74",
    contentUsage: "518.252",
    totalUsage: "806.992",
  },
  {
    section: "Grade 9 - Section A",
    grade: "Grade 9",
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
  {
    section: "Grade 9 - Section B",
    grade: "Grade 9",
    totalUsers: 79,
    appUsage: "259.591",
    contentUsage: "495.967",
    totalUsage: "755.558",
  },
  {
    section: "Grade 10 - Section A",
    grade: "Grade 10",
    totalUsers: 65,
    appUsage: "387.598",
    contentUsage: "618.939",
    totalUsage: "1,006.537",
  },
  {
    section: "Grade 11 - Section A",
    grade: "Grade 11",
    totalUsers: 83,
    appUsage: "428.392",
    contentUsage: "391.384",
    totalUsage: "819.776",
  },
];

export const SectionDrillDown = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section-wise Drill Down</CardTitle>
        <CardDescription>Detailed usage metrics for each section within the school</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Section</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Total Users</TableHead>
                <TableHead className="text-right">App Usage (hrs)</TableHead>
                <TableHead className="text-right">Content Usage (hrs)</TableHead>
                <TableHead className="text-right">Total Usage (hrs)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectionsData.map((section) => (
                <>
                  <TableRow key={section.section} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {section.subSections && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleSection(section.section)}
                          >
                            {expandedSections.has(section.section) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        {section.section}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{section.grade}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{section.totalUsers}</TableCell>
                    <TableCell className="text-right">{section.appUsage}</TableCell>
                    <TableCell className="text-right">{section.contentUsage}</TableCell>
                    <TableCell className="text-right font-semibold">{section.totalUsage}</TableCell>
                  </TableRow>
                  {section.subSections &&
                    expandedSections.has(section.section) &&
                    section.subSections.map((sub) => (
                      <TableRow key={`${section.section}-${sub.name}`} className="bg-muted/30">
                        <TableCell className="pl-16 text-muted-foreground">{sub.name}</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">{sub.users}</TableCell>
                        <TableCell className="text-right">{sub.appUsage}</TableCell>
                        <TableCell className="text-right">{sub.contentUsage}</TableCell>
                        <TableCell className="text-right">{sub.totalUsage}</TableCell>
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
