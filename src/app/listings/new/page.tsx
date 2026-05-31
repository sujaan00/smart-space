import { ShieldCheck, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { ListingStudio } from "@/components/listing-studio";
import { Badge } from "@/components/ui/badge";

export default function CreateListingPage() {
  return (
    <DashboardShell
      eyebrow="AI listing assistant"
      title="Turn the details into a listing people trust."
      description="Add a few photos, record a voice note in English or Hindi, and review a polished listing draft. SmartSpace keeps inferred details separate from what you verify."
      action={<Badge className="bg-[#edf7f1] px-3 py-2 text-[#4b806d] dark:bg-[#244139] dark:text-[#b3d9ca]"><ShieldCheck size={13} /> Metadata stripped on upload</Badge>}
    >
      <div className="mb-5 flex items-center gap-2 rounded-[16px] border border-[#d5e5dc] bg-[#edf6f1] px-4 py-3 text-xs text-[#447462] dark:border-[#315548] dark:bg-[#1c342e] dark:text-[#add3c4]">
        <Sparkles size={14} className="shrink-0" />
        Drafts are suggestions. Review pricing, amenities, and property facts before publishing.
      </div>
      <ListingStudio />
    </DashboardShell>
  );
}

