import { TrendingUp, TrendingDown } from "lucide-react";

export const TrendChip = ({ value, prev }: { value: number; prev: number }) => {
  const pct = prev === 0 ? 0 : ((value - prev) / prev) * 100;
  const up = pct >= 0;
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
        up
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-red-500/10 text-red-600 dark:text-red-400"
      }`}
      title={`Previous: ${prev.toLocaleString()} mins`}
    >
      {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
      <span className="tabular-nums">{up ? "+" : ""}{pct.toFixed(1)}%</span>
    </div>
  );
};
