import { Languages } from "lucide-react";
import { AiChat } from "@/components/ai-chat";
import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";

export default function AssistantPage() {
  return (
    <DashboardShell
      eyebrow="Conversational AI"
      title="Ask about your next move."
      description="Compare areas, describe the lifestyle you want, or ask for a more practical take on a property shortlist."
      action={<Badge className="bg-[#edf7f1] px-3 py-2 text-[#4a806c] dark:bg-[#244139] dark:text-[#b3d9ca]"><Languages size={13} /> English + हिन्दी</Badge>}
    >
      <AiChat />
    </DashboardShell>
  );
}

