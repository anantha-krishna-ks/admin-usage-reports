import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Msg = { id: string; role: "user" | "assistant"; text: string; time: string };

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const SUGGESTIONS = [
  "How many candidates are pending precheck?",
  "Summarize today's queue",
  "Which candidates have ID errors?",
  "Draft a reminder message",
];

const CANNED: Record<string, string> = {
  default:
    "I can help you triage the greeter queue — try one of the suggested prompts below.",
};

export function GlobalChatFab() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Hi! I'm your Greeter assistant. Ask me about the candidate queue, precheck issues, or draft messages.",
      time: now(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: t, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: CANNED.default,
          time: now(),
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
          "transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-background">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-40 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden",
            "rounded-2xl border border-border bg-background shadow-2xl",
            "animate-in fade-in slide-in-from-bottom-4 duration-200"
          )}
          style={{ height: "560px", maxHeight: "calc(100vh - 8rem)" }}
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 px-4 py-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold">Greeter Assistant</h3>
                  <Sparkles className="h-3.5 w-3.5 opacity-80" />
                </div>
                <p className="text-xs opacity-90">Online · Ready to help</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/15"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm border border-border bg-background text-foreground"
                  )}
                >
                  {m.text}
                </div>
                <span className="mt-1 px-1 text-[10px] text-muted-foreground">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="border-t border-border bg-background px-3 py-2">
              <p className="mb-1.5 px-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Suggested
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-foreground transition hover:border-primary/40 hover:bg-primary/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-background p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="h-9 flex-1"
            />
            <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
