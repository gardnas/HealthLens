import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/map", label: "Map" },
  { path: "/about", label: "Primer" },
  { path: "/data-sources", label: "Methodology" },
  { path: "/resources", label: "Find Screening" },
  { path: "/About", label: "About" },
  { path: "/faq", label: "FAQs" },
];

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-10">

        {/* Desktop */}
        <div className="hidden md:flex items-center h-[72px]">
          <Link
            to="/"
            className="mr-10 no-underline"
            style={{ color: "var(--ink)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Health4All
            </span>
          </Link>

          <div className="flex items-center gap-7 ml-auto">
            {navItems.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className="no-underline transition-colors"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: active ? "var(--ink)" : "var(--ink-soft)",
                    borderBottom: active
                      ? "2px solid var(--brand)"
                      : "2px solid transparent",
                    paddingBlock: "24px",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile header row */}
        <div className="md:hidden flex items-center justify-between h-[64px]">
          <Link
            to="/"
            className="no-underline"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--ink)",
            }}
          >
            Health4All
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: "var(--ink)" }}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="md:hidden pb-4"
            style={{ borderTop: "1px solid var(--rule)" }}
          >
            <div className="flex flex-col pt-3">
              {navItems.map(({ path, label }) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 no-underline"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: active ? "var(--ink)" : "var(--ink-soft)",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
