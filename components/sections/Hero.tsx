import SwirlCanvas from "@/components/client/SwirlCanvas";
import TiltImage from "@/components/client/TiltImage";

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
          className="display"
          style={{
            fontSize: "clamp(48px, 7.6vw, 132px)",
            marginBottom: 28,
            fontWeight: 300,
          }}
        >
          The Alignment Layer
          <br />
          <span style={{ color: "var(--signal)", fontWeight: 600, fontStyle: "normal" }}>of Monad</span>
        </h1>

        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:mt-10">
            <p
              className="text-pretty text-[18px]"
              style={{ color: "var(--ink-2)", lineHeight: 1.55 }}
            >
              Fastlane is the MEV and atomic execution layer for Monad. We give
              apps deterministic ordering, give searchers a sealed-bid auction,
              and give validators a defensible cut of the value they secure.
            </p>
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <a href="/shmonad" className="cta cta-signal">
                <span className="label">Stake Now</span>
                <span className="arr">↗</span>
              </a>
              <a href="#research" className="cta">
                <span className="label">Read the whitepaper</span>
                <span className="arr">↗</span>
              </a>
            </div>
          </div>

          <div
            className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7 flex items-center justify-center"
            style={{ marginTop: "clamp(-80px, -6vw, -24px)" }}
          >
            <TiltImage
              src="/fl-3d.webp"
              alt="Fastlane mark"
              maxWidth={420}
            />
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
            <div
              className="metric-val ticker"
              style={{ whiteSpace: "nowrap", fontSize: "clamp(36px, 4.2vw, 52px)" }}
            >
              424M mon
            </div>
            <div className="metric-lab mt-2">TVL on shMONAD</div>
          </div>
          <div className="p-7" style={{ borderRight: "1px solid var(--rule)" }}>
            <div className="metric-val ticker">412 ms</div>
            <div className="metric-lab mt-2">Median bundle-to-block</div>
          </div>
          <div className="p-7">
            <div className="metric-val ticker">128</div>
            <div className="metric-lab mt-2">Validators integrated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
