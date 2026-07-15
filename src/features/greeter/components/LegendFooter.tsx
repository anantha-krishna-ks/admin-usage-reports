import { STAGE_STATE_LABELS } from "../mock-data";

export function LegendFooter() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border bg-muted/40 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
      <span className="font-bold">Stages:</span>
      <Item color="bg-muted ring-1 ring-border" label={STAGE_STATE_LABELS.not_started} />
      <Item color="bg-warning" label={STAGE_STATE_LABELS.in_progress} />
      <Item color="bg-success" label={STAGE_STATE_LABELS.completed} />
      <Item color="bg-destructive" label={STAGE_STATE_LABELS.flagged} />
      <span className="ml-4 font-bold">Allocation:</span>
      <Item color="bg-muted-foreground/40" label="Precheck" />
      <Item color="bg-info" label="Unallocated" />
      <Item color="bg-success" label="Allocated" />
      <Item color="bg-destructive" label="Reconnected" />
      <Item color="bg-warning" label="Locked (other greeter)" />
      <span className="ml-4 font-bold">Headshot / Photo ID:</span>
      <Item color="bg-success" label="AI matched" />
      <Item color="bg-destructive" label="AI not matched" />
    </div>
  );
}

function Item({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-sm ${color}`} />
      {label}
    </span>
  );
}
