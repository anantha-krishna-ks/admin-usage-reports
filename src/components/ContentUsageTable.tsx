 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
 import { Badge } from "@/components/ui/badge";
 
 interface ContentUsageData {
   role: string;
   lessonPlan: string;
   learningResource: string;
   items: string;
   tests: string;
   ebook: string;
 }
 
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
   return (
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
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </div>
       </CardContent>
     </Card>
   );
 };