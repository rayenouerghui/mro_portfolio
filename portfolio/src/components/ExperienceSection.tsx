import { useEffect, useRef, useState } from "react";
import { Briefcase, CheckCircle, Certificate, Trophy, CalendarBlank } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORK = [
  {
    id: "w1", title: "Partnership & Business Development", organization: "AIESEC in Tunisia",
    startDate: "2022", endDate: null,
    description: "Led international partnership development to support global internship and exchange opportunities for Tunisian youth.",
    highlights: [
      "Built and maintained strong relationships with international and local partners to expand global exchange opportunities",
      "Coordinated stakeholders across countries to deliver a high-quality customer experience throughout the exchange lifecycle",
      "Conducted market research and data analysis to evaluate program performance and identify growth opportunities",
      "Supported sales and business development by presenting AIESEC programs, negotiating partnerships, and contributing to lead generation",
    ],
  },
] as const;

const SKILL_CATS = [
  { label: "Cloud Platforms",            accent: "hsl(36,100%,52%)",  skills: [{ name: "AWS", pct: 75 }, { name: "OCI", pct: 85 }, { name: "Azure", pct: 60 }, { name: "Linux", pct: 88 }] },
  { label: "Infrastructure as Code",     accent: "hsl(270,60%,70%)",  skills: [{ name: "Terraform", pct: 78 }, { name: "Ansible", pct: 70 }, { name: "CloudFormation", pct: 65 }, { name: "Pulumi", pct: 55 }] },
  { label: "Containers & Orchestration", accent: "hsl(200,80%,55%)",  skills: [{ name: "Docker", pct: 88 }, { name: "Kubernetes", pct: 80 }, { name: "Helm", pct: 72 }, { name: "Podman", pct: 65 }] },
  { label: "CI/CD & Automation",         accent: "hsl(182,66%,54%)",  skills: [{ name: "GitHub Actions", pct: 85 }, { name: "Jenkins", pct: 75 }, { name: "GitLab CI", pct: 72 }, { name: "ArgoCD", pct: 68 }] },
  { label: "Monitoring & Observability", accent: "hsl(144,45%,48%)",  skills: [{ name: "Prometheus", pct: 75 }, { name: "Grafana", pct: 78 }, { name: "ELK Stack", pct: 68 }, { name: "Datadog", pct: 60 }] },
  { label: "Languages & Scripting",      accent: "hsl(216,97%,60%)",  skills: [{ name: "Python", pct: 82 }, { name: "Bash", pct: 88 }, { name: "PHP", pct: 75 }, { name: "JavaScript", pct: 70 }] },
];

const CERTS = [
  {
    title: "OCI Foundations Associate",
    org: "Oracle Cloud Infrastructure",
    accent: "hsl(14,100%,55%)",
    image: "/oracle-foundation-associate.png",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6567366FDCF5B2CDDDB16925A40E8994DB3CECE8B51AFCCAD2E0FE0F8552B5B9",
  },
  {
    title: "OCI Architect Associate",
    org: "Oracle Cloud Infrastructure",
    accent: "hsl(14,100%,55%)",
    image: "/oracle-architect-associate.png",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=94C5CE952D0006A2F54EC995C77D9839BA86B9A28EE1A6B3B7F75F5F34C1C3CD",
  },
  {
    title: "AWS Cloud Practitioner Quest",
    org: "Amazon Web Services (AWS)",
    accent: "hsl(36,100%,52%)",
    image: "/aws-cloud-practitioner-quest.png",
    url: "https://www.credly.com/badges/e25c2bf9-abe0-4217-b5b1-61883a7edbf9/public_url",
  },
];

const ACHIEVEMENTS = [
  { title: "OCI Certified (Foundations + Architect)", desc: "Dual Oracle Cloud Infrastructure certifications", accent: "hsl(14,100%,55%)" },
  { title: "AWS Cloud Practitioner",                  desc: "AWS Cloud Practitioner Quest badge via Credly",   accent: "hsl(36,100%,52%)" },
  { title: "AIESEC Global Exchange",                  desc: "2 years driving international partnerships",      accent: "hsl(216,97%,60%)" },
  { title: "NextGen Web Platform",                    desc: "Full-stack PHP MVC app with real-time tracking",  accent: "hsl(270,60%,70%)" },
];

/* ── Skill Bar ───────────────────────────────────────── */
function SkillBar({ name, pct, accent, index }: { name: string; pct: number; accent: string; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(barRef.current,
      { width: "0%" },
      {
        width: `${pct}%`, duration: 1.1, ease: "power3.out", delay: index * 0.08,
        scrollTrigger: { trigger: barRef.current, start: "top 90%" },
      }
    );
  }, [pct, index]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span className="font-mono text-xs text-gray-300">{name}</span>
        <span className="font-mono text-[10px] font-semibold" style={{ color: accent }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(210,12%,20%)" }}>
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}88 0%, ${accent} 100%)`,
            boxShadow: `0 0 8px ${accent}60`,
            width: 0,
          }}
        />
      </div>
    </div>
  );
}

/* ── Skill Category Card ─────────────────────────────── */
function SkillCategoryCard({ label, accent, skills }: { label: string; accent: string; skills: { name: string; pct: number }[] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative p-5 rounded-xl border overflow-hidden transition-all duration-300"
      style={{
        background: "hsl(210,18%,12%)",
        borderColor: hovered ? `${accent}40` : "hsl(210,12%,25%)",
        boxShadow: hovered ? `0 8px 32px ${accent}18` : "none",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-4 w-1 h-5 rounded-r-full" style={{ background: accent }} />
      <h4 className="font-serif font-semibold text-foreground text-sm mb-4 pl-2">{label}</h4>
      <div className="flex flex-col gap-3">
        {skills.map((s, i) => (
          <SkillBar key={s.name} name={s.name} pct={s.pct} accent={accent} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ── Timeline Node ───────────────────────────────────── */
function TimelineNode({ exp }: { exp: typeof WORK[0] }) {
  const [hovered, setHovered] = useState(false);
  const isCurrent = exp.endDate === null;

  return (
    <div
      className="timeline-node relative pl-14 opacity-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dot */}
      <div
        className="absolute left-3 top-5 w-4 h-4 rounded-full border-2"
        style={{
          borderColor: "hsl(210,22%,10%)",
          background: isCurrent ? "hsl(144,45%,48%)" : "hsl(216,97%,60%)",
          boxShadow: isCurrent ? "0 0 0 3px hsla(144,45%,48%,0.3)" : "none",
        }}
      />

      <div
        className="p-5 rounded-xl border transition-all duration-300"
        style={{
          background: "hsl(210,18%,12%)",
          borderColor: hovered ? "hsla(216,97%,60%,0.35)" : "hsl(210,12%,25%)",
          boxShadow: hovered ? "0 8px 32px hsla(216,97%,60%,0.12)" : "none",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="font-serif font-semibold text-foreground">{exp.title}</h4>
            <p className="font-sans text-sm" style={{ color: "hsl(216,97%,60%)" }}>{exp.organization}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono"
              style={{ background: "hsl(210,12%,18%)", border: "1px solid hsl(210,12%,22%)", color: "hsl(210,10%,55%)" }}
            >
              <CalendarBlank size={12} />
              {exp.startDate} — {exp.endDate ?? "Present"}
            </span>
            {isCurrent && (
              <span
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono"
                style={{ background: "hsla(144,45%,48%,0.1)", border: "1px solid hsla(144,45%,48%,0.4)", color: "hsl(144,45%,48%)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "hsl(144,45%,48%)" }} />
                Current
              </span>
            )}
          </div>
        </div>
        <p className="font-sans text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="flex flex-col gap-2">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(216,97%,60%)" }} />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── ExperienceSection ───────────────────────────────── */
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node, i) => {
        gsap.to(node, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: i * 0.1,
          scrollTrigger: { trigger: node, start: "top 87%" },
        });
        gsap.set(node, { y: 20 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 overflow-hidden"
      style={{ background: "hsl(210,22%,10%)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 90% 10%, hsla(270,60%,70%,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 30% at 10% 80%, hsla(182,66%,54%,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Badge + heading */}
        <div className="flex flex-col items-center mb-16 gap-4">
          <span className="px-4 py-1.5 rounded-full border text-xs font-mono"
            style={{ borderColor: "hsla(270,60%,70%,0.4)", background: "hsla(270,60%,70%,0.1)", color: "hsl(270,60%,70%)" }}>
            My Journey
          </span>
          <h2 className="font-serif font-bold text-center" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em" }}>
            Experience &amp; <span className="gradient-text">Skills</span>
          </h2>
        </div>

        {/* Professional Experience */}
        <div className="mb-16">
          <SubHeader icon={Briefcase} label="Professional Experience" accent="hsl(216,97%,60%)" />
          <div className="relative mt-8">
            <div className="absolute left-5 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, hsla(216,97%,60%,0.44), hsla(182,66%,54%,0.44), transparent)" }} />
            <div className="flex flex-col gap-6">
              {WORK.map((exp) => <TimelineNode key={exp.id} exp={exp} />)}
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mb-16">
          <SubHeader icon={CheckCircle} label="Technical Skills" accent="hsl(182,66%,54%)" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
            {SKILL_CATS.map((cat) => (
              <SkillCategoryCard key={cat.label} {...cat} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <SubHeader icon={Certificate} label="Certifications" accent="hsl(182,66%,54%)" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {CERTS.map((c) => (
              <a
                key={c.title}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-4 p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 block"
                style={{
                  background: "hsl(210,18%,12%)",
                  borderColor: `${c.accent}30`,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${c.accent}60`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${c.accent}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${c.accent}30`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Badge image */}
                <div
                  className="w-42 h-42 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `${c.accent}10`, border: `1px solid ${c.accent}25` }}
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                {/* Text */}
                <div className="text-center">
                  <h4 className="font-serif font-semibold text-foreground text-sm leading-snug">{c.title}</h4>
                  <p className="font-sans text-xs text-gray-500 mt-1">{c.org}</p>
                </div>
                {/* CTA */}
                <span
                  className="mt-auto px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all"
                  style={{ background: `${c.accent}15`, border: `1px solid ${c.accent}40`, color: c.accent }}
                >
                  View Credential →
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function SubHeader({ icon: Icon, label, accent }: { icon: React.ElementType; label: string; accent: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}18` }}>
        <Icon size={18} style={{ color: accent }} />
      </div>
      <h3 className="font-serif font-semibold text-foreground text-lg">{label}</h3>
    </div>
  );
}

import React from "react";
