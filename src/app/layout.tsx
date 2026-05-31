import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "SmartSpace | AI Real Estate Companion",
    template: "%s | SmartSpace",
  },
  description:
    "Explore smarter property decisions with market intelligence, commute-aware matches, and AI listing tools.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

