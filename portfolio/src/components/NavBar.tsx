import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Home",       href: "home" },
  { label: "About",      href: "about" },
  { label: "Projects",   href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Contact",    href: "contact" },
];

export default function NavBar() {
  const [visible, setVisible]   = useState(true);
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const show = y < lastY.current || y < 50;
      setVisible(show);
      if (!show) setMenuOpen(false);
      lastY.current = y;

      const ids = ["home", "about", "projects", "experience", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 100) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 glass-nav border-b border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="font-serif font-bold text-lg">
          <span className="gradient-text">Med Rayen</span>
          <span className="text-gray-300"> Ouerghui</span>
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className={`px-4 py-2 rounded-md font-sans text-sm transition-all ${
                  active === href
                    ? "text-tertiary bg-gray-800"
                    : "text-gray-300 hover:text-foreground hover:bg-gray-800"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-foreground"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-1"
          style={{ background: "hsla(210,29%,8%,0.97)", backdropFilter: "blur(16px)" }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`text-left px-4 py-2.5 rounded-md font-sans text-sm transition-all ${
                active === href ? "text-tertiary bg-gray-800" : "text-gray-300 hover:text-foreground hover:bg-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
