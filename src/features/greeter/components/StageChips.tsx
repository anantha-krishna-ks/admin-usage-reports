import type { Stages, StageKey, StageState } from "../types";
import { AlertTriangle } from "lucide-react";

const STAGE_ORDER: StageKey[] = ["eula", "system", "headshot", "room"];

const STAGE_LABEL: Record<StageKey, string> = {
  eula: "EULA",
  system: "System",
  headshot: "Headshot/ID",
  room: "Room Scan",
};

const segColor: Record<StageState, string> = {
  completed: "bg-success",
  in_progress: "bg-warning",
  flagged: "bg-destructive",
  not_started: "bg-muted",
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
    ? { text: "Action required", cls: "text-destructive", dot: "bg-destructive animate-pulse" }
    : completed === STAGE_ORDER.length
      ? { text: "Complete", cls: "text-success", dot: "bg-success" }
      : inProgress
        ? { text: `In ${STAGE_LABEL[inProgress]}`, cls: "text-warning", dot: "bg-warning animate-pulse" }
        : { text: "Not started", cls: "text-muted-foreground", dot: "bg-muted-foreground/40" };

  return (
    <div className="flex w-full flex-col gap-1.5">
      {/* Segmented tracker with issue markers */}
      <div
        className="flex h-1.5 w-full gap-1"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemax={STAGE_ORDER.length}
        aria-label="Precheck progress"
      >
        {STAGE_ORDER.map((k) => {
          const isIssue = issueStages.has(k);
          return (
            <div
              key={k}
              title={`${STAGE_LABEL[k]}: ${stages[k].replace("_", " ")}`}
              className={`flex-1 rounded-full ${isIssue ? "bg-destructive ring-2 ring-destructive/25" : segColor[stages[k]]}`}
            />
          );
        })}
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground">
          Precheck <span className="text-foreground/70">{completed}/{STAGE_ORDER.length}</span>
        </span>
        <span className={`flex items-center gap-1 text-[11px] font-semibold ${status.cls}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.text}
        </span>
      </div>

      {/* Grouped issue card — clearly ties each error to its stage */}
      {hasIssue && (
        <div className="mt-0.5 flex flex-col gap-1 rounded-md border border-destructive/30 bg-destructive/5 p-1.5">
          {issues.map((iss, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <AlertTriangle
                className="mt-0.5 h-3 w-3 shrink-0 text-destructive"
                strokeWidth={2.5}
              />
              <div className="flex min-w-0 flex-wrap items-center gap-1">
                <span className="rounded-sm bg-destructive/15 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-destructive">
                  {STAGE_LABEL[iss.stage]}
                </span>
                <span className="text-[11px] font-medium leading-tight text-destructive">
                  {iss.reason}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
