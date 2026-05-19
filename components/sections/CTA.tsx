export default function CTA() {
  return (
    <section
      data-screen-label="CTA"
      className="py-32"
      style={{ borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <h2
            className="display text-balance"
            style={{ fontSize: "clamp(48px, 7.4vw, 120px)" }}
          >
            Make ordering
            <br />
            <em style={{ fontStyle: "normal" }}>a first-class</em>
            <br />
            primitive.
          </h2>
        </div>
        <div className="md:col-span-4">
          <p
            className="text-[15px] text-pretty mb-7"
            style={{ color: "var(--ink-2)", lineHeight: 1.6 }}
          >
            Three function calls to integrate. A whitepaper for the rest. Office
            hours for engineers shipping in production on Monad.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="cta cta-signal">
              <span className="label">Start integrating</span>
              <span className="arr">→</span>
            </a>
            <a href="#" className="cta">
              <span className="label">Office hours</span>
              <span className="arr">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
