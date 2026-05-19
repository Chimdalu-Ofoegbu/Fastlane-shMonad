export default function Thesis() {
  return (
    <section
      data-screen-label="Value"
      className="py-28"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="section-head">
          <h2
            className="serif-disp text-[clamp(36px,4.6vw,72px)] text-balance"
            style={{ gridColumn: "1 / -1" }}
          >
            MEV Infrastructure and Yield
            <br />
            Layer on Monad
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-16">
          <div className="md:col-span-5 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/shmon-side-hollow.webp"
              alt="shMonad side hollow"
              className="block w-full h-auto select-none"
              style={{ maxWidth: 460 }}
              draggable={false}
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
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
                  style={{ color: "var(--signal-ink)" }}
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
                  style={{ color: "var(--signal-ink)" }}
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
                  style={{ color: "var(--signal-ink)" }}
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
