"use client";

import { useEffect } from "react";

const fmt = (n: number) => n.toLocaleString("en-US");

export default function LiveTickers() {
  useEffect(() => {
    let block = 12884931;
    let lat = 412;
    let bps = 1204;

    const blockEls = [
      document.getElementById("t-block"),
      document.getElementById("t-block-2"),
    ].filter((el): el is HTMLElement => el !== null);
    const latEl = document.getElementById("t-lat");
    const bpsEl = document.getElementById("t-bps");

    const blockTimer = setInterval(() => {
      block += Math.floor(1 + Math.random() * 3);
      blockEls.forEach((el) => {
        el.textContent = fmt(block);
      });
    }, 1100);

    const latTimer = setInterval(() => {
      lat = Math.max(280, Math.min(560, lat + (Math.random() * 40 - 20)));
      if (latEl) latEl.textContent = String(Math.round(lat));
    }, 1500);

    const bpsTimer = setInterval(() => {
      bps = Math.max(900, Math.min(1800, bps + (Math.random() * 120 - 60)));
      if (bpsEl) bpsEl.textContent = fmt(Math.round(bps));
    }, 900);

    return () => {
      clearInterval(blockTimer);
      clearInterval(latTimer);
      clearInterval(bpsTimer);
    };
  }, []);

  return null;
}
