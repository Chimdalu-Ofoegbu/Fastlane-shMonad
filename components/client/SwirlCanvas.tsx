"use client";

import { useEffect, useRef } from "react";

export default function SwirlCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

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
    type Particle = {
      r: number;
      theta: number;
      v: number;
      zr: number;
      zd: number;
      size: number;
      alpha: number;
      hue: "amber" | "ink";
    };
    let particles: Particle[] = [];
    const PARTICLE_COUNT = 220;
    let rafId = 0;

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function resize() {
      if (!c || !ctx) return;
      const r = c.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c.width = w * DPR;
      c.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function init() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const r = rand(80, Math.min(w, h) * 0.55);
        const theta = Math.random() * Math.PI * 2;
        particles.push({
          r,
          theta,
          v: rand(0.0006, 0.0028) * (Math.random() < 0.5 ? -1 : 1),
          zr: rand(0.4, 1.6),
          zd: rand(-0.04, 0.04),
          size: rand(0.6, 1.8),
          alpha: rand(0.18, 0.55),
          hue: Math.random() < 0.08 ? "amber" : "ink",
        });
      }
    }

    function step(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.72;
      const cy = h * 0.58;
      const g = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.7);
      g.addColorStop(0, `rgba(${signalRgb},0.06)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.theta += p.v;
        p.r += Math.sin(t * 0.0003 + p.zr) * 0.12 + p.zd;
        if (p.r < 40) p.r = 40;
        if (p.r > Math.min(w, h) * 0.7) p.r = Math.min(w, h) * 0.7;
        const x = cx + Math.cos(p.theta) * p.r;
        const y = cy + Math.sin(p.theta) * p.r * 0.62;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        if (p.hue === "amber") {
          ctx.fillStyle = `rgba(${signalRgb},${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(${inkRgb},${p.alpha * 0.55})`;
        }
        ctx.fill();
      }

      ctx.strokeStyle = `rgba(${inkRgb},0.06)`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const a = particles[(i * 23) % PARTICLE_COUNT];
        const b = particles[(i * 23 + 7) % PARTICLE_COUNT];
        if (!a || !b) continue;
        const ax = cx + Math.cos(a.theta) * a.r;
        const ay = cy + Math.sin(a.theta) * a.r * 0.62;
        const bx = cx + Math.cos(b.theta) * b.r;
        const by = cy + Math.sin(b.theta) * b.r * 0.62;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(cx, cy, bx, by);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(step);
    }

    function onResize() {
      resize();
      init();
    }

    resize();
    init();
    rafId = requestAnimationFrame(step);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.75 }}
    />
  );
}
