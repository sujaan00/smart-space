import { BarChart3, Bookmark, ChevronDown, Filter, Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { MarketMap } from "@/components/market-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { neighborhoods, trendPoints } from "@/lib/data";

export default function ExplorePage() {
  return (
    <DashboardShell
      eyebrow="Market intelligence"
      title="Explore Bengaluru"
      description="Read the market neighborhood by neighborhood. Compare real price movement, rental demand, amenities, and local character."
      action={<Button variant="outline" size="sm"><Bookmark size={14} /> Save comparison</Button>}
    >
      <div className="flex flex-col gap-3 rounded-[20px] border border-[var(--line)] bg-white/60 p-3 dark:bg-white/5 lg:flex-row lg:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-2xl bg-white/80 px-3 py-2.5 dark:bg-white/5">
          <Search size={16} className="text-[var(--accent)]" />
          <span className="sr-only">Search a neighborhood</span>
          <input className="w-full bg-transparent text-xs focus:outline-none" placeholder="Search a neighborhood or landmark..." />
        </label>
        {["Rs 1–3 Cr", "3+ bedrooms", "Apartment", "Furnished"].map((item) => (
          <button key={item} className="flex items-center justify-between gap-2 rounded-full border border-[var(--line)] bg-white/70 px-3 py-2 text-[11px] font-semibold text-[var(--muted)] dark:bg-white/5">
            {item} <ChevronDown size={12} />
          </button>
        ))}
        <Button variant="default" size="sm"><SlidersHorizontal size={14} /> Filters</Button>
      </div>

      <section className="mt-5">
        <MarketMap />
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[1fr_350px]">
        <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold">City price movement</p>
              <p className="mt-1 text-[11px] text-[var(--muted)]">Bengaluru residential market · per sq ft</p>
            </div>
            <Badge className="bg-[#edf7f1] text-[#45816b] dark:bg-[#244139] dark:text-[#b3d9ca]"><TrendingUp size={12} /> +8.6%</Badge>
          </div>
          <div className="mt-6 h-[190px] rounded-2xl bg-[#edf3ed] px-4 pt-4 dark:bg-[#192b27]">
            <svg viewBox="0 0 700 180" preserveAspectRatio="none" className="h-full w-full overflow-visible" role="img" aria-label="Bengaluru price trend chart">
              <defs>
                <linearGradient id="exploreChart" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#e5704b" stopOpacity=".28" />
                  <stop offset="100%" stopColor="#e5704b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`M 0 ${170 - trendPoints[0]} ${trendPoints.map((point, index) => `L ${(index / (trendPoints.length - 1)) * 700} ${170 - point}`).join(" ")} L 700 180 L 0 180 Z`} fill="url(#exploreChart)" />
              <path d={`M 0 ${170 - trendPoints[0]} ${trendPoints.map((point, index) => `L ${(index / (trendPoints.length - 1)) * 700} ${170 - point}`).join(" ")}`} fill="none" stroke="#e5704b" strokeLinecap="round" strokeWidth="4" />
            </svg>
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">Fastest growing</p>
            <BarChart3 size={16} className="text-[var(--forest)]" />
          </div>
          <div className="mt-4 space-y-4">
            {[...neighborhoods].sort((a, b) => b.growth - a.growth).slice(0, 4).map((area, index) => (
              <div key={area.id} className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-[var(--muted)]">0{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3 text-[11px] font-bold">
                    <span>{area.name}</span><span className="text-[#4c8b72]">+{area.growth}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e4ece6] dark:bg-white/10">
                    <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${area.growth * 7}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-6 w-full"><Filter size={13} /> Compare areas</Button>
        </div>
      </section>
    </DashboardShell>
  );
}

