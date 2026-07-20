import { useEffect, useMemo, useState } from "react";
import { Radio } from "lucide-react";
import { useGreeterStore, greeterActions } from "@/features/greeter/store";
import { useAutoRefresh } from "@/features/greeter/useAutoRefresh";
import { dateKey } from "@/features/greeter/mock-data";
import { DateFilter } from "@/features/greeter/components/DateFilter";
import { AllocationTabs, type AllocFilter } from "@/features/greeter/components/AllocationTabs";
import {
  ReviewFilter,
  type ReviewFilter as ReviewFilterValue,
} from "@/features/greeter/components/ReviewFilter";
import { RefreshIndicator } from "@/features/greeter/components/RefreshIndicator";
import { CandidateTable } from "@/features/greeter/components/CandidateTable";
import { DetailDrawer } from "@/features/greeter/components/DetailDrawer";
import { GlobalChatFab } from "@/features/greeter/components/GlobalChatFab";
import { LegendFooter } from "@/features/greeter/components/LegendFooter";

export default function GreeterDashboard() {
  const candidates = useGreeterStore((s) => s.candidates);
  const currentGreeter = useGreeterStore((s) => s.currentGreeter);
  const remaining = useAutoRefresh();

  useEffect(() => {
    document.title = "Greeter Console — Live Proctoring";
  }, []);

  const [dateOffset, setDateOffset] = useState<-1 | 0 | 1>(0);
  const [filter, setFilter] = useState<AllocFilter>("all");
  const [reviewFilter, setReviewFilter] = useState<ReviewFilterValue>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const currentKey = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + dateOffset);
    return dateKey(d);
  }, [dateOffset]);

  const byDate = useMemo(
    () => candidates.filter((c) => c.dateKey === currentKey && !c.reviewed),
    [candidates, currentKey],
  );

  const counts = useMemo(() => {
    const c: Record<AllocFilter, number> = {
      precheck: 0,
      unallocated: 0,
      allocated: 0,
      reconnected: 0,
      all: byDate.length,
    };
    for (const x of byDate) c[x.allocation] += 1;
    return c;
  }, [byDate]);

  const visible = useMemo(() => {
    let list = filter === "all" ? byDate : byDate.filter((c) => c.allocation === filter);
    if (reviewFilter === "under_review") list = list.filter((c) => !!c.lock);
    else if (reviewFilter === "yet_to_review") list = list.filter((c) => !c.lock);
    return list;
  }, [byDate, filter, reviewFilter]);

  const openCandidate = openId ? candidates.find((c) => c.id === openId) ?? null : null;

  const handleView = (id: string) => {
    greeterActions.lockForReview(id);
    setOpenId(id);
  };
  const handleClose = () => {
    if (openId) greeterActions.releaseLock(openId);
    setOpenId(null);
  };

  const initials = currentGreeter.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top info strip — matches admin dashboard */}
      <div className="sticky top-0 z-50 border-b border-border bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-success" />
            <span>Vanguard Proctoring — Greeter Console</span>
          </div>
          <div className="flex items-center gap-3">
            <RefreshIndicator remaining={remaining} />
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1 shadow-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                {initials}
              </div>
              <div className="pr-1 text-xs leading-none">
                <div className="font-medium text-foreground">{currentGreeter.name}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Greeter
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto space-y-6 p-6">
        {/* Page header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Live Candidate Queue</h1>
            <p className="mt-1 flex items-center gap-2 text-muted-foreground">
              <Radio className="h-4 w-4 text-success" />
              Monitor precheck, allocate proctors, and resolve reconnects in real time
            </p>
          </div>
          <DateFilter
            dateOffset={dateOffset}
            setOffset={setDateOffset}
            currentKey={currentKey}
          />
        </div>

        {/* Summary tiles / allocation filter */}
        <AllocationTabs active={filter} setActive={setFilter} counts={counts} />

        {/* Toolbar */}
        <div className="flex flex-col items-stretch justify-between gap-3 rounded-lg border border-border bg-card/40 px-4 py-3 sm:flex-row sm:items-center">
          <ReviewFilter value={reviewFilter} setValue={setReviewFilter} />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-2.5 py-1 font-semibold tabular-nums text-foreground">
              {visible.length}
            </span>
            <span>candidate{visible.length === 1 ? "" : "s"} shown</span>
          </div>
        </div>

        {/* Table card */}
        <CandidateTable
          candidates={visible}
          currentGreeterId={currentGreeter.id}
          onView={handleView}
        />

        <LegendFooter />
      </div>

      <DetailDrawer candidate={openCandidate} onClose={handleClose} />
    </div>
  );
}
