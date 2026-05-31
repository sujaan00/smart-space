"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, KeyRound, LoaderCircle, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthPanel() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"guest" | "email" | "google" | null>(null);
  const [error, setError] = useState("");

  async function continueAsGuest() {
    setLoading("guest");
    setError("");
    try {
      const response = await fetch("/api/auth/guest", { method: "POST" });
      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error?.message ?? "Could not start guest mode.");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not start guest mode.");
      setLoading(null);
    }
  }

  async function continueWithGoogle() {
    setLoading("google");
    setError("");
    const result = await signIn("google", { callbackUrl: "/dashboard", redirect: false });
    if (result?.error) {
      setError("Google sign-in is not configured in this environment.");
      setLoading(null);
      return;
    }
    if (result?.url) window.location.href = result.url;
  }

  async function continueWithEmail(event: FormEvent) {
    event.preventDefault();
    setLoading("email");
    setError("");
    const result = await signIn("email", { email, callbackUrl: "/dashboard", redirect: false });
    if (result?.error) {
      setError("Email sign-in is not configured in this environment.");
      setLoading(null);
      return;
    }
    router.push("/auth/check-email");
  }

  return (
    <div className="w-full max-w-md rounded-[30px] border border-[var(--line)] bg-white/75 p-6 shadow-[0_30px_70px_rgba(44,74,63,.14)] backdrop-blur-xl dark:bg-[#1a2926]/88 sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e3efe9] text-[#4a806d] dark:bg-[#244139] dark:text-[#b3d9ca]">
        <Sparkles size={19} />
      </div>
      <h1 className="font-display mt-6 text-[38px] leading-[1] tracking-[-0.065em]">Make your search feel lighter.</h1>
      <p className="mt-3 text-xs leading-6 text-[var(--muted)]">Sign in to save your shortlist, or explore with a temporary guest session first.</p>

      <Button variant="outline" className="mt-6 w-full" onClick={continueWithGoogle} disabled={Boolean(loading)}>
        {loading === "google" ? <LoaderCircle size={16} className="animate-spin" /> : <KeyRound size={16} />} Continue with Google
      </Button>

      <div className="my-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
        <span className="h-px flex-1 bg-[var(--line)]" /> or email <span className="h-px flex-1 bg-[var(--line)]" />
      </div>

      <form onSubmit={continueWithEmail}>
        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Email address</label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-white/70 px-3 dark:bg-white/5">
          <Mail size={15} className="shrink-0 text-[var(--accent)]" />
          <input
            required
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent py-3 text-xs focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <Button variant="default" className="mt-3 w-full" disabled={Boolean(loading)}>
          {loading === "email" ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} />} Send secure sign-in link
        </Button>
      </form>

      {error && <p className="mt-4 rounded-xl border border-[#edc1b2] bg-[#fff2ed] p-3 text-xs text-[#a04a31] dark:bg-[#3b241f] dark:text-[#f0a68d]">{error}</p>}

      <button onClick={continueAsGuest} disabled={Boolean(loading)} className="mt-5 flex w-full items-center justify-center gap-2 py-2 text-xs font-bold text-[var(--accent)] disabled:opacity-50">
        {loading === "guest" ? <LoaderCircle size={15} className="animate-spin" /> : <LockKeyhole size={15} />}
        Continue as guest
      </button>
      <p className="mt-4 text-center text-[10px] leading-4 text-[var(--muted)]">Guest data is temporary and isolated. Signing in later can preserve your saved choices.</p>
    </div>
  );
}
