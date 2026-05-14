"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  maxWidth?: number;
};

export default function TiltImage({ src, alt, maxWidth = 420 }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const state = useRef({
    rx: 0,
    ry: 0,
    baseRx: 0,
    baseRy: 0,
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
  });

  function applyTransform() {
    const el = imgRef.current;
    if (!el) return;
    const { rx, ry, dragging } = state.current;
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    el.style.transition = dragging
      ? "none"
      : "transform 360ms cubic-bezier(.2,.7,0,1)";
  }

  function onPointerMove(e: React.PointerEvent<HTMLImageElement>) {
    const el = imgRef.current;
    if (!el) return;
    const s = state.current;
    if (s.dragging) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    s.rx = s.baseRx + (py - 0.5) * -14;
    s.ry = s.baseRy + (px - 0.5) * 14;
    applyTransform();
  }

  function onPointerLeave() {
    const s = state.current;
    if (s.dragging) return;
    s.rx = s.baseRx;
    s.ry = s.baseRy;
    applyTransform();
  }

  function onPointerDown(e: React.PointerEvent<HTMLImageElement>) {
    const s = state.current;
    s.dragging = true;
    s.dragStartX = e.clientX;
    s.dragStartY = e.clientY;
    s.baseRx = s.rx;
    s.baseRy = s.ry;
    applyTransform();
    e.preventDefault();
  }

  useEffect(() => {
    function onWindowPointerMove(e: PointerEvent) {
      const s = state.current;
      if (!s.dragging) return;
      const dx = e.clientX - s.dragStartX;
      const dy = e.clientY - s.dragStartY;
      s.ry = s.baseRy + dx * 0.4;
      s.rx = s.baseRx - dy * 0.4;
      applyTransform();
    }
    function onWindowPointerUp() {
      const s = state.current;
      if (s.dragging) {
        s.dragging = false;
        s.baseRx = s.rx;
        s.baseRy = s.ry;
        applyTransform();
      }
    }
    window.addEventListener("pointermove", onWindowPointerMove);
    window.addEventListener("pointerup", onWindowPointerUp);
    window.addEventListener("pointercancel", onWindowPointerUp);
    return () => {
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("pointerup", onWindowPointerUp);
      window.removeEventListener("pointercancel", onWindowPointerUp);
    };
  }, []);

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      draggable={false}
      className="block w-full h-auto select-none"
      style={{
        maxWidth,
        willChange: "transform",
        userSelect: "none",
        cursor: "grab",
        touchAction: "none",
        transformStyle: "preserve-3d",
      }}
    />
  );
}
