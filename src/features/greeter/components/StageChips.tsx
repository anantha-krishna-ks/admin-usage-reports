import type { Stages, StageKey, StageState } from "../types";
import {
  FileCheck2,
  MonitorCheck,
  ScanFace,
  ScanLine,
  Check,
  AlertTriangle,
  Loader2,
  Minus,
} from "lucide-react";

const STAGE_ORDER: StageKey[] = ["eula", "system", "headshot", "room"];

const STAGE_META: Record<StageKey, { label: string; Icon: typeof Check }> = {
  eula: { label: "EULA", Icon: FileCheck2 },
  system: { label: "System", Icon: MonitorCheck },
  headshot: { label: "Headshot/ID", Icon: ScanFace },
  room: { label: "Room Scan", Icon: ScanLine },
};

const stateStyles: Record<
  StageState,
  { chip: string; icon: string; label: string; indicator: JSX.Element }
> = {
  completed: {
    chip: "border-success/30 bg-success/10",
    icon: "text-success",
    label: "text-success",
    indicator: <Check className="h-2.5 w-2.5" strokeWidth={3} />,
  },
  in_progress: {
    chip: "border-warning/40 bg-warning/10",
    icon: "text-warning",
    label: "text-warning",
    indicator: <Loader2 className="h-2.5 w-2.5 animate-spin" strokeWidth={3} />,
  },
  flagged: {
    chip: "border-destructive/40 bg-destructive/10",
    icon: "text-destructive",
    label: "text-destructive",
    indicator: <AlertTriangle className="h-2.5 w-2.5" strokeWidth={3} />,
  },
  not_started: {
    chip: "border-border bg-muted/40",
    icon: "text-muted-foreground/70",
    label: "text-muted-foreground",
    indicator: <Minus className="h-2.5 w-2.5" strokeWidth={3} />,
  },
};

interface StageChipsProps {
  stages: Stages;
  idMatch?: { verdict: "match" | "review" | "mismatch"; score: number };
}

export function StageChips({ stages, idMatch }: StageChipsProps) {
  const completed = STAGE_ORDER.filter((k) => stages[k] === "completed").length;
  const total = STAGE_ORDER.length;
  const hasFlag = STAGE_ORDER.some((k) => stages[k] === "flagged");
  const inProgress = STAGE_ORDER.find((k) => stages[k] === "in_progress");
  const idIssue = idMatch && idMatch.verdict !== "match";

  const summary = hasFlag
    ? { text: "Attention needed", cls: "bg-destructive/10 text-destructive" }
    : completed === total
      ? { text: "Precheck complete", cls: "bg-success/10 text-success" }
      : inProgress
        ? {
            text: `In ${STAGE_META[inProgress].label}`,
            cls: "bg-warning/10 text-warning",
          }
        : { text: "Awaiting start", cls: "bg-muted text-muted-foreground" };

  return (
    <div className="flex w-full flex-col gap-2">
      {/* Header: progress + summary */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-1 w-16 overflow-hidden rounded-full bg-muted">
            {STAGE_ORDER.map((k) => {
              const s = stages[k];
              const color =
                s === "completed"
                  ? "bg-success"
                  : s === "flagged"
                    ? "bg-destructive"
                    : s === "in_progress"
                      ? "bg-warning"
                      : "bg-transparent";
              return (
                <div
                  key={k}
                  className={`h-full flex-1 border-r border-background last:border-r-0 ${color}`}
                />
              );
            })}
          </div>
          <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">
            {completed}/{total}
          </span>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${summary.cls}`}
        >
          {summary.text}
        </span>
      </div>

      {/* Stage chips */}
      <div className="grid grid-cols-4 gap-1">
        {STAGE_ORDER.map((k) => {
          const s = stages[k];
          const meta = STAGE_META[k];
          const styles = stateStyles[s];
          const Icon = meta.Icon;
          return (
            <div
              key={k}
              title={`${meta.label}: ${s.replace("_", " ")}`}
              className={`flex items-center gap-1 rounded-md border px-1.5 py-1 ${styles.chip}`}
            >
              <div className="relative shrink-0">
                <Icon className={`h-3.5 w-3.5 ${styles.icon}`} />
                <span
                  className={`absolute -bottom-0.5 -right-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-background ${styles.icon}`}
                >
                  {styles.indicator}
                </span>
              </div>
              <span
                className={`truncate text-[10px] font-medium ${styles.label}`}
              >
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Issue banner */}
      {idIssue && (
        <div className="flex items-start gap-1.5 rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-destructive" />
          <div className="min-w-0 text-[10px] leading-tight">
            <span className="font-semibold text-destructive">
              AI ID {idMatch!.verdict === "mismatch" ? "not matched" : "needs review"}
            </span>
            <span className="text-muted-foreground"> · score {idMatch!.score}</span>
          </div>
        </div>
      )}
    </div>
  );
}
