import type { Stages, StageKey, StageState } from "../types";
import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  CircleDashed,
  FileCheck2,
  Loader2,
  MonitorCheck,
  ScanLine,
} from "lucide-react";

const STAGE_ORDER: StageKey[] = ["eula", "system", "headshot", "room"];

const STAGE_LABEL: Record<StageKey, string> = {
  eula: "EULA",
  system: "System",
  headshot: "Headshot/ID",
  room: "Room Scan",
};

const STAGE_ICON = {
  eula: FileCheck2,
  system: MonitorCheck,
  headshot: BadgeCheck,
  room: ScanLine,
};

const stateLabel: Record<StageState, string> = {
  completed: "Verified",
  in_progress: "Running",
  flagged: "Review",
  not_started: "Pending",
};

const stageTone: Record<StageState, { marker: string; icon: string; label: string }> = {
  completed: {
    marker: "border-success/30 bg-success/10 text-success",
    icon: "text-success",
    label: "text-success",
  },
  in_progress: {
    marker: "border-warning/35 bg-warning/10 text-warning",
    icon: "text-warning",
    label: "text-warning",
  },
  flagged: {
    marker: "border-destructive/35 bg-destructive/10 text-destructive ring-2 ring-destructive/15",
    icon: "text-destructive",
    label: "text-destructive",
  },
  not_started: {
    marker: "border-border bg-muted/40 text-muted-foreground",
    icon: "text-muted-foreground",
    label: "text-muted-foreground",
  },
};

const progressTone = {
  ready: "bg-success",
  issue: "bg-destructive",
  running: "bg-warning",
  idle: "bg-muted-foreground/40",
};

interface StageChipsProps {
  stages: Stages;
  idMatch?: { verdict: "match" | "review" | "mismatch"; score: number };
}

interface Issue {
  stage: StageKey;
  reason: string;
}

export function StageChips({ stages, idMatch }: StageChipsProps) {
  const completed = STAGE_ORDER.filter((k) => stages[k] === "completed").length;
  const flagged = STAGE_ORDER.find((k) => stages[k] === "flagged");
  const inProgress = STAGE_ORDER.find((k) => stages[k] === "in_progress");
  const idIssue = idMatch && idMatch.verdict !== "match";

  const issues: Issue[] = [];
  if (flagged) issues.push({ stage: flagged, reason: "Flagged for review" });
  if (idIssue)
    issues.push({
      stage: "headshot",
      reason: `AI ID ${idMatch!.verdict === "mismatch" ? "not matched" : "needs review"} · score ${idMatch!.score}`,
    });

  const issueStages = new Set(issues.map((i) => i.stage));
  const hasIssue = issues.length > 0;

  const status = hasIssue
    ? { text: "Action required", cls: "border-destructive/30 bg-destructive/10 text-destructive" }
    : completed === STAGE_ORDER.length
      ? { text: "Complete", cls: "border-success/30 bg-success/10 text-success" }
      : inProgress
        ? { text: `${STAGE_LABEL[inProgress]} running`, cls: "border-warning/30 bg-warning/10 text-warning" }
        : { text: "Not started", cls: "border-border bg-muted/40 text-muted-foreground" };

  const progressClass = hasIssue
    ? progressTone.issue
    : completed === STAGE_ORDER.length
      ? progressTone.ready
      : inProgress
        ? progressTone.running
        : progressTone.idle;

  const progressWidth = `${Math.max(8, (completed / STAGE_ORDER.length) * 100)}%`;

  return (
    <div className="w-full rounded-lg border border-border bg-background/80 p-2.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Precheck stages
          </div>
          <div className="text-xs font-semibold text-foreground">
            {completed} of {STAGE_ORDER.length} verified
          </div>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${status.cls}`}>
          {status.text}
        </span>
      </div>

      <div
        className="mb-2 h-1.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemax={STAGE_ORDER.length}
        aria-label="Precheck progress"
      >
        <div className={`h-full rounded-full transition-all ${progressClass}`} style={{ width: progressWidth }} />
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {STAGE_ORDER.map((stage) => {
          const stageState = stages[stage];
          const StageIcon = STAGE_ICON[stage];
          const isIssue = issueStages.has(stage);
          const StatusIcon = isIssue
            ? AlertTriangle
            : stageState === "completed"
              ? CheckCircle2
              : stageState === "in_progress"
                ? Loader2
                : CircleDashed;

          return (
            <div key={stage} className="min-w-0 text-center" title={`${STAGE_LABEL[stage]}: ${stateLabel[stageState]}`}>
              <div
                className={`mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full border ${stageTone[stageState].marker}`}
                aria-label={`${STAGE_LABEL[stage]} ${stateLabel[stageState]}`}
              >
                <StageIcon className={`h-3.5 w-3.5 ${stageTone[stageState].icon}`} />
              </div>
              <div className="truncate text-[10px] font-semibold leading-tight text-foreground">
                {STAGE_LABEL[stage]}
              </div>
              <div className={`mt-0.5 flex items-center justify-center gap-0.5 text-[10px] font-semibold leading-tight ${stageTone[stageState].label}`}>
                <StatusIcon className={`h-2.5 w-2.5 ${stageState === "in_progress" ? "animate-spin" : ""}`} />
                <span className="truncate">{stateLabel[stageState]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {hasIssue && (
        <div className="mt-2 rounded-md border border-destructive/25 bg-destructive/5 p-2">
          {issues.map((iss, idx) => (
            <div key={`${iss.stage}-${idx}`} className="flex items-start gap-2 text-left">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" strokeWidth={2.5} />
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-destructive">
                  {STAGE_LABEL[iss.stage]}
                </div>
                <div className="text-[11px] font-medium leading-tight text-destructive">{iss.reason}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
