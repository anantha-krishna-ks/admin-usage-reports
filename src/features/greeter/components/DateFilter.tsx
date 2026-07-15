import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { formatDateKey } from "../format";

interface Props {
  dateOffset: -1 | 0 | 1;
  setOffset: (o: -1 | 0 | 1) => void;
  currentKey: string;
}

const opts: { key: -1 | 0 | 1; label: string }[] = [
  { key: -1, label: "Yesterday" },
  { key: 0, label: "Today" },
  { key: 1, label: "Tomorrow" },
];

export function DateFilter({ dateOffset, setOffset, currentKey }: Props) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="inline-flex items-center gap-1 rounded-full border border-border bg-background p-1 shadow-sm">
        {opts.map((o) => {
          const active = dateOffset === o.key;
          return (
            <button
              key={o.key}
              onClick={() => setOffset(o.key)}
              className={[
                "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {o.key === -1 && <ChevronLeft className="h-3 w-3" />}
              {o.label}
              {o.key === 1 && <ChevronRight className="h-3 w-3" />}
            </button>
          );
        })}
      </div>
      <div className="hidden items-center gap-1.5 rounded-md bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground md:inline-flex">
        <Calendar className="h-3 w-3" />
        {formatDateKey(currentKey)}
      </div>
    </div>
  );
}
