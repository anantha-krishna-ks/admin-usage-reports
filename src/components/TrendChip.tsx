import { TrendingUp, TrendingDown } from "lucide-react";

export const TrendChip = ({ value, prev }: { value: number; prev: number }) => {
  const pct = prev === 0 ? 0 : ((value - prev) / prev) * 100;
  const up = pct >= 0;
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
        up
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-red-500/10 text-red-600 dark:text-red-400"
      }`}
      title={`Previous: ${prev.toLocaleString()} mins`}
    >
      {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
      <span className="tabular-nums">{up ? "+" : ""}{pct.toFixed(1)}%</span>
    </div>
  );
};
