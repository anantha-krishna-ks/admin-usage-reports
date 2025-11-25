import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Building2 } from "lucide-react";

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
            <div className="grid grid-cols-3 gap-6 divide-x divide-border">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Application Usage</p>
                  <p className="text-3xl font-bold text-primary">{userTypeData.teachers.applicationUsage}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Monitor className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Web</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.teachers.applicationBreakdown.web}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-2/10 to-chart-2/5 border border-chart-2/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-2/10">
                      <Smartphone className="h-4 w-4 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Mobile</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.teachers.applicationBreakdown.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-3/10 to-chart-3/5 border border-chart-3/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-3/10">
                      <Building2 className="h-4 w-4 text-chart-3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">School</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.teachers.applicationBreakdown.school}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground mb-1">Content Usage</p>
                <p className="text-3xl font-bold text-secondary">{userTypeData.teachers.contentUsage}</p>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground mb-1">Total Usage</p>
                <p className="text-3xl font-bold text-foreground">{userTypeData.teachers.totalUsage}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="students" className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-6 divide-x divide-border">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Application Usage</p>
                  <p className="text-3xl font-bold text-primary">{userTypeData.students.applicationUsage}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Monitor className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Web</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.students.applicationBreakdown.web}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-2/10 to-chart-2/5 border border-chart-2/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-2/10">
                      <Smartphone className="h-4 w-4 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Mobile</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.students.applicationBreakdown.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-3/10 to-chart-3/5 border border-chart-3/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-3/10">
                      <Building2 className="h-4 w-4 text-chart-3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">School</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.students.applicationBreakdown.school}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground mb-1">Content Usage</p>
                <p className="text-3xl font-bold text-secondary">{userTypeData.students.contentUsage}</p>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground mb-1">Total Usage</p>
                <p className="text-3xl font-bold text-foreground">{userTypeData.students.totalUsage}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="parents" className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-6 divide-x divide-border">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Application Usage</p>
                  <p className="text-3xl font-bold text-primary">{userTypeData.parents.applicationUsage}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Monitor className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Web</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.parents.applicationBreakdown.web}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-2/10 to-chart-2/5 border border-chart-2/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-2/10">
                      <Smartphone className="h-4 w-4 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Mobile</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.parents.applicationBreakdown.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-3/10 to-chart-3/5 border border-chart-3/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-3/10">
                      <Building2 className="h-4 w-4 text-chart-3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">School</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.parents.applicationBreakdown.school}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground mb-1">Content Usage</p>
                <p className="text-3xl font-bold text-secondary">{userTypeData.parents.contentUsage}</p>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground mb-1">Total Usage</p>
                <p className="text-3xl font-bold text-foreground">{userTypeData.parents.totalUsage}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
