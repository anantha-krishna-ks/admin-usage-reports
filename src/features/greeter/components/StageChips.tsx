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

export function StageChips({ stages, idMatch }: StageChipsProps) {
  const completed = STAGE_ORDER.filter((k) => stages[k] === "completed").length;
  const flagged = STAGE_ORDER.find((k) => stages[k] === "flagged");
  const inProgress = STAGE_ORDER.find((k) => stages[k] === "in_progress");
  const idIssue = idMatch && idMatch.verdict !== "match";
  const hasIssue = !!flagged || !!idIssue;

  const status = hasIssue
    ? { text: "Action required", cls: "text-destructive", dot: "bg-destructive animate-pulse" }
    : completed === STAGE_ORDER.length
      ? { text: "Complete", cls: "text-success", dot: "bg-success" }
      : inProgress
        ? { text: `In ${STAGE_LABEL[inProgress]}`, cls: "text-warning", dot: "bg-warning animate-pulse" }
        : { text: "Not started", cls: "text-muted-foreground", dot: "bg-muted-foreground/40" };

  const errorText = flagged
    ? `${STAGE_LABEL[flagged]} flagged`
    : idIssue
      ? `AI ID ${idMatch!.verdict === "mismatch" ? "not matched" : "needs review"} · score ${idMatch!.score}`
      : null;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {/* Segmented tracker */}
      <div
        className="flex h-1.5 w-full gap-1"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemax={STAGE_ORDER.length}
        aria-label="Precheck progress"
      >
        {STAGE_ORDER.map((k) => (
          <div
            key={k}
            title={`${STAGE_LABEL[k]}: ${stages[k].replace("_", " ")}`}
            className={`flex-1 rounded-full ${segColor[stages[k]]}`}
          />
        ))}
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

      {/* Error line — inline, subtle, no big banner */}
      {errorText && (
        <div className="flex items-center gap-1 text-[11px] text-destructive">
          <AlertTriangle className="h-3 w-3 shrink-0" strokeWidth={2.5} />
          <span className="truncate font-medium">{errorText}</span>
        </div>
      )}
    </div>
  );
}
