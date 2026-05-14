import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, Users, PieChart, Layers, Grid3X3, BookOpen, PenTool, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    icon: BarChart3,
    title: "Total Platform Usage",
    description:
      "Displays the aggregate platform usage in minutes for the selected date range. This includes usage across all environments (Web, Mobile, School) and all user types. The card also shows the usage distribution across platforms at a glance.",
  },
  {
    icon: Users,
    title: "Total Active Users",
    description:
      "Shows the total number of unique users who accessed the platform during the selected period. Drill-down chips reveal the split between new users, repeat users, and the number of schools contributing to the count.",
  },
  {
    icon: PieChart,
    title: "Usage by User Type",
    description:
      "A grouped bar chart comparing Teachers, Students, and Parents across three metrics — Total Usage, App Usage, and Content Usage (all in minutes). Hover over bars for exact values. Use this to identify which user group drives the most engagement.",
  },
  {
    icon: Layers,
    title: "Usage Distribution",
    description:
      "A donut chart breaking down application usage by platform — Web, Mobile, and School. The percentage labels and legend help quickly assess which environment dominates. Useful for infrastructure planning and platform-specific feature prioritisation.",
  },
  {
    icon: Grid3X3,
    title: "Detailed Analytics",
    description:
      "A tabbed breakdown (Teachers, Students, Parents) showing per-role Application Usage, Content Usage, and Total Usage. Each tab lists the respective environment and content-type sub-totals, giving a comprehensive view of how each role interacts with the platform.",
  },
  {
    icon: BarChart3,
    title: "Class-wise Application Usage Details",
    description:
      "A grade-level table presenting Total Users, App Usage (mins), Content Usage (mins), and Total Usage (mins) for each grade. Click the Preview icon on any row to drill down into section-level and individual-level usage for that grade.",
  },
  {
    icon: BookOpen,
    title: "Content Usage",
    description:
      "Displays content engagement metrics by role — Teacher, Student, and Parent. Columns include Lesson Plan, Learning Resource, Items, Tests, and Ebook (in mins or hours). Click the Preview icon to navigate to a detailed content-usage breakdown filtered by the selected role.",
  },
  {
    icon: PenTool,
    title: "Custom Content Creation",
    description:
      "Tracks content authored by teachers — Lesson Plans, Learning Resources, Questions, and Tests. Each row represents a teacher with their respective creation counts. Use the Preview icon to view a per-teacher breakdown including LBQ (Leader Board Quiz) metrics.",
  },
];

const DashboardGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Info className="h-7 w-7 text-primary" />
              Dashboard Guide
            </h1>
            <p className="text-muted-foreground mt-1">
              Learn what each section of the Admin Reports dashboard shows and how to use it
            </p>
          </div>
        </div>

        {/* Section cards */}
        <div className="space-y-4">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card
                key={idx}
                className="shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-5">
                    <div className="shrink-0 flex items-start pt-0.5">
                      <div className="rounded-lg bg-primary/10 p-2.5">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <h2 className="text-base font-semibold text-foreground">
                        {idx + 1}. {section.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardGuide;
