import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import type { Candidate } from "../types";

interface Props {
  candidate: Candidate;
  disabled?: boolean;
  onOpenGlobalChat?: () => void;
}

export function ChatFloater({ candidate, disabled, onOpenGlobalChat }: Props) {
  return (
    <Button
      size="sm"
      disabled={disabled}
      onClick={onOpenGlobalChat}
      className="h-8 gap-1.5 bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
      aria-label={`Open chat for ${candidate.firstName} ${candidate.lastName}`}
    >
      <MessageSquare className="h-3.5 w-3.5" />
      Chat
    </Button>
  );
}
