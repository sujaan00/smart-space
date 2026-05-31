import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CheckEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-md rounded-[28px] border border-[var(--line)] bg-white/70 p-7 text-center shadow-xl dark:bg-white/5">
        <Logo className="justify-center" />
        <span className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3efe9] text-[#4a806d] dark:bg-[#244139] dark:text-[#b3d9ca]">
          <MailCheck size={24} />
        </span>
        <h1 className="font-display mt-5 text-4xl tracking-[-0.06em]">Check your inbox.</h1>
        <p className="mt-3 text-xs leading-6 text-[var(--muted)]">We sent a secure sign-in link. It expires quickly and can only be used once.</p>
        <Link href="/auth" className={cn(buttonVariants({ variant: "outline" }), "mt-6")}><ArrowLeft size={14} /> Back to sign in</Link>
      </div>
    </main>
  );
}

