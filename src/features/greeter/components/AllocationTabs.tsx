import { Layers, Users, UserPlus, UserCheck, WifiOff } from "lucide-react";

export type AllocFilter = "precheck" | "unallocated" | "allocated" | "reconnected" | "all";

interface Props {
  active: AllocFilter;
  setActive: (a: AllocFilter) => void;
  counts: Record<AllocFilter, number>;
}

const tiles: { key: AllocFilter; label: string; Icon: typeof Users }[] = [
  { key: "all", label: "All Candidates", Icon: Layers },
  { key: "precheck", label: "In Precheck", Icon: Users },
  { key: "unallocated", label: "Unallocated", Icon: UserPlus },
  { key: "allocated", label: "Allocated", Icon: UserCheck },
  { key: "reconnected", label: "Reconnected", Icon: WifiOff },
];

export function AllocationTabs({ active, setActive, counts }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((t) => {
        const isActive = active === t.key;
        const Icon = t.Icon;
        return (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={[
              "group cursor-pointer rounded-xl p-4 text-left transition-all",
              isActive
                ? "border-2 border-primary bg-primary/[0.03]"
                : "border border-border bg-card hover:border-primary/30",
            ].join(" ")}
          >
            <div className="mb-1 flex items-center gap-1.5">
              <Icon className={`h-3 w-3 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <p
                className={[
                  "text-[11px] font-semibold uppercase tracking-wider",
                  isActive ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
              >
                {t.label}
              </p>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-foreground">
              {counts[t.key]}
            </p>
          </button>
        );
      })}
    </div>
  );
}
