import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label="SmartSpace home">
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--forest)] text-white shadow-sm dark:text-[#10211d]">
        <Sparkles size={17} strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="text-[17px] font-bold tracking-[-0.04em]">
          Smart<span className="text-[var(--accent)]">Space</span>
        </span>
      )}
    </Link>
  );
}

