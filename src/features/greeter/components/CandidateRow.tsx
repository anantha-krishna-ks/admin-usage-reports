import { useEffect, useState } from "react";
import type { Candidate } from "../types";
import { StageChips } from "./StageChips";
import { formatElapsed, formatTime } from "../format";
import { greeterActions } from "../store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Radio,
  WifiOff,
  Lock,
  Eye,
  UserPlus2,
  Bot,
  Check,
  X,
  PauseCircle,
  RefreshCw,
  PlugZap,
  MoreHorizontal,
} from "lucide-react";

interface Props {
  candidate: Candidate;
  currentGreeterId: string;
  onView: (id: string) => void;
}

export function CandidateRow({ candidate: c, currentGreeterId, onView }: Props) {
  const lockedByOther = !!(c.lock && c.lock.greeterId !== currentGreeterId);
  const lockedByMe = !!(c.lock && c.lock.greeterId === currentGreeterId);
  const isAllocated = c.allocation === "allocated";
  const isReconnected = c.allocation === "reconnected";

  const [, force] = useState(0);
  useEffect(() => {
    if (!c.lock) return;
    const id = window.setInterval(() => force((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [c.lock]);

  const accent = isReconnected
    ? "before:bg-destructive"
    : isAllocated
      ? "before:bg-success"
      : c.allocation === "unallocated"
        ? "before:bg-info"
        : "before:bg-transparent";

  return (
    <div
      className={[
        "relative grid grid-cols-12 items-center gap-4 border-b border-border px-4 py-3 text-sm transition-colors",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-[3px]",
        accent,
        lockedByOther ? "bg-muted/30 opacity-60" : "hover:bg-muted/40",
        lockedByMe ? "bg-info/5" : "",
      ].join(" ")}
    >
      {/* Candidate */}
      <div className="col-span-3 min-w-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
            {c.firstName[0]}
            {c.lastName[0]}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-foreground">
              {c.firstName} {c.lastName}
            </div>
            <div className="truncate text-xs text-muted-foreground">{c.assessmentTitle}</div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="col-span-2">
        <div className="font-mono text-xs text-foreground">
          {formatTime(c.scheduleStart)}–{formatTime(c.scheduleEnd)}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">ID {c.id}</div>
      </div>

      {/* Precheck */}
      <div className="col-span-3 flex flex-col gap-1.5">
        <StageChips stages={c.stages} idMatch={c.idMatch} />
        {c.reconnecting && (
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
              <WifiOff className="h-3 w-3" /> Reconnect
            </span>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="col-span-2 min-w-0">
        {lockedByOther && c.lock && (
          <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning">
            <Lock className="h-3 w-3" /> {c.lock.greeterName} · {formatElapsed(c.lock.since)}
          </span>
        )}
        {lockedByMe && c.lock && (
          <span className="inline-flex items-center gap-1 rounded-full bg-info/10 px-2 py-0.5 text-[10px] font-semibold text-info">
            <Eye className="h-3 w-3" /> Reviewing · {formatElapsed(c.lock.since)}
          </span>
        )}
        {!c.lock && isAllocated && c.proctorName && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
            <Radio className="h-3 w-3" /> {c.proctorName}
          </span>
        )}
        {!c.lock && isReconnected && (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
            <WifiOff className="h-3 w-3" />
            Disconnected{c.disconnectedAt ? ` · ${formatElapsed(c.disconnectedAt)}` : ""}
          </span>
        )}
        {!c.lock && !isAllocated && !isReconnected && (
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {c.allocation === "precheck" ? "In precheck" : "Ready for review"}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="col-span-2 flex items-center justify-end gap-1.5">
        <Button
          size="sm"
          variant="ghost"
          disabled={lockedByOther}
          onClick={() => onView(c.id)}
          className="h-8 px-2.5 text-xs text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Eye className="mr-1.5 h-3.5 w-3.5" />
          View
        </Button>
        {!lockedByOther && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                aria-label="More actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {!isAllocated && !isReconnected && (
                <>
                  <DropdownMenuItem onClick={() => greeterActions.selfAllocate(c.id)}>
                    <UserPlus2 className="mr-2 h-4 w-4" /> Allocate to self
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => greeterActions.autoAllocate(c.id)}>
                    <Bot className="mr-2 h-4 w-4" /> Auto-allocate proctor
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => greeterActions.approve(c.id)}
                    className="text-success focus:text-success"
                  >
                    <Check className="mr-2 h-4 w-4" /> Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => greeterActions.hold(c.id)}
                    className="text-warning focus:text-warning"
                  >
                    <PauseCircle className="mr-2 h-4 w-4" /> Hold
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => greeterActions.reject(c.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <X className="mr-2 h-4 w-4" /> Reject
                  </DropdownMenuItem>
                </>
              )}
              {isReconnected && (
                <>
                  <DropdownMenuItem onClick={() => greeterActions.rerunPrecheck(c.id)}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Re-run precheck
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => greeterActions.reallocateToOriginalProctor(c.id)}
                    disabled={!c.proctorId}
                    className="text-success focus:text-success"
                  >
                    <PlugZap className="mr-2 h-4 w-4" /> Reallocate to original
                  </DropdownMenuItem>
                </>
              )}
              {isAllocated && (
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  Already allocated
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
