import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const userTypeData = {
  teachers: {
    applicationUsage: "980 hrs",
    applicationBreakdown: { web: "490 hrs", mobile: "350 hrs", school: "140 hrs" },
    contentUsage: "1,470 hrs",
    totalUsage: "2,450 hrs",
  },
  students: {
    applicationUsage: "6,890 hrs",
    applicationBreakdown: { web: "3,100 hrs", mobile: "2,650 hrs", school: "1,140 hrs" },
    contentUsage: "9,280 hrs",
    totalUsage: "16,170 hrs",
  },
  parents: {
    applicationUsage: "630 hrs",
    applicationBreakdown: { web: "340 hrs", mobile: "210 hrs", school: "80 hrs" },
    contentUsage: "2,000 hrs",
    totalUsage: "2,630 hrs",
  },
};

export const DetailedAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Analytics</CardTitle>
        <CardDescription>Usage breakdown by user type and content category</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="teachers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
          </TabsList>
          <TabsContent value="teachers" className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Application Usage</p>
                  <p className="text-2xl font-bold text-primary">{userTypeData.teachers.applicationUsage}</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/20 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Web</span>
                    <span className="text-sm font-semibold">{userTypeData.teachers.applicationBreakdown.web}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Mobile</span>
                    <span className="text-sm font-semibold">{userTypeData.teachers.applicationBreakdown.mobile}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">School</span>
                    <span className="text-sm font-semibold">{userTypeData.teachers.applicationBreakdown.school}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Content Usage</p>
                <p className="text-2xl font-bold text-secondary">{userTypeData.teachers.contentUsage}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold">{userTypeData.teachers.totalUsage}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="students" className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Application Usage</p>
                  <p className="text-2xl font-bold text-primary">{userTypeData.students.applicationUsage}</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/20 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Web</span>
                    <span className="text-sm font-semibold">{userTypeData.students.applicationBreakdown.web}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Mobile</span>
                    <span className="text-sm font-semibold">{userTypeData.students.applicationBreakdown.mobile}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">School</span>
                    <span className="text-sm font-semibold">{userTypeData.students.applicationBreakdown.school}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Content Usage</p>
                <p className="text-2xl font-bold text-secondary">{userTypeData.students.contentUsage}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold">{userTypeData.students.totalUsage}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="parents" className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Application Usage</p>
                  <p className="text-2xl font-bold text-primary">{userTypeData.parents.applicationUsage}</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/20 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Web</span>
                    <span className="text-sm font-semibold">{userTypeData.parents.applicationBreakdown.web}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Mobile</span>
                    <span className="text-sm font-semibold">{userTypeData.parents.applicationBreakdown.mobile}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">School</span>
                    <span className="text-sm font-semibold">{userTypeData.parents.applicationBreakdown.school}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Content Usage</p>
                <p className="text-2xl font-bold text-secondary">{userTypeData.parents.contentUsage}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold">{userTypeData.parents.totalUsage}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
