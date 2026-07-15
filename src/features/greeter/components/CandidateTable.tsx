import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Candidate } from "../types";
import { CandidateRow } from "./CandidateRow";

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
    estimateSize: () => 84,
    overscan: 8,
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="grid grid-cols-12 gap-3 border-b border-border bg-muted/40 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <div className="col-span-2">Candidate / Assessment</div>
        <div className="col-span-2">Schedule</div>
        <div className="col-span-3 text-center">Precheck Stages</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>

      <div ref={parentRef} className="flex-1 overflow-auto">
        {candidates.length === 0 ? (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">
            No candidates match the current filters.
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
