import type { Stages, StageKey, StageState } from "../types";
import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
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

const STAGE_SHORT: Record<StageKey, string> = {
  eula: "EULA",
  system: "System",
  headshot: "ID",
  room: "Room",
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

const stageTone: Record<StageState, { node: string; line: string; text: string }> = {
  completed: {
    node: "border-success/30 bg-success/10 text-success",
    line: "bg-success/45",
    text: "text-success",
  },
  in_progress: {
    node: "border-warning/35 bg-warning/10 text-warning",
    line: "bg-warning/45",
    text: "text-warning",
  },
  flagged: {
    node: "border-destructive/35 bg-destructive/10 text-destructive",
    line: "bg-destructive/45",
    text: "text-destructive",
  },
  not_started: {
    node: "border-border bg-background text-muted-foreground",
    line: "bg-border",
    text: "text-muted-foreground",
  },
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
  const nextPending = STAGE_ORDER.find((k) => stages[k] === "not_started");
  const activeStage = issues[0]?.stage ?? inProgress ?? nextPending ?? STAGE_ORDER[STAGE_ORDER.length - 1];
  const activeIconKey = activeStage;
  const ActiveIcon = hasIssue ? AlertTriangle : completed === STAGE_ORDER.length ? CheckCircle2 : inProgress ? Loader2 : STAGE_ICON[activeIconKey];

  const summary = hasIssue
    ? {
        title: `${STAGE_LABEL[activeStage]} needs review`,
        detail: issues[0].reason,
        pill: "Review",
        cls: "border-destructive/25 bg-destructive/5 text-destructive",
        icon: "text-destructive",
      }
    : completed === STAGE_ORDER.length
      ? {
          title: "All stages verified",
          detail: "Candidate is ready for greeter review",
          pill: "Complete",
          cls: "border-success/25 bg-success/5 text-success",
          icon: "text-success",
        }
      : inProgress
        ? {
            title: `${STAGE_LABEL[inProgress]} running`,
            detail: `${completed} of ${STAGE_ORDER.length} stages verified`,
            pill: "Running",
            cls: "border-warning/25 bg-warning/5 text-warning",
            icon: "text-warning",
          }
        : {
            title: "Precheck not started",
            detail: "Waiting for the first stage to begin",
            pill: "Pending",
            cls: "border-border bg-muted/30 text-muted-foreground",
            icon: "text-muted-foreground",
          };

  return (
    <div className="w-full space-y-2">
      <div className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 ${summary.cls}`}>
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background/80">
          <ActiveIcon className={`h-3.5 w-3.5 ${summary.icon} ${inProgress && !hasIssue ? "animate-spin" : ""}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate text-xs font-semibold text-foreground">{summary.title}</div>
            <span className="shrink-0 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold">
              {summary.pill}
            </span>
          </div>
          <div className="mt-0.5 truncate text-[11px] font-medium leading-tight opacity-90">{summary.detail}</div>
        </div>
      </div>

      <div
        className="grid grid-cols-4 items-start gap-0"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemax={STAGE_ORDER.length}
        aria-label="Precheck progress"
      >
        {STAGE_ORDER.map((stage, index) => {
          const stageState = stages[stage];
          const StageIcon = STAGE_ICON[stage];
          const isIssue = issueStages.has(stage);
          const isActive = stage === activeStage;

          return (
            <div key={stage} className="min-w-0" title={`${STAGE_LABEL[stage]}: ${stateLabel[stageState]}`}>
              <div className="flex items-center">
                <div className={`h-px flex-1 ${index === 0 ? "bg-transparent" : stageTone[stageState].line}`} />
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${stageTone[stageState].node} ${isActive ? "ring-2 ring-primary/20" : ""}`}
                  aria-label={`${STAGE_LABEL[stage]} ${stateLabel[stageState]}`}
                >
                  {isIssue ? (
                    <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : stageState === "completed" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : stageState === "in_progress" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <StageIcon className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className={`h-px flex-1 ${index === STAGE_ORDER.length - 1 ? "bg-transparent" : stageTone[STAGE_ORDER[index + 1] ? stages[STAGE_ORDER[index + 1]] : stage].line}`} />
              </div>
              <div className={`mt-1 truncate text-center text-[10px] font-semibold leading-tight ${isActive ? "text-foreground" : stageTone[stageState].text}`}>
                {STAGE_SHORT[stage]}
              </div>
              <div className="truncate text-center text-[9px] font-medium leading-tight text-muted-foreground">
                {stateLabel[stageState]}
              </div>
            </div>
          );
        })}
      </div>

      {issues.length > 1 && (
        <div className="space-y-1 rounded-md bg-muted/30 px-2 py-1.5">
          {issues.map((iss, idx) => (
            <div key={`${iss.stage}-${idx}`} className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold text-destructive">
              <AlertTriangle className="h-3 w-3 shrink-0" />
              <span className="shrink-0">{STAGE_LABEL[iss.stage]}</span>
              <span className="truncate font-medium opacity-90">{iss.reason}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
