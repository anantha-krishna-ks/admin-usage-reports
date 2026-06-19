import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, BookOpen, FileText, ClipboardList, GraduationCap, BookMarked } from "lucide-react";
import { TrendChip } from "@/components/TrendChip";
import { SectionInfoButton } from "@/components/SectionInfoButton";

const toNum = (s: string) => parseFloat(s.replace(/[^\d.]/g, "")) || 0;
const rowTotal = (r: { lessonPlan: string; learningResource: string; items: string; tests: string; ebook: string }) =>
  toNum(r.lessonPlan) + toNum(r.learningResource) + toNum(r.items) + toNum(r.tests) + toNum(r.ebook);
const prevOf = (val: number, seed: number) => {
  const delta = (((seed * 17) % 25) - 10) / 100;
  return val / (1 + delta);
};
const UsageCell = ({ val, total }: { val: string; total: number }) => {
  if (val === "NA" || total === 0) {
    return <span className="text-muted-foreground">{val}</span>;
  }
  const n = toNum(val);
  const pct = Math.round((n / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium tabular-nums">{val}</span>
      <span className="text-xs font-medium bg-muted text-foreground px-1.5 py-0.5 rounded-md tabular-nums border border-border/60">
        {pct}%
      </span>
    </div>
  );
};
 
 interface ContentUsageData {
   role: string;
   lessonPlan: string;
   learningResource: string;
   items: string;
   tests: string;
   ebook: string;
 }
 
 interface ClassBreakdownData {
   class: string;
   lessonPlan: string;
   learningResource: string;
   items: string;
   tests: string;
   ebook: string;
 }
 
interface StudentBreakdownData {
  studentName: string;
  lessonPlan: string;
  learningResource: string;
  items: string;
  tests: string;
  ebook: string;
}

const studentBreakdownByClass: Record<string, StudentBreakdownData[]> = {
  "Grade 8 - Section A": [
    { studentName: "John Smith", lessonPlan: "135", learningResource: "90", items: "45", tests: "80", ebook: "35" },
    { studentName: "Emma Johnson", lessonPlan: "105", learningResource: "130", items: "55", tests: "105", ebook: "40" },
    { studentName: "Michael Brown", lessonPlan: "150", learningResource: "75", items: "70", tests: "90", ebook: "50" },
  ],
  "Grade 9 - Section A": [
    { studentName: "Sarah Davis", lessonPlan: "200", learningResource: "165", items: "85", tests: "130", ebook: "65" },
    { studentName: "James Wilson", lessonPlan: "175", learningResource: "140", items: "75", tests: "115", ebook: "55" },
    { studentName: "Emily Taylor", lessonPlan: "190", learningResource: "155", items: "90", tests: "145", ebook: "75" },
  ],
  "Grade 9 - Section B": [
    { studentName: "Daniel Anderson", lessonPlan: "160", learningResource: "115", items: "80", tests: "105", ebook: "45" },
    { studentName: "Olivia Thomas", lessonPlan: "185", learningResource: "150", items: "95", tests: "140", ebook: "60" },
    { studentName: "William Jackson", lessonPlan: "145", learningResource: "130", items: "70", tests: "110", ebook: "55" },
  ],
  "Grade 10 - Section A": [
    { studentName: "Sophia White", lessonPlan: "170", learningResource: "100", items: "60", tests: "95", ebook: "40" },
    { studentName: "Alexander Harris", lessonPlan: "195", learningResource: "145", items: "85", tests: "125", ebook: "70" },
    { studentName: "Isabella Martin", lessonPlan: "155", learningResource: "120", items: "75", tests: "110", ebook: "50" },
  ],
  "Grade 11 - Section A": [
    { studentName: "Benjamin Garcia", lessonPlan: "90", learningResource: "70", items: "35", tests: "75", ebook: "30" },
    { studentName: "Mia Rodriguez", lessonPlan: "105", learningResource: "95", items: "50", tests: "90", ebook: "40" },
    { studentName: "Ethan Martinez", lessonPlan: "85", learningResource: "80", items: "45", tests: "85", ebook: "35" },
  ],
};

 const classBreakdownByRole: Record<string, ClassBreakdownData[]> = {
   Teacher: [
     { class: "Grade 8 - Section A", lessonPlan: "495", learningResource: "330", items: "200", tests: "285", ebook: "130" },
     { class: "Grade 9 - Section A", lessonPlan: "765", learningResource: "500", items: "255", tests: "390", ebook: "205" },
     { class: "Grade 9 - Section B", lessonPlan: "630", learningResource: "465", items: "310", tests: "435", ebook: "165" },
     { class: "Grade 10 - Section A", lessonPlan: "560", learningResource: "385", items: "230", tests: "340", ebook: "135" },
     { class: "Grade 11 - Section A", lessonPlan: "280", learningResource: "255", items: "130", tests: "250", ebook: "95" },
   ],
   Student: [
     { class: "Grade 8 - Section A", lessonPlan: "NA", learningResource: "1695", items: "990", tests: "1365", ebook: "740" },
     { class: "Grade 9 - Section A", lessonPlan: "NA", learningResource: "2140", items: "1165", tests: "1690", ebook: "935" },
     { class: "Grade 9 - Section B", lessonPlan: "NA", learningResource: "1940", items: "1095", tests: "1530", ebook: "825" },
     { class: "Grade 10 - Section A", lessonPlan: "NA", learningResource: "2305", items: "1295", tests: "1815", ebook: "985" },
     { class: "Grade 11 - Section A", lessonPlan: "NA", learningResource: "1320", items: "820", tests: "1090", ebook: "570" },
   ],
    Parent: [
     { class: "Grade 8 - Section A", lessonPlan: "NA", learningResource: "270", items: "105", tests: "170", ebook: "220" },
     { class: "Grade 9 - Section A", lessonPlan: "NA", learningResource: "345", items: "130", tests: "215", ebook: "265" },
     { class: "Grade 9 - Section B", lessonPlan: "NA", learningResource: "315", items: "115", tests: "200", ebook: "250" },
     { class: "Grade 10 - Section A", lessonPlan: "NA", learningResource: "300", items: "100", tests: "205", ebook: "245" },
     { class: "Grade 11 - Section A", lessonPlan: "NA", learningResource: "225", items: "60", tests: "155", ebook: "180" },
   ],
 };
 
 const contentUsageData: ContentUsageData[] = [
   {
     role: "Teacher",
     lessonPlan: "2730",
     learningResource: "1935",
     items: "1125",
     tests: "1700",
     ebook: "730",
   },
   {
     role: "Student",
     lessonPlan: "NA",
     learningResource: "9400",
     items: "5365",
     tests: "7490",
     ebook: "4055",
   },
    {
      role: "OTHER USERS",
      lessonPlan: "NA",
      learningResource: "1455",
      items: "510",
      tests: "945",
      ebook: "1160",
    },
 ];
 
export const ContentUsageTable = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const navigate = useNavigate();
 
   return (
     <>
       <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle>Content Usage</CardTitle>
                <Badge variant="secondary" className="text-xs font-medium h-6 px-2.5 tracking-wide">
                  mins
                </Badge>
              </div>
              <CardDescription>Usage metrics by role across different content types</CardDescription>
            </div>
            <SectionInfoButton description="Usage metrics by role across different content types including lesson plans, resources, items, tests, and ebooks." />
          </CardHeader>
         <CardContent>
           <div className="rounded-md border">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead className="w-[150px]">Role</TableHead>
                    <TableHead>Lesson Plan</TableHead>
                    <TableHead>Learning Resource</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Tests</TableHead>
                     <TableHead>Ebook</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead className="w-[100px]">Preview</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                  {contentUsageData.map((row, ri) => {
                    const total = rowTotal(row);
                    return (
                    <TableRow key={row.role}>
                      <TableCell>
                        <Badge variant="secondary">{row.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <UsageCell val={row.lessonPlan} total={total} />
                      </TableCell>
                      <TableCell><UsageCell val={row.learningResource} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.items} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.tests} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.ebook} total={total} /></TableCell>
                      <TableCell>
                        <TrendChip value={total} prev={prevOf(total, ri + 1)} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => navigate(`/content-usage-detail?role=${encodeURIComponent(row.role)}`)}
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
 
        <Dialog open={!!selectedRole && !selectedClass} onOpenChange={(open) => !open && setSelectedRole(null)}>
         <DialogContent className="max-w-4xl max-h-[85vh]">
           <DialogHeader>
             <DialogTitle className="text-xl font-semibold">
               {selectedRole} - Class-wise Content Usage
             </DialogTitle>
             <DialogDescription>
               Detailed breakdown of content usage across classes
             </DialogDescription>
           </DialogHeader>
           <ScrollArea className="h-[50vh] pr-4">
             <Table>
               <TableHeader>
                 <TableRow className="bg-muted/50">
                   <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="font-semibold">Lesson Plan</TableHead>
                    <TableHead className="font-semibold">Learning Resource</TableHead>
                    <TableHead className="font-semibold">Items</TableHead>
                    <TableHead className="font-semibold">Tests</TableHead>
                     <TableHead className="font-semibold">Ebook</TableHead>
                     <TableHead className="font-semibold">Trend</TableHead>
                     {selectedRole === "Teacher" && (
                       <TableHead className="font-semibold w-[100px]">Preview</TableHead>
                     )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRole && classBreakdownByRole[selectedRole]?.map((row, ri) => {
                    const total = rowTotal(row);
                    return (
                    <TableRow key={row.class} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{row.class}</TableCell>
                      <TableCell>
                        <UsageCell val={row.lessonPlan} total={total} />
                      </TableCell>
                      <TableCell><UsageCell val={row.learningResource} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.items} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.tests} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.ebook} total={total} /></TableCell>
                      <TableCell>
                        <TrendChip value={total} prev={prevOf(total, ri + 3)} />
                      </TableCell>
                       {selectedRole === "Teacher" && (
                         <TableCell>
                           <Button
                             variant="ghost"
                             size="sm"
                             className="h-8 w-8 p-0"
                             onClick={() => setSelectedClass(row.class)}
                           >
                             <Eye className="h-4 w-4" />
                           </Button>
                         </TableCell>
                       )}
                    </TableRow>
                    );
                  })}
               </TableBody>
             </Table>
           </ScrollArea>
         </DialogContent>
       </Dialog>

        <Dialog open={!!selectedClass} onOpenChange={(open) => !open && setSelectedClass(null)}>
          <DialogContent className="max-w-5xl max-h-[85vh]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {selectedClass} - Student-wise Content Usage
              </DialogTitle>
              <DialogDescription>
                Detailed breakdown of content usage by individual students
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[50vh] pr-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Student Name</TableHead>
                     <TableHead className="font-semibold">Lesson Plan</TableHead>
                     <TableHead className="font-semibold">Learning Resource</TableHead>
                     <TableHead className="font-semibold">Items</TableHead>
                     <TableHead className="font-semibold">Tests</TableHead>
                     <TableHead className="font-semibold">Ebook</TableHead>
                     <TableHead className="font-semibold">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedClass && studentBreakdownByClass[selectedClass]?.map((row, ri) => {
                    const total = rowTotal(row);
                    return (
                    <TableRow key={row.studentName} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{row.studentName}</TableCell>
                      <TableCell><UsageCell val={row.lessonPlan} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.learningResource} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.items} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.tests} total={total} /></TableCell>
                      <TableCell><UsageCell val={row.ebook} total={total} /></TableCell>
                      <TableCell>
                        <TrendChip value={total} prev={prevOf(total, ri + 5)} />
                      </TableCell>
                    </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </DialogContent>
        </Dialog>
     </>
   );
 };
