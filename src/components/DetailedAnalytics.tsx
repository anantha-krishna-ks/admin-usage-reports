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
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="bg-primary/5 rounded-lg p-2 text-center border border-primary/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">Web</p>
                    <p className="text-sm font-bold text-primary">{userTypeData.teachers.applicationBreakdown.web}</p>
                  </div>
                  <div className="bg-chart-2/5 rounded-lg p-2 text-center border border-chart-2/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">Mobile</p>
                    <p className="text-sm font-bold text-chart-2">{userTypeData.teachers.applicationBreakdown.mobile}</p>
                  </div>
                  <div className="bg-chart-3/5 rounded-lg p-2 text-center border border-chart-3/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">School</p>
                    <p className="text-sm font-bold text-chart-3">{userTypeData.teachers.applicationBreakdown.school}</p>
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
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="bg-primary/5 rounded-lg p-2 text-center border border-primary/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">Web</p>
                    <p className="text-sm font-bold text-primary">{userTypeData.students.applicationBreakdown.web}</p>
                  </div>
                  <div className="bg-chart-2/5 rounded-lg p-2 text-center border border-chart-2/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">Mobile</p>
                    <p className="text-sm font-bold text-chart-2">{userTypeData.students.applicationBreakdown.mobile}</p>
                  </div>
                  <div className="bg-chart-3/5 rounded-lg p-2 text-center border border-chart-3/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">School</p>
                    <p className="text-sm font-bold text-chart-3">{userTypeData.students.applicationBreakdown.school}</p>
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
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="bg-primary/5 rounded-lg p-2 text-center border border-primary/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">Web</p>
                    <p className="text-sm font-bold text-primary">{userTypeData.parents.applicationBreakdown.web}</p>
                  </div>
                  <div className="bg-chart-2/5 rounded-lg p-2 text-center border border-chart-2/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">Mobile</p>
                    <p className="text-sm font-bold text-chart-2">{userTypeData.parents.applicationBreakdown.mobile}</p>
                  </div>
                  <div className="bg-chart-3/5 rounded-lg p-2 text-center border border-chart-3/10">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">School</p>
                    <p className="text-sm font-bold text-chart-3">{userTypeData.parents.applicationBreakdown.school}</p>
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
