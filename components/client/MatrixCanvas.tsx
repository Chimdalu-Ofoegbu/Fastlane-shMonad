"use client";

import { useEffect, useRef } from "react";

const FORM_DURATION = 1700;
const HOLD_DURATION = 1600;
const DISPERSE_DURATION = 350;
const SPRING = 0.024;
const DAMP = 0.80;

type Phase = "forming" | "holding" | "dispersing";

const DEFAULT_WORDS = ["FASTLANE", "SHMONAD"];

/**
 * font prop:
 *   "grotesk" → always Space Grotesk (used by shMonad — locked).
 *   "serif"   → always Newsreader.
 *   "toggle"  → follow <html data-display> (used by Fastlane footer so the
 *               matrix participates in the global display-face toggle).
 */
type FontMode = "grotesk" | "serif" | "toggle";

type Props = {
  words?: readonly string[];
  font?: FontMode;
};

export default function MatrixCanvas({ words, font = "toggle" }: Props = {}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  // Capture once on mount; words prop is treated as static for this component.
  const wordsRef = useRef<readonly string[]>(
    words && words.length > 0 ? words : DEFAULT_WORDS
  );
  const fontModeRef = useRef<FontMode>(font);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let inkRgb = "232,224,210";
    let signalRgb = "97,5,255";

    function refreshColors() {
      const cs = getComputedStyle(document.documentElement);
      const ink = cs.getPropertyValue("--ink-rgb").trim();
      const sig = cs.getPropertyValue("--signal-rgb").trim();
      if (ink) inkRgb = ink.split(/\s+/).join(",");
      if (sig) signalRgb = sig.split(/\s+/).join(",");
    }
    refreshColors();
    const themeObserver = new MutationObserver(refreshColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    let targets: { x: number; y: number }[] = [];
    let dots: {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      pulse: number;
    }[] = [];
    let phase: Phase = "forming";
    let phaseStart = 0;
    let wordIdx = 0;
    let rafId = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    function measure() {
      if (!c || !ctx) return;
      const r = c.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c.width = w * DPR;
      c.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function buildTargets(word: string) {
      const off = document.createElement("canvas");
      const oh = 220;
      const fontSize = Math.min(Math.round(w / 6.2), 200);
      off.width = w;
      off.height = oh;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.fillStyle = "#000";
      octx.fillRect(0, 0, w, oh);
      octx.fillStyle = "#fff";
      // Resolve which display face to rasterize this frame's word mask in.
      const cs = getComputedStyle(document.documentElement);
      const mode: FontMode =
        fontModeRef.current === "toggle"
          ? document.documentElement.getAttribute("data-display") === "grotesk"
            ? "grotesk"
            : "serif"
          : fontModeRef.current;
      let fontStack: string;
      let weight = 600;
      if (mode === "serif") {
        const newsreaderVar = cs.getPropertyValue("--font-newsreader").trim();
        fontStack = newsreaderVar
          ? `${newsreaderVar}, "Newsreader", serif`
          : `"Newsreader", serif`;
        weight = 500;
      } else {
        const groteskVar = cs.getPropertyValue("--font-grotesk").trim();
        fontStack = groteskVar
          ? `${groteskVar}, "Space Grotesk", system-ui, sans-serif`
          : `"Space Grotesk", system-ui, sans-serif`;
      }
      octx.font = `${weight} ${fontSize}px ${fontStack}`;
      octx.textBaseline = "middle";
      octx.textAlign = "center";
      // @ts-expect-error letterSpacing is not in TS lib yet
      octx.letterSpacing = "0.02em";
      octx.fillText(word, w / 2, oh / 2);
      const img = octx.getImageData(0, 0, w, oh).data;

      targets = [];
      const step = Math.max(5, Math.round(fontSize / 24));
      for (let y = 0; y < oh; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4;
          if (img[idx] > 180) {
            targets.push({ x, y: y + (h - oh) / 2 });
          }
        }
      }
    }

    function init() {
      measure();
      const wordList = wordsRef.current;
      // Build the larger target set first so the dot array can hold the
      // max number we'll ever need across all words. Reset wordIdx to 0.
      wordIdx = 0;
      // Find max target count across all words to size the dot array.
      let maxCount = 0;
      for (const word of wordList) {
        buildTargets(word);
        if (targets.length > maxCount) maxCount = targets.length;
      }
      buildTargets(wordList[0]);
      dots = new Array(maxCount).fill(0).map((_, i) => {
        const t = targets[i % targets.length];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          tx: t.x,
          ty: t.y,
          vx: 0,
          vy: 0,
          pulse: Math.random() * Math.PI * 2,
        };
      });
      phase = "forming";
      phaseStart = performance.now();
    }

    function retargetScatter() {
      for (const d of dots) {
        d.tx = Math.random() * w;
        d.ty = Math.random() * h;
        d.vx = 0;
        d.vy = 0;
      }
    }

    function retargetWord() {
      const wordList = wordsRef.current;
      wordIdx = (wordIdx + 1) % wordList.length;
      buildTargets(wordList[wordIdx]);
      for (let i = 0; i < dots.length; i++) {
        const t = targets[i % targets.length];
        if (!t) continue;
        dots[i].tx = t.x;
        dots[i].ty = t.y;
        dots[i].vx = 0;
        dots[i].vy = 0;
      }
    }

    function step(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      let elapsed = now - phaseStart;

      // Advance phases
      if (phase === "forming" && elapsed >= FORM_DURATION) {
        phase = "holding";
        phaseStart = now;
        elapsed = 0;
      } else if (phase === "holding" && elapsed >= HOLD_DURATION) {
        retargetScatter();
        phase = "dispersing";
        phaseStart = now;
        elapsed = 0;
      } else if (phase === "dispersing" && elapsed >= DISPERSE_DURATION) {
        retargetWord();
        phase = "forming";
        phaseStart = now;
        elapsed = 0;
      }

      // formedness: 0 = scattered, 1 = full wordmark
      let formedness: number;
      if (phase === "forming") {
        const k = Math.min(1, elapsed / FORM_DURATION);
        formedness = 1 - Math.pow(1 - k, 3);
      } else if (phase === "holding") {
        formedness = 1;
      } else {
        const k = Math.min(1, elapsed / DISPERSE_DURATION);
        formedness = 1 - (1 - Math.pow(1 - k, 3));
      }

      ctx.fillStyle = `rgba(${inkRgb},0.04)`;
      ctx.fillRect(0, h - 1, w, 1);

      for (const d of dots) {
        const dx = d.tx - d.x;
        const dy = d.ty - d.y;
        d.vx = d.vx * DAMP + dx * SPRING;
        d.vy = d.vy * DAMP + dy * SPRING;
        d.x += d.vx;
        d.y += d.vy;

        const drift = formedness * 0.4;
        const ox = Math.cos(now * 0.0008 + d.pulse) * drift;
        const oy = Math.sin(now * 0.001 + d.pulse) * drift;

        const isHolding = phase === "holding";
        const r = 1.4 + formedness * 0.4;
        if (isHolding && Math.random() < 0.01) {
          ctx.fillStyle = `rgba(${signalRgb},0.9)`;
        } else {
          ctx.fillStyle = `rgba(${inkRgb},${0.35 + formedness * 0.45})`;
        }
        ctx.beginPath();
        ctx.arc(d.x + ox, d.y + oy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 180);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        init();
        rafId = requestAnimationFrame(step);
      });
    } else {
      init();
      rafId = requestAnimationFrame(step);
    }

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="block w-full" style={{ height: 320 }} />;
}
