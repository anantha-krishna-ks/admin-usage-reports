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
  ShieldAlert,
  ShieldCheck,
  MoreHorizontal,
  Radio,
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

  const allocationChip = () => {
    if (isReconnected)
      return (
        <span className="inline-flex items-center gap-1 rounded bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-destructive">
          <WifiOff className="h-3 w-3" /> Reconnect
        </span>
      );
    if (isAllocated)
      return (
        <span className="inline-flex items-center gap-1 rounded bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
          <Radio className="h-3 w-3" /> Allocated
        </span>
      );
    if (c.allocation === "unallocated")
      return (
        <span className="rounded bg-info/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-info">
          Unallocated
        </span>
      );
    return (
      <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        In Precheck
      </span>
    );
  };

  return (
    <tr
      className={[
        "group border-b border-border transition-colors last:border-b-0",
        lockedByOther ? "bg-muted/20 opacity-60" : "hover:bg-muted/30",
        lockedByMe ? "bg-info/[0.04]" : "",
      ].join(" ")}
    >
      {/* Candidate */}
      <td className="px-4 py-3.5 align-middle">
        <div className="flex items-center gap-2.5">
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
      </td>

      {/* Schedule */}
      <td className="px-4 py-3.5 align-middle">
        <div className="font-mono text-xs text-foreground">
          {formatTime(c.scheduleStart)}–{formatTime(c.scheduleEnd)}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">ID {c.id}</div>
      </td>

      {/* Precheck */}
      <td className="px-4 py-3.5 align-middle">
        <StageChips stages={c.stages} />
      </td>

      {/* AI Identity */}
      <td className="px-4 py-3.5 align-middle">
        {c.idMatch.verdict === "match" ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success"
            title={`AI ID match score ${c.idMatch.score}`}
          >
            <ShieldCheck className="h-3 w-3" /> ID Verified
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive"
            title={`AI ID ${c.idMatch.verdict} · score ${c.idMatch.score}`}
          >
            <ShieldAlert className="h-3 w-3" /> AI Not Matched
          </span>
        )}
      </td>

      {/* Allocation / lock status */}
      <td className="px-4 py-3.5 align-middle">
        <div className="flex flex-col gap-1">
          {allocationChip()}
          {lockedByOther && c.lock && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-warning">
              <Lock className="h-3 w-3" /> {c.lock.greeterName} · {formatElapsed(c.lock.since)}
            </span>
          )}
          {lockedByMe && c.lock && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-info">
              <Eye className="h-3 w-3" /> Reviewing · {formatElapsed(c.lock.since)}
            </span>
          )}
          {!c.lock && isAllocated && c.proctorName && (
            <span className="truncate text-[10px] text-muted-foreground">to {c.proctorName}</span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5 align-middle text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            size="icon"
            variant="ghost"
            disabled={lockedByOther}
            onClick={() => onView(c.id)}
            className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
            title="View candidate"
          >
            <Eye className="h-4 w-4" />
          </Button>
          {!lockedByOther && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
      </td>
    </tr>
  );
}
