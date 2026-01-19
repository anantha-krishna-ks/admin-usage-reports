import { useState } from "react";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

interface EnhancedDateFilterProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

const presetRanges = [
  { label: "Today", getValue: () => ({ from: new Date(), to: new Date() }) },
  { label: "Last 7 days", getValue: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
  { label: "Last 30 days", getValue: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
  { label: "This Month", getValue: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
  { label: "Last Month", getValue: () => ({ from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }) },
  { label: "Last 3 Months", getValue: () => ({ from: subDays(new Date(), 89), to: new Date() }) },
];

export function EnhancedDateFilter({ date, onDateChange }: EnhancedDateFilterProps) {
  const [open, setOpen] = useState(false);

  const handlePresetClick = (preset: typeof presetRanges[0]) => {
    onDateChange(preset.getValue());
    setOpen(false);
  };

  const handleClear = () => {
    onDateChange(undefined);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "min-w-[280px] justify-between text-left font-normal shadow-sm hover:shadow-md transition-shadow",
              !date && "text-muted-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              {date?.from ? (
                date.to ? (
                  <span>
                    {format(date.from, "MMM dd, yyyy")} – {format(date.to, "MMM dd, yyyy")}
                  </span>
                ) : (
                  format(date.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Select date range</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 shadow-lg" align="end">
          <div className="flex">
            {/* Preset Options */}
            <div className="border-r border-border p-3 space-y-1 min-w-[140px] bg-muted/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2">Quick Select</p>
              {presetRanges.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal text-sm hover:bg-background"
                  onClick={() => handlePresetClick(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            {/* Calendar */}
            <div className="p-3">
              <Calendar
                mode="range"
                selected={date}
                onSelect={onDateChange}
                numberOfMonths={2}
                initialFocus
                className="pointer-events-auto"
              />
            </div>
          </div>
          {/* Footer */}
          <div className="border-t border-border p-3 flex justify-between items-center bg-muted/20">
            <Button variant="ghost" size="sm" onClick={handleClear} disabled={!date}>
              Clear
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
