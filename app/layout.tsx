import type { Metadata } from "next";
import {
  Newsreader,
  Geist,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fastlane — The Alignment Layer of Monad",
  description:
    "Fastlane is the MEV and atomic execution layer for Monad. Deterministic ordering for apps, a sealed-bid auction for searchers, and a defensible cut for validators.",
};

// Runs before React hydration to prevent flash of wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('fl-theme');if(t!=='light'&&t!=='dark')t='light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ───────────────────────────────────────────────
  // DISPLAY-FACE TOGGLE (Fastlane landing + Fastlane footer dot-matrix).
  //   "grotesk" → Space Grotesk display headlines.
  //   "serif"   → original Newsreader serif (current).
  // Flip this single constant to swap the Fastlane page's display face.
  // (The shMonad page is locked to Grotesk independently and is not
  // affected by this toggle.)
  // ───────────────────────────────────────────────
  const displayFace: "grotesk" | "serif" = "serif";

  return (
    <html
      lang="en"
      data-theme="light"
      data-display={displayFace}
      className={`${newsreader.variable} ${geist.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
