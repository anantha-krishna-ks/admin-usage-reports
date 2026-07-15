import type { AllocationStatus } from "../types";

const styles: Record<AllocationStatus, string> = {
  precheck: "bg-muted text-muted-foreground",
  unallocated: "bg-info/10 text-info ring-1 ring-info/30",
  allocated: "bg-success/10 text-success ring-1 ring-success/30",
  reconnected: "bg-destructive/10 text-destructive ring-1 ring-destructive/30",
};

const labels: Record<AllocationStatus, string> = {
  precheck: "Precheck",
  unallocated: "Unallocated",
  allocated: "Allocated",
  reconnected: "Reconnected",
};

export function AllocationBadge({ status }: { status: AllocationStatus }) {
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
