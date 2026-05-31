"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, CheckCircle2, Heart, MapPin, MoveUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/lib/types";
import { cn, formatIndianPrice } from "@/lib/utils";

export function PropertyCard({ property, compact = false }: { property: Property; compact?: boolean }) {
  const [saved, setSaved] = useState(false);

  async function toggleSaved() {
    const nextSaved = !saved;
    setSaved(nextSaved);

    const response = await fetch("/api/saved-listings", {
      method: nextSaved ? "POST" : "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ listingId: property.id }),
    });

    if (!response.ok) {
      setSaved(!nextSaved);
    }
  }

  return (
    <article className="group overflow-hidden rounded-[24px] border border-[var(--line)] bg-white/65 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-white/5">
      <div className={cn("relative overflow-hidden", compact ? "h-36" : "h-48")}>
        {/* Remote photos are sample content; production media is served through signed URLs. */}
        <Image
          src={property.image}
          alt={property.imageAlt}
          fill
          sizes={compact ? "(max-width: 768px) 100vw, 320px" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={toggleSaved}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#43564f] shadow-sm backdrop-blur"
          aria-label={saved ? "Remove from saved homes" : "Save home"}
        >
          <Heart size={16} fill={saved ? "#e5704b" : "transparent"} className={saved ? "text-[#e5704b]" : ""} />
        </button>
        <Badge className="absolute left-3 top-3 border-white/40 bg-white/85 text-[#28584c]">
          {property.score}% match
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <MapPin size={12} /> {property.locality}, {property.city}
            </div>
            <h3 className="mt-1.5 text-base font-bold tracking-[-0.03em]">{property.title}</h3>
          </div>
          {property.verified && <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#4b9b79]" aria-label="Verified listing" />}
        </div>
        <p className="mt-3 text-lg font-bold tracking-[-0.04em]">{formatIndianPrice(property.price)}</p>
        <div className="mt-3 flex items-center gap-3 text-[11px] font-semibold text-[var(--muted)]">
          <span className="flex items-center gap-1"><BedDouble size={14} /> {property.beds} beds</span>
          <span className="flex items-center gap-1"><Bath size={14} /> {property.baths} baths</span>
          <span>{property.area.toLocaleString("en-IN")} sq ft</span>
        </div>
        {!compact && (
          <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3">
            <p className="text-[11px] text-[var(--muted)]"><b className="text-[var(--forest)]">{property.commute} min</b> to your office</p>
            <Link href={`/properties/${property.id}`} className="text-[var(--accent)]" aria-label={`View ${property.title}`}>
              <MoveUpRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
