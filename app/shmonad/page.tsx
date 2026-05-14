"use client";

import { useEffect } from "react";
import ThemeToggle from "@/components/client/ThemeToggle";
import "./shmonad.css";

export default function ShmonadPage() {
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
    const cta = document.getElementById("ctaAmt");
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
      if (cta) cta.textContent = fmt(v, 2);
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
    const unstakeCta = document.getElementById("unstakeCta");
    const rateInst = 1.0598;
    const ratePar = 1.0612;
    const instant = document.getElementById("modeInstant");
    const queue = document.getElementById("modeQueue");
    const modeLbl = document.getElementById("modeLabel");
    const feeLbl = document.getElementById("feeLabel");
    const settleLbl = document.getElementById("settleLabel");
    const rateLbl = document.getElementById("unstakeRate");
    let mode: "instant" | "queue" = "instant";
    function recalcUnstake() {
      if (!unstakeInput) return;
      const v = parseFloat((unstakeInput.value || "0").replace(/,/g, "")) || 0;
      const r = mode === "instant" ? rateInst : ratePar;
      if (unstakeOut) unstakeOut.textContent = fmt(v * r, 2);
      if (unstakeCta)
        unstakeCta.textContent = "Unstake " + fmt(v, 2) + " shMON";
    }
    unstakeInput?.addEventListener("input", recalcUnstake);
    instant?.addEventListener("click", () => {
      mode = "instant";
      instant.classList.add("bg-ink3", "text-bone");
      instant.classList.remove("bg-ink2", "text-mute2");
      queue?.classList.remove("bg-ink3", "text-bone");
      queue?.classList.add("bg-ink2", "text-mute2");
      if (modeLbl) modeLbl.textContent = "Instant · settled from buffer";
      if (feeLbl) feeLbl.textContent = "14 bps · variable";
      if (settleLbl) settleLbl.textContent = "1 block · ≈ 0.6s";
      if (rateLbl) rateLbl.textContent = "↓ 1 shMON = 1.0598 MON · 14 bps fee";
      recalcUnstake();
    });
    queue?.addEventListener("click", () => {
      mode = "queue";
      queue.classList.add("bg-ink3", "text-bone");
      queue.classList.remove("bg-ink2", "text-mute2");
      instant?.classList.remove("bg-ink3", "text-bone");
      instant?.classList.add("bg-ink2", "text-mute2");
      if (modeLbl) modeLbl.textContent = "Standard · queued at par";
      if (feeLbl) feeLbl.textContent = "0 bps · zero fee";
      if (settleLbl) settleLbl.textContent = "Next epoch · ≈ 12 min";
      if (rateLbl)
        rateLbl.textContent = "↓ 1 shMON = 1.0612 MON · par redemption";
      recalcUnstake();
    });
    recalcUnstake();

    /* ─── RPC COMMIT ─── */
    const rpcInput = document.getElementById("rpcIn") as HTMLInputElement | null;
    const rpcCta = document.getElementById("rpcCta");
    const range = document.getElementById("durRange") as HTMLInputElement | null;
    const dur = document.getElementById("durDays");
    const gas = document.getElementById("gasBudget");
    function recalcRpc() {
      if (!rpcInput) return;
      const v = parseFloat((rpcInput.value || "0").replace(/,/g, "")) || 0;
      if (rpcCta) rpcCta.textContent = fmt(v, 2);
      const d = parseInt(range?.value || "30");
      if (dur) dur.textContent = String(d);
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
    recalcRpc();

    /* ─── DEGEN ack toggle ─── */
    const ack = document.getElementById("ackBox") as HTMLInputElement | null;
    const degenCta = document.getElementById("degenCta");
    const degenInput = document.getElementById("degenIn") as HTMLInputElement | null;
    function updateDegen() {
      if (!ack || !degenCta || !degenInput) return;
      const v = parseFloat((degenInput.value || "0").replace(/,/g, "")) || 0;
      if (ack.checked && v > 0) {
        degenCta.classList.remove("bg-ink3", "text-mute", "cursor-not-allowed");
        degenCta.classList.add("bg-lime", "text-ink");
        degenCta.innerHTML =
          "<span>Deposit " +
          v.toFixed(2) +
          " shMON to Degen Pool</span><span>→</span>";
      } else {
        degenCta.classList.add("bg-ink3", "text-mute", "cursor-not-allowed");
        degenCta.classList.remove("bg-lime", "text-ink");
        degenCta.innerHTML =
          "<span>" +
          (ack.checked ? "Enter an amount" : "Acknowledge to continue") +
          "</span>";
      }
    }
    ack?.addEventListener("change", updateDegen);
    degenInput?.addEventListener("input", updateDegen);

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
        "jumper.eth",
        "0x78dA…1c0B",
        "0x4FEC…cc92",
        "0xC0DE…0d8E",
        "fastlane.eth",
        "meow.mon",
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
        { r: 3, addr: "jumper.eth", cls: "staker", s: "1,711,209", p: "88.9M", d: "+3.4%" },
        { r: 4, addr: "0x4FEC…cc92", cls: "val", s: "1,540,001", p: "72.3M", d: "+2.0%" },
        { r: 5, addr: "0xC0DE…0d8E", cls: "staker", s: "1,288,442", p: "64.1M", d: "+5.8%" },
        { r: 6, addr: "fastlane.eth", cls: "val", s: "1,184,000", p: "58.7M", d: "+1.9%" },
        { r: 7, addr: "0xBe11…aa01", cls: "lp", s: "998,212", p: "52.0M", d: "+18.4%" },
        { r: 8, addr: "0x12aa…ff3c", cls: "staker", s: "884,919", p: "44.7M", d: "+6.0%" },
        { r: 9, addr: "meow.mon", cls: "lp", s: "811,442", p: "40.2M", d: "+9.1%" },
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
              <div class="col-span-1 mono text-mute tnum">${String(x.r).padStart(2, "0")}</div>
              <div class="col-span-4 mono text-bone">${x.addr}</div>
              <div class="col-span-2"><span class="mono text-[11px] px-2 py-0.5 border border-hair2 text-bone2">${clsMap[x.cls]}</span></div>
              <div class="col-span-2 text-right mono tnum text-bone2">${x.s}</div>
              <div class="col-span-2 text-right mono tnum text-lime">${x.p}</div>
              <div class="col-span-1 text-right mono tnum text-mute2">${x.d}</div>
            </div>`
          )
          .join("");
      }
      document.querySelectorAll<HTMLButtonElement>(".shmonad-root .lb-filter").forEach((b) => {
        b.addEventListener("click", () => {
          document
            .querySelectorAll<HTMLButtonElement>(".shmonad-root .lb-filter")
            .forEach((x) => {
              x.classList.remove("border-lime", "text-lime");
              x.classList.add("border-hair2", "text-mute2");
            });
          b.classList.remove("border-hair2", "text-mute2");
          b.classList.add("border-lime", "text-lime");
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
    <div className="shmonad-root">
      {/* TOP CHROME */}
      <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur-md hairline-b">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 h-[60px] flex items-center justify-between">
          <a href="#/stake" className="flex items-center gap-2.5 group">
            <span className="relative w-6 h-6 bg-bone block">
              <span className="absolute inset-0 bg-ink" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
            </span>
            <span className="font-sans font-medium tracking-tight text-[15px]">shMonad</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[13px] text-mute2">
            <a className="nav-link" href="#/stake" data-nav="stake">Stake</a>
            <a className="nav-link" href="#/unstake" data-nav="unstake">Unstake</a>
            <a className="nav-link" href="#/rpc" data-nav="rpc">Fastlane RPC</a>
            <a className="nav-link" href="#/points" data-nav="points">
              Points <span className="mono text-[9px] text-lime ml-1 align-top">NEW</span>
            </a>
            <a className="nav-link" href="#/degen" data-nav="degen">Degen Pool</a>
            <a className="nav-link" href="#/ecosystem" data-nav="ecosystem">Ecosystem</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button id="connectBtn" className="cta-fl inline-flex items-center gap-2 px-4 h-[36px] border border-bone text-bone text-[12.5px] font-medium">
              <span className="fl-track"><span>Connect wallet</span><span>Connect wallet</span></span>
              <span className="fl-fill" />
            </button>
          </div>
        </div>

        <div className="border-t hair hidden md:block">
          <div className="max-w-[1480px] mx-auto px-6 lg:px-8 h-[36px] grid grid-cols-12 items-center mono text-[11px]">
            <div className="col-span-2 flex items-baseline gap-2"><span className="text-mute">TVL</span> <span className="tnum text-bone">$412.8M</span> <span className="text-lime tnum">+4.12%</span></div>
            <div className="col-span-2 hairline-l pl-4 flex items-baseline gap-2"><span className="text-mute">APR</span> <span className="tnum text-bone">7.84%</span></div>
            <div className="col-span-2 hairline-l pl-4 flex items-baseline gap-2"><span className="text-mute">PEG</span> <span className="tnum text-bone">1 shMON = 1.0612 MON</span></div>
            <div className="col-span-2 hairline-l pl-4 flex items-baseline gap-2"><span className="text-mute">EPOCH</span> <span className="tnum text-bone">14,209</span></div>
            <div className="col-span-2 hairline-l pl-4 flex items-baseline gap-2"><span className="text-mute">VALIDATORS</span> <span className="tnum text-bone">42 / 100</span></div>
            <div className="col-span-2 hairline-l pl-4 flex items-baseline gap-2"><span className="text-mute">SLASHES · 90D</span> <span className="tnum text-bone">0</span></div>
          </div>
        </div>
      </header>

      {/* PAGE: STAKE */}
      <main id="page-stake" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="mono-up text-mute mb-3">[ 001 / Stake MON for shMON ]</div>
              <h1 className="text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] font-light">
                Earn <span className="serif italic">7.84%</span> on idle MON.
              </h1>
            </div>
            <div className="mono text-[11.5px] text-mute2 max-w-[36ch] text-right">
              Holistic liquid staking. Receive shMON in the same block. Use it anywhere on Monad while it accrues.
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div id="stake-mod" className="border border-hair2 bg-ink">
                <div className="flex items-center hairline-b">
                  <button data-tab="stake" className="tab-btn flex-1 py-3.5 mono-up text-bone bg-ink3">Stake</button>
                  <button data-tab="unstake" className="tab-btn flex-1 py-3.5 mono-up text-mute" onClick={() => { location.hash = "#/unstake"; }}>Unstake</button>
                  <div className="px-5 mono text-[10.5px] text-mute2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-lime live-dot" /> mainnet · 0x4b…91Ae
                  </div>
                </div>

                <div className="p-7 lg:p-9">
                  <div className="mono-up text-mute mb-3 flex justify-between">
                    <span>You deposit</span>
                    <span>Balance · <span className="text-bone2 tnum" id="balMON">1,284.5102 MON</span></span>
                  </div>
                  <div className="border hair2 bg-ink2 flex items-center px-5 h-[78px]">
                    <input id="stakeIn" type="text" inputMode="decimal" defaultValue="500.00" className="flex-1 bg-transparent outline-none text-[42px] tnum font-light tracking-tight" />
                    <div className="flex items-center gap-3">
                      <button id="maxBtn" className="mono text-[10.5px] text-lime border border-lime px-2 py-1 hover:bg-lime hover:text-ink transition">MAX</button>
                      <button className="mono text-[10.5px] text-mute2 border border-hair2 px-2 py-1 hover:text-bone transition">HALF</button>
                      <div className="flex items-center gap-2 ml-1">
                        <span className="w-7 h-7 bg-bone block" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)" }} />
                        <span className="text-[15px]">MON</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-px bg-hair2">
                    <button className="pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.25">25%</button>
                    <button className="pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.50">50%</button>
                    <button className="pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="0.75">75%</button>
                    <button className="pct-btn bg-ink2 py-2 mono text-[10.5px] text-mute2 hover:text-bone hover:bg-ink3" data-pct="1.00">MAX</button>
                  </div>

                  <div className="flex items-center gap-3 my-5 mono text-[10.5px] text-mute2">
                    <span className="flex-1 h-px bg-hair2" />
                    <span>↓ rate · 1 MON = 0.9423 shMON</span>
                    <span className="flex-1 h-px bg-hair2" />
                  </div>

                  <div className="mono-up text-mute mb-3">You receive</div>
                  <div className="border hair2 bg-ink2 flex items-center px-5 h-[78px]">
                    <span id="stakeOut" className="flex-1 text-[42px] tnum font-light tracking-tight">471.1500</span>
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 bg-lime block" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)" }} />
                      <span className="text-[15px]">shMON</span>
                    </div>
                  </div>

                  <dl className="mt-7 mono text-[12.5px]">
                    <div className="flex justify-between py-2 hairline-b">
                      <dt className="text-mute">Estimated APR</dt>
                      <dd className="tnum">7.84% <span className="text-mute2 ml-1">5.20 base + 1.38 mev + 1.26 comp</span></dd>
                    </div>
                    <div className="flex justify-between py-2 hairline-b">
                      <dt className="text-mute">Annual yield · est.</dt>
                      <dd className="tnum text-lime" id="yieldOut">39.20 MON</dd>
                    </div>
                    <div className="flex justify-between py-2 hairline-b">
                      <dt className="text-mute">Validator routing</dt>
                      <dd className="tnum">42 nodes · performance-weighted</dd>
                    </div>
                    <div className="flex justify-between py-2 hairline-b">
                      <dt className="text-mute">Network fee</dt>
                      <dd className="tnum">≈ 0.00041 MON</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-mute">Settlement</dt>
                      <dd className="tnum text-lime">Atomic · 1 block</dd>
                    </div>
                  </dl>

                  <button className="cta-fl mt-7 w-full inline-flex items-center justify-center gap-3 h-[58px] bg-lime text-ink text-[14.5px] font-medium">
                    <span>Stake <span className="tnum" id="ctaAmt">500.00</span> MON</span>
                    <span>→</span>
                  </button>
                  <div className="mt-3 mono text-[10px] text-mute text-center">Audited · OpenZeppelin & Spearbit · 0 slash events since launch</div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="border border-hair2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">APR breakdown · 30D moving</span>
                  <span className="mono text-[10.5px] text-lime">+22 bps vs base</span>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline gap-2">
                    <span className="serif text-[64px] leading-none tnum">7.84</span>
                    <span className="text-mute2 text-[20px]">%</span>
                  </div>
                  <div className="mt-6 h-3 w-full flex border hair2 overflow-hidden">
                    <span className="bg-bone/80" style={{ width: "66.3%" }} />
                    <span className="bg-lime" style={{ width: "17.6%" }} />
                    <span className="bg-mute" style={{ width: "16.1%" }} />
                  </div>
                  <dl className="mt-5 mono text-[12px] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-2"><span className="w-2 h-2 bg-bone/80" /><span className="text-mute2">Validator base</span></dt>
                      <dd className="tnum">5.20%</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-2"><span className="w-2 h-2 bg-lime" /><span className="text-mute2">MEV (Fastlane)</span></dt>
                      <dd className="tnum">1.38%</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-2"><span className="w-2 h-2 bg-mute" /><span className="text-mute2">Re-stake compounding</span></dt>
                      <dd className="tnum">1.26%</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="border border-hair2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">Validator routing</span>
                  <span className="mono text-[10.5px] text-mute2">42 · weighted</span>
                </div>
                <div className="p-5">
                  <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(14, minmax(0,1fr))" }} id="valGrid" />
                  <div className="flex justify-between mono text-[10.5px] text-mute mt-4">
                    <span>weight ·</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-hair2" /> 0 <span className="w-2 h-2 bg-bone/30 ml-2" /> low <span className="w-2 h-2 bg-bone/70 ml-2" /> med <span className="w-2 h-2 bg-lime ml-2" /> high</span>
                  </div>
                </div>
              </div>

              <div className="border border-hair2 bg-ink2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">Your position</span>
                  <button className="mono text-[10.5px] text-bone hover:text-lime">Connect →</button>
                </div>
                <div className="p-6 flex items-center gap-5">
                  <span className="w-12 h-12 bg-hair2 block" />
                  <div className="mono text-[12px] text-mute2 leading-relaxed">
                    Connect a wallet to view your shMON balance, accrued yield, and active boost multipliers.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border border-hair2">
            <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
              <span className="mono-up text-mute">Recent stakes · live</span>
              <span className="mono text-[10.5px] text-mute2 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-lime live-dot" /> streaming</span>
            </div>
            <div className="grid grid-cols-12 mono-up text-mute py-2.5 px-5 hairline-b">
              <div className="col-span-2">Block</div>
              <div className="col-span-3">Address</div>
              <div className="col-span-2">Action</div>
              <div className="col-span-2 text-right">Amount MON</div>
              <div className="col-span-2 text-right">shMON</div>
              <div className="col-span-1 text-right">Time</div>
            </div>
            <div id="stake-feed" className="mono text-[12px]" />
          </div>
        </div>
      </main>

      {/* PAGE: UNSTAKE */}
      <main id="page-unstake" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="mono-up text-mute mb-3">[ 002 / Unstake shMON for MON ]</div>
              <h1 className="text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] font-light">
                Redeem <span className="serif italic">any block</span>.
              </h1>
            </div>
            <div className="mono text-[11.5px] text-mute2 max-w-[40ch] text-right">
              Instant redemption from the buffer, or queued claim at par. No mandatory cooldown.
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="border border-hair2 bg-ink">
                <div className="flex items-center hairline-b">
                  <button className="flex-1 py-3.5 mono-up text-mute" onClick={() => { location.hash = "#/stake"; }}>Stake</button>
                  <button className="flex-1 py-3.5 mono-up text-bone bg-ink3">Unstake</button>
                  <div className="px-5 mono text-[10.5px] text-mute2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-lime live-dot" /> buffer · 38.2M MON
                  </div>
                </div>

                <div className="p-7 lg:p-9">
                  <div className="grid grid-cols-2 gap-px bg-hair2 mb-6">
                    <button id="modeInstant" className="mode-btn bg-ink3 text-bone py-3 mono-up">Instant</button>
                    <button id="modeQueue" className="mode-btn bg-ink2 text-mute2 hover:text-bone py-3 mono-up">Standard · queued</button>
                  </div>

                  <div className="mono-up text-mute mb-3 flex justify-between">
                    <span>You redeem</span>
                    <span>shMON balance · <span className="text-bone2 tnum">2,841.0091</span></span>
                  </div>
                  <div className="border hair2 bg-ink2 flex items-center px-5 h-[78px]">
                    <input id="unstakeIn" type="text" inputMode="decimal" defaultValue="1000.00" className="flex-1 bg-transparent outline-none text-[42px] tnum font-light tracking-tight" />
                    <div className="flex items-center gap-3">
                      <button className="mono text-[10.5px] text-lime border border-lime px-2 py-1 hover:bg-lime hover:text-ink transition">MAX</button>
                      <div className="flex items-center gap-2 ml-1">
                        <span className="w-7 h-7 bg-lime block" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)" }} />
                        <span className="text-[15px]">shMON</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 my-5 mono text-[10.5px] text-mute2">
                    <span className="flex-1 h-px bg-hair2" />
                    <span id="unstakeRate">↓ 1 shMON = 1.0598 MON · 14 bps fee</span>
                    <span className="flex-1 h-px bg-hair2" />
                  </div>

                  <div className="mono-up text-mute mb-3">You receive</div>
                  <div className="border hair2 bg-ink2 flex items-center px-5 h-[78px]">
                    <span id="unstakeOut" className="flex-1 text-[42px] tnum font-light tracking-tight">1,059.80</span>
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 bg-bone block" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)" }} />
                      <span className="text-[15px]">MON</span>
                    </div>
                  </div>

                  <dl className="mt-7 mono text-[12.5px]">
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Mode</dt><dd id="modeLabel" className="text-lime">Instant · settled from buffer</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Fee</dt><dd id="feeLabel" className="tnum">14 bps · 1.48 MON</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Settlement</dt><dd id="settleLabel" className="tnum text-lime">1 block · ≈ 0.6s</dd></div>
                    <div className="flex justify-between py-2"><dt className="text-mute">Network fee</dt><dd className="tnum">≈ 0.00038 MON</dd></div>
                  </dl>

                  <button className="cta-fl mt-7 w-full inline-flex items-center justify-center gap-3 h-[58px] bg-lime text-ink text-[14.5px] font-medium">
                    <span id="unstakeCta">Unstake 1,000.00 shMON</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="border border-hair2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">Buffer health</span>
                  <span className="mono text-[10.5px] text-lime">healthy</span>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline gap-2"><span className="serif text-[52px] leading-none tnum">38.2</span><span className="text-mute2">M MON</span></div>
                  <div className="mt-2 mono text-[11px] text-mute2">9.3% of TVL · refreshes every epoch</div>
                  <div className="mt-5 h-2 w-full bg-hair2 relative overflow-hidden">
                    <span className="absolute top-0 left-0 h-full bg-lime" style={{ width: "76%" }} />
                  </div>
                  <div className="mt-1 flex justify-between mono text-[10.5px] text-mute"><span>min · 5%</span><span>cur · 9.3%</span><span>cap · 12%</span></div>
                </div>
              </div>

              <div className="border border-hair2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">Withdrawals · queue depth</span>
                  <span className="mono text-[10.5px] text-mute2">epoch 14,209</span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-12 gap-1 mb-3 items-end h-16">
                    {[40,60,35,75,50,30,88,62,40,55,48].map((h,i) => (
                      <span key={i} className="bg-bone/70 col-span-1" style={{ height: `${h}%` }} />
                    ))}
                    <span className="bg-lime col-span-1" style={{ height: "72%" }} />
                  </div>
                  <div className="flex justify-between mono text-[10.5px] text-mute"><span>−12 epochs</span><span>now</span></div>
                </div>
              </div>

              <div className="border border-hair2 bg-ink2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">Your pending</span>
                </div>
                <div className="p-6 mono text-[12px] text-mute2 leading-relaxed">
                  No pending withdrawals. Connect a wallet to see your claim history.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PAGE: FASTLANE RPC */}
      <main id="page-rpc" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="mono-up text-mute mb-3">[ 003 / Commit shMON · pay gas with yield ]</div>
              <h1 className="text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] font-light max-w-[14ch]">
                Pay gas, <span className="serif italic">earn yield</span> — at the same time.
              </h1>
            </div>
            <div className="mono text-[11.5px] text-mute2 max-w-[42ch] text-right">
              Commit shMON to a Fastlane RPC policy. Transactions you send through the endpoint draw gas from your committed balance — while it keeps accruing.
            </div>
          </div>

          <div className="border border-hair2 bg-ink2 mb-10">
            <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
              <span className="mono-up text-mute">RPC endpoint</span>
              <span className="mono text-[10.5px] text-lime flex items-center gap-2"><span className="w-1.5 h-1.5 bg-lime live-dot" /> 4ms · us-east</span>
            </div>
            <div className="p-5 flex flex-wrap items-center gap-3">
              <code className="flex-1 min-w-[260px] mono text-[13px] text-bone bg-ink px-4 py-3 border hair2 overflow-x-auto">https://rpc.fastlane.xyz/v1/commit/{"{your-policy-key}"}</code>
              <button className="cta-fl inline-flex items-center gap-2 px-4 h-[44px] border border-bone text-bone text-[12.5px]">
                <span className="fl-track"><span>Copy</span><span>Copy</span></span>
                <span className="fl-fill" />
              </button>
              <button className="cta-fl inline-flex items-center gap-2 px-4 h-[44px] bg-bone text-ink text-[12.5px] font-medium">
                <span className="fl-track"><span>Add to MetaMask</span><span>Add to MetaMask</span></span>
                <span className="fl-fill" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="border border-hair2 bg-ink">
                <div className="flex items-center hairline-b">
                  <button className="flex-1 py-3.5 mono-up text-bone bg-ink3">Commit</button>
                  <button className="flex-1 py-3.5 mono-up text-mute hover:text-bone">Decommit</button>
                  <div className="px-5 mono text-[10.5px] text-mute2">policy · RPC</div>
                </div>

                <div className="p-7 lg:p-9">
                  <div className="mono-up text-mute mb-3 flex justify-between">
                    <span>Commit shMON</span>
                    <span>Available · <span className="text-bone2 tnum">2,841.0091</span></span>
                  </div>
                  <div className="border hair2 bg-ink2 flex items-center px-5 h-[78px]">
                    <input id="rpcIn" type="text" inputMode="decimal" defaultValue="250.00" className="flex-1 bg-transparent outline-none text-[42px] tnum font-light tracking-tight" />
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 bg-lime block" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)" }} />
                      <span className="text-[15px]">shMON</span>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="mono-up text-mute mb-3 flex justify-between">
                      <span>Policy duration</span>
                      <span className="text-bone2"><span id="durDays" className="tnum">30</span> days · auto-renew</span>
                    </div>
                    <input type="range" min="7" max="180" step="1" defaultValue="30" className="lime-slider w-full" id="durRange" />
                    <div className="flex justify-between mono text-[10.5px] text-mute mt-2">
                      <span>7d</span><span>30d</span><span>90d</span><span>180d</span>
                    </div>
                  </div>

                  <dl className="mt-7 mono text-[12.5px]">
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Policy</dt><dd>Fastlane RPC · standard</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Gas budget</dt><dd className="tnum" id="gasBudget">≈ 5,940,000 gas · 14,850 tx</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Yield accrues to</dt><dd className="text-lime">Your wallet · uninterrupted</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Unlock</dt><dd className="tnum">Any time · 2-block delay</dd></div>
                    <div className="flex justify-between py-2"><dt className="text-mute">Cost</dt><dd className="tnum text-lime">0 — committed shMON is collateral, not spent</dd></div>
                  </dl>

                  <button className="cta-fl mt-7 w-full inline-flex items-center justify-center gap-3 h-[58px] bg-lime text-ink text-[14.5px] font-medium">
                    <span>Commit <span id="rpcCta" className="tnum">250.00</span> shMON</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="border border-hair2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">How commit works</span>
                </div>
                <div className="p-6 mono text-[12.5px] leading-[1.75] text-bone2 space-y-3">
                  <p><span className="text-lime">01 ·</span> Your shMON is locked as a gas policy. It still earns staking yield.</p>
                  <p><span className="text-lime">02 ·</span> Transactions through the Fastlane RPC draw gas from the policy.</p>
                  <p><span className="text-lime">03 ·</span> Decommit any time. 2-block delay; balance returns liquid.</p>
                  <p><span className="text-lime">04 ·</span> One commit covers unlimited tx until policy depletes.</p>
                </div>
              </div>

              <div className="border border-hair2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">Your active policies</span>
                  <span className="mono text-[10.5px] text-mute2">0</span>
                </div>
                <div className="p-6 mono text-[12px] text-mute2 leading-relaxed">
                  No active policies. Connect a wallet to see and manage commits.
                </div>
              </div>

              <div className="border border-hair2 bg-ink2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">Network-wide</span>
                </div>
                <div className="grid grid-cols-2 hairline-b">
                  <div className="p-5 hairline-r">
                    <div className="mono-up text-mute mb-1">Committed</div>
                    <div className="serif text-[28px] leading-none tnum">42.8M</div>
                    <div className="mono text-[10.5px] text-mute2 mt-1">shMON · across 1,204 policies</div>
                  </div>
                  <div className="p-5">
                    <div className="mono-up text-mute mb-1">Gas paid · 30D</div>
                    <div className="serif text-[28px] leading-none tnum">1.8B</div>
                    <div className="mono text-[10.5px] text-mute2 mt-1">units · 4.5M tx subsidized</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mono-up text-mute mb-1">Avg saving / tx</div>
                  <div className="flex items-baseline gap-2"><span className="serif text-[28px] leading-none tnum">61%</span><span className="text-mute2 text-[11px]">vs public mempool</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PAGE: POINTS */}
      <main id="page-points" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="mono-up text-mute mb-3">[ 004 / Season 02 · Points ]</div>
              <h1 className="text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] font-light max-w-[16ch]">
                Stake earns yield. Behavior earns <span className="serif italic">points</span>.
              </h1>
            </div>
            <div className="mono text-[11.5px] text-mute2 max-w-[40ch] text-right">
              Season 02 ends in <span className="text-bone">31d 12h 04m</span>. Boosts for stakers, LPs, validators.
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 md:col-span-5 border border-hair2 bg-ink2 p-6">
              <div className="mono-up text-mute mb-4">Your points</div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="serif text-[64px] leading-none tnum">—</span>
                <span className="mono text-[11px] text-mute2">connect to view</span>
              </div>
              <div className="mt-5 hairline-t pt-4 grid grid-cols-3 gap-3 mono text-[11px]">
                <div><div className="text-mute mb-1">Rank</div><div className="text-bone tnum">—</div></div>
                <div><div className="text-mute mb-1">Boost</div><div className="text-bone tnum">—</div></div>
                <div><div className="text-mute mb-1">Δ 24h</div><div className="text-bone tnum">—</div></div>
              </div>
              <button className="cta-fl mt-6 inline-flex items-center gap-2 px-4 h-[40px] border border-bone text-bone text-[12.5px]">
                <span className="fl-track"><span>Connect wallet</span><span>Connect wallet</span></span>
                <span className="fl-fill" />
              </button>
            </div>
            <div className="col-span-12 md:col-span-7 border border-hair2 p-6">
              <div className="mono-up text-mute mb-4">Active boosts</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-hair2">
                {[
                  { v: "2.5×", l: "Early staker · pre-season" },
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

          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4 hairline-b pb-5 mb-1">
            <div><div className="mono-up text-mute">Season</div><div className="serif text-[44px] leading-none">02</div></div>
            <div><div className="mono-up text-mute">Total points issued</div><div className="serif text-[44px] leading-none tnum">14.2<span className="text-mute2">B</span></div></div>
            <div><div className="mono-up text-mute">Participants</div><div className="serif text-[44px] leading-none tnum">68,421</div></div>
            <div className="ml-auto flex items-center gap-2 mono text-[11px]">
              <button className="lb-filter px-3 py-1.5 border border-lime text-lime" data-filter="all">All</button>
              <button className="lb-filter px-3 py-1.5 border border-hair2 text-mute2 hover:text-bone" data-filter="staker">Stakers</button>
              <button className="lb-filter px-3 py-1.5 border border-hair2 text-mute2 hover:text-bone" data-filter="lp">LPs</button>
              <button className="lb-filter px-3 py-1.5 border border-hair2 text-mute2 hover:text-bone" data-filter="val">Validators</button>
            </div>
          </div>

          <div className="hairline-b">
            <div className="grid grid-cols-12 mono-up text-mute py-3 hairline-b">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Address</div>
              <div className="col-span-2">Class</div>
              <div className="col-span-2 text-right">Staked</div>
              <div className="col-span-2 text-right">Points</div>
              <div className="col-span-1 text-right">Δ 7D</div>
            </div>
            <div id="lb-rows" />
          </div>

          <div className="flex items-center justify-between mt-6 mono text-[11px] text-mute2">
            <span>Showing 12 of 68,421 — connect wallet to find your rank</span>
            <a href="#" className="text-bone hover:text-lime transition flex items-center gap-2">Full leaderboard <span>→</span></a>
          </div>
        </div>
      </main>

      {/* PAGE: DEGEN POOL */}
      <main id="page-degen" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="mono-up text-mute mb-3">[ 005 / Degen Pool · higher risk, higher yield ]</div>
              <h1 className="text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] font-light max-w-[14ch]">
                For when <span className="serif italic">7.84%</span> isn&apos;t enough.
              </h1>
            </div>
            <div className="mono text-[11.5px] text-red max-w-[42ch] text-right border-l border-red pl-3">
              ⚠ DEGEN POOL · UNAUDITED STRATEGIES · CAN LOSE PRINCIPAL · NOT THE STANDARD shMON PRODUCT
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hair2 mb-10">
            <div className="bg-ink p-6">
              <div className="mono-up text-mute mb-3">Pool APR · 7D</div>
              <div className="serif text-[52px] leading-none tnum text-lime">22.4<span className="text-mute2 text-[24px]">%</span></div>
            </div>
            <div className="bg-ink p-6">
              <div className="mono-up text-mute mb-3">TVL</div>
              <div className="serif text-[52px] leading-none tnum">$18.4M</div>
            </div>
            <div className="bg-ink p-6">
              <div className="mono-up text-mute mb-3">Max drawdown · 30D</div>
              <div className="serif text-[52px] leading-none tnum text-red">−4.1%</div>
            </div>
            <div className="bg-ink p-6">
              <div className="mono-up text-mute mb-3">Strategies live</div>
              <div className="serif text-[52px] leading-none tnum">7</div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="border border-hair2 bg-ink">
                <div className="flex items-center hairline-b">
                  <button className="flex-1 py-3.5 mono-up text-bone bg-ink3">Deposit</button>
                  <button className="flex-1 py-3.5 mono-up text-mute hover:text-bone">Withdraw</button>
                  <div className="px-5 mono text-[10.5px] text-red">unaudited</div>
                </div>
                <div className="p-7 lg:p-9">
                  <div className="mono-up text-mute mb-3 flex justify-between"><span>Deposit shMON</span><span>Balance · <span className="text-bone2 tnum">2,841.0091</span></span></div>
                  <div className="border hair2 bg-ink2 flex items-center px-5 h-[78px]">
                    <input id="degenIn" type="text" inputMode="decimal" defaultValue="100.00" className="flex-1 bg-transparent outline-none text-[42px] tnum font-light tracking-tight" />
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 bg-lime block" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)" }} />
                      <span className="text-[15px]">shMON</span>
                    </div>
                  </div>

                  <dl className="mt-7 mono text-[12.5px]">
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Pool</dt><dd>dgshMON v2</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Strategy</dt><dd>Looped staking + perp-funding capture + MEV bundle bidding</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Estimated APR</dt><dd className="tnum text-lime">22.4%</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Lockup</dt><dd>None · withdrawals processed end-of-epoch</dd></div>
                    <div className="flex justify-between py-2 hairline-b"><dt className="text-mute">Performance fee</dt><dd className="tnum">10% on yield only</dd></div>
                    <div className="flex justify-between py-2"><dt className="text-mute">Principal risk</dt><dd className="text-red">YES · strategies are unaudited</dd></div>
                  </dl>

                  <label className="mt-7 flex items-start gap-3 cursor-pointer">
                    <input id="ackBox" type="checkbox" className="mt-1 accent-lime w-4 h-4" />
                    <span className="mono text-[11.5px] text-mute2 leading-relaxed">I understand the Degen Pool runs unaudited strategies that may lose principal. I am not depositing more than I can afford to lose.</span>
                  </label>

                  <button id="degenCta" className="cta-fl mt-6 w-full inline-flex items-center justify-center gap-3 h-[58px] bg-ink3 text-mute text-[14.5px] font-medium cursor-not-allowed">
                    <span>Acknowledge to continue</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="border border-hair2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">Strategy allocation</span>
                  <span className="mono text-[10.5px] text-mute2">rebalanced 4h ago</span>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mono text-[12px]">
                    {[
                      { l: "Looped shMON · 5x", v: 38, c: "bg-lime" },
                      { l: "Perp funding · MON-PERP", v: 24, c: "bg-lime" },
                      { l: "MEV bundle bidding", v: 18, c: "bg-lime" },
                      { l: "JIT LP · concentrated", v: 12, c: "bg-lime" },
                      { l: "Cash reserve", v: 8, c: "bg-mute" },
                    ].map((s, i) => (
                      <li key={i}>
                        <div className="flex justify-between mb-1"><span className="text-bone2">{s.l}</span><span className="tnum">{s.v}%</span></div>
                        <div className="h-1.5 bg-hair2 relative"><span className={`absolute top-0 left-0 h-full ${s.c}`} style={{ width: `${s.v}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border border-hair2">
                <div className="hairline-b flex items-center justify-between px-5 h-[44px]">
                  <span className="mono-up text-mute">90-day performance</span>
                  <span className="mono text-[10.5px] text-lime tnum">+18.42%</span>
                </div>
                <div className="p-5">
                  <svg viewBox="0 0 400 100" className="w-full h-24">
                    <path d="M0 70 L20 65 L40 72 L60 55 L80 60 L100 48 L120 52 L140 38 L160 44 L180 30 L200 36 L220 50 L240 32 L260 28 L280 40 L300 22 L320 30 L340 18 L360 24 L380 12 L400 18" fill="none" stroke="#6105FF" strokeWidth="1.5" />
                    <path d="M0 70 L20 65 L40 72 L60 55 L80 60 L100 48 L120 52 L140 38 L160 44 L180 30 L200 36 L220 50 L240 32 L260 28 L280 40 L300 22 L320 30 L340 18 L360 24 L380 12 L400 18 L400 100 L0 100 Z" fill="#6105FF" opacity="0.07" />
                  </svg>
                  <div className="flex justify-between mono text-[10.5px] text-mute mt-1"><span>−90d</span><span>now</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PAGE: ECOSYSTEM */}
      <main id="page-ecosystem" className="page">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="mono-up text-mute mb-3">[ 006 / Ecosystem · where shMON works ]</div>
              <h1 className="text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.02em] font-light max-w-[14ch]">
                Use shMON <span className="serif italic">everywhere</span> on Monad.
              </h1>
            </div>
            <div className="mono text-[11.5px] text-mute2 max-w-[40ch] text-right">
              19 integrations live · 31 in development. Filter by category to find pools, markets, and venues.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-1 hairline-b pb-4">
            <button className="eco-filter px-3 py-1.5 border border-lime text-lime mono text-[11px]" data-cat="all">All <span className="text-mute2 ml-1">19</span></button>
            <button className="eco-filter px-3 py-1.5 border border-hair2 text-mute2 hover:text-bone mono text-[11px]" data-cat="dex">DEX <span className="text-mute2 ml-1">5</span></button>
            <button className="eco-filter px-3 py-1.5 border border-hair2 text-mute2 hover:text-bone mono text-[11px]" data-cat="lending">Lending <span className="text-mute2 ml-1">4</span></button>
            <button className="eco-filter px-3 py-1.5 border border-hair2 text-mute2 hover:text-bone mono text-[11px]" data-cat="perps">Perps <span className="text-mute2 ml-1">3</span></button>
            <button className="eco-filter px-3 py-1.5 border border-hair2 text-mute2 hover:text-bone mono text-[11px]" data-cat="lst">LST <span className="text-mute2 ml-1">2</span></button>
            <button className="eco-filter px-3 py-1.5 border border-hair2 text-mute2 hover:text-bone mono text-[11px]" data-cat="other">Other <span className="text-mute2 ml-1">5</span></button>
            <div className="ml-auto mono text-[11px] text-mute">sort by · <span className="text-bone">shMON deployed</span> ↓</div>
          </div>

          <div>
            <div className="grid grid-cols-12 mono-up text-mute py-3 hairline-b">
              <div className="col-span-4">Protocol</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-3">Integration</div>
              <div className="col-span-2 text-right">shMON deployed</div>
              <div className="col-span-1 text-right">APR</div>
            </div>
            <div id="eco-rows" />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="hairline-t mt-12">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
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
      </footer>
    </div>
  );
}
