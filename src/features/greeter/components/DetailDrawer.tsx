import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { Candidate } from "../types";
import { STAGE_LABELS } from "../mock-data";
import { greeterActions } from "../store";
import { formatTime } from "../format";
import { StageChips } from "./StageChips";
import { AlertTriangle, Check, PauseCircle, X, UserPlus2, Bot } from "lucide-react";

interface Props {
  candidate: Candidate | null;
  onClose: () => void;
}

export function DetailDrawer({ candidate, onClose }: Props) {
  const c = candidate;
  return (
    <Sheet
      open={!!c}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent side="right" className="flex w-full max-w-xl flex-col gap-0 p-0 sm:max-w-xl">
        {c && (
          <>
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle className="text-base">
                {c.firstName} {c.lastName}
              </SheetTitle>
              <SheetDescription className="text-xs">
                {c.assessmentTitle} · {formatTime(c.scheduleStart)}–{formatTime(c.scheduleEnd)} · ID {c.id}
              </SheetDescription>
              <div className="mt-2 flex items-center gap-3">
                <StageChips stages={c.stages} />
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {Object.entries(c.stages).map(([k, v]) => `${STAGE_LABELS[k as keyof typeof STAGE_LABELS]}: ${v.replace("_", " ")}`).join(" · ")}
                </span>
              </div>
            </SheetHeader>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 text-sm">
              <section>
                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">System Check</h3>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <Cell k="OS" v={c.system.os} />
                  <Cell k="Browser" v={c.system.browser} />
                  <Cell k="RAM" v={`${c.system.ramGb} GB`} />
                  <Cell k="Latency" v={`${c.system.latencyMs} ms`} tone={c.system.latencyMs > 150 ? "warn" : "ok"} />
                  <Cell k="Mic" v={c.system.mic ? "Active" : "Missing"} tone={c.system.mic ? "ok" : "bad"} />
                  <Cell k="Camera" v={c.system.cam ? "Active" : "Missing"} tone={c.system.cam ? "ok" : "bad"} />
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Headshot vs ID</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Thumb label="Headshot" />
                  <Thumb label="Government ID" />
                </div>
                <div className="mt-3 flex items-center justify-between rounded border border-border bg-muted/40 px-3 py-2">
                  <span className="text-xs text-muted-foreground">Match score</span>
                  <span className="font-mono text-sm text-foreground">{c.idMatch.score}%</span>
                  <span
                    className={[
                      "rounded px-2 py-0.5 text-[10px] font-bold uppercase",
                      c.idMatch.verdict === "match" && "bg-success/15 text-success",
                      c.idMatch.verdict === "review" && "bg-warning/15 text-warning",
                      c.idMatch.verdict === "mismatch" && "bg-destructive/15 text-destructive",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {c.idMatch.verdict}
                  </span>
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Room Scan</h3>
                <Thumb label="Room Scan" wide />
                <ul className="mt-2 space-y-1">
                  {c.roomScan.flags.length === 0 ? (
                    <li className="flex items-center gap-2 text-xs text-success">
                      <Check className="h-3 w-3" /> No flags detected
                    </li>
                  ) : (
                    c.roomScan.flags.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-warning">
                        <AlertTriangle className="h-3 w-3" /> {f}
                      </li>
                    ))
                  )}
                </ul>
              </section>
            </div>

            <div className="border-t border-border p-3">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  className="bg-success text-success-foreground hover:bg-success/90"
                  onClick={() => { greeterActions.approve(c.id); onClose(); }}
                >
                  <Check className="mr-1 h-3 w-3" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-warning/40 text-warning hover:bg-warning/10"
                  onClick={() => { greeterActions.hold(c.id); onClose(); }}
                >
                  <PauseCircle className="mr-1 h-3 w-3" /> Hold
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive/40 text-destructive hover:bg-destructive/10"
                  onClick={() => { greeterActions.reject(c.id); onClose(); }}
                >
                  <X className="mr-1 h-3 w-3" /> Reject
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => { greeterActions.autoAllocate(c.id); onClose(); }}
                >
                  <Bot className="mr-1 h-3 w-3" /> Auto-allocate
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-2"
                  onClick={() => { greeterActions.selfAllocate(c.id); onClose(); }}
                >
                  <UserPlus2 className="mr-1 h-3 w-3" /> Allocate to self
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Cell({ k, v, tone }: { k: string; v: string; tone?: "ok" | "warn" | "bad" }) {
  const toneClass =
    tone === "ok"
      ? "text-success"
      : tone === "warn"
        ? "text-warning"
        : tone === "bad"
          ? "text-destructive"
          : "text-foreground";
  return (
    <div className="rounded border border-border bg-muted/30 p-2">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className={`text-xs ${toneClass}`}>{v}</div>
    </div>
  );
}

function Thumb({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded border border-border bg-muted/40 ${
        wide ? "aspect-video" : "aspect-square"
      }`}
    >
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="absolute left-2 top-2 rounded bg-background/70 px-1.5 py-0.5 text-[9px] font-bold uppercase text-foreground">
        Preview
      </span>
    </div>
  );
}
