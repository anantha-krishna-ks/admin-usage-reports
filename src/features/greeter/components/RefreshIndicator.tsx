import { RefreshCw } from "lucide-react";

export function RefreshIndicator({ remaining }: { remaining: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      <RefreshCw className="h-3 w-3 text-success" />
      Auto-refresh in <span className="text-foreground">{remaining}s</span>
    </div>
  );
}
