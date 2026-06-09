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

const toNum = (s: string) => parseFloat(s.replace(/[^\d.]/g, "")) || 0;
const rowTotal = (r: { lessonPlan: string; learningResource: string; items: string; tests: string; ebook: string }) =>
  toNum(r.lessonPlan) + toNum(r.learningResource) + toNum(r.items) + toNum(r.tests) + toNum(r.ebook);
const prevOf = (val: number, seed: number) => {
  const delta = (((seed * 17) % 25) - 10) / 100;
  return val / (1 + delta);
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
    { studentName: "John Smith", lessonPlan: "135m", learningResource: "90m", items: "45m", tests: "80m", ebook: "35m" },
    { studentName: "Emma Johnson", lessonPlan: "105m", learningResource: "130m", items: "55m", tests: "105m", ebook: "40m" },
    { studentName: "Michael Brown", lessonPlan: "150m", learningResource: "75m", items: "70m", tests: "90m", ebook: "50m" },
  ],
  "Grade 9 - Section A": [
    { studentName: "Sarah Davis", lessonPlan: "200m", learningResource: "165m", items: "85m", tests: "130m", ebook: "65m" },
    { studentName: "James Wilson", lessonPlan: "175m", learningResource: "140m", items: "75m", tests: "115m", ebook: "55m" },
    { studentName: "Emily Taylor", lessonPlan: "190m", learningResource: "155m", items: "90m", tests: "145m", ebook: "75m" },
  ],
  "Grade 9 - Section B": [
    { studentName: "Daniel Anderson", lessonPlan: "160m", learningResource: "115m", items: "80m", tests: "105m", ebook: "45m" },
    { studentName: "Olivia Thomas", lessonPlan: "185m", learningResource: "150m", items: "95m", tests: "140m", ebook: "60m" },
    { studentName: "William Jackson", lessonPlan: "145m", learningResource: "130m", items: "70m", tests: "110m", ebook: "55m" },
  ],
  "Grade 10 - Section A": [
    { studentName: "Sophia White", lessonPlan: "170m", learningResource: "100m", items: "60m", tests: "95m", ebook: "40m" },
    { studentName: "Alexander Harris", lessonPlan: "195m", learningResource: "145m", items: "85m", tests: "125m", ebook: "70m" },
    { studentName: "Isabella Martin", lessonPlan: "155m", learningResource: "120m", items: "75m", tests: "110m", ebook: "50m" },
  ],
  "Grade 11 - Section A": [
    { studentName: "Benjamin Garcia", lessonPlan: "90m", learningResource: "70m", items: "35m", tests: "75m", ebook: "30m" },
    { studentName: "Mia Rodriguez", lessonPlan: "105m", learningResource: "95m", items: "50m", tests: "90m", ebook: "40m" },
    { studentName: "Ethan Martinez", lessonPlan: "85m", learningResource: "80m", items: "45m", tests: "85m", ebook: "35m" },
  ],
};

 const classBreakdownByRole: Record<string, ClassBreakdownData[]> = {
   Teacher: [
     { class: "Grade 8 - Section A", lessonPlan: "495m", learningResource: "330m", items: "200m", tests: "285m", ebook: "130m" },
     { class: "Grade 9 - Section A", lessonPlan: "765m", learningResource: "500m", items: "255m", tests: "390m", ebook: "205m" },
     { class: "Grade 9 - Section B", lessonPlan: "630m", learningResource: "465m", items: "310m", tests: "435m", ebook: "165m" },
     { class: "Grade 10 - Section A", lessonPlan: "560m", learningResource: "385m", items: "230m", tests: "340m", ebook: "135m" },
     { class: "Grade 11 - Section A", lessonPlan: "280m", learningResource: "255m", items: "130m", tests: "250m", ebook: "95m" },
   ],
   Student: [
     { class: "Grade 8 - Section A", lessonPlan: "NA", learningResource: "1695m", items: "990m", tests: "1365m", ebook: "740m" },
     { class: "Grade 9 - Section A", lessonPlan: "NA", learningResource: "2140m", items: "1165m", tests: "1690m", ebook: "935m" },
     { class: "Grade 9 - Section B", lessonPlan: "NA", learningResource: "1940m", items: "1095m", tests: "1530m", ebook: "825m" },
     { class: "Grade 10 - Section A", lessonPlan: "NA", learningResource: "2305m", items: "1295m", tests: "1815m", ebook: "985m" },
     { class: "Grade 11 - Section A", lessonPlan: "NA", learningResource: "1320m", items: "820m", tests: "1090m", ebook: "570m" },
   ],
   Parent: [
     { class: "Grade 8 - Section A", lessonPlan: "NA", learningResource: "270m", items: "105m", tests: "170m", ebook: "220m" },
     { class: "Grade 9 - Section A", lessonPlan: "NA", learningResource: "345m", items: "130m", tests: "215m", ebook: "265m" },
     { class: "Grade 9 - Section B", lessonPlan: "NA", learningResource: "315m", items: "115m", tests: "200m", ebook: "250m" },
     { class: "Grade 10 - Section A", lessonPlan: "NA", learningResource: "300m", items: "100m", tests: "205m", ebook: "245m" },
     { class: "Grade 11 - Section A", lessonPlan: "NA", learningResource: "225m", items: "60m", tests: "155m", ebook: "180m" },
   ],
 };
 
 const contentUsageData: ContentUsageData[] = [
   {
     role: "Teacher",
     lessonPlan: "2730m",
     learningResource: "1935m",
     items: "1125m",
     tests: "1700m",
     ebook: "730m",
   },
   {
     role: "Student",
     lessonPlan: "NA",
     learningResource: "9400m",
     items: "5365m",
     tests: "7490m",
     ebook: "4055m",
   },
   {
     role: "Parent",
     lessonPlan: "NA",
     learningResource: "1455m",
     items: "510m",
     tests: "945m",
     ebook: "1160m",
   },
 ];
 
export const ContentUsageTable = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const navigate = useNavigate();
 
   return (
     <>
       <Card>
         <CardHeader>
           <CardTitle>Content Usage</CardTitle>
           <CardDescription>Usage metrics by role across different content types</CardDescription>
         </CardHeader>
         <CardContent>
           <div className="rounded-md border">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead className="w-[150px]">Role</TableHead>
                    <TableHead>Lesson Plan (mins)</TableHead>
                    <TableHead>Learning Resource (mins)</TableHead>
                    <TableHead>Items (mins)</TableHead>
                    <TableHead>Tests (mins)</TableHead>
                     <TableHead>Ebook (mins)</TableHead>
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
                      <TableCell className={row.lessonPlan === "NA" ? "text-muted-foreground" : ""}>
                        {row.lessonPlan}
                      </TableCell>
                      <TableCell>{row.learningResource}</TableCell>
                      <TableCell>{row.items}</TableCell>
                      <TableCell>{row.tests}</TableCell>
                      <TableCell>{row.ebook}</TableCell>
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
                    <TableHead className="font-semibold">Lesson Plan (mins)</TableHead>
                    <TableHead className="font-semibold">Learning Resource (mins)</TableHead>
                    <TableHead className="font-semibold">Items (mins)</TableHead>
                    <TableHead className="font-semibold">Tests (mins)</TableHead>
                     <TableHead className="font-semibold">Ebook (mins)</TableHead>
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
                      <TableCell className={row.lessonPlan === "NA" ? "text-muted-foreground" : ""}>
                        {row.lessonPlan}
                      </TableCell>
                      <TableCell>{row.learningResource}</TableCell>
                      <TableCell>{row.items}</TableCell>
                      <TableCell>{row.tests}</TableCell>
                      <TableCell>{row.ebook}</TableCell>
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
                     <TableHead className="font-semibold">Lesson Plan (mins)</TableHead>
                     <TableHead className="font-semibold">Learning Resource (mins)</TableHead>
                     <TableHead className="font-semibold">Items (mins)</TableHead>
                     <TableHead className="font-semibold">Tests (mins)</TableHead>
                     <TableHead className="font-semibold">Ebook (mins)</TableHead>
                     <TableHead className="font-semibold">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedClass && studentBreakdownByClass[selectedClass]?.map((row, ri) => {
                    const total = rowTotal(row);
                    return (
                    <TableRow key={row.studentName} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{row.studentName}</TableCell>
                      <TableCell>{row.lessonPlan}</TableCell>
                      <TableCell>{row.learningResource}</TableCell>
                      <TableCell>{row.items}</TableCell>
                      <TableCell>{row.tests}</TableCell>
                      <TableCell>{row.ebook}</TableCell>
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