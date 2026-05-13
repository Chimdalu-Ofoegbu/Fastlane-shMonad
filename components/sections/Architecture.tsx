export default function Architecture() {
  return (
    <section
      data-screen-label="Architecture"
      id="network"
      className="py-28"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="section-head">
          <div>
            <div className="eyebrow">§ 03 — Architecture</div>
            <div
              className="font-mono text-[11px] mt-2"
              style={{ color: "var(--ink-4)" }}
            >
              / how.it.works
            </div>
          </div>
          <h2 className="serif-disp text-[clamp(36px,4.6vw,72px)] text-balance">
            Built like infrastructure. <em>Audited like one.</em>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-10 mt-16">
          <div className="col-span-12 lg:col-span-7">
            <div
              className="font-mono text-[11px] mb-4 tracking-widest"
              style={{ color: "var(--ink-3)" }}
            >
              FIG. 01 — DATA FLOW (BUNDLE → BLOCK)
            </div>
            <div
              className="grid grid-cols-3 gap-0"
              style={{ border: "1px solid var(--rule)" }}
            >
              <div
                className="arch-cell"
                style={{
                  borderRight: "1px solid var(--rule)",
                  borderTop: 0,
                  borderLeft: 0,
                }}
              >
                <span className="tag">01 · CLIENT</span>
                <div className="mt-5 serif-disp text-[24px]">
                  App / Searcher
                </div>
                <div
                  className="font-mono text-[11px] mt-2"
                  style={{ color: "var(--ink-3)" }}
                >
                  solve() · bid()
                </div>
              </div>
              <div
                className="arch-cell"
                style={{
                  borderRight: "1px solid var(--rule)",
                  borderTop: 0,
                }}
              >
                <span className="tag">02 · AUCTION</span>
                <div className="mt-5 serif-disp text-[24px]">FastBids</div>
                <div
                  className="font-mono text-[11px] mt-2"
                  style={{ color: "var(--ink-3)" }}
                >
                  sealed → revealed
                </div>
              </div>
              <div
                className="arch-cell"
                style={{ borderTop: 0, borderRight: 0 }}
              >
                <span className="tag">03 · RELAY</span>
                <div className="mt-5 serif-disp text-[24px]">Validator</div>
                <div
                  className="font-mono text-[11px] mt-2"
                  style={{ color: "var(--ink-3)" }}
                >
                  order &amp; sign
                </div>
              </div>
              <div
                className="arch-cell col-span-3"
                style={{
                  borderRight: 0,
                  borderLeft: 0,
                  borderBottom: 0,
                }}
              >
                <span className="tag">04 · SETTLEMENT</span>
                <div className="flex items-center justify-between mt-5 flex-wrap gap-4">
                  <div className="serif-disp text-[24px]">
                    Monad block — atomic, deterministic
                  </div>
                  <div
                    className="font-mono text-[11px]"
                    style={{ color: "var(--ink-3)" }}
                  >
                    REVENUE → shMonad → operators · stakers · protocol
                  </div>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-3 mt-6 text-[12px]"
              style={{ border: "1px solid var(--rule)" }}
            >
              <div
                className="p-4"
                style={{ borderRight: "1px solid var(--rule)" }}
              >
                <div
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--ink-4)" }}
                >
                  Audit · Q3
                </div>
                <div className="serif-disp text-[20px] mt-2">Spearbit</div>
              </div>
              <div
                className="p-4"
                style={{ borderRight: "1px solid var(--rule)" }}
              >
                <div
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--ink-4)" }}
                >
                  Audit · Q4
                </div>
                <div className="serif-disp text-[20px] mt-2">
                  Trail of Bits
                </div>
              </div>
              <div className="p-4">
                <div
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--ink-4)" }}
                >
                  Bug Bounty
                </div>
                <div className="serif-disp text-[20px] mt-2">
                  $2.5M · Immunefi
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div
              className="font-mono text-[11px] mb-4 tracking-widest"
              style={{ color: "var(--ink-3)" }}
            >
              FIG. 02 — INTEGRATION
            </div>
            <div className="code">
              <span className="c">{"// install"}</span>
              {"\n"}
              <span className="p">$</span> pnpm add @fastlane/atlas{"\n"}
              {"\n"}
              <span className="c">
                {"// 1 — bundle. 2 — simulate. 3 — settle."}
              </span>
              {"\n"}
              <span className="k">import</span> {"{ atlas }"}{" "}
              <span className="k">from</span>{" "}
              <span className="s">&quot;@fastlane/atlas&quot;</span>;{"\n"}
              {"\n"}
              <span className="k">const</span> bundle = atlas.
              <span className="k">bundle</span>([{"\n"}
              {"  "}swap(USDC, MON, <span className="num">5_000</span>),{"\n"}
              {"  "}supply(aMON, <span className="num">&quot;max&quot;</span>),
              {"\n"}
              ]);{"\n"}
              {"\n"}
              <span className="k">await</span> atlas.
              <span className="k">settle</span>(bundle, {"{"}
              {"\n"}
              {"  "}recipient: wallet.address,{"\n"}
              {"  "}maxSlippage: <span className="num">0.001</span>,{"\n"}
              {"}"});{"\n"}
              {"\n"}
              <span className="c">{"// → atomic. or nothing."}</span>
            </div>
            <div
              className="mt-4 flex items-center gap-3 text-[12px] font-mono"
              style={{ color: "var(--ink-3)" }}
            >
              <span className="pulse" /> SDK STATUS · ALL GREEN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
