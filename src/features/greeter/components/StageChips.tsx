import type { Stages, StageKey } from "../types";
import { STAGE_LABELS } from "../mock-data";

const STAGE_ORDER: StageKey[] = ["eula", "system", "headshot", "room"];

const SHORT_LABELS: Record<StageKey, string> = {
  eula: "EULA",
  system: "System Check",
  headshot: "Headshot/ID",
  room: "Room Scan",
};

const dotStyles: Record<string, string> = {
  not_started: "bg-muted border-border",
  in_progress: "bg-warning border-warning animate-pulse",
  completed: "bg-success border-success",
  flagged: "bg-destructive border-destructive",
};

const labelStyles: Record<string, string> = {
  not_started: "text-muted-foreground",
  in_progress: "text-warning",
  completed: "text-success",
  flagged: "text-destructive",
};

const connectorStyles: Record<string, string> = {
  not_started: "bg-border",
  in_progress: "bg-warning",
  completed: "bg-success",
  flagged: "bg-destructive",
};

export function StageChips({ stages }: { stages: Stages }) {
  return (
    <div className="flex w-full items-start">
      {STAGE_ORDER.map((k, i) => {
        const state = stages[k];
        const prevState = i > 0 ? stages[STAGE_ORDER[i - 1]] : null;
        const connectorState =
          prevState === "completed" ? "completed" : "not_started";
        return (
          <div
            key={k}
            className="flex min-w-0 flex-1 flex-col items-center first:flex-none first:items-start last:flex-none last:items-end"
          >
            <div className="flex w-full items-center">
              {i > 0 && (
                <div
                  className={`h-0.5 flex-1 ${connectorStyles[connectorState]}`}
                />
              )}
              <div
                title={`${STAGE_LABELS[k]}: ${state.replace("_", " ")}`}
                aria-label={`${STAGE_LABELS[k]} ${state}`}
                className={`h-3 w-3 shrink-0 rounded-full border-2 ${dotStyles[state]}`}
              />
              {i < STAGE_ORDER.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${
                    connectorStyles[state === "completed" ? "completed" : "not_started"]
                  }`}
                />
              )}
            </div>
            <div
              className={`mt-1 whitespace-nowrap text-[10px] font-medium ${labelStyles[state]}`}
            >
              {SHORT_LABELS[k]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
