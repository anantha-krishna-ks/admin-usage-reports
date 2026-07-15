import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ReviewFilter = "all" | "under_review" | "yet_to_review";

interface Props {
  value: ReviewFilter;
  setValue: (v: ReviewFilter) => void;
}

const options: { value: ReviewFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "under_review", label: "Under review" },
  { value: "yet_to_review", label: "Yet to review" },
];

export function ReviewFilter({ value, setValue }: Props) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Review status
      </span>
      <Select value={value} onValueChange={(v) => setValue(v as ReviewFilter)}>
        <SelectTrigger className="h-8 w-40 border-border bg-background text-xs focus:ring-1 focus:ring-ring">
          <SelectValue placeholder="Select review status" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
