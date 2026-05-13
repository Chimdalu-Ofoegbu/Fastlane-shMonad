import SwirlCanvas from "@/components/client/SwirlCanvas";

export default function Hero() {
  return (
    <section
      data-screen-label="Hero"
      id="hero"
      className="relative overflow-hidden"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <SwirlCanvas />
      <div className="hero-grid" />

      <div className="relative max-w-[1320px] mx-auto px-8 pt-28 pb-24">
        <div
          className="flex items-center justify-between mb-16 text-[11px] font-mono tracking-widest uppercase"
          style={{ color: "var(--ink-3)" }}
        >
          <div className="flex items-center gap-3">
            <span className="pulse" />
            <span>NETWORK ONLINE · MONAD MAINNET</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <span>
              BLOCK{" "}
              <span className="num" style={{ color: "var(--ink)" }} id="t-block">
                12,884,931
              </span>
            </span>
            <span>
              LATENCY{" "}
              <span className="num" style={{ color: "var(--ink)" }} id="t-lat">
                412
              </span>{" "}
              MS
            </span>
            <span>
              BUNDLES/S{" "}
              <span
                className="num"
                style={{ color: "var(--signal)" }}
                id="t-bps"
              >
                1,204
              </span>
            </span>
          </div>
        </div>

        <h1
          className="display text-balance"
          style={{
            fontSize: "clamp(56px, 9.4vw, 156px)",
            marginBottom: 36,
          }}
        >
          Atomic execution
          <br />
          <em>at the speed</em> of
          <br />
          <span style={{ color: "var(--ink)" }}>consensus.</span>
        </h1>

        <div className="grid grid-cols-12 gap-10 items-end">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p
              className="text-pretty text-[18px]"
              style={{ color: "var(--ink-2)", lineHeight: 1.55 }}
            >
              Fastlane is the MEV and atomic execution layer for Monad. We give
              apps deterministic ordering, give searchers a sealed-bid auction,
              and give validators a defensible cut of the value they secure.
            </p>
            <div className="mt-9 flex items-center gap-3 flex-wrap">
              <a href="#products" className="cta cta-signal">
                <span className="label">Integrate Fastlane</span>
                <span className="arr">→</span>
              </a>
              <a href="#research" className="cta">
                <span className="label">Read the whitepaper</span>
                <span className="arr">↗</span>
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <div
              className="grid grid-cols-3 gap-0 border"
              style={{
                borderColor: "var(--rule)",
                background: "color-mix(in oklab, var(--bg) 92%, transparent)",
              }}
            >
              <div
                className="p-5"
                style={{ borderRight: "1px solid var(--rule)" }}
              >
                <div className="eyebrow mb-3">For apps</div>
                <div className="serif-disp text-[28px] leading-none mb-3">
                  Determinism.
                </div>
                <div
                  className="text-[12.5px]"
                  style={{ color: "var(--ink-3)", lineHeight: 1.5 }}
                >
                  Bundle, simulate, settle. Your users never lose value to a
                  reorder you didn&apos;t sign.
                </div>
              </div>
              <div
                className="p-5"
                style={{ borderRight: "1px solid var(--rule)" }}
              >
                <div className="eyebrow mb-3">For searchers</div>
                <div className="serif-disp text-[28px] leading-none mb-3">
                  A real market.
                </div>
                <div
                  className="text-[12.5px]"
                  style={{ color: "var(--ink-3)", lineHeight: 1.5 }}
                >
                  Sealed-bid auctions on every block. Public rules, deterministic
                  settlement, no off-chain handshake.
                </div>
              </div>
              <div className="p-5">
                <div className="eyebrow mb-3">For validators</div>
                <div className="serif-disp text-[28px] leading-none mb-3">
                  Your cut.
                </div>
                <div
                  className="text-[12.5px]"
                  style={{ color: "var(--ink-3)", lineHeight: 1.5 }}
                >
                  Capture MEV without running custom infra. shMonad routes flow
                  to the operators who secure it.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-[1320px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4">
          <div className="p-7" style={{ borderRight: "1px solid var(--rule)" }}>
            <div className="metric-val ticker">2.41B</div>
            <div className="metric-lab mt-2">Bundles processed</div>
          </div>
          <div className="p-7" style={{ borderRight: "1px solid var(--rule)" }}>
            <div className="metric-val ticker">$184.6M</div>
            <div className="metric-lab mt-2">MEV returned to validators</div>
          </div>
          <div className="p-7" style={{ borderRight: "1px solid var(--rule)" }}>
            <div className="metric-val ticker">412 ms</div>
            <div className="metric-lab mt-2">Median bundle-to-block</div>
          </div>
          <div className="p-7">
            <div className="metric-val ticker">128 / 128</div>
            <div className="metric-lab mt-2">Validators integrated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
