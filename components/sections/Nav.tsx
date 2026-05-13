export default function Nav() {
  return (
    <header
      data-screen-label="Nav"
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: "color-mix(in oklab, var(--bg) 86%, transparent)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className="max-w-[1320px] mx-auto px-8 flex items-center justify-between"
        style={{ height: 64 }}
      >
        <a href="#" className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 4 L13 11 L3 18" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M9 4 L19 11 L9 18"
              stroke="var(--signal)"
              strokeWidth="1.5"
            />
          </svg>
          <span
            className="font-mono text-[13px] tracking-[0.04em]"
            style={{ color: "var(--ink)" }}
          >
            fastlane
          </span>
          <span
            className="font-mono text-[11px] tracking-widest"
            style={{ color: "var(--ink-4)" }}
          >
            / monad
          </span>
        </a>

        <nav className="hidden md:flex items-center">
          <div className="nav-item">
            <button>
              Products{" "}
              <svg width="9" height="9" viewBox="0 0 9 9">
                <path
                  d="M1 3 L4.5 6 L8 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </button>
            <div className="nav-flyout">
              <a className="nav-row" href="#products">
                <div className="glyph">A</div>
                <div>
                  <div className="text-[13.5px]" style={{ color: "var(--ink)" }}>
                    Atlas
                  </div>
                  <div
                    className="text-[12.5px] mt-0.5"
                    style={{ color: "var(--ink-3)" }}
                  >
                    Atomic cross-domain execution. Bundle, simulate, settle.
                  </div>
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  SDK · v0.9
                </div>
              </a>
              <a className="nav-row" href="#products">
                <div className="glyph">B</div>
                <div>
                  <div className="text-[13.5px]" style={{ color: "var(--ink)" }}>
                    FastBids
                  </div>
                  <div
                    className="text-[12.5px] mt-0.5"
                    style={{ color: "var(--ink-3)" }}
                  >
                    Sealed-bid block-space auctions for searchers and apps.
                  </div>
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  LIVE
                </div>
              </a>
              <a className="nav-row" href="#products">
                <div className="glyph">S</div>
                <div>
                  <div className="text-[13.5px]" style={{ color: "var(--ink)" }}>
                    shMonad
                  </div>
                  <div
                    className="text-[12.5px] mt-0.5"
                    style={{ color: "var(--ink-3)" }}
                  >
                    Liquid-restaked MON. Single asset, three trust surfaces.
                  </div>
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  MAINNET
                </div>
              </a>
              <a className="nav-row" href="#products">
                <div className="glyph">R</div>
                <div>
                  <div className="text-[13.5px]" style={{ color: "var(--ink)" }}>
                    Relay
                  </div>
                  <div
                    className="text-[12.5px] mt-0.5"
                    style={{ color: "var(--ink-3)" }}
                  >
                    Validator-side bundle ingress with deterministic ordering.
                  </div>
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  TESTNET
                </div>
              </a>
            </div>
          </div>

          <div className="nav-item">
            <button>
              Developers{" "}
              <svg width="9" height="9" viewBox="0 0 9 9">
                <path
                  d="M1 3 L4.5 6 L8 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </button>
            <div className="nav-flyout" style={{ width: 520 }}>
              <a className="nav-row" href="#">
                <div className="glyph">⌘</div>
                <div>
                  <div className="text-[13.5px]" style={{ color: "var(--ink)" }}>
                    Documentation
                  </div>
                  <div
                    className="text-[12.5px] mt-0.5"
                    style={{ color: "var(--ink-3)" }}
                  >
                    Reference, guides, and architecture deep-dives.
                  </div>
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  ↗
                </div>
              </a>
              <a className="nav-row" href="#">
                <div className="glyph">{"{ }"}</div>
                <div>
                  <div className="text-[13.5px]" style={{ color: "var(--ink)" }}>
                    SDK / TypeScript
                  </div>
                  <div
                    className="text-[12.5px] mt-0.5"
                    style={{ color: "var(--ink-3)" }}
                  >
                    Integrate atomic execution in three calls.
                  </div>
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  ↗
                </div>
              </a>
              <a className="nav-row" href="#">
                <div className="glyph">⎈</div>
                <div>
                  <div className="text-[13.5px]" style={{ color: "var(--ink)" }}>
                    Run a validator
                  </div>
                  <div
                    className="text-[12.5px] mt-0.5"
                    style={{ color: "var(--ink-3)" }}
                  >
                    Operator handbook, hardware spec, slashing surfaces.
                  </div>
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  ↗
                </div>
              </a>
            </div>
          </div>

          <a
            href="#network"
            className="px-3.5 text-[13.5px] inline-flex items-center"
            style={{ color: "var(--ink-2)", height: 64 }}
          >
            Network
          </a>
          <a
            href="#research"
            className="px-3.5 text-[13.5px] inline-flex items-center"
            style={{ color: "var(--ink-2)", height: 64 }}
          >
            Research
          </a>
          <a
            href="#ecosystem"
            className="px-3.5 text-[13.5px] inline-flex items-center"
            style={{ color: "var(--ink-2)", height: 64 }}
          >
            Ecosystem
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:inline-flex text-[13px]"
            style={{ color: "var(--ink-3)" }}
          >
            Log in
          </a>
          <a href="#" className="cta-slide" aria-label="Launch app">
            <span className="dot" />
            <span className="slot">
              <span>Launch app</span>
              <span style={{ color: "var(--signal)" }}>
                app.fastlane.xyz ↗
              </span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
