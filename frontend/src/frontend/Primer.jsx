import { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const sdohIndicators = [
  {
    number: "01",
    label: "Median household income",
    mapLabel: "Median household income",
    body: "Income is a strong predictor of preventive care uptake. Lower-income households face compounding barriers — higher cost-sharing even with insurance, less paid time off, and longer waits at safety-net clinics.",
  },
  {
    number: "02",
    label: "Uninsured adults",
    mapLabel: "Uninsured adults",
    body: "Insurance is the most direct gatekeeper to mammography. Without coverage, a screening mammogram costs $100–$300 out of pocket, and uninsured rates can suppress recorded diagnoses by preventing detection in the first place.",
  },
  {
    number: "03",
    label: "Below poverty line",
    mapLabel: "Below poverty line",
    body: "Poverty captures households with the fewest resources to absorb healthcare costs, missed work, or transportation to a clinic — barriers that reduce screening uptake independent of insurance status.",
  },
  {
    number: "04",
    label: "Largest group",
    mapLabel: "Largest group",
    body: "Race and ethnicity are social — not biological — predictors of screening access. Historical disinvestment and unequal clinic distribution have concentrated access barriers in many communities of color.",
  },
];

function SdohTooltip() {
  const [visible, setVisible] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span style={{ borderBottom: "1px solid var(--ink-muted)", paddingBottom: "1px", cursor: "default" }}>
        social determinants of health
      </span>
      {visible && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "320px",
            backgroundColor: "var(--surface-raise)",
            border: "1px solid var(--rule)",
            padding: "16px",
            zIndex: 50,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            pointerEvents: "auto",
          }}
        >
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: "20px", color: "var(--ink-soft)", margin: 0 }}>
            "The conditions in which people are born, grow, work, live, and age, and the wider set of forces and systems shaping the conditions of daily life."
          </p>
          <a
            href="https://www.who.int/health-topics/social-determinants-of-health"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "10px",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              color: "var(--brand)",
              textDecoration: "none",
              borderBottom: "1px solid var(--brand)",
              paddingBottom: "1px",
            }}
          >
            World Health Organization →
          </a>
        </span>
      )}
    </span>
  );
}

function SectionHeader({ title, kicker }) {
  return (
    <div style={{ marginBottom: "56px", textAlign: "left" }}>
      <div style={{ width: "48px", height: "3px", backgroundColor: "var(--brand)", marginBottom: "24px" }} />
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", lineHeight: "44px", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em", margin: 0 }}>
        {title}
      </h2>
      {kicker && (
        <p style={{ marginTop: "16px", color: "var(--ink-soft)", fontSize: "16px", fontWeight: 400, maxWidth: "60ch", textAlign: "left" }}>
          {kicker}
        </p>
      )}
    </div>
  );
}

function Primer() {
  return (
    <div className="w-full" style={{ backgroundColor: "var(--surface)", minHeight: "100vh" }}>
      <Navbar />

      {/* Page intro — centered */}
      <section style={{ backgroundColor: "var(--surface)" }}>
        <div className="max-w-[1200px] mx-auto px-10" style={{ paddingTop: "80px", paddingBottom: "72px", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: "24px" }}>Before you explore the map</div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "56px", lineHeight: "64px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)", maxWidth: "22ch", margin: "0 auto" }}>
            A reading guide to the data.
          </h1>
          <p className="lede" style={{ marginTop: "24px", maxWidth: "58ch", margin: "24px auto 0" }}>
            The map shows breast cancer diagnosis rates alongside four social
            conditions across King County neighborhoods. This page explains what
            those conditions are, why they're on the map, and how to read the
            numbers without misinterpreting them.
          </p>
          <div style={{ marginTop: "40px", borderTop: "1px solid var(--rule)", paddingTop: "20px" }}>
            <div className="flex justify-center gap-12">
              {[["01", "Social determinants of health"], ["02", "Rates vs. risk"], ["03", "The map"]].map(([num, label]) => (
                <span key={num} style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--ink-muted)" }}>
                  <span style={{ color: "var(--brand)", fontWeight: 600 }}>{num}</span>{"  "}{label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 01 SDOH: definition */}
      <section style={{ backgroundColor: "var(--surface-warm)", borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-[1200px] mx-auto px-10" style={{ paddingTop: "88px", paddingBottom: "56px", textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: "13px", color: "var(--ink-muted)", letterSpacing: "0.08em", marginBottom: "24px" }}>
            01
          </div>
          <SectionHeader title="What shapes who gets diagnosed" />

          <p className="lede">
            Health is determined by far more than biology or personal behavior.
            The conditions where people are born, live, work, and age —
            collectively called{" "}
            <SdohTooltip />
            {" "}— predict who gets screened for breast cancer just as reliably as
            family history or age.
          </p>

          <p style={{ marginTop: "32px", color: "var(--ink-soft)", fontSize: "17px", lineHeight: "28px" }}>
            When a woman skips a mammogram, the reason is rarely indifference.
            It is more often that she cannot afford the copay, cannot get time
            off work, cannot reach the clinic, or received outreach materials
            she couldn't read. These are structural barriers — created by
            policy, planning, and investment decisions — not individual choices.
          </p>

          <p style={{ marginTop: "24px", color: "var(--ink-soft)", fontSize: "17px", lineHeight: "28px" }}>
            The four indicators on this map were selected because they each
            measure a distinct structural barrier to screening access, and
            because reliable neighborhood-level data is available for King
            County from the U.S. Census Bureau. Together they explain most of
            the variation in mammography rates across the county.
          </p>

        </div>
      </section>

      {/* 01 SDOH: the four indicators */}
      <section style={{ backgroundColor: "var(--surface-warm)", borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-[1200px] mx-auto px-10" style={{ paddingTop: "48px", paddingBottom: "96px", textAlign: "left" }}>
          <p style={{ color: "var(--ink-muted)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "28px" }}>
            The four indicators shown on the map
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {sdohIndicators.map((ind, i) => (
              <div
                key={ind.number}
                style={{
                  borderTop: "1px solid var(--rule)",
                  borderRight: i % 2 === 0 ? "1px solid var(--rule)" : "none",
                  padding: "32px 32px 32px 0",
                  paddingLeft: i % 2 === 1 ? "32px" : "0",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)", color: "var(--brand)", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "14px" }}>
                  {ind.number}
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", lineHeight: "28px", color: "var(--ink)", fontWeight: 600, marginBottom: "10px" }}>
                  {ind.label}
                </h3>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "16px", backgroundColor: "var(--surface-band)", padding: "4px 10px" }}>
                  <span style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: "10px", letterSpacing: "0.06em", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                    Map label:
                  </span>
                  <span style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: "10px", letterSpacing: "0.06em", color: "var(--brand)", textTransform: "uppercase" }}>
                    {ind.mapLabel}
                  </span>
                </div>
                <p style={{ color: "var(--ink-soft)", fontSize: "15px", lineHeight: "24px" }}>
                  {ind.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 Rates ≠ Risk */}
      <section style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-[1200px] mx-auto px-10" style={{ paddingTop: "88px", paddingBottom: "88px", textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: "13px", color: "var(--ink-muted)", letterSpacing: "0.08em", marginBottom: "24px" }}>
            02
          </div>
          <SectionHeader title="A higher diagnosis rate does not mean a neighborhood is more dangerous." />

          <p style={{ color: "var(--ink-soft)", fontSize: "17px", lineHeight: "28px" }}>
            Diagnosis rates count recorded cases — cancers that were found. For
            a cancer to be recorded, a person must first be screened. This
            creates a systematic bias in the data: neighborhoods with better
            screening access will show higher diagnosis rates, not because they
            have more cancer, but because they detect more of the cancer that
            exists.
          </p>

          <p style={{ marginTop: "24px", color: "var(--ink-soft)", fontSize: "17px", lineHeight: "28px" }}>
            The reverse is equally important and often overlooked. A
            neighborhood with low screening rates will show a{" "}
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>
              low diagnosis rate — not because it is healthier, but because
              fewer cancers were caught.
            </strong>{" "}
            Those undetected cancers still exist. They will eventually be found
            at later stages, when treatment is harder and outcomes are worse.
          </p>

          <p style={{ marginTop: "24px", color: "var(--ink-soft)", fontSize: "17px", lineHeight: "28px" }}>
            Read the map as a map of screening access and detection capacity.
            Dark colors in well-resourced neighborhoods may reflect a strength
            in the health system — early detection working as intended. Light
            colors in under-resourced areas are the most concerning signal:
            they likely mean undetected disease.
          </p>

          <div style={{ marginTop: "40px", paddingLeft: "20px", borderLeft: "3px solid var(--accent)" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "21px", lineHeight: "30px", color: "var(--ink)", fontWeight: 600 }}>
              Rates ≠ Risk.
            </p>
            <p style={{ color: "var(--ink-soft)", fontSize: "15px", marginTop: "8px", lineHeight: "24px" }}>
              This tool shows community-level patterns of diagnosis and the
              social conditions surrounding them. It does not measure underlying
              cancer prevalence, predict personal risk, or offer medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* 03 CTA */}
      <section style={{ backgroundColor: "var(--surface-warm)", borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-[1200px] mx-auto px-10" style={{ paddingTop: "88px", paddingBottom: "96px", textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: "13px", color: "var(--ink-muted)", letterSpacing: "0.08em", marginBottom: "24px" }}>
            03
          </div>
          <SectionHeader
            title="Breast cancer diagnosis rates across King County."
            kicker="Now that you've read the guide, explore the map. Click a neighborhood to see its rate, the social conditions around it, and what those numbers do and don't mean."
          />
          <div style={{ marginTop: "16px", paddingTop: "32px", borderTop: "1px solid var(--rule)" }}>
            <p className="eyebrow" style={{ color: "var(--ink-muted)", marginBottom: "24px" }}>
              You've read the guide. Now explore the data.
            </p>
            <div className="flex items-center gap-8">
              <Link
                to="/map"
                style={{
                  display: "inline-block",
                  backgroundColor: "var(--brand)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "16px",
                  padding: "14px 32px",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                Open the full map →
              </Link>
              <Link
                to="/about"
                style={{ color: "var(--ink-muted)", fontWeight: 500, fontSize: "14px", borderBottom: "1px solid var(--rule)", paddingBottom: "2px", textDecoration: "none" }}
              >
                About this project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Primer;
