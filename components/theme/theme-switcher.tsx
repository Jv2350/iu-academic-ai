"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Laptop, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

function getStoredTheme(): Theme {
  const storedTheme = localStorage.getItem("iu-theme");
  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
    ? storedTheme
    : "system";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerTheme(): Theme {
  return "system";
}

function applyTheme(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.theme = theme;
}

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const theme = useSyncExternalStore(subscribeToTheme, getStoredTheme, getServerTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function changeTheme(next: Theme) {
    localStorage.setItem("iu-theme", next);
    applyTheme(next);
    window.dispatchEvent(new StorageEvent("storage", { key: "iu-theme", newValue: next }));
  }

  return (
    <label className={`flex items-center gap-2 ${compact ? "text-slate-500" : "text-sm text-slate-700 dark:text-slate-200"}`}>
      {theme === "light" ? <Sun className="size-4" /> : theme === "dark" ? <Moon className="size-4" /> : <Laptop className="size-4" />}
      {!compact && <span>Appearance</span>}
      <select suppressHydrationWarning value={theme} onChange={(event) => changeTheme(event.target.value as Theme)} className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
