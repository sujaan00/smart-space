"use client";

import { useMemo, useState } from "react";
import { Building2, ChevronDown, Hospital, MapPin, School, TrainFront, Trees } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { neighborhoods } from "@/lib/data";
import { cn } from "@/lib/utils";

const layers = ["Price", "Rent", "Demand", "Growth"] as const;
type Layer = (typeof layers)[number];

const layerCaption: Record<Layer, string> = {
  Price: "Average sale price / sq ft",
  Rent: "Median monthly rent",
  Demand: "Buyer and tenant activity",
  Growth: "12-month price movement",
};

const amenityIcons = [TrainFront, School, Hospital, Trees, Building2];

export function MarketMap() {
  const [layer, setLayer] = useState<Layer>("Price");
  const [selectedId, setSelectedId] = useState("indiranagar");
  const selected = useMemo(() => neighborhoods.find((item) => item.id === selectedId) ?? neighborhoods[0], [selectedId]);

  return (
    <div className="grid min-h-[570px] overflow-hidden rounded-[26px] border border-[var(--line)] bg-white/60 shadow-sm dark:bg-white/5 xl:grid-cols-[1fr_290px]">
      <div className="relative min-h-[500px] overflow-hidden bg-[#cedfd2] dark:bg-[#203d35]">
        <div className="map-lines soft-grid absolute inset-0 opacity-90" />
        <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
          <div className="flex rounded-full border border-white/65 bg-white/80 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#1c312c]/85">
            {layers.map((item) => (
              <button
                key={item}
                onClick={() => setLayer(item)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[10px] font-bold transition-colors",
                  layer === item ? "bg-[#255648] text-white dark:bg-[#a6d2c1] dark:text-[#18342e]" : "text-[var(--muted)]",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="border-white/65 bg-white/80 py-2 text-[10px] dark:border-white/10 dark:bg-[#1c312c]/85">
            Amenities <ChevronDown size={12} />
          </Button>
        </div>

        {[
          ["22%", "22%", 23, "#df8b62"],
          ["60%", "24%", 34, "#efc36d"],
          ["42%", "63%", 30, "#e57b5a"],
          ["76%", "53%", 38, "#edca77"],
          ["30%", "82%", 26, "#8abb9b"],
        ].map(([left, top, size, color], index) => (
          <span
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-xl"
            style={{ left, top, width: `${Number(size) * 4}px`, height: `${Number(size) * 4}px`, backgroundColor: color as string }}
          />
        ))}

        {neighborhoods.map((area) => {
          const active = area.id === selected.id;
          return (
            <button
              key={area.id}
              onClick={() => setSelectedId(area.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
              style={{ left: area.position.left, top: area.position.top }}
              aria-label={`Select ${area.name}`}
            >
              <span
                className={cn(
                  "block rounded-full border-white shadow-md transition-all",
                  active ? "h-7 w-7 border-[5px]" : "h-4 w-4 border-[3px] hover:scale-125",
                )}
                style={{ backgroundColor: area.color }}
              />
              <span
                className={cn(
                  "mt-1 block -translate-x-[35%] whitespace-nowrap rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold text-[#34584d] shadow-sm transition-opacity dark:bg-[#1d342e]/95 dark:text-[#c8e2d8]",
                  active ? "opacity-100" : "opacity-80",
                )}
              >
                {area.name}
              </span>
            </button>
          );
        })}

        {amenityIcons.map((Icon, index) => (
          <span
            key={index}
            className="absolute flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-white/70 text-[#578070] shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#203a33]"
            style={{ left: `${18 + index * 15}%`, top: `${38 + (index % 3) * 17}%` }}
          >
            <Icon size={12} />
          </span>
        ))}

        <div className="absolute bottom-5 left-5 rounded-2xl border border-white/55 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#1c312c]/90">
          <p className="text-[10px] font-bold">{layerCaption[layer]}</p>
          <div className="mt-2 flex items-center gap-2 text-[9px] font-semibold text-[var(--muted)]">
            <span>Lower</span>
            <span className="h-2 w-24 rounded-full bg-gradient-to-r from-[#75aa94] via-[#edc36a] to-[#e5704b]" />
            <span>Higher</span>
          </div>
        </div>
      </div>

      <aside className="border-t border-[var(--line)] p-5 xl:border-l xl:border-t-0">
        <div className="flex items-center justify-between">
          <Badge className="bg-[#edf7f1] text-[#4c816d] dark:bg-[#244139] dark:text-[#b3d9ca]">{selected.demand} demand</Badge>
          <MapPin size={17} className="text-[var(--accent)]" />
        </div>
        <h2 className="font-display mt-5 text-[30px] tracking-[-0.06em]">{selected.name}</h2>
        <p className="mt-1 text-[11px] text-[var(--muted)]">{selected.city}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-[#eef4ef] p-3 dark:bg-white/5">
            <p className="text-[9px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">Avg price</p>
            <p className="mt-2 text-sm font-bold">Rs {selected.averagePrice.toLocaleString("en-IN")}</p>
            <p className="mt-1 text-[10px] text-[var(--muted)]">per sq ft</p>
          </div>
          <div className="rounded-2xl bg-[#eef4ef] p-3 dark:bg-white/5">
            <p className="text-[9px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">12 mo growth</p>
            <p className="mt-2 text-sm font-bold text-[#4b8a70]">+{selected.growth}%</p>
            <p className="mt-1 text-[10px] text-[var(--muted)]">YoY movement</p>
          </div>
        </div>
        <div className="mt-5 border-t border-[var(--line)] pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Why it is trending</p>
          <p className="mt-3 text-xs leading-5 text-[var(--foreground)]">{selected.summary}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {selected.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
        <Button variant="default" size="sm" className="mt-6 w-full">View neighborhood</Button>
      </aside>
    </div>
  );
}

