"use client";

import { useEffect, useRef, useState } from "react";

// Resolves left-to-right as load progress climbs (kprverse-style scramble).
const FINAL_PATH = "HTTPS://FASTLANE.XYZ/MEV/ATOMIC/BUNDLE-0X7F3A2C/SEAL-K2L9";
const GLYPHS = "ABCDEF0123456789XZ";

function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [path, setPath] = useState(FINAL_PATH);
  const [phase, setPhase] = useState<"load" | "exit" | "done">("load");
  const lastScramble = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const duration = reduced ? 600 : 2800;
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOutQuart(t);
      setPct(Math.floor(eased * 100));

      if (!reduced && now - lastScramble.current > 45) {
        lastScramble.current = now;
        const revealed = Math.floor(eased * FINAL_PATH.length);
        let out = "";
        for (let i = 0; i < FINAL_PATH.length; i++) {
          const c = FINAL_PATH[i];
          if (i < revealed || !/[A-Z0-9]/.test(c)) out += c;
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setPath(out);
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPct(100);
        setPath(FINAL_PATH);
        setTimeout(() => setPhase("exit"), reduced ? 120 : 320);
      }
    };
    raf = requestAnimationFrame(tick);

    // Guaranteed completion: rAF is paused in background tabs, so a
    // timer (which still fires when hidden) ensures the page never
    // stays locked behind a frozen preloader.
    const safety = setTimeout(() => {
      setPct(100);
      setPath(FINAL_PATH);
      setPhase((p) => (p === "load" ? "exit" : p));
    }, duration + 700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const t = setTimeout(
      () => {
        document.body.style.overflow = "";
        setPhase("done");
      },
      reduced ? 360 : 1150
    );
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fl-preloader${phase === "exit" ? " is-exit" : ""}`}
      aria-hidden="true"
    >
      <div className="flp-grid" />
      <div className="flp-scan" />

      <div className="flp-tag flp-tag-tl">FASTLANE // ALIGNMENT LAYER</div>
      <div className="flp-tag flp-tag-tr">MONAD MAINNET — SYNC</div>

      <div className="flp-core">
        <div className="flp-tri">
          <svg viewBox="0 0 200 200">
            <polygon className="t3" points="100,18 174,160 26,160" />
            <polygon className="t1" points="100,18 174,160 26,160" />
            <polygon className="t2" points="100,18 174,160 26,160" />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fastlane-logo.svg" alt="" className="flp-logo" />
        </div>

        <div className="flp-status">
          <span className="flp-dot" />
          LOADING SYSTEMS
        </div>
        <div className="flp-path num">{path}</div>
      </div>

      <div className="flp-count num">
        {String(pct).padStart(3, "0")}
        <span>%</span>
      </div>

      <div className="flp-bar">
        <i style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}
