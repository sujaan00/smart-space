import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-5">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_28%,rgba(211,230,218,.86),transparent_34%),radial-gradient(circle_at_15%_78%,rgba(249,226,195,.58),transparent_28%)] dark:bg-[radial-gradient(circle_at_74%_28%,rgba(38,80,69,.42),transparent_34%),radial-gradient(circle_at_15%_78%,rgba(92,66,42,.24),transparent_28%)]" />
      <header className="mx-auto flex max-w-[1320px] items-center justify-between">
        <Logo />
        <ThemeToggle />
      </header>
      <section className="mx-auto grid min-h-[calc(100vh-70px)] max-w-[1180px] items-center gap-12 py-12 lg:grid-cols-[1fr_460px]">
        <div className="hidden lg:block">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted)]"><ArrowLeft size={14} /> Back home</Link>
          <p className="mt-20 text-[11px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">A calmer property journey</p>
          <h2 className="font-display mt-5 max-w-xl text-[62px] leading-[.98] tracking-[-0.075em]">Context for every decision. Pressure for none.</h2>
          <div className="mt-8 space-y-3">
            {["Explore city-level trends before you shortlist", "Rank homes with commute and lifestyle context", "Upgrade a guest session whenever you are ready"].map((item) => (
              <p key={item} className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]"><CheckCircle2 size={15} className="text-[#55937a]" /> {item}</p>
            ))}
          </div>
        </div>
        <AuthPanel />
      </section>
    </main>
  );
}

