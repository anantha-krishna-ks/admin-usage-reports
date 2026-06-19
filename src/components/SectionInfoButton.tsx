import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SectionInfoButtonProps {
  description: string;
}

export const SectionInfoButton = ({ description }: SectionInfoButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full w-6 h-6 bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/20 hover:ring-primary/30 transition-all"
          aria-label="Section info"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="max-w-xs text-sm leading-relaxed bg-popover/95 backdrop-blur-sm"
      >
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <span>{description}</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
