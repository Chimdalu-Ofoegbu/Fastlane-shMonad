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
                  A — ATLAS
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  SDK · v0.9 · TYPESCRIPT
                </div>
              </div>
              <h3 className="serif-disp text-[40px] leading-[0.95]">
                Atomic cross-domain execution.
              </h3>
              <p
                className="mt-5 text-[14.5px] text-pretty"
                style={{ color: "var(--ink-3)", lineHeight: 1.55 }}
              >
                Build multi-step transactions across DEXes, lending markets, and
                bridges that either settle as one operation or revert cleanly.
                Atlas exposes a single{" "}
                <span
                  className="font-mono text-[13px]"
                  style={{ color: "var(--signal-ink)" }}
                >
                  solve()
                </span>{" "}
                primitive.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <a href="#" className="cta-slide">
                <span className="dot" />
                <span className="slot">
                  <span>Read the SDK docs</span>
                  <span style={{ color: "var(--signal)" }}>
                    docs.fastlane.xyz/atlas ↗
                  </span>
                </span>
              </a>
              <div
                className="num text-[12px]"
                style={{ color: "var(--ink-4)" }}
              >
                ~12 INTEGRATIONS LIVE
              </div>
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
                  B — FASTBIDS
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  AUCTION · LIVE
                </div>
              </div>
              <h3 className="serif-disp text-[40px] leading-[0.95]">
                Sealed-bid block-space auctions.
              </h3>
              <p
                className="mt-5 text-[14.5px] text-pretty"
                style={{ color: "var(--ink-3)", lineHeight: 1.55 }}
              >
                Searchers post sealed bids for inclusion in a specific block
                slot. Bids are revealed at settlement; the highest bid wins; the
                chain itself enforces the rules. No private flow. No off-chain
                handshake.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <a href="#" className="cta-slide">
                <span className="dot" />
                <span className="slot">
                  <span>View the live auction</span>
                  <span style={{ color: "var(--signal)" }}>
                    app.fastlane.xyz/auction ↗
                  </span>
                </span>
              </a>
              <div
                className="num text-[12px]"
                style={{ color: "var(--ink-4)" }}
              >
                ~1,204 BIDS/S
              </div>
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
                  S — shMONAD
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  MAINNET
                </div>
              </div>
              <h3 className="serif-disp text-[40px] leading-[0.95]">
                Liquid-restaked MON. <em>Three trust surfaces.</em>
              </h3>
              <p
                className="mt-5 text-[14.5px] text-pretty"
                style={{ color: "var(--ink-3)", lineHeight: 1.55 }}
              >
                Stake once. Earn consensus yield, MEV flow, and selective
                re-staking rewards as a single liquid asset. Slashing is
                partitioned by surface — you choose which surfaces you opt into.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <a href="#" className="cta-slide">
                <span className="dot" />
                <span className="slot">
                  <span>Stake on shMonad</span>
                  <span style={{ color: "var(--signal)" }}>shmonad.xyz ↗</span>
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
                  R — RELAY
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  TESTNET
                </div>
              </div>
              <h3 className="serif-disp text-[40px] leading-[0.95]">
                Validator-side bundle ingress.
              </h3>
              <p
                className="mt-5 text-[14.5px] text-pretty"
                style={{ color: "var(--ink-3)", lineHeight: 1.55 }}
              >
                A drop-in sidecar for Monad validators. Deterministic bundle
                ordering, transparent inclusion proofs, and a clean revenue
                split. No bespoke client, no closed mempool.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <a href="#" className="cta-slide">
                <span className="dot" />
                <span className="slot">
                  <span>Run a validator</span>
                  <span style={{ color: "var(--signal)" }}>
                    validators.fastlane.xyz ↗
                  </span>
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
