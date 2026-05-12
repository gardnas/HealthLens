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
                to="/about"
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

function DataExplanation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log("coming into view")
      controls.start({opacity : 1, y : 0, transition: { duration : 0.8 }});
    } else {
      console.log("leaving view")
      controls.start({opacity: 0, y: 50, transition: { duration: 0.8 }});
    }
  }, [isInView, controls])
  return (
    <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 50 }}
    animate={controls}
    className="w-full min-h-screen"
    >
      <section className="flex flex-col justify-center p-16 w-full w-full min-h-[90vh] text-gray-700 bg-white max-md:px-5 font-inter">
        <div className="flex flex-wrap gap-16 items-center w-full">
          <div className="flex flex-wrap flex-1 shrink gap-6 items-start self-stretch my-auto w-full basis-0 min-w-[240px]">
            <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[160px]">
              <div className="flex flex-col w-full">
                <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8">
                  Why This Data Matters
                </h2>
                <p className="mt-2 text-xl text-left mb-2">
                  Social factors—like income, race, and access to education—have
                  a profound impact on health outcomes. This project uses data
                  from Seattle's communities to explore how these factors might
                  influence cancer rates and outcomes. By visualizing this data,
                  we aim to spark conversations and inform decisions that can
                  lead to healthier, more equitable communities.
                  <br /><br />
                  As you scroll down, you'll find an interactive map that allows
                  you to dive deep into the data for each Seattle neighborhood.
                  You can examine how cancer rates compare with factors like
                  income, education, and race in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function MapPreview() {
  return (
    <section className="bg-white py-16 text-center px-4">
      <h2 className="text-4xl font-semibold mb-4">See the Map in Action</h2>
      <p className="mb-6 text-xl text-gray-700">
        Here’s a glimpse of our interactive map exploring health equity in King County.
      </p>
      <Link to="/map">
        <img 
          src="/images/map-preview.png" 
          alt="Map preview" 
          className="mx-auto rounded-2xl shadow-xl max-w-4xl w-full hover:opacity-90 transition duration-300"
        />
      </Link>
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
      href: "https://www.cdc.gov/brfss/index.html",
    },
    {
      value: "128.1",
      line: "breast cancer diagnoses per 100,000 women — King County, age-adjusted.",
      source: "WSCR, 2020–2023",
      href: "https://fortress.wa.gov/doh/wscr/",
    },
    {
      value: "129.7",
      line: "diagnoses per 100,000 women — United States average for comparison.",
      source: "CDC USCS, 2021",
      href: "https://www.cdc.gov/cancer/uscs/",
    },
    {
      value: "6.2%",
      line: "of King County adults under 65 lacked health insurance in 2022.",
      source: "ACS 5-year, 2022",
      href: "https://data.census.gov/",
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
    <div className="font-inter min-h-screen">
      <Navbar />
      <Hero />
      <KingCountyGlance />
      <DataExplanation />
      <MapPreview />
      {/* <ExploreData /> */}
      <Footer />
    </div>
  );
}

export default Home;
