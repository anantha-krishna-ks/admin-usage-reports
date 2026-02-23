import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, Building2, FileText, Library, BookOpen } from "lucide-react";

const userTypeData = {
  teachers: {
    applicationUsage: "980 mins",
    applicationBreakdown: { web: "490 mins", mobile: "350 mins", school: "140 mins" },
    contentUsage: "1,470 mins",
    contentBreakdown: { lessonPlans: "590 mins", learningResources: "520 mins", ebooks: "360 mins" },
    totalUsage: "2,450 mins",
  },
  students: {
    applicationUsage: "6,890 mins",
    applicationBreakdown: { web: "3,100 mins", mobile: "2,650 mins", school: "1,140 mins" },
    contentUsage: "9,280 mins",
    contentBreakdown: { lessonPlans: "3,200 mins", learningResources: "3,850 mins", ebooks: "2,230 mins" },
    totalUsage: "16,170 mins",
  },
  parents: {
    applicationUsage: "630 mins",
    applicationBreakdown: { web: "340 mins", mobile: "210 mins", school: "80 mins" },
    contentUsage: "2,000 mins",
    contentBreakdown: { lessonPlans: "800 mins", learningResources: "780 mins", ebooks: "420 mins" },
    totalUsage: "2,630 mins",
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
              <div className="pl-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Content Usage</p>
                  <p className="text-3xl font-bold text-secondary">{userTypeData.teachers.contentUsage}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-secondary/10">
                      <FileText className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Lesson Plans</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.teachers.contentBreakdown.lessonPlans}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-4/10 to-chart-4/5 border border-chart-4/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-4/10">
                      <Library className="h-4 w-4 text-chart-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Learning Resources</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.teachers.contentBreakdown.learningResources}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-5/10 to-chart-5/5 border border-chart-5/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-5/10">
                      <BookOpen className="h-4 w-4 text-chart-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Ebooks</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.teachers.contentBreakdown.ebooks}</p>
                    </div>
                  </div>
                </div>
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
              <div className="pl-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Content Usage</p>
                  <p className="text-3xl font-bold text-secondary">{userTypeData.students.contentUsage}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-secondary/10">
                      <FileText className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Assessments</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.students.contentBreakdown.lessonPlans}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-4/10 to-chart-4/5 border border-chart-4/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-4/10">
                      <Library className="h-4 w-4 text-chart-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Learning Resources</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.students.contentBreakdown.learningResources}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-5/10 to-chart-5/5 border border-chart-5/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-5/10">
                      <BookOpen className="h-4 w-4 text-chart-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Ebooks</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.students.contentBreakdown.ebooks}</p>
                    </div>
                  </div>
                </div>
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
              <div className="pl-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Content Usage</p>
                  <p className="text-3xl font-bold text-secondary">{userTypeData.parents.contentUsage}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-secondary/10">
                      <FileText className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Assessments</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.parents.contentBreakdown.lessonPlans}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-4/10 to-chart-4/5 border border-chart-4/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-4/10">
                      <Library className="h-4 w-4 text-chart-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Learning Resources</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.parents.contentBreakdown.learningResources}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-chart-5/10 to-chart-5/5 border border-chart-5/20 transition-all hover:shadow-md">
                    <div className="p-2 rounded-md bg-chart-5/10">
                      <BookOpen className="h-4 w-4 text-chart-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Ebooks</p>
                      <p className="text-sm font-bold text-foreground">{userTypeData.parents.contentBreakdown.ebooks}</p>
                    </div>
                  </div>
                </div>
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
