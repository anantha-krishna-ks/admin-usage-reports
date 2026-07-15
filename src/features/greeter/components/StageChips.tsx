import type { Stages, StageKey } from "../types";
import { STAGE_LABELS } from "../mock-data";

const STAGE_ORDER: StageKey[] = ["eula", "system", "headshot", "room"];

const SHORT: Record<StageKey, string> = {
  eula: "EULA",
  system: "SYS",
  headshot: "HEAD",
  room: "ROOM",
};

const barBg: Record<string, string> = {
  not_started: "bg-border/70",
  in_progress: "bg-warning",
  completed: "bg-primary",
  flagged: "bg-destructive",
};

const labelColor: Record<string, string> = {
  not_started: "text-muted-foreground/70",
  in_progress: "text-warning",
  completed: "text-primary",
  flagged: "text-destructive",
};

export function StageChips({ stages }: { stages: Stages }) {
  return (
    <div className="flex items-start gap-1.5">
      {STAGE_ORDER.map((k) => {
        const state = stages[k];
        return (
          <div key={k} className="flex flex-col items-center gap-1" title={`${STAGE_LABELS[k]}: ${state.replace("_", " ")}`}>
            <div className={`h-1 w-8 rounded-full ${barBg[state]} ${state === "in_progress" ? "animate-pulse" : ""}`} />
            <span className={`text-[9px] font-semibold tracking-wide ${labelColor[state]}`}>
              {SHORT[k]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
