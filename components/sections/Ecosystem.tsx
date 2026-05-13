export default function Ecosystem() {
  const marqueeItems = (
    <div className="flex items-center gap-16 px-8">
      <span className="serif-disp text-[40px]">Kuru</span>
      <span className="font-mono text-[28px] tracking-tighter">aPriori</span>
      <span className="serif-disp italic text-[40px]">Curvance</span>
      <span className="font-mono text-[28px]">0x.search</span>
      <span className="serif-disp text-[40px]">Caddy</span>
      <span className="font-mono text-[28px] tracking-widest">MONOPLEX</span>
      <span className="serif-disp italic text-[40px]">Pyth</span>
      <span className="font-mono text-[28px]">layerN</span>
      <span className="serif-disp text-[40px]">Wormhole</span>
    </div>
  );

  return (
    <section
      data-screen-label="Ecosystem"
      id="ecosystem"
      className="py-28"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="section-head">
          <div>
            <div className="eyebrow">§ 04 — Ecosystem</div>
            <div
              className="font-mono text-[11px] mt-2"
              style={{ color: "var(--ink-4)" }}
            >
              / who.builds.on.fastlane
            </div>
          </div>
          <h2 className="serif-disp text-[clamp(36px,4.6vw,72px)] text-balance">
            The teams routing flow through Fastlane.
          </h2>
        </div>

        <div className="marquee-wrap mt-16 overflow-hidden">
          <div className="marquee items-center">
            {marqueeItems}
            <div aria-hidden="true">{marqueeItems}</div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-16"
          style={{ border: "1px solid var(--rule)" }}
        >
          <div
            className="p-7"
            style={{
              borderRight: "1px solid var(--rule)",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div className="metric-lab mb-2">BUILT ON</div>
            <div className="serif-disp text-[28px]">Monad</div>
          </div>
          <div
            className="p-7"
            style={{
              borderRight: "1px solid var(--rule)",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div className="metric-lab mb-2">BACKED BY</div>
            <div className="serif-disp text-[28px]">Paradigm</div>
          </div>
          <div
            className="p-7"
            style={{
              borderRight: "1px solid var(--rule)",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div className="metric-lab mb-2">BACKED BY</div>
            <div className="serif-disp text-[28px] italic">Dragonfly</div>
          </div>
          <div
            className="p-7"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <div className="metric-lab mb-2">BACKED BY</div>
            <div className="serif-disp text-[28px]">Variant</div>
          </div>
          <div className="p-7 col-span-2 md:col-span-4">
            <div
              className="grid grid-cols-12 gap-6 items-center text-[14px]"
              style={{ color: "var(--ink-2)" }}
            >
              <div
                className="col-span-12 md:col-span-4 text-pretty"
                style={{ color: "var(--ink-3)" }}
              >
                Research and engineering partners across the Monad ecosystem.
                Selective. No paid placements.
              </div>
              <a
                href="#"
                className="cta-slide col-span-12 md:col-span-3 md:col-start-10"
              >
                <span className="dot" />
                <span className="slot">
                  <span>Become a partner</span>
                  <span style={{ color: "var(--signal)" }}>
                    partners@fastlane.xyz
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
