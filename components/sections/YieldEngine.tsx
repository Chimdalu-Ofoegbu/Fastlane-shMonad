const CHANNELS = [
  { name: "Staking", group: 0, href: "/shmonad" },
  { name: "Paymaster", group: 1, href: "/shmonad" },
  { name: "Clearing House", group: 1, href: "/shmonad" },
  { name: "Task Manager", group: 1, href: "/shmonad" },
  { name: "FastLane RPC", group: 1, href: "/shmonad#/rpc" },
  { name: "Atlas", group: 2, href: "/shmonad" },
  { name: "MEV", group: 2, href: "/shmonad" },
];

const GROUPS = [
  { label: "Native Staking", span: 1, mev: false },
  { label: "FastLane Infrastructure", span: 4, mev: false },
  { label: "FastLane MEV", span: 2, mev: true },
];

const MEV_TINT = "color-mix(in srgb, var(--signal) 9%, var(--bg-1))";
const MEV_RULE = "color-mix(in srgb, var(--signal) 32%, var(--rule-2))";

export default function YieldEngine() {
  return (
    <section
      data-screen-label="Yield"
      className="py-28"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">
        {/* ── Header ── */}
        <div
          className="grid grid-cols-12 gap-10 items-start pb-9"
          style={{ borderBottom: "1px solid var(--rule)" }}
        >
          <h2 className="serif-disp text-[clamp(36px,4.6vw,72px)] text-balance col-span-12 md:col-span-7">
            Turning Network Flow
            <br />
            <span style={{ color: "var(--ink-4)" }}>Into Sustainable Yield</span>
          </h2>
          <p
            className="col-span-12 md:col-span-4 md:col-start-9 text-[14.5px] text-pretty"
            style={{ color: "var(--ink-3)", lineHeight: 1.6 }}
          >
            shMonad bundles staking, MEV, app services, and infra fees into one
            liquid token for consistent, steady yield.
          </p>
        </div>

        {/* ── Top cards ── */}
        <div className="grid grid-cols-12 gap-6 mt-10">
          {/* Validators */}
          <div
            className="col-span-12 md:col-span-5 flex flex-col"
            style={{
              border: "1px solid var(--rule)",
              background: "var(--bg)",
              padding: 28,
            }}
          >
            <div
              className="flex-1 flex items-center justify-center"
              style={{ minHeight: 220, overflow: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/shmon-side-hollow.webp"
                alt="shMonad token"
                className="block w-full h-auto select-none"
                style={{ maxWidth: 260 }}
                draggable={false}
              />
            </div>
            <div className="text-center mt-4">
              <div
                className="serif-disp"
                style={{ fontSize: "clamp(56px,7vw,88px)", lineHeight: 1 }}
              >
                <span
                  style={{
                    fontSize: "0.42em",
                    color: "var(--ink-3)",
                    verticalAlign: "0.18em",
                  }}
                >
                  &gt;
                </span>
                95
                <span
                  style={{
                    fontSize: "0.4em",
                    color: "var(--ink-3)",
                    verticalAlign: "0.55em",
                  }}
                >
                  %
                </span>
              </div>
              <div className="mt-2 text-[16px]" style={{ color: "var(--ink)" }}>
                Validators
              </div>
              <div
                className="mt-1.5 font-mono text-[11px] tracking-widest"
                style={{ color: "var(--ink-3)", textTransform: "uppercase" }}
              >
                Connected to FastLane
              </div>
            </div>
          </div>

          {/* Apps integrated */}
          <div
            className="col-span-12 md:col-span-7 flex flex-col items-center justify-center"
            style={{
              border: "1px solid var(--rule)",
              background: "var(--bg)",
              padding: 28,
            }}
          >
            <div className="text-center">
              <div
                className="serif-disp"
                style={{ fontSize: "clamp(56px,7vw,88px)", lineHeight: 1 }}
              >
                25
                <span
                  style={{
                    fontSize: "0.4em",
                    color: "var(--signal-ink)",
                    verticalAlign: "0.42em",
                  }}
                >
                  +
                </span>
              </div>
              <div className="mt-2 text-[16px]" style={{ color: "var(--ink)" }}>
                Apps Integrated
              </div>
            </div>

            {/* product mockup */}
            <div
              className="mt-8 mx-auto w-full"
              style={{
                maxWidth: 460,
                border: "1px solid var(--rule)",
                background: "var(--bg-1)",
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <span className="text-[13.5px]" style={{ color: "var(--ink)" }}>
                  MEV-Protection by FastLane
                </span>
                <span
                  style={{
                    width: 36,
                    height: 19,
                    borderRadius: 999,
                    background: "var(--signal)",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      width: 15,
                      height: 15,
                      borderRadius: 999,
                      background: "#fff",
                    }}
                  />
                </span>
              </div>
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <span
                  className="text-[13.5px]"
                  style={{ color: "var(--ink-4)" }}
                >
                  Transaction deadline
                </span>
                <span
                  style={{ width: 48, height: 12, background: "var(--bg-2)" }}
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span
                  style={{ width: 150, height: 12, background: "var(--bg-2)" }}
                />
                <span
                  style={{ width: 36, height: 12, background: "var(--bg-2)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Yield channels ── */}
        <div
          className="mt-6"
          style={{
            border: "1px solid var(--rule)",
            background: "var(--bg)",
            padding: "44px 28px",
          }}
        >
          <div className="text-center">
            <div
              className="serif-disp"
              style={{ fontSize: "clamp(48px,6vw,76px)", lineHeight: 1 }}
            >
              7
              <span
                style={{
                  fontSize: "0.4em",
                  color: "var(--signal-ink)",
                  verticalAlign: "0.42em",
                }}
              >
                +
              </span>
            </div>
            <div className="mt-2 text-[16px]" style={{ color: "var(--ink)" }}>
              Yield Generating Channels for shMonad
            </div>
          </div>

          <div className="mt-10 overflow-x-auto">
            <div
              style={{
                minWidth: 700,
                maxWidth: 1000,
                margin: "0 auto",
                padding: "14px 4px 6px",
              }}
            >
              {/* channel cells */}
              <div className="grid grid-cols-7 gap-3">
                {CHANNELS.map((c) => {
                  const mev = c.group === 2;
                  return (
                    <a
                      key={c.name}
                      href={c.href}
                      className="yield-cell"
                      style={{
                        minHeight: 104,
                        display: "grid",
                        placeItems: "center",
                        padding: 12,
                        border: `1px solid ${mev ? MEV_RULE : "var(--rule-2)"}`,
                        background: mev ? MEV_TINT : "var(--bg-1)",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        className="font-mono text-[11px] tracking-widest text-center"
                        style={{
                          textTransform: "uppercase",
                          padding: "8px 10px",
                          border: `1px solid ${
                            mev ? MEV_RULE : "var(--rule)"
                          }`,
                          background: "var(--bg)",
                          color: mev ? "var(--signal-ink)" : "var(--ink-2)",
                          lineHeight: 1.35,
                        }}
                      >
                        {c.name}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* group brackets */}
              <div className="grid grid-cols-7 gap-3 mt-3">
                {GROUPS.map((g) => (
                  <div
                    key={g.label}
                    style={{ gridColumn: `span ${g.span}` }}
                    className="flex flex-col items-center"
                  >
                    <div
                      style={{
                        width: "100%",
                        height: 9,
                        borderBottom: `1px solid ${
                          g.mev ? MEV_RULE : "var(--rule-2)"
                        }`,
                        borderLeft: `1px solid ${
                          g.mev ? MEV_RULE : "var(--rule-2)"
                        }`,
                        borderRight: `1px solid ${
                          g.mev ? MEV_RULE : "var(--rule-2)"
                        }`,
                      }}
                    />
                    <div
                      className="mt-2.5 font-mono text-[10.5px] tracking-widest text-center"
                      style={{
                        textTransform: "uppercase",
                        color: g.mev ? "var(--signal-ink)" : "var(--ink-3)",
                      }}
                    >
                      {g.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
