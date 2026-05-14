import { useState } from 'react';
import Navbar from './Navbar';


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

  return (
    <div className="w-full">
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
    </div>
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
          <p className="text-left mt-3" style={{ color: "var(--ink-soft)", fontSize: "15px", fontFamily: "var(--font-sans)" }}>Chris Moy</p>
          <a href="mailto:cjmoy2004@gmail.com" className="text-left text-black hover:text-gray-600" style={{ fontSize: "15px", fontFamily: "var(--font-sans)" }}>
            cjmoy2004@gmail.com
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
      <Footer />
    </div>
  );
}
export default About;