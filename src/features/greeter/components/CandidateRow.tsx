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
  MessageSquare,
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
        "relative grid grid-cols-[minmax(210px,1.2fr)_minmax(118px,0.7fr)_minmax(390px,2fr)_minmax(180px,0.9fr)_minmax(110px,0.6fr)] items-center gap-4 border-b border-border px-4 py-3 text-sm transition-colors",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-[3px]",
        accent,
        lockedByOther ? "bg-muted/30 opacity-60" : "hover:bg-muted/40",
        lockedByMe ? "bg-info/5" : "",
      ].join(" ")}
    >
      {/* Candidate */}
      <div className="min-w-0">
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
      <div>
        <div className="font-mono text-xs text-foreground">
          {formatTime(c.scheduleStart)}–{formatTime(c.scheduleEnd)}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">ID {c.id}</div>
      </div>

      {/* Precheck */}
      <div className="min-w-0">
        <StageChips stages={c.stages} idMatch={c.idMatch} />
        {c.reconnecting && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
              <WifiOff className="h-3 w-3" /> Reconnect
            </span>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="min-w-0 border-l border-border/70 pl-4">
        {lockedByOther && c.lock ? (
          <StatusCard
            tone="warning"
            icon={<Lock className="h-3.5 w-3.5" />}
            label={c.lock.greeterName}
            sub={`Locked · ${formatElapsed(c.lock.since)}`}
          />
        ) : lockedByMe && c.lock ? (
          <StatusCard
            tone="info"
            icon={<Eye className="h-3.5 w-3.5" />}
            label="Reviewing"
            sub={formatElapsed(c.lock.since)}
          />
        ) : isAllocated && c.proctorName ? (
          <StatusCard
            tone="success"
            icon={<Radio className="h-3.5 w-3.5" />}
            label={c.proctorName}
            sub="Allocated"
          />
        ) : isReconnected ? (
          <StatusCard
            tone="destructive"
            icon={<WifiOff className="h-3.5 w-3.5" />}
            label="Disconnected"
            sub={c.disconnectedAt ? formatElapsed(c.disconnectedAt) : "Reconnect"}
          />
        ) : (
          <StatusCard
            tone="muted"
            icon={<span className="h-2 w-2 rounded-full bg-current" />}
            label={c.allocation === "precheck" ? "In precheck" : "Ready for review"}
            sub="Unassigned"
          />
        )}
      </div>


      {/* Actions */}
      <div className="flex items-center justify-end gap-1.5">
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

type Tone = "success" | "warning" | "info" | "destructive" | "muted";

function StatusCard({
  tone,
  icon,
  label,
  sub,
}: {
  tone: Tone;
  icon: React.ReactNode;
  label: string;
  sub?: string;
}) {
  const styles: Record<Tone, { wrap: string; chip: string; dot: string; text: string }> = {
    success: {
      wrap: "border-success/30 bg-success/5",
      chip: "bg-success/15 text-success",
      dot: "bg-success",
      text: "text-success",
    },
    warning: {
      wrap: "border-warning/30 bg-warning/5",
      chip: "bg-warning/15 text-warning",
      dot: "bg-warning",
      text: "text-warning",
    },
    info: {
      wrap: "border-info/30 bg-info/5",
      chip: "bg-info/15 text-info",
      dot: "bg-info",
      text: "text-info",
    },
    destructive: {
      wrap: "border-destructive/30 bg-destructive/5",
      chip: "bg-destructive/15 text-destructive",
      dot: "bg-destructive",
      text: "text-destructive",
    },
    muted: {
      wrap: "border-border bg-muted/40",
      chip: "bg-muted text-muted-foreground",
      dot: "bg-muted-foreground/60",
      text: "text-muted-foreground",
    },
  };
  const s = styles[tone];
  return (
    <div className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${s.wrap}`}>
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${s.chip}`}>
        {icon}
      </span>
      <div className="min-w-0 leading-tight">
        <div className={`truncate text-xs font-semibold ${s.text}`}>{label}</div>
        {sub && (
          <div className="truncate text-[10px] font-medium text-muted-foreground">{sub}</div>
        )}
      </div>
    </div>
  );
}

