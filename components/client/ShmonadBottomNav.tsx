type Item = { nav: string; href: string; label: string };

const ITEMS: Item[] = [
  { nav: "degen", href: "#/degen", label: "Degen" },
  { nav: "rpc", href: "#/rpc", label: "RPC" },
  { nav: "stake", href: "#/stake", label: "Stake" },
  { nav: "activity", href: "#/activity", label: "Activity" },
  { nav: "points", href: "#/points", label: "Points" },
];

function NavIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "square" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "degen") {
    return (
      <svg {...common}>
        <path d="M3 17 L9 10 L13 14 L21 5" />
        <path d="M15.5 5 H21 V10.5" />
      </svg>
    );
  }
  if (name === "rpc") {
    return (
      <svg {...common}>
        <path d="M13 2.5 L4.5 13.5 L11 13 L10 21.5 L19.5 9.5 L12.5 10 Z" />
      </svg>
    );
  }
  if (name === "stake") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.4" />
        <circle cx="12" cy="12" r="3.3" />
      </svg>
    );
  }
  if (name === "activity") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.4" />
        <path d="M12 6.6 L12 12 L16 14.4" />
      </svg>
    );
  }
  // points — trophy
  return (
    <svg {...common}>
      <path d="M7 4 H17 V8.5 A5 5 0 0 1 7 8.5 Z" />
      <path d="M7 5 H4.5 A2.5 2.5 0 0 0 7 9" />
      <path d="M17 5 H19.5 A2.5 2.5 0 0 1 17 9" />
      <path d="M12 13.4 V16.6 M9 19.6 H15 M10.6 16.6 H13.4" />
    </svg>
  );
}

/**
 * Mobile bottom navigation for the shMonad page.
 *
 * The active item is driven by the page's imperative hash router (which
 * toggles `.active` on every `[data-nav]` element on load and on every
 * hashchange) — not by React state — so the highlight is always in sync
 * with the routed page. Active styling lives in shmonad.css.
 */
export default function ShmonadBottomNav() {
  return (
    <nav
      className="sh-bnav md:hidden"
      aria-label="shMonad navigation"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: "var(--sh-ink)",
        borderTop: "1px solid var(--sh-hair2)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div style={{ display: "flex", alignItems: "stretch", height: 58 }}>
        {ITEMS.map((it) => (
          <a
            key={it.nav}
            href={it.href}
            data-nav={it.nav}
            className="sh-bnav-item"
            style={{
              flex: 1,
              minWidth: 0,
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 5,
              paddingBottom: 8,
            }}
          >
            <span className="sh-bnav-icon">
              <NavIcon name={it.nav} />
            </span>
            <span className="sh-bnav-label mono">{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
