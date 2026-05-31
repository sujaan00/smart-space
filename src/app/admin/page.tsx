import Link from "next/link";
import { Activity, ArrowLeft, FileWarning, ShieldAlert, UploadCloud, UserRoundCog } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reports = [
  ["report-1048", "Unverified brokerage repost", "Duplicate content", "High", "Open"],
  ["report-1047", "Garden apartment", "Pricing looks misleading", "Medium", "Reviewing"],
  ["report-1046", "Office near metro", "Contact spam", "Medium", "Open"],
];

export default async function AdminPage() {
  const admin = await requireAdmin();

  if (!admin) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="max-w-md rounded-[28px] border border-[var(--line)] bg-white/70 p-7 text-center shadow-xl dark:bg-white/5">
          <ShieldAlert size={26} className="mx-auto text-[var(--accent)]" />
          <h1 className="font-display mt-5 text-4xl tracking-[-0.06em]">Restricted area.</h1>
          <p className="mt-3 text-xs leading-6 text-[var(--muted)]">Moderation tools are available only to explicitly approved administrator accounts.</p>
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "mt-6")}><ArrowLeft size={14} /> Back to dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="flex items-center justify-between border-b border-[var(--line)] bg-white/55 px-6 py-4 dark:bg-white/5">
        <Logo />
        <Badge className="bg-[#fff0eb] text-[#a6573e] dark:bg-[#3b241f] dark:text-[#f0a68d]"><ShieldAlert size={12} /> Moderation console</Badge>
      </header>
      <div className="mx-auto max-w-[1320px] px-5 py-8">
        <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">Admin</p>
        <h1 className="font-display mt-3 text-4xl tracking-[-0.06em]">Trust and safety overview</h1>
        <div className="mt-7 grid gap-3 md:grid-cols-4">
          {[
            ["Open reports", "18", FileWarning],
            ["Flagged uploads", "7", UploadCloud],
            ["Guest risk alerts", "4", ShieldAlert],
            ["Active users", "1,284", Activity],
          ].map(([label, value, Icon]) => {
            const StatIcon = Icon as typeof Activity;
            return (
              <div key={label as string} className="rounded-[20px] border border-[var(--line)] bg-white/60 p-4 dark:bg-white/5">
                <StatIcon size={16} className="text-[var(--forest)]" />
                <p className="font-display mt-4 text-3xl tracking-[-0.06em]">{value as string}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">{label as string}</p>
              </div>
            );
          })}
        </div>
        <section className="mt-7 overflow-hidden rounded-[22px] border border-[var(--line)] bg-white/60 dark:bg-white/5">
          <div className="flex items-center justify-between border-b border-[var(--line)] p-5">
            <h2 className="text-sm font-bold">Priority reports</h2>
            <UserRoundCog size={17} className="text-[var(--forest)]" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">
                <tr><th className="p-4">Report</th><th className="p-4">Listing</th><th className="p-4">Reason</th><th className="p-4">Risk</th><th className="p-4">Status</th></tr>
              </thead>
              <tbody>
                {reports.map(([id, listing, reason, risk, status]) => (
                  <tr key={id} className="border-t border-[var(--line)]">
                    <td className="p-4 font-bold">{id}</td><td className="p-4">{listing}</td><td className="p-4 text-[var(--muted)]">{reason}</td>
                    <td className="p-4"><Badge>{risk}</Badge></td><td className="p-4">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

