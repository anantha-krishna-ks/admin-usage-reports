import type { Stages, StageKey, StageState } from "../types";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Circle,
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

const stateLabel: Record<StageState, string> = {
  completed: "Verified",
  in_progress: "Running",
  flagged: "Review",
  not_started: "Pending",
};

const nodeTone: Record<StageState, string> = {
  completed: "border-success/30 bg-success/10 text-success",
  in_progress: "border-warning/30 bg-warning/10 text-warning",
  flagged: "border-destructive/35 bg-destructive/10 text-destructive",
  not_started: "border-border bg-muted/30 text-muted-foreground",
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
  const activeStage =
    issues[0]?.stage ?? inProgress ?? nextPending ?? STAGE_ORDER[STAGE_ORDER.length - 1];

  const summary = hasIssue
    ? {
        title: `${STAGE_LABEL[activeStage]} needs review`,
        pill: "Review",
        pillCls: "bg-destructive/10 text-destructive border-destructive/20",
      }
    : completed === STAGE_ORDER.length
      ? {
          title: "All stages verified",
          pill: "Complete",
          pillCls: "bg-success/10 text-success border-success/20",
        }
      : inProgress
        ? {
            title: `${STAGE_LABEL[inProgress]} running`,
            pill: "Running",
            pillCls: "bg-warning/10 text-warning border-warning/20",
          }
        : {
            title: "Precheck not started",
            pill: "Pending",
            pillCls: "bg-muted text-muted-foreground border-border",
          };

  return (
    <div className="w-full rounded-lg border border-border bg-background/80 p-2 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${hasIssue ? "border-destructive/30 bg-destructive/10 text-destructive" : inProgress ? "border-warning/30 bg-warning/10 text-warning" : completed === STAGE_ORDER.length ? "border-success/30 bg-success/10 text-success" : "border-border bg-muted/30 text-muted-foreground"}`}
            aria-hidden="true"
          >
            {hasIssue ? (
              <AlertTriangle className="h-3.5 w-3.5" />
            ) : inProgress ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : completed === STAGE_ORDER.length ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <Circle className="h-2 w-2 fill-current" />
            )}
          </span>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold leading-tight text-foreground">
              {summary.title}
            </div>
            <div className="mt-0.5 text-[10px] font-medium leading-none text-muted-foreground">
              {completed}/{STAGE_ORDER.length} stages complete
            </div>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${summary.pillCls}`}
        >
          {summary.pill}
        </span>
      </div>

      <div
        className="mt-2 grid grid-cols-4 gap-1.5"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemax={STAGE_ORDER.length}
        aria-label="Precheck progress"
      >
        {STAGE_ORDER.map((stage) => {
          const stageState = stages[stage];
          const isIssue = issueStages.has(stage);
          const isActive = stage === activeStage;

          return (
            <div
              key={stage}
              className={`min-w-0 rounded-md border px-1.5 py-1 ${isIssue ? "border-destructive/35 bg-destructive/10 text-destructive" : nodeTone[stageState]} ${isActive ? "ring-1 ring-primary/25" : ""}`}
              title={`${STAGE_LABEL[stage]}: ${stateLabel[stageState]}`}
              aria-label={`${STAGE_LABEL[stage]} ${stateLabel[stageState]}`}
            >
              <div className="flex items-center justify-center">
                {isIssue ? (
                  <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.4} />
                ) : stageState === "completed" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : stageState === "in_progress" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Circle className="h-2.5 w-2.5 fill-current" />
                )}
              </div>
              <div
                className={`mt-0.5 truncate text-center text-[10px] font-semibold leading-tight ${isIssue || isActive ? "text-current" : "text-muted-foreground"}`}
              >
                {STAGE_SHORT[stage]}
              </div>
            </div>
          );
        })}
      </div>

      {issues.length > 0 && (
        <div className="mt-2 space-y-1 rounded-md border border-destructive/20 bg-destructive/5 px-2 py-1.5">
          {issues.map((iss, idx) => (
            <div
              key={`${iss.stage}-${idx}`}
              className="grid min-w-0 grid-cols-[76px_minmax(0,1fr)] items-start gap-1.5 text-[10px] leading-tight text-destructive"
            >
              <div className="flex min-w-0 items-center gap-1 font-semibold">
                <AlertTriangle className="h-3 w-3 shrink-0" />
                <span className="truncate">{STAGE_SHORT[iss.stage]}</span>
              </div>
              <span className="min-w-0 break-words font-medium opacity-90">{iss.reason}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
