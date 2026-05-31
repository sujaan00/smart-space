import { Bookmark, Building2, Clock3, MapPin, Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PropertyCard } from "@/components/property-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { neighborhoods, properties } from "@/lib/data";

export default function SavedPage() {
  return (
    <DashboardShell
      eyebrow="Your saved items"
      title="A shortlist with room to think."
      description="Keep homes, neighborhoods, searches, and commute profiles together so it is easy to return with fresh eyes."
      action={<Button variant="outline" size="sm"><Search size={14} /> New search</Button>}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Saved homes", "3", Building2],
          ["Neighborhoods", "2", MapPin],
          ["Saved searches", "1", Search],
          ["Commute profiles", "1", Clock3],
        ].map(([label, value, Icon]) => {
          const ItemIcon = Icon as typeof Bookmark;
          return (
            <div key={label as string} className="rounded-[18px] border border-[var(--line)] bg-white/60 p-4 dark:bg-white/5">
              <ItemIcon size={16} className="text-[var(--forest)]" />
              <p className="mt-4 font-display text-3xl tracking-[-0.06em]">{value as string}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">{label as string}</p>
            </div>
          );
        })}
      </div>

      <section className="mt-8">
        <h2 className="font-display text-2xl tracking-[-0.05em]">Saved homes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {properties.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      </section>

      <section className="mb-16 mt-8">
        <h2 className="font-display text-2xl tracking-[-0.05em]">Neighborhoods to revisit</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {neighborhoods.slice(0, 2).map((area) => (
            <div key={area.id} className="rounded-[20px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">{area.name}</p>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">{area.city}</p>
                </div>
                <Badge className="bg-[#edf7f1] text-[#4a806c] dark:bg-[#244139] dark:text-[#b3d9ca]">+{area.growth}% YoY</Badge>
              </div>
              <p className="mt-4 text-xs leading-5 text-[var(--muted)]">{area.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}

