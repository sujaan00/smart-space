"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function GuestLink({ className, children }: { className?: string; children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function startGuestSession() {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/guest", { method: "POST" });
      if (!response.ok) throw new Error("Guest mode unavailable");
      router.push("/dashboard");
      router.refresh();
    } catch {
      router.push("/auth");
    }
  }

  return (
    <button onClick={startGuestSession} disabled={loading} className={cn(className, "disabled:opacity-60")}>
      {loading ? <LoaderCircle size={14} className="animate-spin" /> : children}
    </button>
  );
}

