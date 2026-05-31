"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener("smartspace-theme", callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("smartspace-theme", callback);
      };
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("smartspace-theme");
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextDark = saved ? saved === "dark" : preferDark;
    document.documentElement.classList.toggle("dark", nextDark);
    window.dispatchEvent(new Event("smartspace-theme"));
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    document.documentElement.classList.toggle("dark", nextDark);
    window.localStorage.setItem("smartspace-theme", nextDark ? "dark" : "light");
    window.dispatchEvent(new Event("smartspace-theme"));
  }

  return (
    <Button variant="icon" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
