export default function ShmonadBanner() {
  return (
    <section
      className="py-16"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">
        <div
          className="shmonad-banner relative overflow-hidden flex items-center justify-center"
          style={{
            minHeight: 280,
            background:
              "radial-gradient(120% 90% at 60% 50%, rgba(97, 5, 255, 0.45) 0%, rgba(97, 5, 255, 0) 55%)," +
              "radial-gradient(80% 80% at 85% 60%, rgba(230, 90, 60, 0.18) 0%, rgba(230, 90, 60, 0) 55%)," +
              "linear-gradient(95deg, #0c0414 0%, #170725 45%, #0a0312 100%)",
            border: "1px solid rgba(97, 5, 255, 0.25)",
            borderRadius: 6,
          }}
        >
          {/* Left decorative icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fl-3d.webp"
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              position: "absolute",
              left: -80,
              top: "50%",
              transform: "translateY(-50%) rotate(18deg)",
              width: 260,
              opacity: 0.92,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
          {/* Right decorative icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fl-3d.webp"
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              position: "absolute",
              right: -60,
              top: "50%",
              transform: "translateY(-50%) rotate(-28deg) scaleX(-1)",
              width: 240,
              opacity: 0.9,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          <div className="relative z-10 text-center px-8 py-12 max-w-[640px]">
            <h2
              className="text-balance"
              style={{
                fontFamily: "var(--font-geist), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 4.4vw, 56px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                margin: 0,
              }}
            >
              Get{" "}
              <span style={{ color: "var(--signal)" }}>started</span>
              {" "}with shMonad
            </h2>
            <p
              className="text-balance"
              style={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: 16,
                lineHeight: 1.5,
                marginTop: 14,
              }}
            >
              Stake and earn rewards while supporting the network.
            </p>
            <a
              href="/shmonad"
              className="banner-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: 28,
                background: "#ffffff",
                color: "#0c0414",
                borderRadius: 999,
                padding: "12px 32px",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.01em",
                textDecoration: "none",
                transition: "transform 200ms cubic-bezier(.2,.7,0,1), background 200ms ease",
              }}
            >
              Stake Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
