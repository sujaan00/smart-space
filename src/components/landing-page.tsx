"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  LockKeyhole,
  Map,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { GuestLink } from "@/components/guest-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { properties } from "@/lib/data";
import { cn } from "@/lib/utils";

const actions = [
  { href: "/explore", label: "Explore market", text: "Trends, maps & insights", icon: Map, tone: "bg-[#e4efe8] text-[#2d6859]" },
  { href: "/match", label: "Find your match", text: "Lifestyle-aware homes", icon: Compass, tone: "bg-[#f7e8d6] text-[#9a6139]" },
  { href: "/listings/new", label: "Create a listing", text: "Photos, voice & AI", icon: Building2, tone: "bg-[#eee6f4] text-[#74558a]" },
  { href: "/assistant", label: "Ask SmartSpace", text: "Chat in English or Hindi", icon: MessageCircle, tone: "bg-[#e4edf3] text-[#4b7089]" },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function LandingPage() {
  const featured = properties[0];

  return (
    <main className="overflow-hidden">
      <section className="relative min-h-screen px-5 pb-16 pt-5 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_72%_20%,rgba(221,234,224,.9),transparent_34%),radial-gradient(circle_at_12%_5%,rgba(252,232,204,.68),transparent_28%)] dark:bg-[radial-gradient(circle_at_72%_20%,rgba(38,80,69,.45),transparent_34%),radial-gradient(circle_at_12%_5%,rgba(100,73,46,.26),transparent_28%)]" />
        <header className="mx-auto flex max-w-[1380px] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-8 text-xs font-semibold text-[var(--muted)] md:flex" aria-label="Main navigation">
            <Link href="/explore" className="hover:text-[var(--foreground)]">Market intelligence</Link>
            <Link href="/match" className="hover:text-[var(--foreground)]">Lifestyle match</Link>
            <Link href="/listings/new" className="hover:text-[var(--foreground)]">List a property</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/auth" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden md:inline-flex")}>
              Sign in
            </Link>
            <GuestLink className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              Explore as guest
            </GuestLink>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1380px] gap-12 pb-8 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pt-24">
          <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }}>
            <motion.div {...reveal}>
              <Badge className="border-[#cddfd5] bg-white/65 px-3 py-1.5 text-[#3d725f] dark:border-[#315548] dark:bg-white/5 dark:text-[#a8d7c5]">
                <Sparkles size={12} /> Your AI real estate companion
              </Badge>
            </motion.div>
            <motion.h1
              {...reveal}
              className="font-display mt-7 max-w-[760px] text-[58px] leading-[.98] tracking-[-0.075em] sm:text-[72px] lg:text-[84px]"
            >
              Find a space that fits your{" "}
              <span className="italic text-[var(--accent)]">whole life.</span>
            </motion.h1>
            <motion.p {...reveal} className="mt-7 max-w-xl text-[15px] leading-7 text-[var(--muted)] md:text-base">
              Explore neighborhoods, compare true commute tradeoffs, and make confident property decisions with calm,
              data-backed guidance.
            </motion.p>
            <motion.form
              {...reveal}
              className="mt-9 flex max-w-2xl flex-col rounded-[22px] border border-[var(--line)] bg-white/80 p-2 shadow-[0_20px_50px_rgba(44,74,63,.12)] backdrop-blur md:flex-row dark:bg-white/5"
            >
              <label className="flex flex-1 items-center gap-3 px-3 py-2">
                <Search size={19} className="shrink-0 text-[var(--accent)]" />
                <span className="sr-only">Search properties and neighborhoods</span>
                <input
                  className="w-full bg-transparent text-sm placeholder:text-[var(--muted)] focus:outline-none"
                  placeholder="Search a locality, property, or commute goal..."
                />
              </label>
              <Link href="/explore" className={cn(buttonVariants({ variant: "accent" }), "mt-2 px-6 md:mt-0")}>
                Explore <ArrowRight size={15} />
              </Link>
            </motion.form>
            <motion.div {...reveal} className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[var(--muted)]">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[#4c9b7a]" /> Live market signals</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[#4c9b7a]" /> Commute-aware matches</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[#4c9b7a]" /> No sign-in required</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[610px] lg:mr-0"
          >
            <div className="relative ml-auto h-[560px] w-[84%] overflow-hidden rounded-[38px] bg-[#dfe9df] shadow-[0_30px_70px_rgba(45,79,67,.18)]">
              <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(max-width: 1024px) 84vw, 520px" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10201b]/75 to-transparent px-7 pb-7 pt-24 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/65">Top match for you</p>
                <div className="mt-2 flex items-end justify-between gap-5">
                  <div>
                    <h2 className="text-xl font-bold tracking-[-0.04em]">{featured.title}</h2>
                    <p className="mt-1 flex items-center gap-1 text-xs text-white/75"><MapPin size={13} /> {featured.locality}, {featured.city}</p>
                  </div>
                  <Link href="/match" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#23483e]" aria-label="View match">
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="glass absolute -left-2 top-14 w-[190px] rounded-[22px] p-4 shadow-lg sm:-left-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Lifestyle score</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="font-display text-4xl tracking-[-0.08em] text-[var(--forest)]">94<span className="text-lg">%</span></p>
                <Star size={17} fill="#e5704b" className="mb-1 text-[#e5704b]" />
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#dce6df] dark:bg-white/10">
                <div className="h-full w-[94%] rounded-full bg-[var(--accent)]" />
              </div>
              <p className="mt-3 text-[11px] leading-4 text-[var(--muted)]">Great commute, quiet lane, and your preferred cafe scene.</p>
            </div>
            <div className="glass absolute -bottom-5 left-3 flex items-center gap-3 rounded-[18px] p-3 pr-5 shadow-lg sm:left-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e2efe8] text-[#39725f] dark:bg-[#244039] dark:text-[#b1dccd]">
                <Clock3 size={18} />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Office commute</p>
                <p className="mt-0.5 text-sm font-bold">18 min <span className="text-xs font-normal text-[var(--muted)]">by metro</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white/42 px-5 py-16 dark:bg-white/[.02] md:px-8">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">One calm workspace</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.055em] md:text-[48px]">Everything you need to move well.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--muted)]">From city-level intelligence to a listing that is ready to publish, SmartSpace keeps each decision connected.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {actions.map(({ href, label, text, icon: Icon, tone }) => (
              <div key={href}>
                <Link href={href} className="group block h-full rounded-[24px] border border-[var(--line)] bg-white/60 p-5 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl dark:bg-white/5 dark:hover:bg-white/[.08]">
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", tone)}><Icon size={19} /></span>
                  <h3 className="mt-7 text-base font-bold tracking-[-0.03em]">{label}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-[var(--muted)]">{text}</p>
                    <ChevronRight size={16} className="text-[var(--accent)] transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[32px] bg-[#d9e7de] p-4 dark:bg-[#1b302b]">
            <div className="map-lines soft-grid relative h-[410px] overflow-hidden rounded-[24px] bg-[#bdd4c7] dark:bg-[#24443b]">
              <div className="absolute left-[18%] top-[20%] h-24 w-24 rounded-full bg-[#e58b61]/45 blur-2xl" />
              <div className="absolute left-[53%] top-[47%] h-32 w-32 rounded-full bg-[#d8b256]/55 blur-3xl" />
              <div className="absolute left-[38%] top-[62%] h-28 w-28 rounded-full bg-[#e06d5a]/35 blur-3xl" />
              {[
                ["Indiranagar", "53%", "38%", "#e5704b"],
                ["Koramangala", "37%", "61%", "#db8a62"],
                ["Whitefield", "73%", "46%", "#edc36a"],
                ["HSR Layout", "48%", "76%", "#77a997"],
              ].map(([label, left, top, color]) => (
                <div key={label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
                  <span className="block h-4 w-4 rounded-full border-[3px] border-white shadow-md" style={{ backgroundColor: color }} />
                  <span className="mt-1 block -translate-x-[35%] whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#36554d] shadow">{label}</span>
                </div>
              ))}
              <div className="absolute bottom-4 left-4 flex gap-3 rounded-full bg-white/85 px-3 py-2 text-[10px] font-semibold text-[#42645b] shadow">
                <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#77a997]" /> Stable</span>
                <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#edc36a]" /> Active</span>
                <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#e5704b]" /> Trending</span>
              </div>
            </div>
          </div>
          <div>
            <Badge className="border-[#cddfd5] bg-[#edf6ef] text-[#3c735f] dark:border-[#315548] dark:bg-white/5 dark:text-[#a8d7c5]">
              <BarChart3 size={12} /> Market intelligence
            </Badge>
            <h2 className="font-display mt-5 max-w-xl text-[46px] leading-[1.02] tracking-[-0.065em]">See the city clearly, before you decide.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">Understand price movement, rental demand, neighborhood character, and daily-life tradeoffs on one explainable map.</p>
            <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["42", "neighborhoods"],
                ["1.8k+", "verified homes"],
                ["12 mo", "trend history"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-[var(--line)] bg-white/55 p-4 dark:bg-white/5">
                  <p className="font-display text-2xl tracking-[-0.06em] text-[var(--forest)]">{value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/explore" className={cn(buttonVariants({ variant: "default" }), "mt-8")}>Explore the live map <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#1d433a] px-5 py-20 text-white dark:bg-[#18352f] md:px-8">
        <div className="mx-auto grid max-w-[1380px] gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a7cebe]">Trust, built in</p>
            <h2 className="font-display mt-4 max-w-3xl text-4xl tracking-[-0.055em] md:text-5xl">Helpful intelligence, with your privacy intact.</h2>
          </div>
          <Link href="/auth" className={cn(buttonVariants({ variant: "outline" }), "border-white/20 bg-white/10 text-white hover:bg-white/20 dark:bg-white/10")}>Start exploring <ArrowRight size={15} /></Link>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1380px] gap-3 md:grid-cols-3">
          {[
            [LockKeyhole, "Explore before sign-in", "Use guest mode with temporary, isolated sessions and clear limits."],
            [ShieldCheck, "Your choices stay yours", "Permission checks and secure defaults protect every sensitive action."],
            [WandSparkles, "AI that explains itself", "Verified facts and inferred suggestions are kept clearly separate."],
          ].map(([Icon, title, text]) => {
            const FeatureIcon = Icon as typeof ShieldCheck;
            return (
              <div key={title as string} className="rounded-[22px] border border-white/10 bg-white/[.06] p-5">
                <FeatureIcon size={19} className="text-[#b5d7ca]" />
                <h3 className="mt-5 text-sm font-bold">{title as string}</h3>
                <p className="mt-2 text-xs leading-5 text-white/60">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] px-5 py-6 text-[11px] text-[var(--muted)] md:flex-row md:px-12">
        <Logo />
        <p>Smart decisions for every move. Built with privacy-conscious defaults.</p>
      </footer>
    </main>
  );
}
