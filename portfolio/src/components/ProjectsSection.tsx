import { useEffect, useRef, useState } from "react";
import { MagnifyingGlass, X, FunnelSimple } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// Categories derived from actual project data + "All"
const CATEGORIES = ["All", "AI", "Automation", "Open Source"] as const;

export default function ProjectsSection() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const q = query.toLowerCase();
  const filtered = PROJECTS.filter((p) => {
    const matchCat = activeFilter === "All" || p.category === activeFilter;
    const matchSearch =
      !q ||
      [p.title, p.description, p.technologies, p.category].some((s) =>
        s.toLowerCase().includes(q)
      );
    return matchCat && matchSearch;
  });

  // Re-animate grid whenever filter or search changes
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".project-card-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeFilter, query]);

  // Section entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative pt-16 pb-24 overflow-hidden"
      style={{ background: "hsl(210,29%,8%)" }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 20%, hsla(216,97%,60%,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 30% at 20% 80%, hsla(270,60%,70%,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsla(182,66%,54%,1) 1px, transparent 1px), linear-gradient(90deg, hsla(182,66%,54%,1) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Badge + heading */}
        <div className="flex flex-col items-center mb-12 gap-4">
          <span
            className="px-4 py-1.5 rounded-full border text-xs font-mono"
            style={{
              borderColor: "hsla(216,97%,60%,0.4)",
              background: "hsla(216,97%,60%,0.1)",
              color: "hsl(216,97%,60%)",
            }}
          >
            Featured Work
          </span>
          <h2
            className="font-serif font-bold text-center"
            style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em" }}
          >
            Projects &amp; <span className="gradient-text">Builds</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm text-center max-w-xl">
            A selection of projects spanning web platforms, game development, and embedded systems.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-4">
          <div
            className="relative flex items-center rounded-xl border transition-all"
            style={{ background: "hsl(210,18%,12%)", borderColor: "hsl(210,12%,22%)" }}
          >
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, tech, or category..."
              className="w-full pl-10 pr-10 py-3 bg-transparent font-sans text-sm text-foreground placeholder:text-gray-500 focus:outline-none"
              onFocus={(e) => {
                const wrap = e.currentTarget.parentElement as HTMLElement;
                wrap.style.borderColor = "hsl(182,66%,44%)";
                wrap.style.boxShadow = "0 0 0 3px hsla(182,66%,54%,0.12)";
              }}
              onBlur={(e) => {
                const wrap = e.currentTarget.parentElement as HTMLElement;
                wrap.style.borderColor = "hsl(210,12%,22%)";
                wrap.style.boxShadow = "none";
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-foreground transition-colors"
                style={{ background: "hsl(210,12%,28%)" }}
                aria-label="Clear search"
              >
                <X size={11} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="max-w-2xl mx-auto mb-3 sm:hidden">
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-400 text-sm font-sans"
          >
            <FunnelSimple size={14} /> Filters
          </button>
        </div>

        {/* Category filter pills */}
        <div
          className={`max-w-2xl mx-auto mb-8 flex-wrap gap-2 ${
            showFilters ? "flex" : "hidden sm:flex"
          }`}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-1.5 rounded-full border text-sm font-sans transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: "hsla(182,66%,54%,0.15)",
                        borderColor: "hsl(182,66%,44%)",
                        color: "hsl(182,66%,62%)",
                        boxShadow: "0 0 12px hsla(182,66%,54%,0.2)",
                        transform: "translateY(-1px)",
                      }
                    : {
                        background: "hsl(210,18%,12%)",
                        borderColor: "hsl(210,12%,22%)",
                        color: "hsl(210,10%,58%)",
                      }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Result count when searching */}
        {query && (
          <p className="font-mono text-xs text-gray-600 mb-4 max-w-2xl mx-auto">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
            <span style={{ color: "hsl(182,66%,50%)" }}>&quot;{query}&quot;</span>
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p) => (
              <div key={p.id} className="project-card-item">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-gray-500">
            <MagnifyingGlass size={48} className="opacity-30" />
            <p className="font-sans text-sm">No projects match your search.</p>
            <button
              onClick={() => {
                setQuery("");
                setActiveFilter("All");
              }}
              className="px-4 py-2 rounded-lg border border-gray-700 text-sm font-sans hover:border-tertiary hover:text-tertiary transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
