import React from "react";
import homepageImg from "../assets/homepage.png";
import DataMap from './DataMap';
import DataSidebar from './DataSidebar';
import Navbar from './Navbar';
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-[1200px] mx-auto px-10 pt-24 pb-24">
        <div className="grid grid-cols-12 gap-10 items-center">

          {/* Left — text */}
          <div className="col-span-12 lg:col-span-6 text-left">
            <div
              style={{
                width: "48px",
                height: "3px",
                backgroundColor: "var(--brand)",
                marginBottom: "24px",
              }}
            />
            <h1
              className="mb-8"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "56px",
                lineHeight: "64px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                maxWidth: "18ch",
              }}
            >
              Reading a map of breast cancer rates in King County.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "22px",
                lineHeight: "32px",
                fontWeight: 400,
                color: "var(--ink-soft)",
                maxWidth: "60ch",
              }}
            >
              A reading guide to breast cancer diagnosis rates across King
              County. The maps and explanations on this site are designed for
              people without a public-health background. They show what the
              data measures, where it comes from, and what it
              does <em>not</em> mean about personal risk.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <Link
                to="/primer"
                style={{
                  display: "inline-block",
                  backgroundColor: "var(--brand)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "15px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                Start here
              </Link>
              <Link
                to="/map"
                style={{
                  color: "var(--ink-muted)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "15px",
                  borderBottom: "1px solid var(--ink-muted)",
                  paddingBottom: "2px",
                  textDecoration: "none",
                }}
              >
                Skip, continue to the map →
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div className="col-span-12 lg:col-span-6">
            <img
              src={homepageImg}
              alt="A residential street in a Seattle neighborhood"
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                filter: "saturate(0.88)",
                display: "block",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-mono, ui-monospace, monospace)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "var(--ink-muted)",
                marginTop: "12px",
                textTransform: "uppercase",
              }}
            >
              {/* 
               */}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}


function ExploreData() {
  const ref = useRef(null); 
  const isInView = useInView(ref, { amount: 0.5 }); 
  const controls = useAnimation(); 

  useEffect(() => {
    if (isInView) {
      console.log("coming into view");
      controls.start({ opacity: 1, y: 0, transition: { duration: 1.0 } });
    } else {
      console.log("leaving view");
      controls.start({ opacity: 0, y: 50, transition: { duration: 1.0 } });
    }
  }, [isInView, controls]);
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls} 
      className="flex flex-col items-center w-full text-black bg-white font-inter mt-[-10px]"
    >
      <h2 className="text-5xl font-semibold tracking-tighter leading-tight text-center mb-4 max-md:text-4xl">
        Explore The Data
      </h2>
      <div className="flex flex-wrap gap-4 items-start pr-8 pl-8 w-full min-h-[940px] max-md:px-5 max-md:max-w-full mb-8">
        <DataMap />
        <DataSidebar />
      </div>
    </motion.section>
  );
}

function KingCountyGlance() {
  const stats = [
    {
      value: "41%",
      line: "of women age 40+ in King County had a mammogram in the past two years.",
      source: "BRFSS, 2023",
      href: "https://doh.wa.gov/data-and-statistical-reports/data-systems/behavioral-risk-factor-surveillance-system-brfss/resources-brfss-results",
    },
    {
      value: "128.1",
      line: "breast cancer diagnoses per 100,000 women — King County, age-adjusted.",
      source: "WSCR, 2020–2023",
      href: "https://fortress.wa.gov/doh/wtn/WTNPortal/home/indexraw?q0=511",
    },
    {
      value: "129.7",
      line: "diagnoses per 100,000 women — United States average for comparison.",
      source: "CDC USCS, 2021",
      href: "https://www.cdc.gov/breast-cancer/statistics/index.html",
    },
    {
      value: "6.2%",
      line: "of King County adults under 65 lacked health insurance in 2022.",
      source: "ACS 5-year, 2022",
      href: "https://www.census.gov/data/tables/time-series/demo/health-insurance/acs-hi.html",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--surface-warm)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-10 py-24">
        {/* Section header — matches Figma SectionHeader component */}
        <div style={{ marginBottom: "56px", textAlign: "left" }}>
          <div
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "var(--brand)",
              marginBottom: "24px",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "36px",
              lineHeight: "44px",
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            King County at a glance.
          </h2>
          <p
            style={{
              marginTop: "16px",
              color: "var(--ink-soft)",
              fontSize: "16px",
              fontWeight: 400,
              maxWidth: "60ch",
            }}
          >
            Six baseline numbers that frame every neighborhood comparison on this site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s) => (
            <div
              key={s.value}
              style={{
                borderTop: "1px solid var(--rule)",
                paddingTop: "20px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "64px",
                  lineHeight: 1,
                  fontWeight: 600,
                  color: "var(--brand)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <p
                style={{
                  marginTop: "16px",
                  color: "var(--ink-soft)",
                  fontSize: "16px",
                  lineHeight: "26px",
                  textAlign: "left",
                }}
              >
                {s.line}
              </p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  fontFamily: "var(--font-mono, ui-monospace, monospace)",
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  color: "var(--ink-muted)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--rule)",
                  paddingBottom: "1px",
                  transition: "color 150ms ease, border-color 150ms ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--brand)";
                  e.currentTarget.style.borderBottomColor = "var(--brand)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--ink-muted)";
                  e.currentTarget.style.borderBottomColor = "var(--rule)";
                }}
              >
                Source · {s.source}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrimerCTA() {
  return (
    <section style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--rule)" }}>
      <div className="max-w-[1200px] mx-auto px-10" style={{ paddingTop: "88px", paddingBottom: "96px" }}>
        <div style={{ width: "48px", height: "3px", backgroundColor: "var(--brand)", marginBottom: "24px" }} />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", lineHeight: "44px", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em", maxWidth: "28ch", margin: 0 }}>
              Before you explore the map, read the primer.
            </h2>
            <p style={{ marginTop: "16px", color: "var(--ink-soft)", fontSize: "16px", lineHeight: "26px", maxWidth: "52ch" }}>
              The primer explains what the diagnosis rates mean, what the social indicators show, and — critically — what the map does not tell you about personal risk.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <Link
              to="/primer"
              style={{
                display: "inline-block",
                backgroundColor: "var(--brand)",
                color: "#FFFFFF",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "15px",
                padding: "12px 28px",
                textDecoration: "none",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              Read the primer →
            </Link>
            <Link
              to="/map"
              style={{ color: "var(--ink-muted)", fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "14px", borderBottom: "1px solid var(--rule)", paddingBottom: "2px", textDecoration: "none", whiteSpace: "nowrap" }}
            >
              Go straight to the map
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex overflow-hidden flex-wrap gap-4 items-start px-8 pt-8 pb-1 w-full text-base leading-snug text-black bg-white border-t border-zinc-300 min-h-[142px] max-md:px-5 max-md:max-w-full font-inter">
      <div className="flex flex-col items-start w-full max-w-[320px]">
        <div className="flex flex-col self-stretch pb-4 w-full font-semibold">
          <h3 className="text-left w-full">Contact Us</h3>
        </div>
        <div className="flex flex-col items-start">
          <a href="mailto:halleee0415@gmail.com" className="text-left mt-3 text-black hover:text-gray-600">
            halleee0415@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}


function Home() {
  return (
    <div className="w-full font-inter min-h-screen">
      <Navbar />
      <Hero />
      <KingCountyGlance />
      {/* <ExploreData /> */}
      <PrimerCTA />
      <Footer />
    </div>
  );
}

export default Home;
