const NODE_BASE: React.CSSProperties = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  padding: "10px 15px",
  fontSize: 12.5,
  fontWeight: 500,
  lineHeight: 1.25,
  border: "1px solid",
  whiteSpace: "nowrap",
};

const GLYPH: React.CSSProperties = {
  width: 18,
  height: 18,
  flexShrink: 0,
  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
};

const ARROWS = [
  "M 256 206 C 214 182 216 150 182 110",
  "M 344 206 C 386 182 384 150 418 110",
  "M 256 294 C 214 318 216 350 182 390",
  "M 344 294 C 386 318 384 350 418 390",
];

const LABEL: React.CSSProperties = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: 10.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
  background: "var(--bg-1)",
  padding: "2px 7px",
  whiteSpace: "nowrap",
};

export default function AlignmentEngine() {
  return (
    <section
      data-screen-label="Alignment"
      id="alignment"
      className="py-28"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid grid-cols-12 gap-10 items-center">
          {/* ── Left: copy ── */}
          <div className="col-span-12 md:col-span-5">
            <h2
              className="serif-disp text-balance"
              style={{ fontSize: "clamp(40px, 4.8vw, 72px)" }}
            >
              The Alignment Engine.
            </h2>
            <p
              className="text-pretty mt-6"
              style={{
                color: "var(--ink-2)",
                fontSize: 17,
                lineHeight: 1.55,
                maxWidth: 440,
              }}
            >
              shMonad aligns apps, validators, and users — capturing excess
              value and returning it to the ecosystem.
            </p>
          </div>

          {/* ── Right: diagram ── */}
          <div className="col-span-12 md:col-span-7">
            <div
              style={{
                border: "1px solid var(--rule)",
                background: "var(--bg-1)",
                padding: "clamp(16px, 3vw, 36px)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 640,
                  margin: "0 auto",
                  aspectRatio: "600 / 500",
                }}
              >
                {/* signal glow behind the core */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "48%",
                    height: "56%",
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle, rgba(97,5,255,0.30) 0%, rgba(97,5,255,0) 68%)",
                    pointerEvents: "none",
                  }}
                />

                <svg
                  viewBox="0 0 600 500"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                    pointerEvents: "none",
                  }}
                >
                  <defs>
                    <marker
                      id="ae-arrowhead"
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="6.5"
                      markerHeight="6.5"
                      orient="auto-start-reverse"
                    >
                      <path d="M0,1 L9,5 L0,9 Z" style={{ fill: "var(--signal)" }} />
                    </marker>
                  </defs>

                  {ARROWS.map((d) => (
                    <path
                      key={d}
                      d={d}
                      fill="none"
                      markerEnd="url(#ae-arrowhead)"
                      style={{ stroke: "var(--rule-2)", strokeWidth: 1.5 }}
                    />
                  ))}

                  {/* central hexagon — ring + core */}
                  <polygon
                    points="362,250 331,196 269,196 238,250 269,304 331,304"
                    style={{ fill: "var(--signal)" }}
                  />
                  <polygon
                    points="340,250 320,215 280,215 260,250 280,285 320,285"
                    style={{ fill: "var(--bg-1)" }}
                  />
                  <polygon
                    points="320,250 310,233 290,233 280,250 290,267 310,267"
                    style={{ fill: "var(--signal)" }}
                  />
                </svg>

                {/* nodes */}
                <div
                  style={{
                    ...NODE_BASE,
                    left: "23.33%",
                    top: "14.4%",
                    background: "var(--signal)",
                    color: "#ffffff",
                    borderColor: "var(--signal)",
                    boxShadow: "0 8px 22px -10px rgba(97,5,255,0.65)",
                  }}
                >
                  <span style={{ ...GLYPH, background: "rgba(255,255,255,0.92)" }} />
                  Validators
                </div>

                <div
                  style={{
                    ...NODE_BASE,
                    left: "76.67%",
                    top: "14.4%",
                    background: "var(--signal)",
                    color: "#ffffff",
                    borderColor: "var(--signal)",
                    boxShadow: "0 8px 22px -10px rgba(97,5,255,0.65)",
                  }}
                >
                  <span style={{ ...GLYPH, background: "rgba(255,255,255,0.92)" }} />
                  Applications
                </div>

                <div
                  style={{
                    ...NODE_BASE,
                    left: "23.33%",
                    top: "85.6%",
                    background: "var(--bg)",
                    color: "var(--ink)",
                    borderColor: "var(--rule-2)",
                    boxShadow: "0 8px 20px -12px rgba(0,0,0,0.35)",
                  }}
                >
                  <span style={{ ...GLYPH, background: "var(--signal)" }} />
                  MEV Client
                </div>

                <div
                  style={{
                    ...NODE_BASE,
                    left: "76.67%",
                    top: "85.6%",
                    background: "var(--bg)",
                    color: "var(--ink)",
                    borderColor: "var(--rule-2)",
                    boxShadow: "0 8px 20px -12px rgba(0,0,0,0.35)",
                    whiteSpace: "normal",
                    maxWidth: 168,
                    textAlign: "left",
                  }}
                >
                  <span style={{ ...GLYPH, background: "var(--signal)" }} />
                  Application-Controlled Execution
                </div>

                {/* arc labels */}
                <div style={{ ...LABEL, left: "36%", top: "32.8%" }}>
                  More Stake
                </div>
                <div style={{ ...LABEL, left: "64%", top: "32.8%" }}>
                  Better UX
                </div>
                <div style={{ ...LABEL, left: "36%", top: "67.2%" }}>Yield</div>
                <div style={{ ...LABEL, left: "64%", top: "67.2%" }}>Yield</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
