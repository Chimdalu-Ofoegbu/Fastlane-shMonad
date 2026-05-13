export default function Thesis() {
  return (
    <section
      data-screen-label="Value"
      className="py-28"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="section-head">
          <div>
            <div className="eyebrow">§ 01 — Thesis</div>
            <div
              className="font-mono text-[11px] mt-2"
              style={{ color: "var(--ink-4)" }}
            >
              / what.is.fastlane
            </div>
          </div>
          <h2 className="serif-disp text-[clamp(36px,4.6vw,72px)] text-balance">
            A protocol-level <em>marketplace</em> for the order in which Monad
            blocks are built.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-10 mt-16">
          <div className="col-span-12 md:col-span-5">
            <p className="pullquote text-pretty">
              On every chain, value leaks to whoever controls ordering.{" "}
              <em>Fastlane makes ordering a public, sealed market</em> — priced
              by searchers, settled deterministically, redistributed to the
              validators who secure it.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div
              className="grid grid-cols-1 divide-y"
              style={{ borderColor: "var(--rule)" }}
            >
              <div
                className="py-6 grid grid-cols-[80px_1fr] gap-6"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <div
                  className="font-mono text-[11px]"
                  style={{ color: "var(--signal)" }}
                >
                  → 01
                </div>
                <div>
                  <div
                    className="text-[18px] mb-1.5"
                    style={{ color: "var(--ink)" }}
                  >
                    Atomic, or nothing.
                  </div>
                  <div
                    className="text-[14px]"
                    style={{ color: "var(--ink-3)", lineHeight: 1.6 }}
                  >
                    Every bundle either lands as one transaction or fails as one.
                    There is no partial state, no front-run window, no off-chain
                    trust.
                  </div>
                </div>
              </div>
              <div
                className="py-6 grid grid-cols-[80px_1fr] gap-6"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <div
                  className="font-mono text-[11px]"
                  style={{ color: "var(--signal)" }}
                >
                  → 02
                </div>
                <div>
                  <div
                    className="text-[18px] mb-1.5"
                    style={{ color: "var(--ink)" }}
                  >
                    Sealed bids, public rules.
                  </div>
                  <div
                    className="text-[14px]"
                    style={{ color: "var(--ink-3)", lineHeight: 1.6 }}
                  >
                    Searchers compete in a sealed-bid auction governed by
                    on-chain contracts. The auctioneer is the chain.
                  </div>
                </div>
              </div>
              <div className="py-6 grid grid-cols-[80px_1fr] gap-6">
                <div
                  className="font-mono text-[11px]"
                  style={{ color: "var(--signal)" }}
                >
                  → 03
                </div>
                <div>
                  <div
                    className="text-[18px] mb-1.5"
                    style={{ color: "var(--ink)" }}
                  >
                    Validators get paid.
                  </div>
                  <div
                    className="text-[14px]"
                    style={{ color: "var(--ink-3)", lineHeight: 1.6 }}
                  >
                    MEV flow is routed through shMonad and distributed to
                    operators in proportion to honest work, not access to a
                    private orderflow deal.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
