import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Send,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Sparkles,
} from "lucide-react";
import type { Candidate } from "../types";
import { formatTime } from "../format";

interface Props {
  candidate: Candidate;
  disabled?: boolean;
}

type Msg = {
  id: string;
  from: "greeter" | "candidate" | "system";
  text: string;
  time: string;
};

const QUICK_REPLIES = [
  "Please re-take your ID photo",
  "Restart the system check",
  "You're all set — good luck!",
  "Please stay on this screen",
];

export function ChatFloater({ candidate, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>(() => seedMessages(candidate));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages.length]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      {
        id: `m-${Date.now()}`,
        from: "greeter",
        text: t,
        time: nowTime(),
      },
    ]);
    setDraft("");
  };

  const initials = `${candidate.firstName[0]}${candidate.lastName[0]}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          disabled={disabled}
          className="h-8 gap-1.5 bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          aria-label="Chat with candidate"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Chat
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[380px] overflow-hidden rounded-2xl border border-border/70 p-0 shadow-2xl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-primary/80 px-4 py-3 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm">
                {initials}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary bg-success" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">
                {candidate.firstName} {candidate.lastName}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-primary-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Online · {formatTime(candidate.scheduleStart)}–{formatTime(candidate.scheduleEnd)}
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <IconBtn label="Call"><Phone className="h-3.5 w-3.5" /></IconBtn>
              <IconBtn label="Video"><Video className="h-3.5 w-3.5" /></IconBtn>
              <IconBtn label="More"><MoreVertical className="h-3.5 w-3.5" /></IconBtn>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium backdrop-blur-sm">
            <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono">ID {candidate.id}</span>
            <span className="truncate opacity-90">{candidate.assessmentTitle}</span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="max-h-[320px] min-h-[240px] space-y-3 overflow-y-auto bg-muted/20 px-3 py-3"
        >
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} />
          ))}
        </div>

        {/* Quick replies */}
        <div className="border-t border-border/60 bg-background px-3 py-2">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            Quick replies
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex items-center gap-2 border-t border-border/60 bg-background p-2"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message…"
            className="h-9 flex-1 rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!draft.trim()}
            className="h-9 w-9 shrink-0 rounded-lg p-0"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

function IconBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-md text-primary-foreground/90 transition hover:bg-white/20"
    >
      {children}
    </button>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  if (msg.from === "system") {
    return (
      <div className="flex justify-center">
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {msg.text}
        </span>
      </div>
    );
  }
  const isMe = msg.from === "greeter";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[80%]">
        <div
          className={[
            "rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm",
            isMe
              ? "rounded-br-sm bg-primary text-primary-foreground"
              : "rounded-bl-sm border border-border bg-background text-foreground",
          ].join(" ")}
        >
          {msg.text}
        </div>
        <div
          className={[
            "mt-1 flex items-center gap-1 text-[10px] text-muted-foreground",
            isMe ? "justify-end" : "justify-start",
          ].join(" ")}
        >
          <span>{msg.time}</span>
          {isMe && <CheckCheck className="h-3 w-3 text-info" />}
        </div>
      </div>
    </div>
  );
}

function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function seedMessages(c: Candidate): Msg[] {
  return [
    { id: "s1", from: "system", text: "Chat started", time: "" },
    {
      id: "s2",
      from: "candidate",
      text: `Hi, I'm having trouble with my ID photo.`,
      time: "10:24",
    },
    {
      id: "s3",
      from: "greeter",
      text: `Hi ${c.firstName}, no worries — please retake it with better lighting.`,
      time: "10:25",
    },
    {
      id: "s4",
      from: "candidate",
      text: "Okay, trying now.",
      time: "10:26",
    },
  ];
}
