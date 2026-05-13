import React, { useState } from 'react';
import Navbar from './Navbar';
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";


function Hero() {
  return (
    <section style={{ backgroundColor: "var(--surface)" }}>
      <div
        className="max-w-[1200px] mx-auto px-10"
        style={{ paddingTop: "80px", paddingBottom: "64px", textAlign: "left" }}
      >
        <div className="eyebrow" style={{ marginBottom: "24px" }}>
          About this project
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "56px",
            lineHeight: "64px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            maxWidth: "22ch",
            textAlign: "left",
          }}
        >
          HealthLens: a health equity platform.
        </h1>
        <p
          className="lede"
          style={{ marginTop: "24px", maxWidth: "58ch", textAlign: "left" }}
        >
          Built by a University of Washington capstone team to make breast
          cancer data across King County readable for everyone — not just
          public-health professionals.
        </p>
      </div>
    </section>
  );
}

function Mission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log("coming into view")
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      console.log("leaving view")
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full min-h-screen"
    >
      <section className="flex flex-col justify-center px-4 py-12 md:p-16 w-full min-h-[90vh] text-gray-700 bg-white font-inter">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8">Our Mission</h2>
            <p className="text-xl text-left mb-8" style={{ fontStyle: "italic", borderLeft: "3px solid var(--brand)", paddingLeft: "20px", color: "var(--ink-soft)" }}>
              How might individuals with limited health data literacy in Seattle better understand how social determinants of health relate to breast cancer risk — so that they can make more informed decisions about prevention and screening?
            </p>
            <p className="text-xl text-left mb-6">
              HealthLens was built to answer that question. Health data is routinely published without the context needed to interpret it responsibly. Recorded diagnosis rates are often mistaken for measures of underlying disease prevalence — when in fact they primarily reflect how well a community is screened. We built this tool to bridge that gap.
            </p>
            <div className="pl-5 mb-4 text-left text-xl">
              <strong>Bridge the literacy gap:</strong>
              <p>Make breast cancer data readable for people without a public-health background, with clear explanations of what the numbers do and don't mean.</p>
            </div>
            <div className="pl-5 mb-4 text-left text-xl">
              <strong>Surface structural barriers:</strong>
              <p>Show how income, insurance, poverty, and demographics shape who gets screened — and whose cancers go undetected.</p>
            </div>
            <div className="pl-5 mb-4 text-left text-xl">
              <strong>Support informed action:</strong>
              <p>Give residents, advocates, and policymakers a shared starting point for conversations about prevention, screening access, and health equity in King County.</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8">Why It Matters</h2>
            <p className="text-xl text-left mb-6">
              Where you live, your income, your insurance status, and your access to care shape your likelihood of getting a mammogram — and whether a cancer gets caught early or late. In King County, these disparities are visible across neighborhoods. A low recorded diagnosis rate in an under-resourced area is not a sign of good health; it is often a sign that fewer screenings are happening and fewer cancers are being found.
            </p>
            <ul className="list-disc text-left ml-8 text-lg mt-4">
              <li>Early detection dramatically improves breast cancer outcomes — but only for those who can access screening.</li>
              <li>Structural barriers, not personal choices, drive most of the variation in screening rates across neighborhoods.</li>
              <li>Understanding the data clearly is the first step toward changing the conditions that create disparities.</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function AboutData() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full min-h-screen"
    >
      <section className="flex flex-col justify-center p-16 w-full min-h-[90vh] text-gray-700 bg-white font-inter">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-semibold tracking-tighter leading-tight text-black text-left mb-8">
              Our Data
            </h2>

            <p className="mt-2 text-xl text-left mb-6">
              Our map brings together publicly available datasets to visualize breast cancer incidence and key social determinants of health across King County, Washington.
            </p>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-left mb-3">Breast Cancer Rates</h3>
              <p className="text-xl text-left">
                The choropleth map overlays breast cancer incidence rates by Health Reporting Area (HRA). This data comes from the Washington State Cancer Registry and reflects reported cases from 2020, the most recent year with comprehensive, neighborhood-level data available.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-left mb-3">Social Determinants of Health</h3>
              <p className="text-xl text-left mb-3">
                When you hover over each neighborhood/HRA, the map displays information including:
              </p>
              <ul className="list-disc text-left pl-8 text-xl mb-4">
                <li className="mb-2">Median household income</li>
                <li className="mb-2">Racial and ethnic demographic composition</li>
                <li className="mb-2">Health insurance coverage rates</li>
              </ul>
              <p className="text-xl text-left">
                These indicators are drawn from the U.S. Census Bureau's 2020 American Community Survey (ACS). Though not fully up-to-date, 2020 is the latest year with consistent data available across both cancer incidence and socioeconomic indicators.
              </p>
            </div>

            <div className="mt-2">
              <h3 className="text-2xl font-semibold text-left mb-3">Purpose</h3>
              <p className="text-xl text-left">
                Together, these datasets offer a snapshot of how health outcomes and community-level social factors intersect across King County neighborhoods. This project aims to help users explore potential patterns and disparities in cancer outcomes through an equity-informed lens.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}


function TeamIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
    }
  }, [isInView, controls]);

  const teamMembers = [
    {
      name: "Benjamin Po",
      role: "Frontend / Backend Dev",
      photo: "images/benny.jpg",
    },
    {
      name: "Noah Karst",
      role: "UI/UX Designer & GIS",
      photo: "images/noah.JPG",
    },
    {
      name: "Halle Hwang",
      role: "Frontend Dev",
      photo: "images/halle.png",
    },
    {
      name: "Dahira Abukar",
      role: "PM & UI/UX",
      photo: "images/dahira.jpeg",
    },
    {
      name: "Caleb Lee",
      role: "Backend Dev",
      photo: "images/caleb.JPG",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="w-full min-h-screen"
    >
      <section className="flex flex-col justify-center p-16 w-full min-h-[90vh] text-gray-700 bg-white max-md:px-5 font-inter">
        <div className="w-full max-w-5xl mx-auto text-left px-8">
          <h2 className="text-4xl font-semibold mb-4">The Team Behind the Project</h2>
          <p className="text-xl mb-8">University of Washington Winter and Spring 2025 Capstone</p>
          <div className="team-members grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card text-center p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="rounded-full w-40 h-40 mx-auto mb-6 object-cover"
                />
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

const faqs = [
  {
    id: "item-1",
    question: "Who is HealthLens for?",
    answer:
      "HealthLens is a public health reading tool designed for community advocates, researchers, policymakers, and residents of King County who want to understand how social and economic conditions shape health outcomes in their neighborhoods.",
  },
  {
    id: "item-2",
    question: "How do I use this website?",
    answer:
      "Start by exploring the interactive map on the 'Map' page. Click on a specific neighborhood to open a detailed breakdown. You'll see the recorded breast cancer detection rate compared to the county average, alongside local data on income, insurance, and demographics. Use these details to contextualize the health data.",
  },
  {
    id: "item-3",
    question: "Why did we build this project?",
    answer:
      "Health data is often presented out of context, leading people to equate recorded diagnoses with absolute risk. We built HealthLens to show that a higher diagnosis rate does not necessarily mean a neighborhood is more 'dangerous'. Instead, it often indicates better access to healthcare and screening.",
  },
  {
    id: "item-4",
    question: "What steps should I take after reading this data?",
    answer:
      "If you're a resident, use this information to understand your community's health landscape, but rely on your doctor for personal risk assessments. If you need screening, check our Resources page to find nearby clinics. Advocates and policymakers can use this data to push for targeted outreach and mobile mammography in under-screened areas.",
  },
  {
    id: "item-5",
    question: "Why do some wealthy neighborhoods have higher detection rates?",
    answer:
      "Neighborhoods with higher median incomes typically have better insurance coverage and more accessible healthcare facilities. This means residents are more likely to receive regular preventative screenings, leading to more cancers being detected early and recorded. This is why we emphasize that 'Rates ≠ Risk'.",
  },
];

function AccordionItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className="mb-4"
      style={{
        backgroundColor: "var(--surface-raise)",
        border: "1px solid var(--rule)",
        borderRadius: "4px",
      }}
    >
      <button
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span style={{ color: "var(--ink)", fontSize: "16px", fontWeight: 500, fontFamily: "var(--font-sans)" }}>
          {faq.question}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 shrink-0 ml-4 transition-transform duration-200"
          style={{ color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 200ms ease",
          overflow: "hidden",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="px-6 pb-6 pt-2" style={{ color: "var(--ink-soft)", fontSize: "15px", lineHeight: 1.6, fontFamily: "var(--font-sans)" }}>
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openItem, setOpenItem] = useState(null);
  const toggle = (id) => setOpenItem(openItem === id ? null : id);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      controls.start({ opacity: 0, y: 50, transition: { duration: 0.8 } });
    }
  }, [isInView, controls]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={controls} className="w-full">
      <section className="w-full font-inter" style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--rule)" }}>
        <div className="max-w-[800px] mx-auto px-10 pt-24 pb-32">
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
            }}
          >
            Frequently Asked Questions
          </p>
          <h2
            className="mb-10"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "48px",
              lineHeight: "58px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
            }}
          >
            Understanding HealthLens
          </h2>
          <p
            className="mb-16"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              lineHeight: "32px",
              fontWeight: 400,
              color: "var(--ink-soft)",
            }}
          >
            Learn how to interpret the map, why we visualize social determinants
            of health alongside detection rates, and what actionable steps you can
            take next.
          </p>
          <div className="w-full">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openItem === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
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

function About() {
  return (
    <div className="font-inter w-full min-h-screen">
      <Navbar />
      <Hero />
      <FAQSection />
      <Mission />
      <AboutData />
      <TeamIntro />
      <Footer />
    </div>
  );
}
export default About;