"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bookmark,
  Building2,
  ChevronDown,
  Compass,
  LayoutDashboard,
  Map,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mainLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/explore", label: "Explore market", icon: Map },
  { href: "/match", label: "Find my match", icon: Compass },
  { href: "/listings/new", label: "Create listing", icon: Building2 },
  { href: "/assistant", label: "Ask SmartSpace", icon: MessageCircle },
  { href: "/saved", label: "Saved", icon: Bookmark },
];

export function DashboardShell({
  children,
  eyebrow,
  title,
  description,
  action,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[224px] border-r border-[var(--line)] bg-white/55 px-4 py-5 backdrop-blur-xl dark:bg-[#101c19]/85 lg:block">
        <Logo className="px-2" />
        <nav className="mt-9 space-y-1" aria-label="Primary navigation">
          {mainLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] font-semibold transition-colors",
                  active
                    ? "bg-[var(--forest)] text-white shadow-md dark:text-[#10211d]"
                    : "text-[var(--muted)] hover:bg-white/70 hover:text-[var(--foreground)] dark:hover:bg-white/5",
                )}
              >
                <Icon size={17} strokeWidth={active ? 2.5 : 2} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-4 bottom-5 rounded-3xl bg-[#e9efe7] p-4 text-[#21473e] dark:bg-[#1a302a] dark:text-[#c7e2d8]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-white/10">
            <Sparkles size={15} />
          </span>
          <p className="mt-3 text-xs font-bold">AI listing assistant</p>
          <p className="mt-1 text-[11px] leading-4 opacity-75">Turn a voice note into a polished listing draft.</p>
          <Link href="/listings/new" className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold">
            Try it now <Plus size={13} />
          </Link>
        </div>
      </aside>

      <div className="lg:pl-[224px]">
        <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-[var(--line)] bg-[var(--background)]/85 px-5 backdrop-blur-xl md:px-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden items-center gap-2 text-xs text-[var(--muted)] lg:flex">
            <ShieldCheck size={15} className="text-[var(--forest)]" />
            Privacy-first property intelligence
          </div>
          <div className="flex items-center gap-2">
            <Badge className="hidden border-[#deceb1] bg-[#f7f0df] text-[#8c6a2d] md:flex dark:border-[#675432] dark:bg-[#2c281c] dark:text-[#e5c077]">
              Guest preview
            </Badge>
            <ThemeToggle />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/60 text-[var(--muted)] dark:bg-white/5"
              aria-label="Notifications"
            >
              <Bell size={16} />
            </button>
            <button className="ml-1 flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/60 py-1.5 pl-1.5 pr-2.5 text-left dark:bg-white/5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d8ebe3] text-[10px] font-bold text-[#28584c]">
                GS
              </span>
              <span className="hidden text-[11px] font-bold md:inline">Guest</span>
              <ChevronDown size={14} className="text-[var(--muted)]" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] px-5 py-6 md:px-8 md:py-8">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              {eyebrow && <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{eyebrow}</p>}
              <h1 className="font-display text-3xl tracking-[-0.04em] md:text-[38px]">{title}</h1>
              {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>}
            </div>
            {action}
          </div>
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-2xl border border-[var(--line)] bg-white/90 p-1.5 shadow-xl backdrop-blur-xl dark:bg-[#192824]/95 lg:hidden">
        {mainLinks.slice(0, 5).map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[9px] font-bold",
                active ? "bg-[var(--forest)] text-white dark:text-[#10211d]" : "text-[var(--muted)]",
              )}
            >
              <Icon size={16} />
              {label.split(" ")[0]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function DashboardAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant: "accent" }), "text-xs")}>
      {children}
    </Link>
  );
}

