import type { Candidate } from "../types";
import { CandidateRow } from "./CandidateRow";
import { Users } from "lucide-react";

interface Props {
  candidates: Candidate[];
  currentGreeterId: string;
  onView: (id: string) => void;
}

export function CandidateTable({ candidates, currentGreeterId, onView }: Props) {
  if (candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No candidates in this queue</p>
        <p className="text-xs text-muted-foreground">Try a different filter or date.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Candidate
            </th>
            <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Schedule
            </th>
            <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Precheck Progress
            </th>
            <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              AI Identity
            </th>
            <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </th>
            <th className="px-4 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <CandidateRow
              key={c.id}
              candidate={c}
              currentGreeterId={currentGreeterId}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
