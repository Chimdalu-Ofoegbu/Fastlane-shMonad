import MatrixCanvas from "@/components/client/MatrixCanvas";

export default function Footer() {
  return (
    <footer data-screen-label="Footer">
      <div className="max-w-[1320px] mx-auto px-8 py-16">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M3 4 L13 11 L3 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M9 4 L19 11 L9 18"
                  stroke="var(--signal)"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="font-mono text-[13px]">fastlane / monad</span>
            </div>
            <div
              className="serif-disp text-[40px] mt-7 text-balance"
              style={{ color: "var(--ink)" }}
            >
              The Alignment Layer
              <br />
              of Monad
            </div>
            <div
              className="mt-7 flex items-center gap-3 text-[12px] font-mono"
              style={{ color: "var(--ink-3)" }}
            >
              <span className="pulse" /> MONAD MAINNET · BLOCK{" "}
              <span className="num" id="t-block-2">
                12,884,931
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-10">
            <div className="foot-col">
              <h5>Products</h5>
              <a href="#">Atlas</a>
              <a href="#">FastBids</a>
              <a href="#">shMonad</a>
              <a href="#">Relay</a>
            </div>
            <div className="foot-col">
              <h5>Developers</h5>
              <a href="#">Documentation</a>
              <a href="#">SDK</a>
              <a href="#">Status</a>
              <a href="#">Changelog</a>
            </div>
            <div className="foot-col">
              <h5>Network</h5>
              <a href="#">Validators</a>
              <a href="#">Searchers</a>
              <a href="#">Auctions</a>
              <a href="#">Research</a>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Press kit</a>
            </div>
            <div className="foot-col">
              <h5>Socials</h5>
              <a href="#">Twitter / X</a>
              <a href="#">GitHub</a>
              <a href="#">Discord</a>
              <a href="#">Mirror</a>
            </div>
          </div>
        </div>

        <div className="footer-canvas-wrap relative mt-16">
          <MatrixCanvas />
        </div>

        <div
          className="mt-8 pt-6 flex items-center justify-between text-[12px] font-mono flex-wrap gap-4"
          style={{ borderTop: "1px solid var(--rule)", color: "var(--ink-3)" }}
        >
          <div>© 2026 FASTLANE LABS · DELAWARE · MEV ON MONAD</div>
          <div>
            v.2026.05 · BUILD <span className="num">a18c4f2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
