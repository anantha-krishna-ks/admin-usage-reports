import { useEffect, useState } from "react";
import type { Candidate } from "../types";
import { StageChips } from "./StageChips";
import { formatElapsed, formatTime } from "../format";
import { greeterActions } from "../store";
import { Button } from "@/components/ui/button";
import { Radio, WifiOff, Lock, Eye, UserPlus2, Bot, Check, X, PauseCircle, RefreshCw, PlugZap, ScanFace, ShieldAlert } from "lucide-react";

interface Props {
  candidate: Candidate;
  currentGreeterId: string;
  onView: (id: string) => void;
}

export function CandidateRow({ candidate: c, currentGreeterId, onView }: Props) {
  const lockedByOther = c.lock && c.lock.greeterId !== currentGreeterId;
  const lockedByMe = c.lock && c.lock.greeterId === currentGreeterId;
  const isAllocated = c.allocation === "allocated";
  const isReconnected = c.allocation === "reconnected";

  const [, force] = useState(0);
  useEffect(() => {
    if (!c.lock) return;
    const id = window.setInterval(() => force((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [c.lock]);

  return (
    <div
      className={[
        "grid grid-cols-12 items-center gap-3 border-b border-border px-4 py-3 text-sm transition-colors",
        lockedByOther ? "bg-muted/30 opacity-60" : "hover:bg-muted/40",
        c.reconnecting || isReconnected ? "border-l-2 border-l-destructive" : "",
        isAllocated ? "border-l-2 border-l-success" : "",
        lockedByMe ? "bg-info/5 ring-1 ring-inset ring-info/30" : "",
      ].join(" ")}
    >
      <div className="col-span-2 min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-foreground">
            {c.firstName} {c.lastName}
          </span>
          {c.reconnecting && (
            <span className="inline-flex items-center gap-1 rounded bg-destructive/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-destructive">
              <WifiOff className="h-3 w-3" /> Reconnect
            </span>
          )}
        </div>
        <div className="truncate text-xs text-muted-foreground">{c.assessmentTitle}</div>
      </div>

      <div className="col-span-2 font-mono text-xs text-muted-foreground">
        <div className="text-foreground">
          {formatTime(c.scheduleStart)} – {formatTime(c.scheduleEnd)}
        </div>
        <div className="text-[10px]">ID {c.id}</div>
      </div>

      <div className="col-span-3 flex flex-col items-center justify-center gap-1 px-2">
        <StageChips stages={c.stages} />
        {c.idMatch.verdict === "match" ? (
          <span
            className="inline-flex items-center gap-1 rounded bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold text-success"
            title={`AI ID match score ${c.idMatch.score}`}
          >
            <ScanFace className="h-3 w-3" /> AI matched
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1 rounded bg-destructive/15 px-1.5 py-0.5 text-[10px] font-semibold text-destructive"
            title={`AI ID ${c.idMatch.verdict} · score ${c.idMatch.score}`}
          >
            <ShieldAlert className="h-3 w-3" /> AI not matched
          </span>
        )}
      </div>

      <div className="col-span-2 flex flex-col gap-1 text-xs">
        {lockedByOther && c.lock && (
          <span className="inline-flex w-fit items-center gap-1 rounded bg-warning/15 px-1.5 py-0.5 text-[10px] font-semibold text-warning">
            <Lock className="h-3 w-3" /> {c.lock.greeterName} · {formatElapsed(c.lock.since)}
          </span>
        )}
        {lockedByMe && c.lock && (
          <span className="inline-flex w-fit items-center gap-1 rounded bg-info/15 px-1.5 py-0.5 text-[10px] font-semibold text-info">
            <Eye className="h-3 w-3" /> You are reviewing · {formatElapsed(c.lock.since)}
          </span>
        )}
        {isAllocated && c.proctorName && (
          <span className="inline-flex w-fit items-center gap-1 rounded bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold text-success">
            <Radio className="h-3 w-3" /> Proctor: {c.proctorName}
          </span>
        )}
        {isReconnected && (
          <>
            <span className="inline-flex w-fit items-center gap-1 rounded bg-destructive/15 px-1.5 py-0.5 text-[10px] font-semibold text-destructive">
              <WifiOff className="h-3 w-3" /> Disconnected
              {c.disconnectedAt ? ` · ${formatElapsed(c.disconnectedAt)}` : ""}
            </span>
            {c.proctorName && (
              <span className="inline-flex w-fit items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                <Radio className="h-3 w-3" /> Original: {c.proctorName}
              </span>
            )}
            {c.disconnectReason && (
              <span className="text-[10px] text-muted-foreground">{c.disconnectReason}</span>
            )}
          </>
        )}
        {!c.lock && !isAllocated && !isReconnected && (
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            {c.allocation === "precheck" ? "In precheck" : "Ready for review"}
          </span>
        )}
        {c.reviewed && (
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Marked {c.reviewed}
          </span>
        )}
      </div>

      <div className="col-span-3 flex flex-wrap items-center justify-end gap-1.5">
        <Button
          size="sm"
          variant="secondary"
          disabled={!!lockedByOther}
          onClick={() => onView(c.id)}
          className="h-7 px-2 text-[11px]"
        >
          <Eye className="mr-1 h-3 w-3" />
          View
        </Button>
        {!isAllocated && !isReconnected && !lockedByOther && (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => greeterActions.selfAllocate(c.id)}
              className="h-7 px-2 text-[11px]"
              title="Allocate to self"
            >
              <UserPlus2 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => greeterActions.autoAllocate(c.id)}
              className="h-7 px-2 text-[11px]"
              title="Auto-allocate proctor (round-robin)"
            >
              <Bot className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => greeterActions.approve(c.id)}
              className="h-7 px-2 text-[11px] text-success hover:text-success"
              title="Approve"
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => greeterActions.hold(c.id)}
              className="h-7 px-2 text-[11px] text-warning hover:text-warning"
              title="Hold"
            >
              <PauseCircle className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => greeterActions.reject(c.id)}
              className="h-7 px-2 text-[11px] text-destructive hover:text-destructive"
              title="Reject"
            >
              <X className="h-3 w-3" />
            </Button>
          </>
        )}
        {isReconnected && !lockedByOther && (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => greeterActions.rerunPrecheck(c.id)}
              className="h-7 px-2 text-[11px]"
              title="Re-run precheck steps"
            >
              <RefreshCw className="mr-1 h-3 w-3" /> Re-precheck
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => greeterActions.reallocateToOriginalProctor(c.id)}
              className="h-7 px-2 text-[11px] text-success hover:text-success"
              title={`Reallocate to ${c.proctorName ?? "original proctor"}`}
              disabled={!c.proctorId}
            >
              <PlugZap className="mr-1 h-3 w-3" /> Reallocate
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
