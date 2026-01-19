import { useState } from "react";
import { Clock, Users, AlertTriangle, CheckCircle, XCircle, Headphones, Eye, FileCheck, ShieldCheck, Camera, UserCheck, Pause, Play, RotateCcw, Flag, Timer, ThumbsUp, ThumbsDown, Zap, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import type { DateRange } from "react-day-picker";
import { EnhancedDateFilter } from "@/components/proctoring/EnhancedDateFilter";
import { ExportButton } from "@/components/proctoring/ExportButton";
import { DrillDownModal } from "@/components/proctoring/DrillDownModal";

// Mock data
const preCheckTimeData = [
  { name: "EULA", time: 45 },
  { name: "Photo ID", time: 120 },
  { name: "Room Scan", time: 90 },
  { name: "Proctor Approval", time: 180 },
];

const flagDistributionData = [
  { name: "High Severity", value: 245, color: "hsl(var(--destructive))" },
  { name: "Medium Severity", value: 580, color: "hsl(var(--chart-3))" },
  { name: "Low Severity", value: 890, color: "hsl(var(--chart-4))" },
];

const submissionStatusData = [
  { name: "Auto Approved", value: 62, color: "hsl(var(--chart-2))" },
  { name: "Manual Approved", value: 28, color: "hsl(var(--primary))" },
  { name: "Analysis Required", value: 10, color: "hsl(var(--chart-3))" },
];

const dailyAssessmentTrend = [
  { date: "Mon", assessments: 120, submitted: 115, noShow: 5 },
  { date: "Tue", assessments: 145, submitted: 138, noShow: 7 },
  { date: "Wed", assessments: 132, submitted: 128, noShow: 4 },
  { date: "Thu", assessments: 156, submitted: 149, noShow: 7 },
  { date: "Fri", assessments: 178, submitted: 170, noShow: 8 },
  { date: "Sat", assessments: 95, submitted: 92, noShow: 3 },
  { date: "Sun", assessments: 68, submitted: 65, noShow: 3 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: { value: number; label?: string };
  accentColor?: string;
}

const StatCard = ({ title, value, icon, description, trend, accentColor = 'hsl(var(--primary))' }: StatCardProps) => {
  return (
    <div className="group relative cursor-pointer">
      {/* Main card container */}
      <div 
        className="relative bg-card rounded-xl border border-border/50 p-5 transition-all duration-300 hover:border-transparent overflow-hidden"
        style={{
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        }}
      >
        {/* Background fill on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ 
            background: `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 8%, transparent), color-mix(in srgb, ${accentColor} 4%, transparent))`
          }}
        />
        
        {/* Accent line - expands on hover */}
        <div 
          className="absolute top-0 left-5 right-5 h-[2px] rounded-full opacity-80 transition-all duration-300 group-hover:left-0 group-hover:right-0 group-hover:rounded-none group-hover:opacity-100"
          style={{ backgroundColor: accentColor }}
        />
        
        {/* Content */}
        <div className="relative pt-3">
          {/* Header row with icon */}
          <div className="flex items-start justify-between mb-3">
            <span className="text-[11px] font-medium text-muted-foreground/70 tracking-widest uppercase transition-colors duration-300 group-hover:text-muted-foreground">
              {title}
            </span>
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ 
                backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
                color: accentColor 
              }}
            >
              {icon}
            </div>
          </div>
          
          {/* Value */}
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-semibold tracking-tight tabular-nums text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
              {value}
            </span>
            {trend && (
              <span 
                className={`text-xs font-medium px-1.5 py-0.5 rounded transition-transform duration-300 group-hover:scale-105 ${
                  trend.value >= 0 
                    ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50' 
                    : 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/50'
                }`}
              >
                {trend.value >= 0 ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          
          {/* Description / Footer */}
          {description && (
            <p className="text-[11px] text-muted-foreground/60 mt-2 font-medium">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onViewDetails?: () => void;
}

const Section = ({ title, description, children, defaultOpen = false, onViewDetails }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader 
        className="cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          {children}
          {onViewDetails && (
            <div className="flex justify-end mt-6 pt-4 border-t border-border/50">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 shadow-sm hover:shadow-md transition-shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails();
                }}
              >
                <Search className="h-4 w-4" />
                View Details
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

interface MetricItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
}

const MetricItem = ({ icon, label, value, subtext }: MetricItemProps) => (
  <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/60 shadow-[0_1px_3px_0_rgb(0_0_0/0.05),0_1px_2px_-1px_rgb(0_0_0/0.05)] hover:shadow-[0_4px_12px_-2px_rgb(0_0_0/0.08)] hover:border-border transition-all duration-200">
    <div className="p-2.5 bg-muted/50 rounded-lg border border-border/40">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground/70 font-medium tracking-wide uppercase truncate">{label}</p>
      <p className="text-xl font-semibold tracking-tight mt-0.5">{value}</p>
      {subtext && <p className="text-[11px] text-muted-foreground/60 mt-1">{subtext}</p>}
    </div>
  </div>
);

export default function ProctorAnalytics() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [drillDownModal, setDrillDownModal] = useState<{
    open: boolean;
    type: "precheck" | "during" | "post";
    title: string;
    description: string;
  }>({
    open: false,
    type: "precheck",
    title: "",
    description: "",
  });

  const openDrillDown = (type: "precheck" | "during" | "post", title: string, description: string) => {
    setDrillDownModal({ open: true, type, title, description });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Proctoring Analytics</h1>
              <p className="text-muted-foreground mt-1">Comprehensive assessment monitoring report</p>
            </div>
            <div className="flex items-center gap-3">
              <EnhancedDateFilter date={date} onDateChange={setDate} />
              <ExportButton />
            </div>
          </div>
        </div>

        {/* Prominent Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Total Assessments"
            value="894"
            icon={<FileCheck className="h-4 w-4" />}
            trend={{ value: 12.5 }}
            accentColor="hsl(var(--primary))"
          />
          <StatCard
            title="Submitted"
            value="857"
            icon={<CheckCircle className="h-4 w-4" />}
            trend={{ value: 8.2 }}
            accentColor="hsl(160, 60%, 45%)"
          />
          <StatCard
            title="Rescheduled"
            value="24"
            icon={<RotateCcw className="h-4 w-4" />}
            trend={{ value: -3.1 }}
            accentColor="hsl(38, 92%, 50%)"
          />
          <StatCard
            title="No Show"
            value="37"
            icon={<XCircle className="h-4 w-4" />}
            trend={{ value: -5.4 }}
            accentColor="hsl(0, 72%, 51%)"
          />
          <StatCard
            title="Watchlist"
            value="12"
            icon={<Eye className="h-4 w-4" />}
            accentColor="hsl(199, 89%, 48%)"
          />
          <StatCard
            title="Headphone Flags"
            value="89"
            icon={<Headphones className="h-4 w-4" />}
            accentColor="hsl(280, 65%, 60%)"
          />
        </div>

        {/* Assessment Trend Chart */}
        <Card className="mb-8 border-border/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Assessment Trend</CardTitle>
            <CardDescription>Daily assessment overview for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dailyAssessmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="assessments" name="Total" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="submitted" name="Submitted" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="noShow" name="No Show" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-6">
          {/* Pre-check Analytics */}
          <Section 
            title="Pre-check Analytics" 
            description="Average completion times and verification metrics"
            defaultOpen={true}
            onViewDetails={() => openDrillDown("precheck", "Pre-check Analytics Details", "Detailed breakdown of pre-check times for all candidates")}
          >
            <div className="space-y-6">
              {/* Time Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricItem
                  icon={<Clock className="h-4 w-4 text-primary" />}
                  label="Average Pre-check Time"
                  value="7m 15s"
                  subtext="Across all candidates"
                />
                <MetricItem
                  icon={<Timer className="h-4 w-4 text-destructive" />}
                  label="Highest Time"
                  value="18m 42s"
                />
                <MetricItem
                  icon={<Zap className="h-4 w-4 text-chart-2" />}
                  label="Lowest Time"
                  value="2m 08s"
                />
              </div>

              {/* Pre-check Steps Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/30 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">Step-wise Average Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={preCheckTimeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={100} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "13px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                          formatter={(value: number) => [`${value}s`, "Avg Time"]}
                        />
                        <Bar dataKey="time" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <MetricItem
                    icon={<FileCheck className="h-4 w-4 text-chart-1" />}
                    label="EULA Completion"
                    value="45s"
                    subtext="Average"
                  />
                  <MetricItem
                    icon={<UserCheck className="h-4 w-4 text-chart-2" />}
                    label="Photo ID Verification"
                    value="2m 00s"
                    subtext="Average"
                  />
                  <MetricItem
                    icon={<Camera className="h-4 w-4 text-chart-3" />}
                    label="Room Scan"
                    value="1m 30s"
                    subtext="Average"
                  />
                  <MetricItem
                    icon={<ShieldCheck className="h-4 w-4 text-chart-4" />}
                    label="Proctor Approval"
                    value="3m 00s"
                    subtext="Average"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* During Assessment Analytics */}
          <Section 
            title="During Assessment Analytics" 
            description="Real-time monitoring flags and proctor interventions"
            onViewDetails={() => openDrillDown("during", "During Assessment Details", "Detailed breakdown of flags and interventions for all candidates")}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Flag Distribution */}
                <Card className="border-border/30 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">Flag Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={flagDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {flagDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "13px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <MetricItem
                    icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
                    label="Avg High Sev Flags"
                    value="2.4"
                    subtext="Per assessment"
                  />
                  <MetricItem
                    icon={<Flag className="h-4 w-4 text-chart-3" />}
                    label="Avg Medium Sev Flags"
                    value="5.8"
                    subtext="Per assessment"
                  />
                  <MetricItem
                    icon={<Pause className="h-4 w-4 text-chart-4" />}
                    label="Avg Auto Pauses"
                    value="1.2"
                    subtext="Per assessment"
                  />
                  <MetricItem
                    icon={<Play className="h-4 w-4 text-chart-2" />}
                    label="Avg Pause Clear Time"
                    value="45s"
                    subtext="By proctor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricItem
                  icon={<Users className="h-4 w-4 text-primary" />}
                  label="Avg Proctor Pauses"
                  value="0.8"
                  subtext="Per assessment"
                />
                <MetricItem
                  icon={<Camera className="h-4 w-4 text-chart-1" />}
                  label="Avg Room Scan Requests"
                  value="1.5"
                  subtext="By proctor"
                />
                <MetricItem
                  icon={<XCircle className="h-4 w-4 text-destructive" />}
                  label="Avg Terminations"
                  value="0.03"
                  subtext="During assessment"
                />
              </div>
            </div>
          </Section>

          {/* Post Submission Analytics */}
          <Section 
            title="Post Submission Analytics" 
            description="Review times and approval metrics"
            onViewDetails={() => openDrillDown("post", "Post Submission Details", "Detailed breakdown of review and approval times for all submissions")}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Submission Status Chart */}
                <Card className="border-border/30 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">Submission Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={submissionStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {submissionStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "13px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                          formatter={(value: number) => [`${value}%`, "Percentage"]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <MetricItem
                    icon={<Clock className="h-4 w-4 text-primary" />}
                    label="Avg Review Time"
                    value="4m 32s"
                    subtext="Per submission"
                  />
                  <MetricItem
                    icon={<Timer className="h-4 w-4 text-chart-2" />}
                    label="Approval Time"
                    value="12m 15s"
                    subtext="Average"
                  />
                  <MetricItem
                    icon={<ThumbsUp className="h-4 w-4 text-chart-2" />}
                    label="Approval Rate"
                    value="92%"
                  />
                  <MetricItem
                    icon={<ThumbsDown className="h-4 w-4 text-destructive" />}
                    label="Rejection Rate"
                    value="8%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricItem
                  icon={<Zap className="h-4 w-4 text-chart-2" />}
                  label="Auto Approved"
                  value="62%"
                  subtext="Of total submissions"
                />
                <MetricItem
                  icon={<Search className="h-4 w-4 text-chart-3" />}
                  label="Analysis Required"
                  value="10%"
                  subtext="Need manual review"
                />
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Drill Down Modal */}
      <DrillDownModal
        open={drillDownModal.open}
        onOpenChange={(open) => setDrillDownModal((prev) => ({ ...prev, open }))}
        title={drillDownModal.title}
        description={drillDownModal.description}
        type={drillDownModal.type}
      />
    </div>
  );
}
