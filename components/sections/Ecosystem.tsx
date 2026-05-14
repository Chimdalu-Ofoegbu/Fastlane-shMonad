type Partner = { name: string; href: string; cls: string };

const PARTNERS: Partner[] = [
  { name: "Kuru", href: "#", cls: "serif-disp text-[40px]" },
  { name: "aPriori", href: "#", cls: "font-mono text-[28px] tracking-tighter" },
  { name: "Curvance", href: "#", cls: "serif-disp italic text-[40px]" },
  { name: "0x.search", href: "#", cls: "font-mono text-[28px]" },
  { name: "Caddy", href: "#", cls: "serif-disp text-[40px]" },
  { name: "MONOPLEX", href: "#", cls: "font-mono text-[28px] tracking-widest" },
  { name: "Pyth", href: "#", cls: "serif-disp italic text-[40px]" },
  { name: "layerN", href: "#", cls: "font-mono text-[28px]" },
  { name: "Wormhole", href: "#", cls: "serif-disp text-[40px]" },
];

export default function Ecosystem() {
  const renderRow = (ariaHidden = false) => (
    <div
      className="flex items-center gap-16 px-8"
      aria-hidden={ariaHidden || undefined}
    >
      {PARTNERS.map((p, i) => (
        <a
          key={`${p.name}-${i}`}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`partner-link ${p.cls}`}
          tabIndex={ariaHidden ? -1 : 0}
        >
          {p.name}
        </a>
      ))}
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
          <div>
            <h2 className="serif-disp text-[clamp(36px,4.6vw,72px)] text-balance">
              Trusted by leading Apps &amp; Builders
            </h2>
            <p
              className="mt-5 text-[16px] text-pretty"
              style={{ color: "var(--ink-3)", lineHeight: 1.55, maxWidth: "60ch" }}
            >
              The infrastructure trusted by the apps you already use.
            </p>
          </div>
        </div>

        <div className="marquee-wrap mt-16 overflow-hidden">
          <div className="marquee items-center">
            {renderRow()}
            {renderRow(true)}
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
