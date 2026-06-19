import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Building2, FileText, Library, BookOpen, TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { SectionInfoButton } from "@/components/SectionInfoButton";

type Metric = { value: number; prev: number };

const userTypeData = {
  teachers: {
    applicationUsage: 980,
    applicationBreakdown: {
      web: { value: 490, prev: 440 },
      mobile: { value: 350, prev: 380 },
      school: { value: 140, prev: 120 },
    },
    contentUsage: 1470,
    contentBreakdown: {
      lessonPlans: { value: 590, prev: 510 },
      learningResources: { value: 520, prev: 480 },
      ebooks: { value: 360, prev: 390 },
    },
    totalUsage: 2450,
  },
  students: {
    applicationUsage: 6890,
    applicationBreakdown: {
      web: { value: 3100, prev: 2850 },
      mobile: { value: 2650, prev: 2400 },
      school: { value: 1140, prev: 1220 },
    },
    contentUsage: 9280,
    contentBreakdown: {
      lessonPlans: { value: 3200, prev: 2950 },
      learningResources: { value: 3850, prev: 3600 },
      ebooks: { value: 2230, prev: 2350 },
    },
    totalUsage: 16170,
  },
  parents: {
    applicationUsage: 630,
    applicationBreakdown: {
      web: { value: 340, prev: 310 },
      mobile: { value: 210, prev: 220 },
      school: { value: 80, prev: 70 },
    },
    contentUsage: 2000,
    contentBreakdown: {
      lessonPlans: { value: 800, prev: 720 },
      learningResources: { value: 780, prev: 800 },
      ebooks: { value: 420, prev: 380 },
    },
    totalUsage: 2630,
  },
};

const TrendChip = ({ value, prev }: { value: number; prev: number }) => {
  const pct = prev === 0 ? 0 : ((value - prev) / prev) * 100;
  const up = pct >= 0;
  return (
    <div
      className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
        up
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-red-500/10 text-red-600 dark:text-red-400"
      }`}
      title={`Previous: ${prev.toLocaleString()}`}
    >
      {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
      <span className="tabular-nums">{up ? "+" : ""}{pct.toFixed(1)}%</span>
    </div>
  );
};

const BreakdownItem = ({
  icon: Icon,
  label,
  metric,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  metric: Metric;
  tone: "primary" | "chart-2" | "chart-3" | "secondary" | "chart-4" | "chart-5";
}) => {
  const toneClasses: Record<string, string> = {
    primary: "from-primary/10 to-primary/5 border-primary/20",
    "chart-2": "from-chart-2/10 to-chart-2/5 border-chart-2/20",
    "chart-3": "from-chart-3/10 to-chart-3/5 border-chart-3/20",
    secondary: "from-secondary/10 to-secondary/5 border-secondary/20",
    "chart-4": "from-chart-4/10 to-chart-4/5 border-chart-4/20",
    "chart-5": "from-chart-5/10 to-chart-5/5 border-chart-5/20",
  };
  const iconBg: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    "chart-2": "bg-chart-2/10 text-chart-2",
    "chart-3": "bg-chart-3/10 text-chart-3",
    secondary: "bg-secondary/10 text-secondary",
    "chart-4": "bg-chart-4/10 text-chart-4",
    "chart-5": "bg-chart-5/10 text-chart-5",
  };
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br border transition-all hover:shadow-md ${toneClasses[tone]}`}>
      <div className={`p-2 rounded-md ${iconBg[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          <TrendChip value={metric.value} prev={metric.prev} />
        </div>
        <p className="text-sm font-semibold text-foreground">{metric.value.toLocaleString()}</p>
      </div>
    </div>
  );
};

const TabPanel = ({ data, contentLabels }: { data: typeof userTypeData.teachers; contentLabels: { lessonPlans: string } }) => (
  <div className="grid grid-cols-3 gap-6 divide-x divide-border">
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Application Usage</p>
        <p className="text-3xl font-semibold text-primary">{data.applicationUsage.toLocaleString()}</p>
      </div>
      <div className="space-y-2">
        <BreakdownItem icon={Monitor} label="Web" metric={data.applicationBreakdown.web} tone="primary" />
        <BreakdownItem icon={Smartphone} label="Mobile" metric={data.applicationBreakdown.mobile} tone="chart-2" />
        <BreakdownItem icon={Building2} label="School" metric={data.applicationBreakdown.school} tone="chart-3" />
      </div>
    </div>
    <div className="pl-6 space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Content Usage</p>
        <p className="text-3xl font-semibold text-secondary">{data.contentUsage.toLocaleString()}</p>
      </div>
      <div className="space-y-2">
        <BreakdownItem icon={FileText} label={contentLabels.lessonPlans} metric={data.contentBreakdown.lessonPlans} tone="secondary" />
        <BreakdownItem icon={Library} label="Learning Resources" metric={data.contentBreakdown.learningResources} tone="chart-4" />
        <BreakdownItem icon={BookOpen} label="Ebooks" metric={data.contentBreakdown.ebooks} tone="chart-5" />
      </div>
    </div>
    <div className="pl-6">
      <p className="text-sm text-muted-foreground mb-1">Total Usage</p>
      <p className="text-3xl font-semibold text-foreground">{data.totalUsage.toLocaleString()}</p>
    </div>
  </div>
);

export const DetailedAnalytics = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>Usage breakdown by user type and content category</CardDescription>
        </div>
        <SectionInfoButton description="Comprehensive breakdown of application, content, and total usage metrics segmented by user type." />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="teachers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="parents">OTHER USERS</TabsTrigger>
          </TabsList>
          <TabsContent value="teachers" className="space-y-4 pt-4">
            <TabPanel data={userTypeData.teachers} contentLabels={{ lessonPlans: "Lesson Plans" }} />
          </TabsContent>
          <TabsContent value="students" className="space-y-4 pt-4">
            <TabPanel data={userTypeData.students} contentLabels={{ lessonPlans: "Assessments" }} />
          </TabsContent>
          <TabsContent value="parents" className="space-y-4 pt-4">
            <TabPanel data={userTypeData.parents} contentLabels={{ lessonPlans: "Assessments" }} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
