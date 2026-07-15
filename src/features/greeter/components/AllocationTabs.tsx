import { Users, UserCheck, UserPlus, WifiOff, Layers } from "lucide-react";

export type AllocFilter = "precheck" | "unallocated" | "allocated" | "reconnected" | "all";

interface Props {
  active: AllocFilter;
  setActive: (a: AllocFilter) => void;
  counts: Record<AllocFilter, number>;
}

const tiles: {
  key: AllocFilter;
  label: string;
  Icon: typeof Users;
  ring: string;
  iconBg: string;
  iconText: string;
}[] = [
  { key: "all", label: "All Candidates", Icon: Layers, ring: "ring-primary/40", iconBg: "bg-primary/10", iconText: "text-primary" },
  { key: "precheck", label: "In Precheck", Icon: Users, ring: "ring-muted-foreground/40", iconBg: "bg-muted", iconText: "text-muted-foreground" },
  { key: "unallocated", label: "Unallocated", Icon: UserPlus, ring: "ring-info/40", iconBg: "bg-info/10", iconText: "text-info" },
  { key: "allocated", label: "Allocated", Icon: UserCheck, ring: "ring-success/40", iconBg: "bg-success/10", iconText: "text-success" },
  { key: "reconnected", label: "Reconnected", Icon: WifiOff, ring: "ring-destructive/40", iconBg: "bg-destructive/10", iconText: "text-destructive" },
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
              "group flex items-center gap-3 rounded-xl border bg-card p-3 text-left transition-all",
              isActive
                ? `border-transparent ring-2 ${t.ring} shadow-sm`
                : "border-border hover:border-foreground/20 hover:shadow-sm",
            ].join(" ")}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.iconBg} ${t.iconText}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {t.label}
              </div>
              <div className="text-xl font-semibold tabular-nums text-foreground">
                {counts[t.key]}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
