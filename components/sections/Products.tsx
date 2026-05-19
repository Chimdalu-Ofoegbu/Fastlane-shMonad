export default function Products() {
  return (
    <section
      data-screen-label="Products"
      id="products"
      className="py-28"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="section-head">
          <h2
            className="serif-disp text-[clamp(36px,4.6vw,72px)] text-balance"
            style={{ gridColumn: "1 / -1" }}
          >
            Four primitives.
            <br />
            <em style={{ fontStyle: "normal" }}>One execution surface.</em>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-16"
          style={{ border: "1px solid var(--rule)" }}
        >
          <div
            className="pcard"
            style={{ borderWidth: "0 1px 1px 0", borderStyle: "solid", borderColor: "var(--rule)" }}
          >
            <span className="corner" />
            <span className="corner bl" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: "var(--signal-ink)" }}
                >
                  STAKING
                </div>
              </div>
              <h3 className="serif-disp text-[40px] leading-[0.95]">
                shMonad
              </h3>
              <p
                className="mt-5 text-[14.5px] text-pretty"
                style={{ color: "var(--ink-3)", lineHeight: 1.55 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <a href="/shmonad" className="cta-slide">
                <span className="dot" />
                <span className="slot">
                  <span>Stake Now</span>
                  <span style={{ color: "var(--signal)" }}>shmonad.xyz</span>
                </span>
              </a>
            </div>
          </div>

          <div
            className="pcard"
            style={{ borderWidth: "0 0 1px 0", borderStyle: "solid", borderColor: "var(--rule)" }}
          >
            <span className="corner" />
            <span className="corner bl" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: "var(--signal-ink)" }}
                >
                  MEV
                </div>
              </div>
              <h3 className="serif-disp text-[40px] leading-[0.95]">
                MEV Protocol (Sidecard &amp; Auction Handler)
              </h3>
              <p
                className="mt-5 text-[14.5px] text-pretty"
                style={{ color: "var(--ink-3)", lineHeight: 1.55 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <a href="#" className="cta-slide">
                <span className="dot" />
                <span className="slot">
                  <span>View Docs</span>
                  <span style={{ color: "var(--signal)" }}>View Docs</span>
                </span>
              </a>
            </div>
          </div>

          <div
            className="pcard"
            style={{ borderWidth: "0 1px 0 0", borderStyle: "solid", borderColor: "var(--rule)" }}
          >
            <span className="corner" />
            <span className="corner bl" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: "var(--signal-ink)" }}
                >
                  ATLAS
                </div>
              </div>
              <h3 className="serif-disp text-[40px] leading-[0.95]">
                Atlas (Application-Controlled Execution)
              </h3>
              <p
                className="mt-5 text-[14.5px] text-pretty"
                style={{ color: "var(--ink-3)", lineHeight: 1.55 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <a
                href="https://atlas-docs.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-slide"
              >
                <span className="dot" />
                <span className="slot">
                  <span>Atlas Docs</span>
                  <span style={{ color: "var(--signal)" }}>atlas-docs.pages.dev</span>
                </span>
              </a>
              <div
                className="num text-[12px]"
                style={{ color: "var(--ink-4)" }}
              >
                7.42% APR · TVL $284M
              </div>
            </div>
          </div>

          <div className="pcard">
            <span className="corner" />
            <span className="corner bl" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: "var(--signal-ink)" }}
                >
                  RPC
                </div>
              </div>
              <h3 className="serif-disp text-[40px] leading-[0.95]">
                Fastlane RPC
              </h3>
              <p
                className="mt-5 text-[14.5px] text-pretty"
                style={{ color: "var(--ink-3)", lineHeight: 1.55 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <a href="#" className="cta-slide">
                <span className="dot" />
                <span className="slot">
                  <span>Get RPC</span>
                  <span style={{ color: "var(--signal)" }}>Get RPC</span>
                </span>
              </a>
              <div
                className="num text-[12px]"
                style={{ color: "var(--ink-4)" }}
              >
                128 / 128 ONBOARDED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
