import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowSquareOut, GithubLogo, Play } from "@phosphor-icons/react";
import NavBar from "../components/NavBar";
import { PROJECTS } from "../data/projects";
import type { ProjectLanguage } from "../types";

const CATEGORY_COLOR: Record<string, string> = {
  AI: "hsl(270,60%,70%)",
  Cloud: "hsl(182,66%,54%)",
  DevOps: "hsl(216,97%,60%)",
  Automation: "hsl(36,100%,52%)",
  "Open Source": "hsl(144,45%,48%)",
};

function LangBar({ lang, index }: { lang: ProjectLanguage; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!barRef.current) return;
    const el = barRef.current;
    el.style.width = "0%";
    const timeout = setTimeout(() => { el.style.width = `${lang.percentage}%`; }, 150 + index * 80);
    return () => clearTimeout(timeout);
  }, [lang.percentage, index]);

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${lang.color}18`, border: `1px solid ${lang.color}30` }}
      >
        <i className={`devicon-${lang.icon}-plain colored`} style={{ fontSize: 16 }} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="font-mono text-xs text-gray-300">{lang.name}</span>
          <span className="font-mono text-xs font-semibold" style={{ color: lang.color }}>{lang.percentage}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(210,12%,20%)" }}>
          <div
            ref={barRef}
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              background: `linear-gradient(90deg, ${lang.color}88 0%, ${lang.color} 100%)`,
              boxShadow: `0 0 8px ${lang.color}60`,
              width: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <NavBar />
        <p className="font-sans text-gray-400">Project not found.</p>
        <button
          onClick={() => navigate("/")}
          className="text-tertiary font-sans hover:underline"
        >
          ← Back to home
        </button>
      </div>
    );
  }

  const accent = CATEGORY_COLOR[project.category] ?? "hsl(182,66%,54%)";
  const isVideoDemo = project.liveDemoUrl?.includes("drive.google");

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="max-w-4xl mx-auto px-8 pt-28 pb-20">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 font-sans text-sm mb-10 transition-colors"
          style={{ color: "hsl(210,10%,55%)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = accent)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(210,10%,55%)")}
        >
          <ArrowLeft size={16} /> Back to projects
        </button>

        {/* Category + title */}
        <div className="mb-6">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold mb-4"
            style={{ background: `${accent}18`, border: `1px solid ${accent}44`, color: accent }}
          >
            {project.category}
          </span>
          <h1
            className="font-serif font-bold text-foreground"
            style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.025em", lineHeight: 1.2 }}
          >
            {project.title}
          </h1>
        </div>

        {/* Description */}
        <p className="font-sans text-gray-400 text-lg leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans text-sm font-semibold transition-all hover:scale-105"
              style={{ background: accent, color: "hsl(210,29%,8%)" }}
            >
              {isVideoDemo ? <Play size={16} weight="fill" /> : <ArrowSquareOut size={16} />}
              {isVideoDemo ? "Watch Demo" : "Live Demo"}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border font-sans text-sm font-medium transition-all hover:scale-105"
              style={{ borderColor: `${accent}44`, color: "hsl(210,17%,90%)", background: "hsl(210,18%,15%)" }}
            >
              <GithubLogo size={16} /> View on GitHub
            </a>
          )}
        </div>

        {/* Thumbnail */}
        {project.thumbnailUrl && (
          <div className="rounded-xl overflow-hidden border mb-10" style={{ borderColor: `${accent}30` }}>
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full object-cover"
              style={{ maxHeight: 400 }}
            />
          </div>
        )}

        {/* Tech Stack with language bars */}
        {project.languages && project.languages.length > 0 && (
          <div className="mb-10 p-6 rounded-xl border" style={{ background: "hsl(210,18%,12%)", borderColor: `${accent}20` }}>
            <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: accent }}>Tech Stack</p>
            <div className="flex flex-col gap-4">
              {project.languages.map((lang, i) => (
                <LangBar key={lang.name} lang={lang} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: "hsl(210,12%,20%)" }} />

        {/* Detailed content — markdown-like renderer */}
        <div className="space-y-1">
          {project.detailedContent.split("\n").map((line, i) => {
            if (line.startsWith("## "))
              return (
                <h2
                  key={i}
                  className="font-serif font-bold text-foreground mt-10 mb-4"
                  style={{ fontSize: "1.4rem" }}
                >
                  {line.replace("## ", "")}
                </h2>
              );
            if (line.startsWith("- "))
              return (
                <div key={i} className="flex items-start gap-2.5 py-0.5">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: accent }}
                  />
                  <span className="font-sans text-gray-300 text-sm leading-relaxed">
                    {line.replace("- ", "")}
                  </span>
                </div>
              );
            if (!line.trim()) return <div key={i} className="h-3" />;
            return (
              <p key={i} className="font-sans text-gray-400 text-sm leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
