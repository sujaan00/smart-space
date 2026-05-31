import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIndianPrice(value: number) {
  if (value >= 10_000_000) {
    return `Rs ${(value / 10_000_000).toFixed(value % 10_000_000 === 0 ? 0 : 1)} Cr`;
  }

  return `Rs ${(value / 100_000).toFixed(value % 100_000 === 0 ? 0 : 1)} L`;
}

