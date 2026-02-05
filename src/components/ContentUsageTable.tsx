 import { useState } from "react";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
 import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, BookOpen, FileText, ClipboardList, GraduationCap, BookMarked } from "lucide-react";
 
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
    { studentName: "John Smith", lessonPlan: "2h 15m", learningResource: "1h 30m", items: "45m", tests: "1h 20m", ebook: "35m" },
    { studentName: "Emma Johnson", lessonPlan: "1h 45m", learningResource: "2h 10m", items: "55m", tests: "1h 45m", ebook: "40m" },
    { studentName: "Michael Brown", lessonPlan: "2h 30m", learningResource: "1h 15m", items: "1h 10m", tests: "1h 30m", ebook: "50m" },
  ],
  "Grade 9 - Section A": [
    { studentName: "Sarah Davis", lessonPlan: "3h 20m", learningResource: "2h 45m", items: "1h 25m", tests: "2h 10m", ebook: "1h 05m" },
    { studentName: "James Wilson", lessonPlan: "2h 55m", learningResource: "2h 20m", items: "1h 15m", tests: "1h 55m", ebook: "55m" },
    { studentName: "Emily Taylor", lessonPlan: "3h 10m", learningResource: "2h 35m", items: "1h 30m", tests: "2h 25m", ebook: "1h 15m" },
  ],
  "Grade 9 - Section B": [
    { studentName: "Daniel Anderson", lessonPlan: "2h 40m", learningResource: "1h 55m", items: "1h 20m", tests: "1h 45m", ebook: "45m" },
    { studentName: "Olivia Thomas", lessonPlan: "3h 05m", learningResource: "2h 30m", items: "1h 35m", tests: "2h 20m", ebook: "1h 00m" },
    { studentName: "William Jackson", lessonPlan: "2h 25m", learningResource: "2h 10m", items: "1h 10m", tests: "1h 50m", ebook: "55m" },
  ],
  "Grade 10 - Section A": [
    { studentName: "Sophia White", lessonPlan: "2h 50m", learningResource: "1h 40m", items: "1h 00m", tests: "1h 35m", ebook: "40m" },
    { studentName: "Alexander Harris", lessonPlan: "3h 15m", learningResource: "2h 25m", items: "1h 25m", tests: "2h 05m", ebook: "1h 10m" },
    { studentName: "Isabella Martin", lessonPlan: "2h 35m", learningResource: "2h 00m", items: "1h 15m", tests: "1h 50m", ebook: "50m" },
  ],
  "Grade 11 - Section A": [
    { studentName: "Benjamin Garcia", lessonPlan: "1h 30m", learningResource: "1h 10m", items: "35m", tests: "1h 15m", ebook: "30m" },
    { studentName: "Mia Rodriguez", lessonPlan: "1h 45m", learningResource: "1h 35m", items: "50m", tests: "1h 30m", ebook: "40m" },
    { studentName: "Ethan Martinez", lessonPlan: "1h 25m", learningResource: "1h 20m", items: "45m", tests: "1h 25m", ebook: "35m" },
  ],
};

 const classBreakdownByRole: Record<string, ClassBreakdownData[]> = {
   Teacher: [
     { class: "Grade 8 - Section A", lessonPlan: "8h 15m", learningResource: "5h 30m", items: "3h 20m", tests: "4h 45m", ebook: "2h 10m" },
     { class: "Grade 9 - Section A", lessonPlan: "12h 45m", learningResource: "8h 20m", items: "4h 15m", tests: "6h 30m", ebook: "3h 25m" },
     { class: "Grade 9 - Section B", lessonPlan: "10h 30m", learningResource: "7h 45m", items: "5h 10m", tests: "7h 15m", ebook: "2h 45m" },
     { class: "Grade 10 - Section A", lessonPlan: "9h 20m", learningResource: "6h 25m", items: "3h 50m", tests: "5h 40m", ebook: "2h 15m" },
     { class: "Grade 11 - Section A", lessonPlan: "4h 40m", learningResource: "4h 15m", items: "2h 10m", tests: "4h 10m", ebook: "1h 35m" },
   ],
   Student: [
     { class: "Grade 8 - Section A", lessonPlan: "NA", learningResource: "28h 15m", items: "16h 30m", tests: "22h 45m", ebook: "12h 20m" },
     { class: "Grade 9 - Section A", lessonPlan: "NA", learningResource: "35h 40m", items: "19h 25m", tests: "28h 10m", ebook: "15h 35m" },
     { class: "Grade 9 - Section B", lessonPlan: "NA", learningResource: "32h 20m", items: "18h 15m", tests: "25h 30m", ebook: "13h 45m" },
     { class: "Grade 10 - Section A", lessonPlan: "NA", learningResource: "38h 25m", items: "21h 35m", tests: "30h 15m", ebook: "16h 25m" },
     { class: "Grade 11 - Section A", lessonPlan: "NA", learningResource: "22h 00m", items: "13h 40m", tests: "18h 10m", ebook: "9h 30m" },
   ],
   Parent: [
     { class: "Grade 8 - Section A", lessonPlan: "NA", learningResource: "4h 30m", items: "1h 45m", tests: "2h 50m", ebook: "3h 40m" },
     { class: "Grade 9 - Section A", lessonPlan: "NA", learningResource: "5h 45m", items: "2h 10m", tests: "3h 35m", ebook: "4h 25m" },
     { class: "Grade 9 - Section B", lessonPlan: "NA", learningResource: "5h 15m", items: "1h 55m", tests: "3h 20m", ebook: "4h 10m" },
     { class: "Grade 10 - Section A", lessonPlan: "NA", learningResource: "5h 00m", items: "1h 40m", tests: "3h 25m", ebook: "4h 05m" },
     { class: "Grade 11 - Section A", lessonPlan: "NA", learningResource: "3h 45m", items: "1h 00m", tests: "2h 35m", ebook: "3h 00m" },
   ],
 };
 
 const contentUsageData: ContentUsageData[] = [
   {
     role: "Teacher",
     lessonPlan: "45h 30m",
     learningResource: "32h 15m",
     items: "18h 45m",
     tests: "28h 20m",
     ebook: "12h 10m",
   },
   {
     role: "Student",
     lessonPlan: "NA",
     learningResource: "156h 40m",
     items: "89h 25m",
     tests: "124h 50m",
     ebook: "67h 35m",
   },
   {
     role: "Parent",
     lessonPlan: "NA",
     learningResource: "24h 15m",
     items: "8h 30m",
     tests: "15h 45m",
     ebook: "19h 20m",
   },
 ];
 
 export const ContentUsageTable = () => {
   const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
 
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
                   <TableHead>Lesson Plan</TableHead>
                   <TableHead>Learning Resource</TableHead>
                   <TableHead>Items</TableHead>
                   <TableHead>Tests</TableHead>
                   <TableHead>Ebook</TableHead>
                   <TableHead className="w-[100px]">Preview</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {contentUsageData.map((row) => (
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
                       <Button
                         variant="ghost"
                         size="sm"
                         className="h-8 w-8 p-0"
                         onClick={() => setSelectedRole(row.role)}
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
                    {selectedRole === "Teacher" && (
                      <TableHead className="font-semibold w-[100px]">Preview</TableHead>
                    )}
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {selectedRole && classBreakdownByRole[selectedRole]?.map((row) => (
                   <TableRow key={row.class} className="hover:bg-muted/30">
                     <TableCell className="font-medium">{row.class}</TableCell>
                     <TableCell className={row.lessonPlan === "NA" ? "text-muted-foreground" : ""}>
                       {row.lessonPlan}
                     </TableCell>
                     <TableCell>{row.learningResource}</TableCell>
                     <TableCell>{row.items}</TableCell>
                     <TableCell>{row.tests}</TableCell>
                     <TableCell>{row.ebook}</TableCell>
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
                 ))}
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedClass && studentBreakdownByClass[selectedClass]?.map((row) => (
                    <TableRow key={row.studentName} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{row.studentName}</TableCell>
                      <TableCell>{row.lessonPlan}</TableCell>
                      <TableCell>{row.learningResource}</TableCell>
                      <TableCell>{row.items}</TableCell>
                      <TableCell>{row.tests}</TableCell>
                      <TableCell>{row.ebook}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </DialogContent>
        </Dialog>
     </>
   );
 };