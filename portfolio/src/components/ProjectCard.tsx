import { useNavigate } from "react-router-dom";
import { ArrowSquareOut, GithubLogo, ArrowRight } from "@phosphor-icons/react";
import type { Project } from "../types";

const CATEGORY_COLOR: Record<string, string> = {
  AI: "hsl(270,60%,70%)",
  Cloud: "hsl(182,66%,54%)",
  DevOps: "hsl(216,97%,60%)",
  Automation: "hsl(36,100%,52%)",
  "Open Source": "hsl(144,45%,48%)",
};

const CATEGORY_GRADIENT: Record<string, string> = {
  AI: "linear-gradient(135deg, hsla(270,60%,20%,1) 0%, hsla(270,60%,12%,1) 100%)",
  Cloud: "linear-gradient(135deg, hsla(182,66%,18%,1) 0%, hsla(182,66%,10%,1) 100%)",
  DevOps: "linear-gradient(135deg, hsla(216,97%,18%,1) 0%, hsla(216,97%,10%,1) 100%)",
  Automation: "linear-gradient(135deg, hsla(36,100%,18%,1) 0%, hsla(36,100%,10%,1) 100%)",
  "Open Source": "linear-gradient(135deg, hsla(144,45%,16%,1) 0%, hsla(144,45%,10%,1) 100%)",
};

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const allTechs = project.technologies.split(",").map((t) => t.trim()).filter(Boolean);
  const visibleTechs = allTechs.slice(0, 4);
  const extraCount = allTechs.length - 4;
  const accent = CATEGORY_COLOR[project.category] ?? "hsl(182,66%,54%)";
  const gradient = CATEGORY_GRADIENT[project.category] ?? CATEGORY_GRADIENT["Open Source"];

  return (
    <div
      className="group flex flex-col rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ background: "hsl(210,18%,12%)", borderColor: "hsl(210,12%,22%)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}55`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${accent}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(210,12%,22%)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        {project.thumbnailUrl ? (
          <>
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(10,15,22,0.7) 100%)" }}
            />
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: gradient }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-serif font-bold"
              style={{ background: `${accent}22`, color: accent }}
            >
              {project.title.charAt(0)}
            </div>
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: `${accent}99` }}>
              {project.category}
            </span>
          </div>
        )}
        <span
          className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55`, color: accent }}
        >
          {project.category}
        </span>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
          style={{ background: "rgba(10,15,22,0.78)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans font-semibold transition-all hover:scale-105"
              style={{ background: accent, color: "hsl(210,29%,8%)" }}
            >
              <ArrowSquareOut size={13} weight="bold" />
              {project.liveDemoUrl.includes("drive.google") ? "Watch Demo" : "Live Demo"}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans font-medium border transition-all hover:scale-105"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "hsl(210,17%,90%)", background: "rgba(255,255,255,0.08)" }}
            >
              <GithubLogo size={13} />
              Repo
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="font-serif font-semibold text-foreground leading-snug">{project.title}</h3>
        <p className="font-sans text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {visibleTechs.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded border font-mono text-xs"
              style={{ borderColor: "hsl(210,12%,22%)", background: "hsl(210,18%,15%)", color: accent }}
            >
              {t}
            </span>
          ))}
          {extraCount > 0 && (
            <span
              className="px-2 py-0.5 rounded border font-mono text-xs text-gray-500"
              style={{ borderColor: "hsl(210,12%,22%)", background: "hsl(210,18%,15%)" }}
            >
              +{extraCount} more
            </span>
          )}
        </div>
        <div className="h-px" style={{ background: "hsl(210,12%,20%)" }} />
        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="flex items-center gap-1.5 text-sm font-sans font-medium w-fit transition-all group/btn"
          style={{ color: accent }}
        >
          More Details
          <ArrowRight size={14} weight="bold" className="transition-transform duration-200 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
