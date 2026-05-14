"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("fl-theme", next);
    } catch {
      // ignore
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      onClick={toggle}
      className="theme-toggle"
      style={{
        width: 36,
        height: 36,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--rule-2)",
        background: "transparent",
        color: "var(--ink-2)",
        cursor: "pointer",
        transition: "color 200ms ease, border-color 200ms ease",
        visibility: mounted ? "visible" : "hidden",
      }}
    >
      {isDark ? (
        // Sun icon (click to go light)
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1.5 V3" />
          <path d="M8 13 V14.5" />
          <path d="M1.5 8 H3" />
          <path d="M13 8 H14.5" />
          <path d="M3.5 3.5 L4.6 4.6" />
          <path d="M11.4 11.4 L12.5 12.5" />
          <path d="M3.5 12.5 L4.6 11.4" />
          <path d="M11.4 4.6 L12.5 3.5" />
        </svg>
      ) : (
        // Moon icon (click to go dark)
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 9.4A5.5 5.5 0 1 1 6.6 3a5 5 0 0 0 6.4 6.4Z" />
        </svg>
      )}
    </button>
  );
}
