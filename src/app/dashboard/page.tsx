import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Building2,
  Clock3,
  Compass,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { DashboardAction, DashboardShell } from "@/components/dashboard-shell";
import { PropertyCard } from "@/components/property-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { neighborhoods, properties, trendPoints } from "@/lib/data";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/explore", label: "Explore market", text: "Map trends", icon: BarChart3, color: "bg-[#e2efe8] text-[#3c725f]" },
  { href: "/match", label: "Find your match", text: "Lifestyle fit", icon: Compass, color: "bg-[#faead9] text-[#a4673b]" },
  { href: "/listings/new", label: "Create listing", text: "AI assistant", icon: Building2, color: "bg-[#eee6f5] text-[#79588f]" },
  { href: "/assistant", label: "Ask AI", text: "English + Hindi", icon: MessageCircle, color: "bg-[#e4edf5] text-[#4d718a]" },
];

export default function DashboardPage() {
  return (
    <DashboardShell
      eyebrow="Your workspace"
      title="Good evening, explorer."
      description="A calm place to understand the market, shortlist homes, and make your next move with context."
      action={<DashboardAction href="/explore"><Search size={15} /> Explore Bengaluru</DashboardAction>}
    >
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map(({ href, label, text, icon: Icon, color }) => (
          <Link key={href} href={href} className="group flex items-center gap-3 rounded-[20px] border border-[var(--line)] bg-white/60 p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:bg-white/5 dark:hover:bg-white/[.08]">
            <span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", color)}><Icon size={18} /></span>
            <span>
              <span className="block text-xs font-bold">{label}</span>
              <span className="mt-1 block text-[11px] text-[var(--muted)]">{text}</span>
            </span>
            <ArrowRight size={14} className="ml-auto text-[var(--accent)] transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[1.38fr_.62fr]">
        <div className="rounded-[26px] border border-[var(--line)] bg-white/60 p-5 shadow-sm dark:bg-white/5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold">Bengaluru market pulse</p>
              <p className="mt-1 text-[11px] text-[var(--muted)]">Average residential price per sq ft · last 12 months</p>
            </div>
            <Badge className="border-[#cce0d7] bg-[#edf7f1] text-[#43806a] dark:border-[#315548] dark:bg-white/5 dark:text-[#a8d7c5]">
              <TrendingUp size={12} /> +8.6% this year
            </Badge>
          </div>
          <div className="relative mt-7 h-[210px] overflow-hidden rounded-[18px] bg-[#edf3ed] px-4 pt-4 dark:bg-[#192b27]">
            <div className="absolute inset-0 soft-grid opacity-80" />
            <svg viewBox="0 0 700 210" preserveAspectRatio="none" className="relative h-full w-full overflow-visible" role="img" aria-label="Residential price trend rising over twelve months">
              <defs>
                <linearGradient id="dashboardChart" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#e5704b" stopOpacity=".32" />
                  <stop offset="100%" stopColor="#e5704b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${190 - trendPoints[0]} ${trendPoints.map((point, index) => `L ${(index / (trendPoints.length - 1)) * 700} ${190 - point}`).join(" ")} L 700 210 L 0 210 Z`}
                fill="url(#dashboardChart)"
              />
              <path
                d={`M 0 ${190 - trendPoints[0]} ${trendPoints.map((point, index) => `L ${(index / (trendPoints.length - 1)) * 700} ${190 - point}`).join(" ")}`}
                fill="none"
                stroke="#e5704b"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[9px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">
              <span>Jun</span><span>Sep</span><span>Dec</span><span>Mar</span><span>May</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[26px] border border-[var(--line)] bg-[#dbe8dd] shadow-sm dark:bg-[#1a312b]">
          <div className="flex items-center justify-between p-5 pb-3">
            <div>
              <p className="text-xs font-bold">Trending neighborhoods</p>
              <p className="mt-1 text-[11px] text-[var(--muted)]">Based on recent market movement</p>
            </div>
            <MapPin size={17} className="text-[var(--forest)]" />
          </div>
          <div className="map-lines soft-grid relative h-[250px]">
            {neighborhoods.slice(0, 4).map((area) => (
              <Link
                key={area.id}
                href={`/explore?area=${area.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: area.position.left, top: area.position.top }}
                aria-label={`Explore ${area.name}`}
              >
                <span className="block h-4 w-4 rounded-full border-[3px] border-white shadow" style={{ backgroundColor: area.color }} />
                <span className="mt-1 block -translate-x-[35%] whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold text-[#34584d] shadow">
                  {area.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl tracking-[-0.05em]">Homes that fit your rhythm</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">Recommended using commute, lifestyle, and your budget range.</p>
          </div>
          <Link href="/match" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:inline-flex")}>
            View all matches <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {properties.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      </section>

      <section className="mb-16 mt-8 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-[22px] border border-[var(--line)] bg-[#244f44] p-5 text-white dark:bg-[#1b4037]">
          <Sparkles size={18} className="text-[#b8d8cc]" />
          <h2 className="mt-5 text-base font-bold">Ask about your next move</h2>
          <p className="mt-2 text-xs leading-5 text-white/65">Try: “Which areas have a quiet vibe and a commute under 25 minutes to MG Road?”</p>
          <Link href="/assistant" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#d8eee6]">Open assistant <ArrowRight size={14} /></Link>
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-[22px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f7ecda] text-[#9b6a38] dark:bg-[#3d3020] dark:text-[#e8c189]">
              <Bookmark size={17} />
            </span>
            <div>
              <p className="text-xs font-bold">Save your commute profile</p>
              <p className="mt-1 max-w-xl text-[11px] leading-5 text-[var(--muted)]">Set an office location once and SmartSpace will explain the real commute tradeoff on every home.</p>
            </div>
          </div>
          <Link href="/match" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0 text-xs")}><Clock3 size={14} /> Add office</Link>
        </div>
      </section>
    </DashboardShell>
  );
}

