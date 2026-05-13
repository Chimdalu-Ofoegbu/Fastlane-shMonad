"use client";

import { useEffect, useRef } from "react";

export default function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
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
    let phaseT = 0;
    let rafId = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let io: IntersectionObserver | null = null;

    function measure() {
      if (!c || !ctx) return;
      const r = c.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c.width = w * DPR;
      c.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function buildTargets() {
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
      octx.font = `500 ${fontSize}px "Newsreader", serif`;
      octx.textBaseline = "middle";
      octx.textAlign = "center";
      // @ts-expect-error letterSpacing is not in TS lib yet
      octx.letterSpacing = "0.02em";
      octx.fillText("FASTLANE", w / 2, oh / 2);
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
      buildTargets();
      dots = targets.map((t) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        tx: t.x,
        ty: t.y,
        vx: 0,
        vy: 0,
        pulse: Math.random() * Math.PI * 2,
      }));
      phaseT = performance.now();
    }

    function step(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const t = now - phaseT;

      ctx.fillStyle = "rgba(232,224,210,0.04)";
      ctx.fillRect(0, h - 1, w, 1);

      const k = Math.min(1, t / 2400);
      const ease = 1 - Math.pow(1 - k, 3);

      for (const d of dots) {
        const dx = d.tx - d.x;
        const dy = d.ty - d.y;
        d.vx = d.vx * 0.86 + dx * 0.012;
        d.vy = d.vy * 0.86 + dy * 0.012;
        d.x += d.vx;
        d.y += d.vy;

        const drift = ease * 0.4;
        const ox = Math.cos(now * 0.0008 + d.pulse) * drift;
        const oy = Math.sin(now * 0.001 + d.pulse) * drift;

        const settled = Math.abs(dx) + Math.abs(dy) < 1.5 ? 1 : 0;
        const r = 1.4 + ease * 0.4;
        if (Math.random() < 0.01 && settled) {
          ctx.fillStyle = "rgba(97,5,255,0.9)";
        } else {
          ctx.fillStyle = `rgba(232,224,210,${0.35 + ease * 0.45})`;
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

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              dots.forEach((d) => {
                d.x = Math.random() * w;
                d.y = Math.random() * h;
                d.vx = 0;
                d.vy = 0;
              });
              phaseT = performance.now();
            }
          }
        },
        { threshold: 0.2 }
      );
      io.observe(c);
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
      if (io) io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="block w-full" style={{ height: 320 }} />;
}
