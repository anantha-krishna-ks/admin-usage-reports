import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateKey } from "../format";

interface Props {
  dateOffset: -1 | 0 | 1;
  setOffset: (o: -1 | 0 | 1) => void;
  currentKey: string;
}

export function DateFilter({ dateOffset, setOffset, currentKey }: Props) {
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
      <Button
        size="sm"
        variant={dateOffset === -1 ? "default" : "ghost"}
        onClick={() => setOffset(-1)}
        className="h-7 px-2 text-[11px]"
      >
        <ChevronLeft className="mr-1 h-3 w-3" />
        Yesterday
      </Button>
      <Button
        size="sm"
        variant={dateOffset === 0 ? "default" : "ghost"}
        onClick={() => setOffset(0)}
        className="h-7 px-3 text-[11px] font-bold"
      >
        Today
      </Button>
      <Button
        size="sm"
        variant={dateOffset === 1 ? "default" : "ghost"}
        onClick={() => setOffset(1)}
        className="h-7 px-2 text-[11px]"
      >
        Tomorrow
        <ChevronRight className="ml-1 h-3 w-3" />
      </Button>
      <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:inline">
        {formatDateKey(currentKey)}
      </span>
    </div>
  );
}
