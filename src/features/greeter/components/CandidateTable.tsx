import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Candidate } from "../types";
import { CandidateRow } from "./CandidateRow";
import { Users } from "lucide-react";

interface Props {
  candidates: Candidate[];
  currentGreeterId: string;
  onView: (id: string) => void;
}

export function CandidateTable({ candidates, currentGreeterId, onView }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: candidates.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 8,
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <div className="col-span-3">Candidate</div>
        <div className="col-span-2">Schedule</div>
        <div className="col-span-3">Precheck</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
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
