import { useState } from "react";
import { format, subMonths } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

interface DateRangeFilterProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

const presets = [
  { label: "Last 1 Month", months: 1 },
  { label: "Last 2 Months", months: 2 },
  { label: "Last 3 Months", months: 3 },
];

export const DateRangeFilter = ({ date, onDateChange }: DateRangeFilterProps) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"preset" | "custom">("preset");

  const handlePreset = (months: number, label: string) => {
    const to = new Date();
    const from = subMonths(to, months);
    onDateChange({ from, to });
    setMode("preset");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          <div className="border-r border-border p-3 space-y-1 min-w-[160px] bg-muted/30">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">
              Quick Select
            </p>
            {presets.map((p) => (
              <Button
                key={p.label}
                variant="ghost"
                size="sm"
                className="w-full justify-start font-normal text-sm hover:bg-background"
                onClick={() => handlePreset(p.months, p.label)}
              >
                {p.label}
              </Button>
            ))}
            <Button
              variant={mode === "custom" ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start font-normal text-sm"
              onClick={() => setMode("custom")}
            >
              Custom Range
            </Button>
          </div>
          {mode === "custom" && (
            <div className="p-3">
              <Calendar
                mode="range"
                selected={date}
                onSelect={onDateChange}
                numberOfMonths={2}
                initialFocus
                className="pointer-events-auto"
              />
              <div className="flex justify-end pt-2">
                <Button size="sm" onClick={() => setOpen(false)} disabled={!date?.from}>
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
