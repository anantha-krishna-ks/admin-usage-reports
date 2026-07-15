const items: { color: string; label: string }[] = [
  { color: "bg-info", label: "Unallocated" },
  { color: "bg-success", label: "Allocated" },
  { color: "bg-destructive", label: "Reconnected" },
  { color: "bg-warning", label: "Locked (other greeter)" },
  { color: "bg-muted-foreground/50", label: "In precheck" },
];

export function LegendFooter() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 text-[10px] text-muted-foreground">
      <span className="font-semibold uppercase tracking-wider">Legend</span>
      {items.map((i) => (
        <span key={i.label} className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${i.color}`} />
          {i.label}
        </span>
      ))}
    </div>
  );
}
