import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Bath, BedDouble, CheckCircle2, Clock3, Heart, MapPin, ShieldCheck, Sparkles, TrainFront } from "lucide-react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { formatIndianPrice } from "@/lib/utils";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);
  if (!property) notFound();

  return (
    <DashboardShell
      eyebrow="Verified property"
      title={property.title}
      description={`${property.locality}, ${property.city} · a ${property.score}% lifestyle match based on your current profile.`}
      action={<Button variant="accent" size="sm"><Heart size={14} /> Save property</Button>}
    >
      <Link href="/match" className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-[var(--muted)]"><ArrowLeft size={14} /> Back to matches</Link>
      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div>
          <div className="relative h-[440px] overflow-hidden rounded-[28px]">
            <Image src={property.image} alt={property.imageAlt} fill priority sizes="(max-width: 1280px) 100vw, 70vw" className="object-cover" />
          </div>
          <div className="mt-5 rounded-[22px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5">
            <div className="flex flex-wrap items-center gap-2">
              {property.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>
            <h2 className="font-display mt-6 text-3xl tracking-[-0.055em]">A bright home with a practical daily rhythm.</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">This verified sample listing is presented with the facts available in the SmartSpace dataset. Contact and ownership actions are protected server-side in a connected deployment.</p>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-[22px] border border-[var(--line)] bg-white/60 p-5 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <p className="font-display text-3xl tracking-[-0.06em]">{formatIndianPrice(property.price)}</p>
              <CheckCircle2 size={18} className="text-[#4e9478]" aria-label="Verified property" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-y border-[var(--line)] py-4 text-center">
              <div><BedDouble size={16} className="mx-auto text-[var(--forest)]" /><p className="mt-2 text-xs font-bold">{property.beds}</p><p className="mt-1 text-[9px] text-[var(--muted)]">Beds</p></div>
              <div><Bath size={16} className="mx-auto text-[var(--forest)]" /><p className="mt-2 text-xs font-bold">{property.baths}</p><p className="mt-1 text-[9px] text-[var(--muted)]">Baths</p></div>
              <div><MapPin size={16} className="mx-auto text-[var(--forest)]" /><p className="mt-2 text-xs font-bold">{property.area.toLocaleString("en-IN")}</p><p className="mt-1 text-[9px] text-[var(--muted)]">Sq ft</p></div>
            </div>
            <Button className="mt-5 w-full">Request a visit</Button>
          </div>
          <div className="rounded-[22px] bg-[#244f44] p-5 text-white dark:bg-[#1b4037]">
            <Sparkles size={17} className="text-[#b9d9cc]" />
            <h2 className="mt-4 text-sm font-bold">Why it matches</h2>
            <div className="mt-4 space-y-3 text-xs text-white/70">
              <p className="flex items-center gap-2"><TrainFront size={14} /> {property.commute} min metro commute</p>
              <p className="flex items-center gap-2"><Clock3 size={14} /> Fits your preferred daily radius</p>
              <p className="flex items-center gap-2"><ShieldCheck size={14} /> Verified listing facts</p>
            </div>
          </div>
        </aside>
      </section>
    </DashboardShell>
  );
}
