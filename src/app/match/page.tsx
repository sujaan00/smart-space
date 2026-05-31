import { ArrowRight, BriefcaseBusiness, Car, Check, ChevronDown, Clock3, Compass, MapPin, School, ShieldCheck, Sparkles, TrainFront, Trees } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PropertyCard } from "@/components/property-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";

const fitSignals = [
  { label: "Commute", value: "18 min", icon: TrainFront, accent: "text-[#4d8a72]" },
  { label: "Safety fit", value: "Excellent", icon: ShieldCheck, accent: "text-[#4d8a72]" },
  { label: "Green space", value: "7 nearby", icon: Trees, accent: "text-[#4d8a72]" },
  { label: "Schools", value: "4 nearby", icon: School, accent: "text-[#4d8a72]" },
];

export default function MatchPage() {
  return (
    <DashboardShell
      eyebrow="Lifestyle matchmaking"
      title="Find a home that fits the day-to-day."
      description="Rank homes using the things that actually shape your week: commute, budget, calm, schools, transit, and the places you enjoy."
      action={<Button variant="accent" size="sm"><Sparkles size={14} /> Refine my match</Button>}
    >
      <section className="grid gap-5 xl:grid-cols-[340px_1fr]">
        <aside className="h-fit rounded-[24px] border border-[var(--line)] bg-white/60 p-5 shadow-sm dark:bg-white/5">
          <div className="flex items-center gap-2">
            <Compass size={17} className="text-[var(--accent)]" />
            <h2 className="text-xs font-bold">Your match profile</h2>
          </div>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Office location</span>
              <span className="mt-2 flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white/60 px-3 py-2.5 text-xs font-semibold dark:bg-white/5">
                <BriefcaseBusiness size={14} className="text-[var(--accent)]" /> MG Road, Bengaluru
              </span>
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Max commute</span>
              <span className="mt-2 flex items-center justify-between rounded-xl border border-[var(--line)] bg-white/60 px-3 py-2.5 text-xs font-semibold dark:bg-white/5">
                <span className="flex items-center gap-2"><Clock3 size={14} className="text-[var(--accent)]" /> 30 minutes</span><ChevronDown size={13} />
              </span>
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Travel modes</span>
              <span className="mt-2 flex gap-2">
                <Badge className="bg-[#e8f3ec] text-[#4d806d] dark:bg-[#244139] dark:text-[#b3d9ca]"><TrainFront size={12} /> Metro</Badge>
                <Badge><Car size={12} /> Car</Badge>
              </span>
            </label>
          </div>
          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Daily-life priorities</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Low noise", "Gym nearby", "Green space", "Dining", "3 bedrooms"].map((item) => <Badge key={item}>{item}</Badge>)}
            </div>
          </div>
          <Button variant="default" size="sm" className="mt-6 w-full">Update preferences</Button>
        </aside>

        <div>
          <div className="rounded-[24px] border border-[var(--line)] bg-[#244f44] p-5 text-white shadow-sm dark:bg-[#1b4037]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <Badge className="border-white/15 bg-white/10 text-[#c5e1d6]"><Sparkles size={12} /> Match insight</Badge>
                <h2 className="mt-4 text-lg font-bold tracking-[-0.03em]">Indiranagar is your strongest overall fit.</h2>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-white/65">It keeps your metro commute under 20 minutes, stays close to the cafes and gyms you prefer, and has a calmer residential pocket around your budget.</p>
              </div>
              <div className="flex shrink-0 items-end gap-2">
                <span className="font-display text-5xl tracking-[-0.08em]">94</span><span className="mb-2 text-sm text-white/65">/ 100</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {fitSignals.map(({ label, value, icon: Icon, accent }) => (
              <div key={label} className="rounded-[18px] border border-[var(--line)] bg-white/60 p-4 dark:bg-white/5">
                <Icon size={16} className={accent} />
                <p className="mt-4 text-sm font-bold">{value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--muted)]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl tracking-[-0.05em]">Your best matches</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">12 homes ranked with transparent tradeoffs.</p>
            </div>
            <Button variant="outline" size="sm">Compare homes <ArrowRight size={13} /></Button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {properties.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
        </div>
      </section>

      <section className="mb-16 mt-7 grid gap-4 md:grid-cols-3">
        {[
          ["Commute math", "Travel times are provider-ready and grouped by your chosen mode.", TrainFront],
          ["Tradeoffs, clearly", "See where a lower price may add time or change neighborhood character.", MapPin],
          ["Explainable ranking", "Each match exposes the factors that contributed to its score.", Check],
        ].map(([title, text, Icon]) => {
          const FeatureIcon = Icon as typeof TrainFront;
          return (
            <div key={title as string} className="rounded-[20px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5">
              <FeatureIcon size={17} className="text-[var(--forest)]" />
              <h3 className="mt-4 text-xs font-bold">{title as string}</h3>
              <p className="mt-2 text-[11px] leading-5 text-[var(--muted)]">{text as string}</p>
            </div>
          );
        })}
      </section>
    </DashboardShell>
  );
}

