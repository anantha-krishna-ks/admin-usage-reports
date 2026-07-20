import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Candidate } from "../types";
import { CandidateRow } from "./CandidateRow";
import { Users } from "lucide-react";

interface Props {
  candidates: Candidate[];
  currentGreeterId: string;
  onView: (id: string) => void;
  onOpenGlobalChat?: () => void;
}

export function CandidateTable({ candidates, currentGreeterId, onView, onOpenGlobalChat }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: candidates.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 136,
    overscan: 8,
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="grid grid-cols-[minmax(210px,1.2fr)_minmax(118px,0.7fr)_minmax(390px,2fr)_minmax(180px,0.9fr)_minmax(140px,0.7fr)] gap-4 border-b border-border bg-muted/40 pl-4 pr-0 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <div>Candidate</div>
        <div className="pl-3">Schedule</div>
        <div>Precheck</div>
        <div className="border-l border-border/70 pl-4">Status</div>
        <div className="text-right">Actions</div>
      </div>


      <div ref={parentRef} className="min-h-[300px] flex-1 overflow-auto">
        {candidates.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-sm font-medium">No candidates match the current filters</div>
            <div className="text-xs">Try switching allocation or review status.</div>
          </div>
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((v) => {
              const c = candidates[v.index];
              return (
                <div
                  key={c.id}
                  data-index={v.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${v.start}px)`,
                  }}
                >
                  <CandidateRow
                    candidate={c}
                    currentGreeterId={currentGreeterId}
                    onView={onView}
                    onOpenGlobalChat={onOpenGlobalChat}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
