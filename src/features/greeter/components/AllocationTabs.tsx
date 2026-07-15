export type AllocFilter = "precheck" | "unallocated" | "allocated" | "reconnected" | "all";

interface Props {
  active: AllocFilter;
  setActive: (a: AllocFilter) => void;
  counts: Record<AllocFilter, number>;
}

const tabs: { key: AllocFilter; label: string; dot: string }[] = [
  { key: "precheck", label: "Precheck", dot: "bg-muted-foreground/50" },
  { key: "unallocated", label: "Unallocated", dot: "bg-info" },
  { key: "allocated", label: "Allocated", dot: "bg-success" },
  { key: "reconnected", label: "Reconnected", dot: "bg-destructive" },
  { key: "all", label: "All", dot: "bg-foreground" },
];

export function AllocationTabs({ active, setActive, counts }: Props) {
  return (
    <div className="flex border-b border-border">
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={[
              "group inline-flex items-center gap-2 border-b-2 px-5 py-2.5 text-xs font-medium transition-colors",
              isActive
                ? "border-info text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <span className={`h-2 w-2 rounded-sm ${t.dot}`} />
            {t.label}
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              {counts[t.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
