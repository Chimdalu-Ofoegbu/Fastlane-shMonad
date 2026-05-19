"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/client/ThemeToggle";
import MatrixCanvas from "@/components/client/MatrixCanvas";
import ShmonadBottomNav from "@/components/client/ShmonadBottomNav";
import "./shmonad.css";

const SHMONAD_MATRIX_WORDS = ["STAKE", "shMON"];

type DepositToken = "MON" | "WMON";

const DEPOSIT_TOKENS: { id: DepositToken; label: string; sub: string; icon: string }[] = [
  { id: "MON", label: "MON", sub: "Native Monad", icon: "/monad-token.svg" },
  { id: "WMON", label: "WMON", sub: "Wrapped MON", icon: "/monad-token.svg" },
];

// Simulated connected wallet (demo only — no real wallet integration).
const WALLET_ADDRESS = "0x7F3A2c9b4E1d8a6F05C2eB91D3a7F4c2C9b1e0A8";
const WALLET_SHORT = "0x7F3A…1e0A8";

// Simulated recent activity feed shown once a wallet is connected.
const ACTIVITY: { type: string; date: string; amount: string; tx: string }[] = [
  { type: "Reward", date: "Apr 28 · 17:42", amount: "+0.184 MON", tx: "0x9a2c…41be" },
  { type: "Epoch", date: "Apr 28 · 02:11", amount: "—", tx: "0x4f88…ddae" },
  { type: "MEV", date: "Apr 26 · 21:04", amount: "+0.041 MON", tx: "0xe1f2…00c1" },
  { type: "Stake", date: "Apr 24 · 11:09", amount: "+200 MON", tx: "0x812d…7702" },
  { type: "Restake", date: "Apr 21 · 09:42", amount: "+12.5 shMON", tx: "0xa01b…b32d" },
  { type: "Reward", date: "Apr 18 · 06:18", amount: "+0.171 MON", tx: "0x55cf…e4d8" },
];

export default function ShmonadPage() {
  const [depositToken, setDepositToken] = useState<DepositToken>("MON");
  const [tokenMenuOpen, setTokenMenuOpen] = useState(false);
  const tokenMenuRef = useRef<HTMLDivElement | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const walletMenuRef = useRef<HTMLDivElement | null>(null);
  const [positionOpen, setPositionOpen] = useState(true);
  const [degenPositionOpen, setDegenPositionOpen] = useState(true);
  const [activityOpen, setActivityOpen] = useState(false);
  const [stakeMode, setStakeMode] = useState<"stake" | "unstake">("stake");
  const [unstakeOption, setUnstakeOption] = useState<"epoch" | "instant">("instant");
  const [degenMode, setDegenMode] = useState<"deposit" | "withdraw">("deposit");
  const [rpcMode, setRpcMode] = useState<"commit" | "uncommit">("commit");
  // Active route — used to hide the global stats strip on certain pages
  // (the strip should not appear on the RPC page).
  const [activeRoute, setActiveRoute] = useState<string>(
    typeof window !== "undefined" ? window.location.hash || "#/stake" : "#/stake"
  );
  // Degen Pool Details — collapsible state. Defaults to collapsed on load;
  // the user expands it when they want the explainer copy.
  const [degenDetailsOpen, setDegenDetailsOpen] = useState(false);
  // RPC "Select a Policy" dropdown
  const [policyMenuOpen, setPolicyMenuOpen] = useState(false);
  const policyMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!policyMenuOpen) return;
    function onDoc(e: MouseEvent) {
      if (!policyMenuRef.current) return;
      if (!policyMenuRef.current.contains(e.target as Node)) setPolicyMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPolicyMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [policyMenuOpen]);
  // Connected-wallet dropdown — close on outside click / Escape.
  useEffect(() => {
    if (!walletMenuOpen) return;
    function onDoc(e: MouseEvent) {
      if (!walletMenuRef.current) return;
      if (!walletMenuRef.current.contains(e.target as Node)) setWalletMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setWalletMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [walletMenuOpen]);
  useEffect(() => {
    const onHash = () => setActiveRoute(window.location.hash || "#/stake");
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // When the user connects, hydrate the freshly-mounted fl-track ctaAmt spans
  // (Stake + Unstake) from the current input values so each CTA shows the
  // right amount immediately. The imperative recalc handlers only fire on
  // input/preset events, not on the React state flip.
  useEffect(() => {
    if (!walletConnected) return;
    const fmt = (raw: string | null | undefined, fallback: string) => {
      const v = parseFloat((raw || fallback).replace(/,/g, "")) || 0;
      return v.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };
    const stakeInput = document.getElementById("stakeIn") as HTMLInputElement | null;
    const stakeFormatted = fmt(stakeInput?.value, "500");
    document
      .querySelectorAll<HTMLSpanElement>(".shmonad-root .ctaAmt")
      .forEach((el) => { el.textContent = stakeFormatted; });

    const unstakeInput = document.getElementById("unstakeIn") as HTMLInputElement | null;
    const unstakeFormatted = fmt(unstakeInput?.value, "0");
    document
      .querySelectorAll<HTMLSpanElement>(".shmonad-root .unstakeCtaAmt")
      .forEach((el) => { el.textContent = unstakeFormatted; });
  }, [walletConnected]);

  // Close the deposit-token dropdown when clicking anywhere outside it,
  // and on Escape — standard menu behavior.
  useEffect(() => {
    if (!tokenMenuOpen) return;
    function onDoc(e: MouseEvent) {
      if (!tokenMenuRef.current) return;
      if (!tokenMenuRef.current.contains(e.target as Node)) {
        setTokenMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setTokenMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [tokenMenuOpen]);

  useEffect(() => {
    // Mark body so the root grain overlay is hidden on this page.
    document.body.classList.add("shmonad-body");

    /* ─── ROUTER ─── */
    function route() {
      const hash = (location.hash || "#/stake").replace("#/", "");
      const id = "page-" + hash;
      document.querySelectorAll(".shmonad-root .page").forEach((p) => p.classList.remove("active"));
      const target =
        document.getElementById(id) || document.getElementById("page-stake");
      target?.classList.add("active");
      document.querySelectorAll(".shmonad-root [data-nav]").forEach((n) => {
        (n as HTMLElement).classList.toggle(
          "active",
          (n as HTMLElement).dataset.nav === hash
        );
      });
      const title: Record<string, string> = {
        stake: "Stake",
        unstake: "Unstake",
        rpc: "Fastlane RPC",
        points: "Points",
        degen: "Degen Pool",
        activity: "Activity",
        ecosystem: "Ecosystem",
      };
      document.title = "shMonad — " + (title[hash] || "Stake");
      window.scrollTo({ top: 0 });
    }
    window.addEventListener("hashchange", route);
    route();

    /* ─── STAKE WIDGET ─── */
    const stakeInput = document.getElementById("stakeIn") as HTMLInputElement | null;
    const stakeOut = document.getElementById("stakeOut");
    const yld = document.getElementById("yieldOut");
    const maxBtn = document.getElementById("maxBtn");
    const rate = 0.9423;
    const apr = 0.0784;
    const bal = 1284.5102;
    const fmt = (n: number, d = 4) =>
      n.toLocaleString("en-US", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      });
    function recalcStake() {
      if (!stakeInput) return;
      const v = parseFloat((stakeInput.value || "0").replace(/,/g, "")) || 0;
      if (stakeOut) stakeOut.textContent = fmt(v * rate, 4);
      if (yld) yld.textContent = fmt(v * apr, 2) + " MON";
      // Re-query each tick — the fl-track ctaAmt spans only exist after the
      // user connects a wallet (React mounts them then). Two copies (one per
      // fl-track <span>) must stay in sync.
      document
        .querySelectorAll<HTMLSpanElement>(".shmonad-root .ctaAmt")
        .forEach((el) => { el.textContent = fmt(v, 2); });
    }
    stakeInput?.addEventListener("input", recalcStake);
    maxBtn?.addEventListener("click", () => {
      if (stakeInput) stakeInput.value = bal.toFixed(4);
      recalcStake();
    });
    const pctBtns = document.querySelectorAll<HTMLButtonElement>(".shmonad-root .pct-btn");
    pctBtns.forEach((b) => {
      b.addEventListener("click", () => {
        if (stakeInput) stakeInput.value = (bal * parseFloat(b.dataset.pct || "0")).toFixed(2);
        recalcStake();
      });
    });
    recalcStake();

    /* ─── UNSTAKE WIDGET ─── */
    const unstakeInput = document.getElementById("unstakeIn") as HTMLInputElement | null;
    const unstakeOut = document.getElementById("unstakeOut");
    const unstakeMaxBtn = document.getElementById("unstakeMaxBtn");
    const rateInst = 1.0598;
    const shBal = 8422.18;
    function recalcUnstake() {
      if (!unstakeInput) return;
      const v = parseFloat((unstakeInput.value || "0").replace(/,/g, "")) || 0;
      if (unstakeOut) unstakeOut.textContent = fmt(v * rateInst, 2);
      // fl-track CTA on the Unstake form — both copies stay in sync.
      document
        .querySelectorAll<HTMLSpanElement>(".shmonad-root .unstakeCtaAmt")
        .forEach((el) => { el.textContent = fmt(v, 2); });
    }
    unstakeInput?.addEventListener("input", recalcUnstake);
    unstakeMaxBtn?.addEventListener("click", () => {
      if (unstakeInput) unstakeInput.value = shBal.toFixed(4);
      recalcUnstake();
    });
    const unstakePctBtns = document.querySelectorAll<HTMLButtonElement>(
      ".shmonad-root .unstake-pct-btn"
    );
    unstakePctBtns.forEach((b) => {
      b.addEventListener("click", () => {
        if (unstakeInput) unstakeInput.value = (shBal * parseFloat(b.dataset.pct || "0")).toFixed(2);
        recalcUnstake();
      });
    });
    recalcUnstake();

    /* ─── RPC COMMIT ─── */
    const rpcInput = document.getElementById("rpcIn") as HTMLInputElement | null;
    const range = document.getElementById("durRange") as HTMLInputElement | null;
    const dur = document.getElementById("durDays");
    const gas = document.getElementById("gasBudget");
    const rateLimitVal = document.getElementById("rateLimitVal");
    const rateLimitReq = document.getElementById("rateLimitReq");
    // Continuous interpolation:
    //   perMin = days × 45.467  (matches "23 req/sec (1364 Per Min)" at 30 days)
    //   reqSec = ceil(perMin / 60)
    function perMinForDays(days: number): number {
      return Math.round(days * 45.467);
    }
    function reqSecForDays(days: number): number {
      return Math.ceil(perMinForDays(days) / 60);
    }
    function recalcRpc() {
      if (!rpcInput) return;
      const v = parseFloat((rpcInput.value || "0").replace(/,/g, "")) || 0;
      // fl-track CTA on the RPC commit form — both copies stay in sync.
      const amt = fmt(v, 2);
      document
        .querySelectorAll<HTMLSpanElement>(".shmonad-root .rpcCtaAmt")
        .forEach((el) => { el.textContent = amt; });
      const d = parseInt(range?.value || "30");
      if (dur) dur.textContent = String(d);
      // Continuous rate-limit callout (per-min + req/sec).
      if (rateLimitVal) rateLimitVal.textContent = perMinForDays(d).toLocaleString();
      if (rateLimitReq) rateLimitReq.textContent = String(reqSecForDays(d));
      const txPerShMon = 59.4;
      const txTotal = Math.round(v * txPerShMon);
      if (gas)
        gas.textContent =
          "≈ " +
          (txTotal * 400).toLocaleString() +
          " gas · " +
          txTotal.toLocaleString() +
          " tx";
    }
    rpcInput?.addEventListener("input", recalcRpc);
    range?.addEventListener("input", recalcRpc);
    const rpcMaxBtn = document.getElementById("rpcMaxBtn");
    const rpcBal = 2841.0091;
    rpcMaxBtn?.addEventListener("click", () => {
      if (rpcInput) rpcInput.value = rpcBal.toFixed(4);
      recalcRpc();
    });
    recalcRpc();

    /* ─── DEGEN POOL WIDGET ─── mirrors the Stake widget. */
    const degenInput = document.getElementById("degenIn") as HTMLInputElement | null;
    const degenOut = document.getElementById("degenOut");
    const degenMaxBtn = document.getElementById("degenMaxBtn");
    const degenRate = 0.981;
    const degenBal = 2841.0091;
    function recalcDegen() {
      if (!degenInput) return;
      const v = parseFloat((degenInput.value || "0").replace(/,/g, "")) || 0;
      if (degenOut) degenOut.textContent = fmt(v * degenRate, 2);
      document
        .querySelectorAll<HTMLSpanElement>(".shmonad-root .degenCtaAmt")
        .forEach((el) => { el.textContent = fmt(v, 2); });
    }
    degenInput?.addEventListener("input", recalcDegen);
    degenMaxBtn?.addEventListener("click", () => {
      if (degenInput) degenInput.value = degenBal.toFixed(4);
      recalcDegen();
    });
    const degenPctBtns = document.querySelectorAll<HTMLButtonElement>(
      ".shmonad-root .degen-pct-btn"
    );
    degenPctBtns.forEach((b) => {
      b.addEventListener("click", () => {
        if (degenInput) degenInput.value = (degenBal * parseFloat(b.dataset.pct || "0")).toFixed(2);
        recalcDegen();
      });
    });
    recalcDegen();

    /* ─── DEGEN withdraw form ─── */
    const degenWInput = document.getElementById("degenWithdrawIn") as HTMLInputElement | null;
    const degenWMaxBtn = document.getElementById("degenWithdrawMaxBtn");
    const degenWBal = 1902.44;
    function recalcDegenW() {
      if (!degenWInput) return;
      const v = parseFloat((degenWInput.value || "0").replace(/,/g, "")) || 0;
      document
        .querySelectorAll<HTMLSpanElement>(".shmonad-root .degenWithdrawCtaAmt")
        .forEach((el) => { el.textContent = fmt(v, 2); });
    }
    degenWInput?.addEventListener("input", recalcDegenW);
    degenWMaxBtn?.addEventListener("click", () => {
      if (degenWInput) degenWInput.value = degenWBal.toFixed(4);
      recalcDegenW();
    });
    const degenWPctBtns = document.querySelectorAll<HTMLButtonElement>(
      ".shmonad-root .degen-withdraw-pct-btn"
    );
    degenWPctBtns.forEach((b) => {
      b.addEventListener("click", () => {
        if (degenWInput) degenWInput.value = (degenWBal * parseFloat(b.dataset.pct || "0")).toFixed(2);
        recalcDegenW();
      });
    });
    recalcDegenW();

    /* ─── VALIDATOR GRID ─── */
    const valGrid = document.getElementById("valGrid");
    if (valGrid) {
      const cells = 14 * 5;
      const weights: number[] = [];
      for (let i = 0; i < 42; i++) weights.push(Math.random());
      weights.sort((a, b) => b - a);
      let html = "";
      for (let i = 0; i < cells; i++) {
        if (i < 42) {
          const w = weights[i];
          const cls =
            w > 0.66 ? "bg-lime" : w > 0.33 ? "bg-bone/70" : "bg-bone/30";
          html += `<span class="aspect-square ${cls}" title="validator-${String(i + 1).padStart(2, "0")} · w ${w.toFixed(2)}"></span>`;
        } else {
          html += '<span class="aspect-square bg-hair2"></span>';
        }
      }
      valGrid.innerHTML = html;
    }

    /* ─── STAKE FEED ─── */
    const feed = document.getElementById("stake-feed");
    let feedTimer: ReturnType<typeof setInterval> | null = null;
    if (feed) {
      const addrs = [
        "0xA1c2…f8E1",
        "0x3F1b…9A22",
        "0x78dA…1c0B",
        "0x4FEC…cc92",
        "0xC0DE…0d8E",
        "0xC7d4…0E5a",
        "0x6aE0…b3F1",
        "0xBe11…aa01",
        "0x12aa…ff3c",
        "0xDEAD…BEEF",
      ];
      const actions: [string, string][] = [
        ["stake", "text-lime"],
        ["stake", "text-lime"],
        ["stake", "text-lime"],
        ["unstake", "text-mute2"],
      ];
      let block = 14981224;
      function row() {
        const a = addrs[Math.floor(Math.random() * addrs.length)];
        const [act, cls] = actions[Math.floor(Math.random() * actions.length)];
        const amt = (Math.random() * 900 + 12).toFixed(2);
        const sh = (
          parseFloat(amt) * (act === "stake" ? 0.9423 : 1.0598)
        ).toFixed(2);
        block += Math.floor(Math.random() * 3) + 1;
        return `<div class="grid grid-cols-12 py-2.5 px-5 hairline-b hover:bg-ink2 transition">
          <div class="col-span-2 text-mute2 tnum">${block.toLocaleString()}</div>
          <div class="col-span-3 text-bone">${a}</div>
          <div class="col-span-2 ${cls}">${act}</div>
          <div class="col-span-2 text-right tnum text-bone2">${parseFloat(amt).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div class="col-span-2 text-right tnum ${cls}">${parseFloat(sh).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div class="col-span-1 text-right text-mute">${Math.floor(Math.random() * 30) + 1}s</div>
        </div>`;
      }
      let html = "";
      for (let i = 0; i < 8; i++) html += row();
      feed.innerHTML = html;
      feedTimer = setInterval(() => {
        feed.insertAdjacentHTML("afterbegin", row());
        while (feed.children.length > 8)
          feed.removeChild(feed.children[feed.children.length - 1]);
      }, 3500);
    }

    /* ─── LEADERBOARD ─── */
    const lbWrap = document.getElementById("lb-rows");
    if (lbWrap) {
      const rows = [
        { r: 1, addr: "0xA1c2…f8E1", cls: "staker", s: "2,419,884", p: "124.8M", d: "+8.2%" },
        { r: 2, addr: "0x78dA…1c0B", cls: "lp", s: "1,902,118", p: "98.4M", d: "+12.1%" },
        { r: 3, addr: "0x3F1b…9A22", cls: "staker", s: "1,711,209", p: "88.9M", d: "+3.4%" },
        { r: 4, addr: "0x4FEC…cc92", cls: "val", s: "1,540,001", p: "72.3M", d: "+2.0%" },
        { r: 5, addr: "0xC0DE…0d8E", cls: "staker", s: "1,288,442", p: "64.1M", d: "+5.8%" },
        { r: 6, addr: "0xC7d4…0E5a", cls: "val", s: "1,184,000", p: "58.7M", d: "+1.9%" },
        { r: 7, addr: "0xBe11…aa01", cls: "lp", s: "998,212", p: "52.0M", d: "+18.4%" },
        { r: 8, addr: "0x12aa…ff3c", cls: "staker", s: "884,919", p: "44.7M", d: "+6.0%" },
        { r: 9, addr: "0x6aE0…b3F1", cls: "lp", s: "811,442", p: "40.2M", d: "+9.1%" },
        { r: 10, addr: "0x09cE…1024", cls: "val", s: "742,889", p: "36.8M", d: "+1.2%" },
        { r: 11, addr: "0x8888…9999", cls: "staker", s: "700,114", p: "34.5M", d: "+4.0%" },
        { r: 12, addr: "0xDEAD…BEEF", cls: "lp", s: "612,302", p: "30.1M", d: "+11.2%" },
      ];
      const clsMap: Record<string, string> = { staker: "Staker", lp: "LP", val: "Validator" };
      function renderLb(filter = "all") {
        lbWrap!.innerHTML = rows
          .filter((x) => filter === "all" || x.cls === filter)
          .map(
            (x) => `
            <div class="lb-row grid grid-cols-12 py-3.5 hairline-b text-[13.5px] hover:bg-ink2 transition cursor-pointer">
              <div class="col-span-1 mono text-mute2 tnum">${String(x.r).padStart(2, "0")}</div>
              <div class="col-span-7 mono text-bone">${x.addr}</div>
              <div class="col-span-4 text-right mono tnum text-bone font-medium">${x.p}</div>
            </div>`
          )
          .join("");
      }
      document.querySelectorAll<HTMLButtonElement>(".shmonad-root .lb-filter").forEach((b) => {
        b.addEventListener("click", () => {
          document
            .querySelectorAll<HTMLButtonElement>(".shmonad-root .lb-filter")
            .forEach((x) => {
              x.classList.remove("border-lime", "text-bone");
              x.classList.add("border-hair2", "text-mute2");
            });
          b.classList.remove("border-hair2", "text-mute2");
          b.classList.add("border-lime", "text-bone");
          renderLb(b.dataset.filter || "all");
        });
      });
      renderLb();
    }

    /* ─── ECOSYSTEM ROWS ─── */
    const ecoWrap = document.getElementById("eco-rows");
    if (ecoWrap) {
      const data = [
        { p: "Kuru", c: "dex", i: "shMON-MON pool · 0.05% tier", tvl: "$42.8M", apr: "9.1%" },
        { p: "Curvance", c: "lending", i: "Collateral · 78% LTV", tvl: "$31.2M", apr: "4.4%" },
        { p: "Aori", c: "dex", i: "Limit-order venue", tvl: "$18.4M", apr: "12.2%" },
        { p: "Apriori", c: "lst", i: "aprMON pair · cross-LST", tvl: "$14.0M", apr: "7.9%" },
        { p: "Narwhal", c: "perps", i: "Margin asset · 50× max", tvl: "$11.8M", apr: "—" },
        { p: "Timeswap", c: "other", i: "Fixed-rate · 30/60/90d", tvl: "$9.4M", apr: "8.6%" },
        { p: "Monorail", c: "other", i: "Bridge · canonical shMON", tvl: "$8.1M", apr: "—" },
        { p: "Levr", c: "perps", i: "Looped staking · 5× max", tvl: "$7.2M", apr: "22.4%" },
        { p: "Caddy", c: "other", i: "Vault · auto-compound", tvl: "$6.0M", apr: "8.1%" },
        { p: "Onyx", c: "lending", i: "Money market · listed", tvl: "$5.5M", apr: "5.1%" },
        { p: "Ambient", c: "dex", i: "CLMM · concentrated LP", tvl: "$4.8M", apr: "14.2%" },
        { p: "Kintsu", c: "lst", i: "sMON pair · LST swap", tvl: "$4.0M", apr: "7.7%" },
        { p: "Nile", c: "dex", i: "Stable pool · ve(3,3)", tvl: "$3.8M", apr: "10.4%" },
        { p: "Octo", c: "other", i: "Yield aggregator", tvl: "$3.4M", apr: "9.0%" },
        { p: "Boo", c: "perps", i: "Options · shMON collateral", tvl: "$2.8M", apr: "—" },
        { p: "Pingu", c: "other", i: "Index · MON-50", tvl: "$2.2M", apr: "6.8%" },
        { p: "Castle", c: "lending", i: "Isolated market", tvl: "$2.0M", apr: "4.9%" },
        { p: "Voltage", c: "lending", i: "Variable-rate borrow", tvl: "$1.6M", apr: "5.4%" },
        { p: "Hilo", c: "dex", i: "AMM · MON-shMON", tvl: "$1.2M", apr: "11.0%" },
      ];
      const catLabel: Record<string, string> = { dex: "DEX", lending: "Lending", perps: "Perps", lst: "LST", other: "Other" };
      function renderEco(cat = "all") {
        ecoWrap!.innerHTML = data
          .filter((x) => cat === "all" || x.c === cat)
          .map(
            (x) => `
            <div class="grid grid-cols-12 py-3.5 hairline-b text-[13.5px] hover:bg-ink2 transition cursor-pointer items-center">
              <div class="col-span-4 flex items-center gap-3">
                <span class="w-8 h-8 bg-hair2 flex items-center justify-center serif text-[14px] text-bone2">${x.p[0]}</span>
                <span class="text-bone">${x.p}</span>
              </div>
              <div class="col-span-2 mono text-[11px] text-mute2"><span class="px-2 py-0.5 border border-hair2">${catLabel[x.c]}</span></div>
              <div class="col-span-3 mono text-[12px] text-mute2">${x.i}</div>
              <div class="col-span-2 text-right mono tnum text-bone2">${x.tvl}</div>
              <div class="col-span-1 text-right mono tnum text-lime">${x.apr}</div>
            </div>`
          )
          .join("");
      }
      document.querySelectorAll<HTMLButtonElement>(".shmonad-root .eco-filter").forEach((b) => {
        b.addEventListener("click", () => {
          document
            .querySelectorAll<HTMLButtonElement>(".shmonad-root .eco-filter")
            .forEach((x) => {
              x.classList.remove("border-lime", "text-lime");
              x.classList.add("border-hair2", "text-mute2");
            });
          b.classList.remove("border-hair2", "text-mute2");
          b.classList.add("border-lime", "text-lime");
          renderEco(b.dataset.cat || "all");
        });
      });
      renderEco();
    }

    return () => {
      document.body.classList.remove("shmonad-body");
      window.removeEventListener("hashchange", route);
      if (feedTimer) clearInterval(feedTimer);
    };
  }, []);

  return (
    <div className="shmonad-root pb-[88px] md:pb-0">
      {/* TOP CHROME */}
      <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur-md hairline-b">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 h-[60px] flex items-center justify-between">
          <a href="#/stake" className="flex items-center group">
            {/* Theme-aware logo — white-wordmark logo on the dark theme,
                all-black logo on the light theme. Swapped via CSS. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/shMonad-Logo.png"
              alt="shMonad"
              className="logo-dark"
              style={{ height: 26, width: "auto" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/SHMONAD_ALL_BLACK.png"
              alt="shMonad"
              className="logo-light"
              style={{ height: 26, width: "auto" }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[13px] text-mute2">
            <a className="nav-link" href="#/stake" data-nav="stake">Stake</a>
            <a className="nav-link" href="#/rpc" data-nav="rpc">Fastlane RPC</a>
            <a className="nav-link" href="#/points" data-nav="points">
              Points <span className="mono text-[9px] ml-1 align-top" style={{ color: "#9a78ff" }}>NEW</span>
            </a>
            <a className="nav-link" href="#/degen" data-nav="degen">Degen Pool</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Fixed width so connecting/disconnecting never shifts the nav. */}
            <div ref={walletMenuRef} className="relative" style={{ width: 148 }}>
              {walletConnected ? (
                <>
                  <button
                    type="button"
                    id="connectBtn"
                    aria-haspopup="menu"
                    aria-expanded={walletMenuOpen}
                    onClick={() => setWalletMenuOpen((v) => !v)}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 h-[36px] border border-hair2 bg-ink2 text-bone text-[12.5px] font-medium hover:bg-ink3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
                    <span className="mono">{WALLET_SHORT}</span>
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                      className="text-mute2"
                      style={{
                        transform: walletMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 180ms ease",
                      }}
                    >
                      <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" />
                    </svg>
                  </button>
                  {walletMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-[calc(100%+8px)] z-30 w-[228px] border border-hair2 bg-ink shadow-2xl"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          navigator.clipboard?.writeText(WALLET_ADDRESS);
                          setWalletMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-3 text-[12.5px] text-bone hairline-b hover:bg-ink2"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-mute2 flex-shrink-0">
                          <rect x="5.5" y="5.5" width="8" height="8" stroke="currentColor" strokeWidth="1.3" />
                          <path d="M10.5 5.5 L10.5 2.5 L2.5 2.5 L2.5 10.5 L5.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
                        </svg>
                        Copy wallet address
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setWalletConnected(false);
                          setWalletMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-3 text-[12.5px] text-red hover:bg-ink2"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0">
                          <path d="M8 2 L8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
                          <path d="M4.4 4.7 A5 5 0 1 0 11.6 4.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
                        </svg>
                        Disconnect wallet
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  id="connectBtn"
                  onClick={() => setWalletConnected(true)}
                  className="cta-fl w-full inline-flex items-center justify-center gap-2 px-4 h-[36px] bg-lime border border-lime text-lime-fg text-[12.5px] font-medium"
                >
                  <span className="fl-track"><span>Connect wallet</span><span>Connect wallet</span></span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page-level stats strip — reads as a distinct section below the
          nav, with breathing room above and no connecting hairline.
          Hidden on the RPC and Degen pages where the page-specific
          layout takes over. */}
      <div className={`${(activeRoute.startsWith("#/rpc") || activeRoute.startsWith("#/degen") || activeRoute.startsWith("#/points") || activeRoute.startsWith("#/activity")) ? "hidden" : "block"} mt-10 lg:mt-[144px]`}>
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 flex items-start justify-center gap-8 md:gap-24 lg:gap-32 mono text-[15px]">
          <div className="flex flex-col items-center gap-1"><span className="mono-up text-mute2 text-[11px] md:text-[16px]">TVL</span> <span className="tnum text-bone font-bold text-[18px] md:text-[32px] leading-none">430M MON</span></div>
          <div className="flex flex-col items-center gap-1"><span className="mono-up text-mute2 text-[11px] md:text-[16px]">APY</span> <span className="tnum text-bone font-bold text-[18px] md:text-[32px] leading-none">20.54%</span></div>
          <div className="flex flex-col items-center gap-1"><span className="mono-up text-mute2 text-[11px] md:text-[16px]">HOLDERS</span> <span className="tnum text-bone font-bold text-[18px] md:text-[32px] leading-none">2,968</span></div>
        </div>
      </div>

      {/* PAGE: STAKE */}
      <main id="page-stake" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-[700px] mx-auto">
            <div id="stake-mod" className="border border-hair2 bg-ink">
                <div className="flex items-center hairline-b">
                  <button
                    type="button"
                    data-tab="stake"
                    onClick={() => setStakeMode("stake")}
                    className={`tab-btn flex-1 py-3.5 mono-up text-[14px] transition ${stakeMode === "stake" ? "text-bone bg-ink3" : "text-mute hover:text-bone"}`}
                  >
                    Stake
                  </button>
                  <button
                    type="button"
                    data-tab="unstake"
                    onClick={() => setStakeMode("unstake")}
                    className={`tab-btn flex-1 py-3.5 mono-up text-[14px] transition ${stakeMode === "unstake" ? "text-bone bg-ink3" : "text-mute hover:text-bone"}`}
                  >
                    Unstake
                  </button>
                </div>

                <div className={`p-7 lg:p-9 ${stakeMode === "stake" ? "" : "hidden"}`}>
                  <div className="mono-up text-mute mb-3 flex justify-between items-center">
                    <span>You deposit</span>
                    <span className="text-bone2 tnum text-[13.2px]" id="balMON">1,284.5102 {depositToken}</span>
                  </div>
                  <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px] relative">
                    <input id="stakeIn" type="text" inputMode="decimal" defaultValue="500.00" size={1} className="flex-1 min-w-0 bg-transparent outline-none text-[32px] md:text-[42px] tnum font-light tracking-tight" />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button id="maxBtn" className="mono text-[10.5px] text-bone border border-lime px-2 py-1 hover:bg-lime hover:text-ink transition">MAX</button>
                      {/* Token selector — opens a small dropdown menu of choices. */}
                      <div ref={tokenMenuRef} className="relative ml-1">
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={tokenMenuOpen}
                          onClick={() => setTokenMenuOpen((v) => !v)}
                          className="token-trigger flex items-center gap-2 pl-2 py-1.5 border border-transparent hover:border-hair2 hover:bg-ink3 transition"
                        >
                          <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={DEPOSIT_TOKENS.find((t) => t.id === depositToken)?.icon} alt={depositToken} className="w-full h-full object-contain" />
                          </span>
                          <span className="text-[15px]">{depositToken}</span>
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 10 10"
                            fill="none"
                            className={`text-mute2 token-chevron ${tokenMenuOpen ? "is-open" : ""}`}
                            aria-hidden="true"
                          >
                            <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" />
                          </svg>
                        </button>

                        <div
                          role="menu"
                          aria-hidden={!tokenMenuOpen}
                          className={`token-menu absolute right-0 top-[calc(100%+8px)] z-20 w-[260px] border border-hair2 bg-ink shadow-2xl ${tokenMenuOpen ? "is-open" : ""}`}
                        >
                          <div className="mono-up text-mute text-[10px] px-4 pt-3 pb-2 hairline-b">Select deposit token</div>
                          {DEPOSIT_TOKENS.map((t) => {
                            const active = t.id === depositToken;
                            return (
                              <button
                                key={t.id}
                                role="menuitemradio"
                                aria-checked={active}
                                onClick={() => {
                                  setDepositToken(t.id);
                                  setTokenMenuOpen(false);
                                }}
                                className="token-option w-full text-left flex items-center gap-3 px-4 py-3 hairline-b last:border-b-0"
                              >
                                <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={t.icon} alt={t.label} className="w-full h-full object-contain" />
                                </span>
                                <span className="flex-1 min-w-0">
                                  <span className="block text-[14px] text-bone">{t.label}</span>
                                  <span className="block mono text-[10.5px] text-mute2">{t.sub}</span>
                                </span>
                                <span className={`token-check w-4 h-4 border border-hair2 flex items-center justify-center ${active ? "is-active" : ""}`} aria-hidden="true">
                                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className={active ? "opacity-100" : "opacity-0"}>
                                    <path d="M2 5 L4.5 7.5 L8 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
                                  </svg>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-px bg-hair2">
                    <button className="pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.25">25%</button>
                    <button className="pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.50">50%</button>
                    <button className="pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.75">75%</button>
                    <button className="pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="1.00">MAX</button>
                  </div>

                  {/* Swap-direction chip — mirrors the central down-arrow node between the two cards in the live design */}
                  <div className="flex items-center gap-3 my-5">
                    <span className="flex-1 h-px bg-hair2" />
                    <span className="w-9 h-9 border border-hair2 bg-ink flex items-center justify-center text-mute2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M7 1.5 L7 11.5 M3 8 L7 12 L11 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" strokeLinejoin="miter" />
                      </svg>
                    </span>
                    <span className="flex-1 h-px bg-hair2" />
                  </div>

                  <div className="mono-up text-mute mb-3 flex justify-between items-center">
                    <span>You receive</span>
                    <span className="text-bone2 tnum text-[13.2px]">0.0000 shMON</span>
                  </div>
                  <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px] overflow-hidden">
                    <span id="stakeOut" className="flex-1 min-w-0 text-[32px] md:text-[42px] tnum font-light tracking-tight truncate">471.1500</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Round placeholder holding the shMON token icon */}
                      <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/shmon-token-new.png" alt="shMON" className="w-full h-full object-contain" />
                      </span>
                      <span className="text-[15px]">shMON</span>
                    </div>
                  </div>

                  <dl className="mt-7 mono text-[12.5px]">
                    {/* Exchange rate — mirrors the live design's bottom-row rate callout with info-icon affordance */}
                    <div className="flex justify-between py-2">
                      <dt className="text-mute flex items-center gap-1.5">
                        Exchange rate
                        <span className="inline-flex w-3.5 h-3.5 rounded-full border border-hair2 items-center justify-center text-[9px] text-mute2 leading-none cursor-help" title="Conversion rate between MON and shMON at current epoch.">i</span>
                      </dt>
                      <dd className="tnum">1 {depositToken} = 0.6412 shMON</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-mute flex items-center gap-1.5">
                        APY
                        <span className="inline-flex w-3.5 h-3.5 rounded-full border border-hair2 items-center justify-center text-[9px] text-mute2 leading-none cursor-help" title="Base validator rewards + MEV share + compounding, net of fees.">i</span>
                      </dt>
                      <dd className="tnum">20.54%</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => {
                      if (!walletConnected) setWalletConnected(true);
                      // (no-op when connected — placeholder for real stake action)
                    }}
                    className="cta-fl mt-7 w-full inline-flex items-center justify-center h-[58px] bg-lime text-lime-fg text-[14.5px] font-medium"
                  >
                    <span className="fl-track">
                      {walletConnected ? (
                        <>
                          <span>Stake <span className="tnum ctaAmt">500.00</span> {depositToken} →</span>
                          <span>Stake <span className="tnum ctaAmt">500.00</span> {depositToken} →</span>
                        </>
                      ) : (
                        <>
                          <span>Connect wallet</span>
                          <span>Connect wallet</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* ─── UNSTAKE FORM ─── mirrors the Stake form but reversed:
                    deposit shMON, receive MON, single exchange rate + unbond row. */}
                <div className={`p-7 lg:p-9 ${stakeMode === "unstake" ? "" : "hidden"}`}>
                  <div className="mono-up text-mute mb-3 flex justify-between items-center">
                    <span>You unstake</span>
                    <span className="text-bone2 tnum text-[13.2px]">8,422.18 shMON</span>
                  </div>
                  <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px] relative">
                    <input id="unstakeIn" type="text" inputMode="decimal" defaultValue="0.00" size={1} className="flex-1 min-w-0 bg-transparent outline-none text-[32px] md:text-[42px] tnum font-light tracking-tight" />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button id="unstakeMaxBtn" className="mono text-[10.5px] text-bone border border-lime px-2 py-1 hover:bg-lime hover:text-ink transition">MAX</button>
                      <div className="flex items-center gap-2 ml-1">
                        <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/shmon-token-new.png" alt="shMON" className="w-full h-full object-contain" />
                        </span>
                        <span className="text-[15px]">shMON</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-px bg-hair2">
                    <button className="unstake-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.25">25%</button>
                    <button className="unstake-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.50">50%</button>
                    <button className="unstake-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.75">75%</button>
                    <button className="unstake-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="1.00">MAX</button>
                  </div>

                  <div className="flex items-center gap-3 my-5">
                    <span className="flex-1 h-px bg-hair2" />
                    <span className="w-9 h-9 border border-hair2 bg-ink flex items-center justify-center text-mute2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M7 1.5 L7 11.5 M3 8 L7 12 L11 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" strokeLinejoin="miter" />
                      </svg>
                    </span>
                    <span className="flex-1 h-px bg-hair2" />
                  </div>

                  <div className="mono-up text-mute mb-3 flex justify-between items-center">
                    <span>You receive</span>
                    <span className="text-bone2 tnum text-[13.2px]">1,284.5102 MON</span>
                  </div>
                  <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px] overflow-hidden">
                    <span id="unstakeOut" className="flex-1 min-w-0 text-[32px] md:text-[42px] tnum font-light tracking-tight truncate">0.00</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/monad-token.svg" alt="MON" className="w-full h-full object-contain" />
                      </span>
                      <span className="text-[15px]">MON</span>
                    </div>
                  </div>

                  {/* Choose unstake option — Use shMON vs Use Pool. */}
                  <div className="mt-7 border border-hair2 bg-ink2">
                    <div className="hairline-b flex items-center px-5 h-[44px]">
                      <span className="mono-up text-mute">Choose unstake option</span>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        onClick={() => setUnstakeOption("epoch")}
                        className="border border-hair2 p-5 transition hover:bg-ink3 cursor-pointer"
                        style={
                          unstakeOption === "epoch"
                            ? { borderColor: "#9a78ff" }
                            : undefined
                        }
                      >
                        <div className="text-[15px] font-medium text-bone mb-4">Epoch Unstake</div>
                        <dl className="mono text-[12.5px] space-y-2.5">
                          <div className="flex justify-between">
                            <dt className="text-mute">Rate</dt>
                            <dd className="tnum text-bone">1 : 1.5593</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-mute">Wait time</dt>
                            <dd className="tnum text-bone">~1 day</dd>
                          </div>
                          <div className="flex justify-between hairline-t pt-2.5">
                            <dt className="text-mute">You receive</dt>
                            <dd className="tnum text-bone font-medium">155.92991 MON</dd>
                          </div>
                        </dl>
                      </div>
                      <div
                        onClick={() => setUnstakeOption("instant")}
                        className="border border-hair2 p-5 transition hover:bg-ink3 cursor-pointer"
                        style={
                          unstakeOption === "instant"
                            ? { borderColor: "#9a78ff" }
                            : undefined
                        }
                      >
                        <div className="text-[15px] font-medium text-bone mb-4">Instant Unstake</div>
                        <dl className="mono text-[12.5px] space-y-2.5">
                          <div className="flex justify-between">
                            <dt className="text-mute">Fee</dt>
                            <dd className="tnum text-bone">1.41597 MON</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-mute">Rate</dt>
                            <dd className="tnum text-bone">1 : 1.5451</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-mute">Wait time</dt>
                            <dd className="tnum" style={{ color: "#9a78ff" }}>Instant</dd>
                          </div>
                          <div className="flex justify-between hairline-t pt-2.5">
                            <dt className="text-mute">You receive</dt>
                            <dd className="tnum text-bone font-medium">154.51393 MON</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!walletConnected) setWalletConnected(true);
                      // (no-op when connected — placeholder for real unstake action)
                    }}
                    className="cta-fl mt-7 w-full inline-flex items-center justify-center h-[58px] bg-lime text-lime-fg text-[14.5px] font-medium"
                  >
                    <span className="fl-track">
                      {walletConnected ? (
                        <>
                          <span>Unstake <span className="tnum unstakeCtaAmt">0.00</span> shMON →</span>
                          <span>Unstake <span className="tnum unstakeCtaAmt">0.00</span> shMON →</span>
                        </>
                      ) : (
                        <>
                          <span>Connect wallet</span>
                          <span>Connect wallet</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-6 max-w-[700px] mx-auto">
              <div className="border border-hair2 bg-ink2">
                {walletConnected ? (
                  <button
                    type="button"
                    aria-expanded={positionOpen}
                    aria-controls="position-body"
                    aria-label={positionOpen ? "Collapse your position" : "Expand your position"}
                    onClick={() => setPositionOpen((v) => !v)}
                    className={`w-full flex items-center justify-between px-5 h-[44px] text-left transition hover:bg-ink3 ${
                      positionOpen ? "hairline-b" : ""
                    }`}
                  >
                    <span className="mono-up text-mute">Your position</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      className="text-mute2 flex-shrink-0"
                      style={{
                        transform: positionOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      }}
                    >
                      <path d="M3 5 L7 9 L11 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </button>
                ) : (
                  <div className="hairline-b flex items-center px-5 h-[44px]">
                    <span className="mono-up text-mute">Your position</span>
                  </div>
                )}
                {walletConnected ? (
                  <div id="position-body" className={`p-6 ${positionOpen ? "" : "hidden"}`}>
                    <div className="flex items-baseline gap-2">
                      <span className="tnum text-[32px] md:text-[42px] font-light tracking-tight leading-none">423.7872</span>
                      <span className="text-mute2 text-[15px]">MON</span>
                    </div>
                    <div className="mono text-[12px] text-mute2 mt-2">≈ $12.29</div>

                    <div className="mt-6 pt-6 hairline-t grid grid-cols-2 gap-y-5">
                      <div>
                        <div className="mono-up text-mute mb-1.5" style={{ fontSize: 12 }}>Principal</div>
                        <div className="tnum text-[16px] text-bone">412.0840 MON</div>
                      </div>
                      <div>
                        <div className="mono-up text-mute mb-1.5" style={{ fontSize: 12 }}>Earned</div>
                        <div className="tnum text-[16px]" style={{ color: "#9a78ff" }}>+11.7032</div>
                      </div>
                      <div>
                        <div className="mono-up text-mute mb-1.5" style={{ fontSize: 12 }}>APY</div>
                        <div className="tnum text-[16px]" style={{ color: "#9a78ff" }}>8.44%</div>
                      </div>
                      <div>
                        <div className="mono-up text-mute mb-1.5" style={{ fontSize: 12 }}>Since</div>
                        <div className="tnum text-[16px] text-bone">42d</div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 hairline-t">
                      <div className="mono-up text-mute text-[10px] mb-2.5">Next epoch</div>
                      <div className="h-1 bg-hair2 overflow-hidden">
                        <div className="h-full bg-lime" style={{ width: "62%" }} />
                      </div>
                      <div className="mono text-[11.5px] text-mute2 mt-2.5">17h 22m · #413</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 flex items-center gap-5">
                    {/* Connect-wallet icon — line-art wallet glyph at 48×48 matching the editorial style */}
                    <span className="w-12 h-12 flex items-center justify-center text-mute2 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        {/* Wallet body */}
                        <rect x="5.5" y="14" width="37" height="25" stroke="currentColor" strokeWidth="1.4" />
                        {/* Top fold/flap */}
                        <path d="M5.5 14 L34 14 L34 8.5 L5.5 8.5 Z" fill="currentColor" />
                        {/* Card slot / chip */}
                        <circle cx="34" cy="26.5" r="2.4" fill="currentColor" />
                        {/* Connection plug — small horizontal stem extending from the right edge */}
                        <path d="M42.5 26.5 L46.5 26.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                        <path d="M46.5 23.5 L46.5 29.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                      </svg>
                    </span>
                    <div className="mono text-[12px] text-mute2 leading-relaxed">
                      Connect a wallet to view your shMON balance, accrued yield, and active boost multipliers.
                    </div>
                  </div>
                )}
              </div>

            </div>

            <div className="mt-12 max-w-[700px] mx-auto">
              <div className="border border-hair2 bg-ink2">
                {walletConnected ? (
                  <button
                    type="button"
                    aria-expanded={activityOpen}
                    aria-controls="activity-body"
                    aria-label={activityOpen ? "Collapse your activity" : "Expand your activity"}
                    onClick={() => setActivityOpen((v) => !v)}
                    className={`w-full flex items-center justify-between px-5 h-[44px] text-left transition hover:bg-ink3 ${
                      activityOpen ? "hairline-b" : ""
                    }`}
                  >
                    <span className="mono-up text-mute">Your activity</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      className="text-mute2 flex-shrink-0"
                      style={{
                        transform: activityOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      }}
                    >
                      <path d="M3 5 L7 9 L11 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </button>
                ) : (
                  <div className="hairline-b flex items-center px-5 h-[44px]">
                    <span className="mono-up text-mute">Your activity</span>
                  </div>
                )}
                {walletConnected ? (
                  <div id="activity-body" className={activityOpen ? "" : "hidden"}>
                    {ACTIVITY.map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 px-5 py-3.5 hairline-b"
                      >
                        <div>
                          <span
                            className="inline-flex mono-up text-bone2 border border-hair2 px-2 py-1"
                            style={{ fontSize: 10 }}
                          >
                            {a.type}
                          </span>
                          <div className="mono text-[11px] text-mute mt-1.5">{a.date}</div>
                        </div>
                        <div className="text-right">
                          <div
                            className="tnum text-[13px]"
                            style={{ color: a.amount === "—" ? "var(--sh-mute2)" : "#9a78ff" }}
                          >
                            {a.amount}
                          </div>
                          <div className="mono text-[11px] text-mute2 mt-1.5">{a.tx}</div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="w-full px-5 py-4 text-center mono-up text-[11px] transition hover:bg-ink3"
                      style={{ color: "#9a78ff" }}
                    >
                      View all activity →
                    </button>
                  </div>
                ) : (
                  <div className="p-6 flex items-center gap-5">
                    {/* Activity icon — line-art clock glyph at 48×48 matching the editorial style */}
                    <span className="w-12 h-12 flex items-center justify-center text-mute2 flex-shrink-0">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.4" />
                        <path d="M24 14 L24 24 L31.5 28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
                      </svg>
                    </span>
                    <div className="mono text-[12px] text-mute2 leading-relaxed">
                      Connect a wallet to view your staking history, reward claims, and boost activity.
                    </div>
                  </div>
                )}
              </div>
            </div>

        </div>
      </main>

      {/* PAGE: FASTLANE RPC */}
      <main id="page-rpc" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 pt-[72px] pb-10 lg:pb-14">
          {/* Single-column stack: How it works (top) → Commit modal → Rate Limit
              Reference (bottom). Uniform 48px (mt-12) spacing between each card,
              all 700px wide and centered to the nav bar. First card sits exactly
              72px below the nav header. */}
          <div className="max-w-[700px] mx-auto">

            {/* "How it works" — two-step explainer */}
            <div className="border border-hair2">
              <div className="hairline-b flex items-center px-5 h-[44px]">
                <span className="mono-up text-mute">How it works</span>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { n: 1, title: "Commit to Fastlane RPC Policy", body: "First, commit shMON tokens to the Fastlane RPC policy to unlock endpoint generation." },
                  { n: 2, title: "Generate Endpoint",             body: "Sign a message with your wallet to create a unique, authenticated RPC endpoint." },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-lime flex items-center justify-center flex-shrink-0">
                      <span className="text-lime-fg tnum text-[15px] font-bold leading-none">{step.n}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-bone text-[13.5px] font-medium mb-1.5">{step.title}</div>
                      <p className="mono text-[12px] leading-[1.65] text-bone2">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commit / Uncommit modal — 48px below How it works */}
            <div className="mt-12 border border-hair2 bg-ink">
              <div className="flex items-center hairline-b">
                <button
                  type="button"
                  onClick={() => setRpcMode("commit")}
                  className={`flex-1 py-3.5 mono-up transition ${
                    rpcMode === "commit" ? "text-bone bg-ink3" : "text-mute hover:text-bone"
                  }`}
                >
                  Commit
                </button>
                <button
                  type="button"
                  onClick={() => setRpcMode("uncommit")}
                  className={`flex-1 py-3.5 mono-up transition ${
                    rpcMode === "uncommit" ? "text-bone bg-ink3" : "text-mute hover:text-bone"
                  }`}
                >
                  Uncommit
                </button>
              </div>

              {/* Policy selector — click to open the "Select a Policy" dropdown.
                  Hover lifts the bg slightly + nudges the chevron right; click
                  opens an absolute-positioned menu below with the single
                  available policy ("Fastlane RPC"). */}
              <div
                ref={policyMenuRef}
                className={`relative mt-4 mx-7 lg:mx-9 ${rpcMode === "commit" ? "" : "hidden"}`}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={policyMenuOpen}
                  onClick={() => setPolicyMenuOpen((v) => !v)}
                  className="policy-trigger w-full border border-hair2 flex items-center justify-between bg-ink2 px-5 h-[52px] transition"
                >
                  <span className="text-bone text-[14px] font-medium">Fastlane RPC</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="text-mute2 policy-chevron"
                    style={{
                      transform: policyMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    <path d="M5 3 L9 7 L5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                  </svg>
                </button>

                <div
                  role="menu"
                  aria-hidden={!policyMenuOpen}
                  className={`policy-menu absolute left-0 right-0 top-[calc(100%+8px)] z-20 border border-hair2 bg-ink shadow-2xl ${policyMenuOpen ? "is-open" : ""}`}
                >
                  {/* Menu header */}
                  <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                    <span className="mono-up text-bone2" style={{ fontSize: 13 }}>Select a Policy</span>
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={() => setPolicyMenuOpen(false)}
                      className="text-mute2 hover:text-bone transition"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                      </svg>
                    </button>
                  </div>

                  {/* Policy card — only one option, already selected */}
                  <div className="p-5">
                    <div className="border border-lime bg-ink2 p-5">
                      {/* Top-row chips: "For Users" + "New" */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-2 py-0.5 bg-ink3 border border-hair2 mono-up text-bone2" style={{ fontSize: 10 }}>For Users</span>
                        <span className="inline-flex items-center px-2 py-0.5 bg-lime text-lime-fg mono-up font-bold" style={{ fontSize: 10 }}>New</span>
                      </div>

                      <div className="text-bone text-[15px] font-medium mb-1.5">Fastlane RPC</div>

                      <p className="mono text-[12px] text-bone2 leading-[1.65] mb-4">
                        Unlock dedicated RPC access for your blockchain interactions. Rate limits scale with the amount of shMON committed to this policy.
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="mono-up text-mute2 mb-1" style={{ fontSize: 10 }}>Your Committed</div>
                          <div className="tnum text-bone font-medium text-[13.5px]">0.00 shMON</div>
                        </div>
                        <div className="text-right">
                          <div className="mono-up text-mute2 mb-1" style={{ fontSize: 10 }}>Unbonding Period</div>
                          <div className="tnum text-bone text-[13.5px]">75 blocks</div>
                        </div>
                      </div>

                      {/* Selected indicator — filled-lime pill for high contrast */}
                      <div className="w-full bg-lime text-lime-fg py-2.5 text-center mono-up font-medium" style={{ fontSize: 11 }}>
                        Selected
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-7 lg:p-9 ${rpcMode === "commit" ? "" : "hidden"}`}>
                <div className="mono-up text-mute mb-3 flex justify-between items-center">
                  <span>Enter amount to commit</span>
                  <span className="text-right">Available · <span className="text-bone2 tnum">2,841.0091</span></span>
                </div>
                <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px]">
                  <input
                    id="rpcIn"
                    type="text"
                    inputMode="decimal"
                    defaultValue="250.00"
                    size={1}
                    className="flex-1 min-w-0 bg-transparent outline-none text-[32px] md:text-[42px] tnum font-light tracking-tight"
                    // JSX-level onInput — keeps the receive output in sync
                    // without depending on the useEffect-captured listener.
                    onInput={(e) => {
                      const v = (e.target as HTMLInputElement).value || "0";
                      const n = parseFloat(v.replace(/,/g, "")) || 0;
                      const out = document.getElementById("rpcReceiveOut");
                      if (out) out.textContent = n.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      });
                    }}
                  />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* MAX button — matches the Stake form's MAX styling */}
                    <button id="rpcMaxBtn" className="mono text-[10.5px] text-bone border border-lime px-2 py-1 hover:bg-lime hover:text-ink transition">MAX</button>
                    <div className="flex items-center gap-2 ml-1">
                      {/* Round placeholder holding the shMON token icon */}
                      <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/shmon-token-new.png" alt="shMON" className="w-full h-full object-contain" />
                      </span>
                      <span className="text-[15px]">shMON</span>
                    </div>
                  </div>
                </div>

                {/* Swap-direction chip — mirrors the Stake modal's chip,
                    signals that the entered amount flows into Committed shMON. */}
                <div className="flex items-center gap-3 my-5">
                  <span className="flex-1 h-px bg-hair2" />
                  <span className="w-9 h-9 border border-hair2 bg-ink flex items-center justify-center text-mute2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1.5 L7 11.5 M3 8 L7 12 L11 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </span>
                  <span className="flex-1 h-px bg-hair2" />
                </div>

                {/* You receive — mirror of the deposit row with Committed shMON */}
                <div className="mono-up text-mute mb-3 flex justify-between items-center">
                  <span>You receive</span>
                  <span className="text-bone2 tnum text-[13.2px]">0.00 cmt-shMON</span>
                </div>
                <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px] overflow-hidden">
                  <span id="rpcReceiveOut" className="flex-1 min-w-0 text-[32px] md:text-[42px] tnum font-light tracking-tight truncate">250.00</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Committed shMON chip — uses the same shMON icon, since
                        cmt-shMON is just locked shMON. Filled-lime ring around
                        the placeholder distinguishes it from the deposit chip. */}
                    <span className="w-7 h-7 rounded-full bg-lime/20 border border-lime flex items-center justify-center overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/shmon-token-new.png" alt="Committed shMON" className="w-full h-full object-contain" />
                    </span>
                    <span className="text-[15px]">cmt-shMON</span>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="mono-up text-mute mb-3 flex justify-between">
                    <span>Policy duration</span>
                    <span className="text-bone2"><span id="durDays" className="tnum">30</span> days · auto-renew</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="180"
                    step="1"
                    defaultValue="30"
                    className="lime-slider w-full"
                    id="durRange"
                    // Initial fill: (30 - 7) / (180 - 7) ≈ 13.3% lime.
                    style={{ ["--slider-fill" as string]: "13.3%" }}
                    // JSX-level handler — re-binds on every render so it's
                    // not subject to stale closure references from useEffect.
                    onInput={(e) => {
                      const el = e.target as HTMLInputElement;
                      const d = parseInt(el.value || "30");
                      // Update the two-tone fill track.
                      const pct = ((d - 7) / (180 - 7)) * 100;
                      el.style.setProperty("--slider-fill", `${pct}%`);
                      const dur = document.getElementById("durDays");
                      if (dur) dur.textContent = String(d);
                      // Continuous interpolation:
                      //   perMin   = days × 45.467  (matches "23 req/sec (1364 Per Min)" at 30 days)
                      //   reqSec   = ceil(perMin / 60)
                      const perMin = Math.round(d * 45.467);
                      const reqSec = Math.ceil(perMin / 60);
                      const rateVal = document.getElementById("rateLimitVal");
                      const rateReq = document.getElementById("rateLimitReq");
                      if (rateVal) rateVal.textContent = perMin.toLocaleString();
                      if (rateReq) rateReq.textContent = String(reqSec);
                    }}
                  />
                  <div className="flex justify-between mono text-[12px] text-mute mt-2">
                    <span>Builder</span><span>Pro</span><span>Infra Operator</span><span>Enterprise</span>
                  </div>
                </div>

                {/* Rate Limit callout — value reacts to the Policy Duration
                    slider above (Builder/Pro/Infra Operator/Enterprise tiers). */}
                <div className="mt-4 border border-hair2 bg-ink2 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Lightning bolt glyph — path shifted left by 3 units so the
                          bolt's leftmost point sits at x=0 of the viewBox. This makes
                          its visual left edge align with the footnote asterisk below. */}
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-lime">
                        <path d="M6 1 L0 9 L4 9 L4 15 L10 7 L6 7 Z" fill="currentColor" />
                      </svg>
                      <span className="mono-up text-mute2" style={{ fontSize: 13 }}>Rate Limit</span>
                    </div>
                    <div className="mono text-[14px]">
                      <span id="rateLimitReq" className="tnum text-bone font-medium">23</span>
                      <span className="text-mute2 ml-1">req/sec</span>
                      <span className="text-mute2 ml-2">(</span>
                      <span id="rateLimitVal" className="tnum text-bone font-medium">1,364</span>
                      <span className="text-mute2 ml-1">Per Min</span>
                      <span className="text-mute2">)</span>
                      {/* Footnote asterisk — text-bone (not lime) for WCAG-AA contrast at small sizes */}
                      <span className="text-bone ml-0.5">*</span>
                    </div>
                  </div>
                  <div className="mono text-[11px] text-mute2 mt-2">
                    <span className="text-bone">*</span> Actual rate limit will be calculated based on total policy stake
                  </div>
                </div>

                <dl className="mt-7 mono text-[12.5px]">
                  <div className="flex justify-between py-2"><dt className="text-mute">Policy</dt><dd>Fastlane RPC · standard</dd></div>
                </dl>

                <button className="cta-fl mt-7 w-full inline-flex items-center justify-center h-[58px] bg-lime text-lime-fg text-[14.5px] font-medium">
                  <span className="fl-track">
                    <span>Commit <span className="tnum rpcCtaAmt">250.00</span> shMON</span>
                    <span>Commit <span className="tnum rpcCtaAmt">250.00</span> shMON</span>
                  </span>
                </button>
              </div>

              {/* ─── UNCOMMIT FORM ─── release committed shMON back to shMON. */}
              <div className={`p-7 lg:p-9 ${rpcMode === "uncommit" ? "" : "hidden"}`}>
                <div className="mono-up text-mute mb-3 flex justify-between">
                  <span>Enter amount to uncommit</span>
                  <span>Committed · <span className="text-bone2 tnum">1,640.0000</span></span>
                </div>
                <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px]">
                  <input
                    id="rpcUncommitIn"
                    type="text"
                    inputMode="decimal"
                    defaultValue="0.00"
                    size={1}
                    className="flex-1 min-w-0 bg-transparent outline-none text-[32px] md:text-[42px] tnum font-light tracking-tight"
                    onInput={(e) => {
                      const n = parseFloat(((e.target as HTMLInputElement).value || "0").replace(/,/g, "")) || 0;
                      const f = n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                      const out = document.getElementById("rpcUncommitOut");
                      if (out) out.textContent = f;
                      document
                        .querySelectorAll<HTMLSpanElement>(".shmonad-root .rpcUncommitCtaAmt")
                        .forEach((el) => { el.textContent = f; });
                    }}
                  />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      id="rpcUncommitMaxBtn"
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("rpcUncommitIn") as HTMLInputElement | null;
                        const out = document.getElementById("rpcUncommitOut");
                        if (input) input.value = "1,640.00";
                        if (out) out.textContent = "1,640.00";
                        document
                          .querySelectorAll<HTMLSpanElement>(".shmonad-root .rpcUncommitCtaAmt")
                          .forEach((el) => { el.textContent = "1,640.00"; });
                      }}
                      className="mono text-[10.5px] text-bone border border-lime px-2 py-1 hover:bg-lime hover:text-ink transition"
                    >
                      MAX
                    </button>
                    <div className="flex items-center gap-2 ml-1">
                      <span className="w-7 h-7 rounded-full bg-lime/20 border border-lime flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/shmon-token-new.png" alt="Committed shMON" className="w-full h-full object-contain" />
                      </span>
                      <span className="text-[15px]">cmt-shMON</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 my-5">
                  <span className="flex-1 h-px bg-hair2" />
                  <span className="w-9 h-9 border border-hair2 bg-ink flex items-center justify-center text-mute2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1.5 L7 11.5 M3 8 L7 12 L11 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </span>
                  <span className="flex-1 h-px bg-hair2" />
                </div>

                <div className="mono-up text-mute mb-3 flex justify-between items-center">
                  <span>You receive</span>
                  <span className="text-bone2 tnum text-[13.2px]">0.00 shMON</span>
                </div>
                <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px] overflow-hidden">
                  <span id="rpcUncommitOut" className="flex-1 min-w-0 text-[32px] md:text-[42px] tnum font-light tracking-tight truncate">0.00</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/shmon-token-new.png" alt="shMON" className="w-full h-full object-contain" />
                    </span>
                    <span className="text-[15px]">shMON</span>
                  </div>
                </div>

                <dl className="mt-7 mono text-[12.5px]">
                  <div className="flex justify-between py-2 hairline-b">
                    <dt className="text-mute">Cooldown</dt>
                    <dd className="tnum">~ 1 epoch</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-mute">Rate limit</dt>
                    <dd>Released when cooldown ends</dd>
                  </div>
                </dl>

                <button className="cta-fl mt-7 w-full inline-flex items-center justify-center h-[58px] bg-lime text-lime-fg text-[14.5px] font-medium">
                  <span className="fl-track">
                    <span>Uncommit <span className="tnum rpcUncommitCtaAmt">0.00</span> cmt-shMON</span>
                    <span>Uncommit <span className="tnum rpcUncommitCtaAmt">0.00</span> cmt-shMON</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Rate Limit Reference — 48px below the Commit modal.
                Commit-only: hidden while the Uncommit form is active. */}
            <div className={`mt-12 border border-hair2 ${rpcMode === "commit" ? "" : "hidden"}`}>
              <div className="hairline-b flex items-center justify-center px-5 h-[44px]">
                <span className="mono-up text-bone2" style={{ fontSize: 13 }}>Rate Limit Reference</span>
              </div>

              {/* Column headers */}
              <div className="hairline-b grid grid-cols-[1.2fr_1fr_1fr] gap-3 px-5 py-3 mono-up text-mute2" style={{ fontSize: 11 }}>
                <span>Tier</span>
                <span className="text-center">Rate Limit</span>
                <span className="text-right flex items-center justify-end gap-1.5">
                  Estimated shMON
                  <span className="inline-flex w-3.5 h-3.5 rounded-full border border-hair2 items-center justify-center text-[9px] text-mute2 leading-none cursor-help" title="Estimated shMON commitment needed to maintain this tier's rate limit.">i</span>
                </span>
              </div>

              {/* Tier rows */}
              {[
                { name: "Builder",        sub: "Testing & pet projects",   note: null,                       rate: "10 req/sec",  perMin: "600 per min",   shmon: "3,382.04",  icon: "M5 3 H11 V5 L9.5 12 H6.5 L5 5 Z M4 13 H12 V14 H4 Z" },
                { name: "Pro",            sub: "Professionals & MVPs",     note: "Compares to Default RPC",  rate: "25 req/sec",  perMin: "1,500 per min", shmon: "8,455.10",  icon: "M8 2 L10 6 L14 6.5 L11 9.5 L11.7 14 L8 11.8 L4.3 14 L5 9.5 L2 6.5 L6 6 Z" },
                { name: "Infra Operator", sub: "HFT & App Service",        note: null,                       rate: "50 req/sec",  perMin: "3,000 per min", shmon: "16,910.20", icon: "M2 3 H14 V11 H2 Z M6 13 H10 V14 H6 Z M2 13 H14 V14 H2 Z" },
                { name: "Enterprise",     sub: "Large-scale business",     note: null,                       rate: "100 req/sec", perMin: "6,000 per min", shmon: "33,820.41", icon: "M2 6 L8 2 L14 6 V7 H2 Z M3 8 H4.5 V12 H3 Z M6.5 8 H8 V12 H6.5 Z M10 8 H11.5 V12 H10 Z M13 8 H14 V12 H13 Z M2 13 H14 V14 H2 Z" },
              ].map((tier, i, arr) => (
                <div
                  key={tier.name}
                  className={`grid grid-cols-[1.2fr_1fr_1fr] gap-3 px-5 py-4 items-center ${i < arr.length - 1 ? "hairline-b" : ""}`}
                >
                  {/* Tier name + icon + subtitle */}
                  <div>
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-lime" aria-hidden="true">
                        <path d={tier.icon} />
                      </svg>
                      <span className="text-[13.5px] font-medium tracking-tight text-bone">{tier.name}</span>
                    </div>
                    <div className="mono text-mute2 mt-0.5" style={{ fontSize: 11 }}>{tier.sub}</div>
                    {tier.note && (
                      <div className="mono text-bone2 mt-1" style={{ fontSize: 11 }}>{tier.note}</div>
                    )}
                  </div>

                  {/* Rate limit + per-min subtitle */}
                  <div className="text-center">
                    <div className="tnum text-bone text-[13.5px] font-medium">{tier.rate}</div>
                    <div className="mono text-mute2 mt-0.5" style={{ fontSize: 11 }}>({tier.perMin})</div>
                  </div>

                  {/* Estimated shMON */}
                  <div className="text-right">
                    <div className="tnum text-bone text-[13.5px] font-medium">{tier.shmon}</div>
                    <div className="mono text-mute2 mt-0.5" style={{ fontSize: 11 }}>shMON</div>
                  </div>
                </div>
              ))}

              {/* Footer — current commitment */}
              <div className="hairline-t bg-ink2 px-5 py-3 text-center mono" style={{ fontSize: 12 }}>
                <span className="text-mute2">Current Commitment:</span>
                <span className="tnum text-bone ml-2">0.00 shMON</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* PAGE: POINTS */}
      <main id="page-points" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 pt-10 lg:pt-[144px] pb-10 lg:pb-14">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 md:col-span-5 border border-hair2 bg-ink2 p-6">
              <div className="mono-up text-mute2 mb-4">Your points</div>
              <div className="flex flex-col items-start gap-1 mb-1">
                <span className="serif text-[64px] leading-none tnum">
                  {walletConnected ? "48,210" : "—"}
                </span>
              </div>
              <div className="mt-5 hairline-t pt-4 grid grid-cols-2 gap-3 mono text-[13px]">
                <div><div className="text-mute2 mb-1">Rank</div><div className="text-bone tnum">{walletConnected ? "#312" : "—"}</div></div>
                <div><div className="text-mute2 mb-1">Boost</div><div className="text-bone tnum">{walletConnected ? "3.4×" : "—"}</div></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 border border-hair2 p-6">
              <div className="mono-up text-mute2 mb-4">Active boosts</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-hair2">
                {[
                  { v: "2.5×", l: "shMON holder" },
                  { v: "3.0×", l: "shMON LP in any pool" },
                  { v: "1.5×", l: "Fastlane RPC commit" },
                  { v: "2.0×", l: "Validator · sub-200ms" },
                  { v: "1.2×", l: "90-day hold streak" },
                  { v: "1.1×", l: "Referral · per friend" },
                ].map((b, i) => (
                  <div key={i} className="bg-ink p-4">
                    <div className="serif text-[28px] leading-none tnum">{b.v}</div>
                    <div className="mono text-[10.5px] text-mute2 mt-2">{b.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wallet address search — replaces the stats row + class filters.
              Editorial dark/hairline input with a small search glyph. */}
          <div className="hairline-b pb-5 mb-1">
            <div className="border border-hair2 bg-ink2 flex items-center gap-3 px-4 h-[44px]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-mute2 flex-shrink-0">
                <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9 9 L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
              <input
                type="text"
                placeholder="Search wallet address (0x…)"
                className="flex-1 min-w-0 bg-transparent outline-none mono text-[12.5px] text-bone placeholder:text-mute2"
              />
            </div>
          </div>

          <div className="hairline-b">
            <div className="grid grid-cols-12 mono-up text-mute2 py-3 hairline-b">
              <div className="col-span-1">Rank</div>
              <div className="col-span-7">Address</div>
              <div className="col-span-4 text-right">Points</div>
            </div>
            <div id="lb-rows" />
          </div>

          <div className="flex items-center justify-end mt-6 mono text-[11px] text-mute2">
            {/* Pagination — replicates the live design's «  <  page / total  >  »
                pattern in editorial style: square hairline-bordered buttons,
                bone arrow glyphs, mono mid-text. */}
            <div className="flex items-center gap-2">
              <button type="button" aria-label="First page" className="w-8 h-8 border border-hair2 flex items-center justify-center text-bone hover:bg-ink2 hover:border-mute2 transition">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 2 L2 6 L6 10 M10 2 L6 6 L10 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </button>
              <button type="button" aria-label="Previous page" className="w-8 h-8 border border-hair2 flex items-center justify-center text-bone hover:bg-ink2 hover:border-mute2 transition">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M7 2 L3 6 L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </button>
              <span className="px-3 mono text-bone tnum">1<span className="text-mute2"> / 300</span></span>
              <button type="button" aria-label="Next page" className="w-8 h-8 border border-hair2 flex items-center justify-center text-bone hover:bg-ink2 hover:border-mute2 transition">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M5 2 L9 6 L5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </button>
              <button type="button" aria-label="Last page" className="w-8 h-8 border border-hair2 flex items-center justify-center text-bone hover:bg-ink2 hover:border-mute2 transition">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 2 L6 6 L2 10 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* PAGE: DEGEN POOL */}
      <main id="page-degen" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          {/* Deposit modal — centered to the nav bar (no sidebar; sidebar
              previously contained Strategy allocation + 90-day performance,
              both removed). Details card sits below at 48px. */}
          <div className="max-w-[700px] mx-auto">
            <div className="border border-hair2 bg-ink">
              <div className="flex items-center hairline-b">
                <button
                  type="button"
                  onClick={() => setDegenMode("deposit")}
                  className={`tab-btn flex-1 py-3.5 mono-up text-[14px] transition ${degenMode === "deposit" ? "text-bone bg-ink3" : "text-mute hover:text-bone"}`}
                >
                  Deposit
                </button>
                <button
                  type="button"
                  onClick={() => setDegenMode("withdraw")}
                  className={`tab-btn flex-1 py-3.5 mono-up text-[14px] transition ${degenMode === "withdraw" ? "text-bone bg-ink3" : "text-mute hover:text-bone"}`}
                >
                  Withdraw
                </button>
              </div>

              <div className={`p-7 lg:p-9 ${degenMode === "deposit" ? "" : "hidden"}`}>
                <div className="mono-up text-mute mb-3 flex justify-between items-center">
                  <span>You deposit</span>
                  <span className="text-bone2 tnum text-[13.2px]">2,841.0091 MON</span>
                </div>
                <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px] relative">
                  <input id="degenIn" type="text" inputMode="decimal" defaultValue="100.00" size={1} className="flex-1 min-w-0 bg-transparent outline-none text-[32px] md:text-[42px] tnum font-light tracking-tight" />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button id="degenMaxBtn" className="mono text-[10.5px] text-bone border border-lime px-2 py-1 hover:bg-lime hover:text-ink transition">MAX</button>
                    <div className="flex items-center gap-2 ml-1">
                      <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/monad-token.svg" alt="MON" className="w-full h-full object-contain" />
                      </span>
                      <span className="text-[15px]">MON</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-px bg-hair2">
                  <button className="degen-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.25">25%</button>
                  <button className="degen-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.50">50%</button>
                  <button className="degen-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.75">75%</button>
                  <button className="degen-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="1.00">MAX</button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!walletConnected) setWalletConnected(true);
                    // (no-op when connected — placeholder for real deposit action)
                  }}
                  className="cta-fl mt-7 w-full inline-flex items-center justify-center h-[58px] bg-lime text-lime-fg text-[14.5px] font-medium"
                >
                  <span className="fl-track">
                    {walletConnected ? (
                      <>
                        <span>Deposit <span className="tnum degenCtaAmt">100.00</span> MON →</span>
                        <span>Deposit <span className="tnum degenCtaAmt">100.00</span> MON →</span>
                      </>
                    ) : (
                      <>
                        <span>Connect wallet</span>
                        <span>Connect wallet</span>
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* ─── WITHDRAW FORM ─── mirrors the Deposit form: withdraw
                  dgshMON pool position back out. */}
              <div className={`p-7 lg:p-9 ${degenMode === "withdraw" ? "" : "hidden"}`}>
                <div className="mono-up text-mute mb-3 flex justify-between items-center">
                  <span>You withdraw</span>
                  <span className="text-bone2 tnum text-[13.2px]">1,902.4400 MON</span>
                </div>
                <div className="border hair2 bg-ink2 flex items-center gap-4 px-5 h-[78px] relative">
                  <input id="degenWithdrawIn" type="text" inputMode="decimal" defaultValue="0.00" size={1} className="flex-1 min-w-0 bg-transparent outline-none text-[32px] md:text-[42px] tnum font-light tracking-tight" />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button id="degenWithdrawMaxBtn" className="mono text-[10.5px] text-bone border border-lime px-2 py-1 hover:bg-lime hover:text-ink transition">MAX</button>
                    <div className="flex items-center gap-2 ml-1">
                      <span className="w-7 h-7 rounded-full bg-ink3 border border-hair2 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/monad-token.svg" alt="MON" className="w-full h-full object-contain" />
                      </span>
                      <span className="text-[15px]">MON</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-px bg-hair2">
                  <button className="degen-withdraw-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.25">25%</button>
                  <button className="degen-withdraw-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.50">50%</button>
                  <button className="degen-withdraw-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.75">75%</button>
                  <button className="degen-withdraw-pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="1.00">MAX</button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!walletConnected) setWalletConnected(true);
                    // (no-op when connected — placeholder for real withdraw action)
                  }}
                  className="cta-fl mt-7 w-full inline-flex items-center justify-center h-[58px] bg-lime text-lime-fg text-[14.5px] font-medium"
                >
                  <span className="fl-track">
                    {walletConnected ? (
                      <>
                        <span>Withdraw <span className="tnum degenWithdrawCtaAmt">0.00</span> MON →</span>
                        <span>Withdraw <span className="tnum degenWithdrawCtaAmt">0.00</span> MON →</span>
                      </>
                    ) : (
                      <>
                        <span>Connect wallet</span>
                        <span>Connect wallet</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Degen Pool Details — collapsible card. The header chevron
                button toggles the body open/closed. Chevron points DOWN when
                collapsed (indicating "expand to reveal more") and UP when
                expanded (indicating "collapse"). */}
            <div className="mt-12 border border-hair2">
              <button
                type="button"
                aria-expanded={degenDetailsOpen}
                aria-controls="degen-details-body"
                onClick={() => setDegenDetailsOpen((v) => !v)}
                className={`w-full hairline-b flex items-center justify-between px-5 h-[44px] text-left transition ${degenDetailsOpen ? "" : "border-b-0"} hover:bg-ink2`}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-3.5 h-3.5 rounded-full border border-mute2 items-center justify-center text-[9px] text-mute2 leading-none">i</span>
                  <span className="mono-up text-bone2" style={{ fontSize: 13 }}>Degen Pool Details</span>
                  <span className="mono text-[10.5px] text-bone border border-lime px-2 py-1">0% APY</span>
                </div>
                {/* Chevron — rotates 180° when expanded */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="text-mute2"
                  style={{
                    transform: degenDetailsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 220ms cubic-bezier(0.6, 0.2, 0.2, 1)",
                  }}
                >
                  <path d="M3 5 L7 9 L11 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </button>
              {degenDetailsOpen && (
                <div id="degen-details-body" className="p-6 space-y-5">
                  <div>
                    <div className="mono-up text-mute2 mb-2" style={{ fontSize: 11 }}>How it works</div>
                    <p className="mono text-[12.5px] leading-[1.75] text-bone2">
                      Deposits into the Degen Pool earn <span className="text-red">no yield</span>. Instead, your staked MON helps boost the APY for regular shMON holders. Although they don&apos;t understand why any reasonable person would intentionally give up yield, shMonad stakeholders are very appreciative of the noble sacrifice made by degens.
                    </p>
                  </div>
                  <div>
                    <div className="mono-up text-mute2 mb-2" style={{ fontSize: 11 }}>Liquidity &amp; exit</div>
                    <p className="mono text-[12.5px] leading-[1.75] text-bone2">
                      This pool is illiquid, nor are deposits tradeable in DeFi. When you withdraw, you receive 100% of your initial MON deposit value as shMON, which then begins earning normal yield.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Duplicate of the Stake page's "Your position" card. */}
            <div className="mt-12 border border-hair2 bg-ink2">
              {walletConnected ? (
                <button
                  type="button"
                  aria-expanded={degenPositionOpen}
                  aria-controls="position-body-degen"
                  aria-label={degenPositionOpen ? "Collapse your position" : "Expand your position"}
                  onClick={() => setDegenPositionOpen((v) => !v)}
                  className={`w-full flex items-center justify-between px-5 h-[44px] text-left transition hover:bg-ink3 ${
                    degenPositionOpen ? "hairline-b" : ""
                  }`}
                >
                  <span className="mono-up text-mute">Your position</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="text-mute2 flex-shrink-0"
                    style={{
                      transform: degenPositionOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 200ms ease",
                    }}
                  >
                    <path d="M3 5 L7 9 L11 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                </button>
              ) : (
                <div className="hairline-b flex items-center px-5 h-[44px]">
                  <span className="mono-up text-mute">Your position</span>
                </div>
              )}
              {walletConnected ? (
                <div id="position-body-degen" className={`p-6 ${degenPositionOpen ? "" : "hidden"}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="tnum text-[32px] md:text-[42px] font-light tracking-tight leading-none">423.7872</span>
                    <span className="text-mute2 text-[15px]">MON</span>
                  </div>
                  <div className="mono text-[12px] text-mute2 mt-2">≈ $12.29</div>

                  <div className="mt-6 pt-6 hairline-t grid grid-cols-2 gap-y-5">
                    <div>
                      <div className="mono-up text-mute mb-1.5" style={{ fontSize: 12 }}>Since</div>
                      <div className="tnum text-[16px] text-bone">42d</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 hairline-t">
                    <div className="mono-up text-mute text-[10px] mb-2.5">Next epoch</div>
                    <div className="h-1 bg-hair2 overflow-hidden">
                      <div className="h-full bg-lime" style={{ width: "62%" }} />
                    </div>
                    <div className="mono text-[11.5px] text-mute2 mt-2.5">17h 22m · #413</div>
                  </div>
                </div>
              ) : (
                <div className="p-6 flex items-center gap-5">
                  {/* Connect-wallet icon — line-art wallet glyph at 48×48 matching the editorial style */}
                  <span className="w-12 h-12 flex items-center justify-center text-mute2 flex-shrink-0">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      {/* Wallet body */}
                      <rect x="5.5" y="14" width="37" height="25" stroke="currentColor" strokeWidth="1.4" />
                      {/* Top fold/flap */}
                      <path d="M5.5 14 L34 14 L34 8.5 L5.5 8.5 Z" fill="currentColor" />
                      {/* Card slot / chip */}
                      <circle cx="34" cy="26.5" r="2.4" fill="currentColor" />
                      {/* Connection plug — small horizontal stem extending from the right edge */}
                      <path d="M42.5 26.5 L46.5 26.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                      <path d="M46.5 23.5 L46.5 29.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                    </svg>
                  </span>
                  <div className="mono text-[12px] text-mute2 leading-relaxed">
                    Connect a wallet to view your shMON balance, accrued yield, and active boost multipliers.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* PAGE: ACTIVITY — standalone history page, mobile only.
          Reachable via the mobile bottom nav; hidden on desktop (see
          shmonad.css #page-activity rule) where no nav entry exists. */}
      <main id="page-activity" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 pt-[72px] pb-10">
          <div className="max-w-[700px] mx-auto">
            <div className="mb-7">
              <div className="mono-up text-mute mb-2">Account</div>
              <h1 className="serif text-[34px] leading-none text-bone">Activity</h1>
              <p className="mono text-[12px] text-mute2 mt-3 leading-relaxed">
                Your staking history, reward claims, and boost activity.
              </p>
            </div>

            <div className="border border-hair2 bg-ink2">
              <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                <span className="mono-up text-mute">All activity</span>
                {walletConnected && (
                  <span className="mono text-[11px] text-mute2">
                    {ACTIVITY.length} events
                  </span>
                )}
              </div>
              {walletConnected ? (
                <div>
                  {ACTIVITY.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 hairline-b"
                    >
                      <div>
                        <span
                          className="inline-flex mono-up text-bone2 border border-hair2 px-2 py-1"
                          style={{ fontSize: 10 }}
                        >
                          {a.type}
                        </span>
                        <div className="mono text-[11px] text-mute mt-1.5">{a.date}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className="tnum text-[13px]"
                          style={{ color: a.amount === "—" ? "var(--sh-mute2)" : "#9a78ff" }}
                        >
                          {a.amount}
                        </div>
                        <div className="mono text-[11px] text-mute2 mt-1.5">{a.tx}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 flex items-center gap-5">
                  <span className="w-12 h-12 flex items-center justify-center text-mute2 flex-shrink-0">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M24 14 L24 24 L31.5 28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </span>
                  <div className="mono text-[12px] text-mute2 leading-relaxed">
                    Connect a wallet to view your staking history, reward claims, and boost activity.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-[27rem]">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8">
          <div className="footer-canvas-wrap relative pt-8">
            <MatrixCanvas words={SHMONAD_MATRIX_WORDS} font="grotesk" />
          </div>

          <div className="py-8 flex flex-wrap items-center justify-between gap-4 hairline-t">
            <div className="flex items-center gap-3 mono text-[11px] text-mute">
              <span className="relative w-4 h-4 bg-bone block">
                <span className="absolute inset-0 bg-ink" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
              </span>
              <span>shMonad v2.0.1</span>
              <span className="text-mute">·</span>
              <span>Built by <a href="/" className="hover:text-bone">Fastlane</a></span>
              <span className="text-mute">·</span>
              <span>0x4b…91Ae</span>
            </div>
            <div className="flex items-center gap-5 mono text-[11px] text-mute2">
              <a href="#" className="hover:text-bone">Docs</a>
              <a href="#" className="hover:text-bone">Audits</a>
              <a href="#" className="hover:text-bone">Analytics ↗</a>
              <a href="#" className="hover:text-bone">Blog</a>
              <a href="#" className="hover:text-bone">𝕏</a>
              <a href="#" className="hover:text-bone">Discord</a>
              <a href="#" className="hover:text-bone">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile bottom navigation — sticky, hidden on md+ where the top nav shows.
          Active item is driven by the hash router via [data-nav] (see route()). */}
      <ShmonadBottomNav />
    </div>
  );
}
