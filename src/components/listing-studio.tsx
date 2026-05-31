"use client";

import { ChangeEvent, useState } from "react";
import {
  Check,
  CheckCircle2,
  FileAudio,
  ImagePlus,
  LoaderCircle,
  Mic,
  Pause,
  Sparkles,
  UploadCloud,
  WandSparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ListingDraft = {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  followUp: string;
};

const defaultDraft: ListingDraft = {
  title: "Sunlit 3-Bedroom Home Near Indiranagar Metro",
  description:
    "A bright, thoughtfully planned 3-bedroom apartment in a quieter pocket of Indiranagar. Large windows bring natural light into the living area, while the flexible dining nook and well-kept interiors make the home easy to settle into. Metro access, everyday conveniences, and neighborhood cafes are all within comfortable reach.",
  highlights: ["3 bedrooms with generous natural light", "Quiet residential lane", "Metro and daily conveniences nearby", "Move-in ready interiors"],
  tags: ["Natural light", "Metro nearby", "Quiet lane", "Family fit"],
  followUp: "Is there a dedicated parking space and what floor is the apartment on?",
};

export function ListingStudio() {
  const [fileNames, setFileNames] = useState<string[]>(["living-room.jpg", "balcony.jpg", "kitchen.jpg"]);
  const [recording, setRecording] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<ListingDraft>(defaultDraft);

  function onFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    const valid = selected.filter((file) => file.type.startsWith("image/") && file.size <= 12 * 1024 * 1024);
    setFileNames((current) => [...new Set([...current, ...valid.map((file) => file.name)])].slice(0, 8));
    if (selected.length !== valid.length) {
      setError("Some files were skipped. Use JPG, PNG, or WebP images under 12 MB.");
    } else {
      setError("");
    }
  }

  async function generateDraft() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/listings/draft", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: "Sunlit apartment",
          locality: "Indiranagar",
          propertyType: "Apartment",
          bedrooms: 3,
          bathrooms: 3,
          area: 1680,
          notes: "Bright living room, quiet lane, metro nearby, family-friendly layout.",
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.message ?? "Could not generate the draft.");
      setDraft(payload.data);
      setGenerated(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not generate the draft.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[.88fr_1.12fr]">
      <section className="space-y-4">
        <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5 shadow-sm dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold">1. Add property photos</p>
              <p className="mt-1 text-[11px] text-[var(--muted)]">JPG, PNG, or WebP · up to 12 MB each</p>
            </div>
            <ImagePlus size={17} className="text-[var(--accent)]" />
          </div>
          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-[18px] border border-dashed border-[#b8cbc3] bg-[#f0f5f0] px-4 py-6 text-center transition-colors hover:bg-[#ebf2ed] dark:border-[#35564d] dark:bg-white/5 dark:hover:bg-white/[.08]">
            <UploadCloud size={21} className="text-[#5b8c7c]" />
            <span className="mt-2 text-xs font-bold">Drop photos or click to browse</span>
            <span className="mt-1 text-[10px] text-[var(--muted)]">We strip image metadata before storage.</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={onFilesSelected} className="sr-only" />
          </label>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {fileNames.map((name, index) => (
              <div key={name} className="flex h-20 flex-col justify-between rounded-xl bg-[#e7eee9] p-2 dark:bg-white/5">
                <ImagePlus size={14} className="text-[#6c9587]" />
                <p className="truncate text-[9px] font-semibold text-[var(--muted)]">{name}</p>
                {index === 0 && <Badge className="w-fit border-0 bg-white/75 px-1.5 py-0.5 text-[8px]">Cover</Badge>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5 shadow-sm dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold">2. Share a voice note</p>
              <p className="mt-1 text-[11px] text-[var(--muted)]">English or Hindi both work.</p>
            </div>
            <FileAudio size={17} className="text-[var(--accent)]" />
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-[18px] bg-[#f5eee3] p-3 dark:bg-[#30291f]">
            <button
              onClick={() => setRecording((current) => !current)}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors",
                recording ? "bg-[#d56a4b]" : "bg-[#244f44]",
              )}
              aria-label={recording ? "Pause voice note" : "Record voice note"}
            >
              {recording ? <Pause size={16} /> : <Mic size={16} />}
            </button>
            <div className="flex flex-1 items-center gap-1">
              {[8, 16, 12, 22, 18, 28, 15, 24, 11, 19, 27, 16, 10, 20, 14, 9, 18, 25, 14, 10].map((height, index) => (
                <span key={index} className={cn("w-1 rounded-full", recording ? "bg-[#de7a59]" : "bg-[#b7b0a4]")} style={{ height }} />
              ))}
            </div>
            <span className="text-[10px] font-bold text-[var(--muted)]">{recording ? "00:18" : "00:00"}</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--line)] bg-white/60 p-5 shadow-sm dark:bg-white/5">
          <p className="text-xs font-bold">3. Confirm the basics</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["3 bedrooms", "3 bathrooms", "1,680 sq ft", "Indiranagar"].map((item) => (
              <button key={item} className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-white/60 px-3 py-2.5 text-left text-[11px] font-semibold dark:bg-white/5">
                {item}<Check size={13} className="text-[#58917a]" />
              </button>
            ))}
          </div>
        </div>
        {error && <p className="rounded-xl border border-[#edc1b2] bg-[#fff2ed] p-3 text-xs text-[#a04a31] dark:bg-[#3b241f] dark:text-[#f0a68d]">{error}</p>}
        <Button variant="accent" className="w-full" onClick={generateDraft} disabled={loading}>
          {loading ? <LoaderCircle size={16} className="animate-spin" /> : <WandSparkles size={16} />}
          {loading ? "Building your draft..." : "Generate listing draft"}
        </Button>
      </section>

      <section className="rounded-[26px] border border-[var(--line)] bg-white/65 p-5 shadow-sm dark:bg-white/5 md:p-6">
        <div className="flex flex-col justify-between gap-3 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--accent)]" />
              <p className="text-xs font-bold">AI-generated listing draft</p>
            </div>
            <p className="mt-1.5 text-[11px] text-[var(--muted)]">Editable, factual, and ready for your review.</p>
          </div>
          <Badge className={cn(generated ? "bg-[#edf7f1] text-[#49816d] dark:bg-[#244139] dark:text-[#b3d9ca]" : "bg-[#f5eee3] text-[#977044] dark:bg-[#30291f] dark:text-[#e5bd87]")}>
            {generated ? <CheckCircle2 size={12} /> : <Sparkles size={12} />} {generated ? "Generated now" : "Preview draft"}
          </Badge>
        </div>

        <div className="py-5">
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Suggested title</p>
          <h2 className="font-display mt-3 text-[31px] leading-[1.05] tracking-[-0.06em]">{draft.title}</h2>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Description</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{draft.description}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Highlights</p>
              <ul className="mt-3 space-y-2">
                {draft.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-xs leading-5">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#58917a]" /> {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Suggested tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {draft.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] bg-[#f4eee4] p-4 dark:bg-[#30291f]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8b663b] dark:text-[#e4bd87]">
            <Sparkles size={14} /> One useful follow-up
          </div>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{draft.followUp}</p>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="flex-1">Save draft</Button>
          <Button variant="default" className="flex-1">Review & publish</Button>
        </div>
      </section>
    </div>
  );
}

