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
  completed: "border-success/40 bg-success/10 text-success",
  in_progress: "border-warning/40 bg-warning/10 text-warning",
  flagged: "border-destructive/40 bg-destructive/10 text-destructive",
  not_started: "border-border bg-background text-muted-foreground",
};

const segmentTone: Record<StageState, string> = {
  completed: "bg-success/40",
  in_progress: "bg-warning/40",
  flagged: "bg-destructive/40",
  not_started: "bg-border",
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
    <div className="w-full space-y-2">
      {/* Summary header */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 truncate text-xs font-semibold text-foreground">
          {summary.title}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-[10px] font-medium text-muted-foreground">
            {completed}/{STAGE_ORDER.length}
          </span>
          <span
            className={`rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${summary.pillCls}`}
          >
            {summary.pill}
          </span>
        </div>
      </div>

      {/* Stepper */}
      <div
        className="flex items-start"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemax={STAGE_ORDER.length}
        aria-label="Precheck progress"
      >
        {STAGE_ORDER.map((stage, index) => {
          const stageState = stages[stage];
          const isIssue = issueStages.has(stage);
          const isActive = stage === activeStage;
          const nextState = index < STAGE_ORDER.length - 1 ? stages[STAGE_ORDER[index + 1]] : null;

          return (
            <div key={stage} className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {/* left connector */}
                <div
                  className={`h-0.5 flex-1 ${index === 0 ? "bg-transparent" : segmentTone[stageState]}`}
                />
                {/* node */}
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${nodeTone[stageState]} ${isActive ? "ring-2 ring-primary/25 ring-offset-1 ring-offset-background" : ""}`}
                  title={`${STAGE_LABEL[stage]}: ${stateLabel[stageState]}`}
                  aria-label={`${STAGE_LABEL[stage]} ${stateLabel[stageState]}`}
                >
                  {isIssue ? (
                    <AlertTriangle className="h-3 w-3" strokeWidth={2.5} />
                  ) : stageState === "completed" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : stageState === "in_progress" ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Circle className="h-2 w-2 fill-current" />
                  )}
                </div>
                {/* right connector */}
                <div
                  className={`h-0.5 flex-1 ${index === STAGE_ORDER.length - 1 || !nextState ? "bg-transparent" : segmentTone[nextState]}`}
                />
              </div>
              <div
                className={`mt-1 w-full truncate text-center text-[10px] font-semibold leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}
              >
                {STAGE_SHORT[stage]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Issues */}
      {issues.length > 0 && (
        <div className="space-y-1 rounded-md border border-destructive/20 bg-destructive/5 px-2 py-1.5">
          {issues.map((iss, idx) => (
            <div
              key={`${iss.stage}-${idx}`}
              className="flex min-w-0 items-start gap-1.5 text-[10px] leading-tight text-destructive"
            >
              <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="font-semibold">{STAGE_LABEL[iss.stage]}:</span>{" "}
                <span className="font-medium opacity-90">{iss.reason}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
