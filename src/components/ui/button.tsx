import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--forest)] px-5 py-3 text-white shadow-sm hover:-translate-y-0.5 hover:shadow-lg dark:text-[#10211d]",
        accent: "bg-[var(--accent)] px-5 py-3 text-white shadow-sm hover:-translate-y-0.5 hover:bg-[var(--accent-dark)] hover:shadow-lg",
        outline: "border border-[var(--line)] bg-white/45 px-5 py-3 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10",
        ghost: "px-3 py-2 text-[var(--muted)] hover:bg-white/65 hover:text-[var(--foreground)] dark:hover:bg-white/5",
        icon: "h-10 w-10 border border-[var(--line)] bg-white/60 p-0 text-[var(--foreground)] hover:bg-white dark:bg-white/5 dark:hover:bg-white/10",
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-xs",
        lg: "px-6 py-3.5 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };

