import { useEffect, useMemo, useState } from "react";
import { useGreeterStore, greeterActions } from "@/features/greeter/store";
import { useAutoRefresh } from "@/features/greeter/useAutoRefresh";
import { dateKey } from "@/features/greeter/mock-data";
import { DateFilter } from "@/features/greeter/components/DateFilter";
import { AllocationTabs, type AllocFilter } from "@/features/greeter/components/AllocationTabs";
import { ReviewFilter, type ReviewFilter as ReviewFilterValue } from "@/features/greeter/components/ReviewFilter";
import { RefreshIndicator } from "@/features/greeter/components/RefreshIndicator";
import { CandidateTable } from "@/features/greeter/components/CandidateTable";
import { DetailDrawer } from "@/features/greeter/components/DetailDrawer";
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
    const c: Record<AllocFilter, number> = { precheck: 0, unallocated: 0, allocated: 0, reconnected: 0, all: byDate.length };
    for (const x of byDate) c[x.allocation] += 1;
    return c;
  }, [byDate]);

  const visible = useMemo(() => {
    let list = filter === "all" ? byDate : byDate.filter((c) => c.allocation === filter);
    if (reviewFilter === "under_review") {
      list = list.filter((c) => !!c.lock);
    } else if (reviewFilter === "yet_to_review") {
      list = list.filter((c) => !c.lock);
    }
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

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Ops Console / Greeter
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Vanguard Proctoring — Live</h1>
          </div>
          <DateFilter dateOffset={dateOffset} setOffset={setDateOffset} currentKey={currentKey} />
        </div>
        <div className="flex items-center gap-3">
          <RefreshIndicator remaining={remaining} />
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-info/20 text-[10px] font-bold text-info">
              {currentGreeter.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="text-xs">
              <div className="font-medium leading-none text-foreground">{currentGreeter.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Greeter</div>
            </div>
          </div>
        </div>
      </header>

      <AllocationTabs active={filter} setActive={setFilter} counts={counts} />

      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
        <ReviewFilter value={reviewFilter} setValue={setReviewFilter} />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {visible.length} candidate{visible.length === 1 ? "" : "s"} shown
        </span>
      </div>

      <CandidateTable
        candidates={visible}
        currentGreeterId={currentGreeter.id}
        onView={handleView}
      />

      <LegendFooter />

      <DetailDrawer candidate={openCandidate} onClose={handleClose} />
    </div>
  );
}
