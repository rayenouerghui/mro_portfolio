import { useEffect, useRef } from "react";
import {
  Cloud, Cube, Terminal, Robot,
  GraduationCap, MapPin, Code, DownloadSimple,
  Rocket,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTO_URL = `${import.meta.env.BASE_URL}pic 2.png`;

const INFO_PILLS = [
  { icon: GraduationCap, label: "ESPRIT University",       accent: "hsl(216,97%,60%)" },
  { icon: MapPin,        label: "Tunis, Tunisia",           accent: "hsl(182,66%,54%)" },
  { icon: Cloud,         label: "AWS · OCI · Azure",        accent: "hsl(36,100%,52%)" },
  { icon: Code,          label: "Open Source Contributor",  accent: "hsl(270,60%,70%)" },
];

const HIGHLIGHT_CARDS = [
  { icon: Cloud,    title: "Cloud Architecture",  desc: "Designing resilient multi-cloud systems on AWS, GCP & Azure",          accent: "hsl(216,97%,60%)" },
  { icon: Cube,     title: "Containers & K8s",    desc: "Production-grade orchestration with Kubernetes, Helm & service meshes", accent: "hsl(182,66%,54%)" },
  { icon: Terminal, title: "CI/CD & GitOps",      desc: "Automated delivery pipelines with GitHub Actions, ArgoCD & Jenkins",   accent: "hsl(270,60%,70%)" },
  { icon: Robot,    title: "AI Infrastructure",   desc: "Scalable GPU clusters and MLOps pipelines for AI workloads",           accent: "hsl(36,100%,52%)" },
];

const STAT_CARDS = [
  { value: "3+",  label: "Years Exp",       accent: "hsl(182,66%,54%)", icon: Rocket },
  { value: "15+", label: "Projects",        accent: "hsl(216,97%,60%)", icon: Code },
  { value: "5+",  label: "Certs",           accent: "hsl(270,60%,70%)", icon: GraduationCap },
  { value: "3",   label: "Cloud Platforms", accent: "hsl(36,100%,52%)", icon: Cloud },
];

export default function AboutSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const photoRef    = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  /* GSAP ScrollTrigger */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([photoRef.current, contentRef.current], {
        opacity: 0, x: (i) => (i === 0 ? -50 : 50), duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 88%" },
        });
      }
      if (statsRef.current) {
        gsap.from(Array.from(statsRef.current.children), {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* 3D tilt — softer */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const section = sectionRef.current!;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 22;
      const dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
      card.style.transform = `perspective(900px) rotateY(${dx * 0.35}deg) rotateX(${-dy * 0.25}deg) translateZ(4px)`;
    };
    const onLeave = () => { card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)"; };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => { section.removeEventListener("mousemove", onMove); section.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-24 pb-0 overflow-hidden"
      style={{ background: "hsl(210,22%,10%)" }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute" style={{ background: "radial-gradient(ellipse 60% 40% at 10% 50%, hsla(182,66%,54%,0.06) 0%, transparent 70%)", inset: 0 }} />
        <div className="absolute" style={{ background: "radial-gradient(ellipse 50% 40% at 90% 20%, hsla(216,97%,60%,0.06) 0%, transparent 70%)", inset: 0 }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: `linear-gradient(hsla(182,66%,54%,1) 1px, transparent 1px), linear-gradient(90deg, hsla(182,66%,54%,1) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Badge */}
        <div className="flex justify-center mb-14">
          <span
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono"
            style={{ borderColor: "hsla(182,66%,54%,0.4)", background: "hsla(182,66%,54%,0.1)", color: "hsl(182,66%,54%)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "hsl(182,66%,54%)" }} />
            About Me
          </span>
        </div>

        {/* Two-column */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          {/* Photo */}
          <div ref={photoRef} className="flex justify-center">
            <div className="relative" style={{ width: "clamp(260px,30vw,340px)" }}>
              {/* Glow behind */}
              <div className="absolute -z-10 blur-3xl rounded-full"
                style={{ width: "80%", height: "50%", top: "30%", left: "10%", background: "hsla(182,66%,54%,0.12)" }} />
              <div
                ref={cardRef}
                className="relative rounded-3xl overflow-hidden transition-transform duration-100"
                style={{ boxShadow: "0 0 0 1px hsla(182,66%,54%,0.15), 0 32px 80px rgba(0,0,0,0.5), 0 0 60px hsla(182,66%,54%,0.08)" }}
              >
                <div className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, hsla(182,66%,54%,0.12) 0%, transparent 50%, hsla(216,97%,60%,0.08) 100%)" }} />
                <img
                  src={PHOTO_URL}
                  alt="Med Rayen Ouerghui"
                  className="w-full object-cover block"
                  style={{ aspectRatio: "3/4", filter: "contrast(1.05) brightness(1.02)", objectPosition: "45% top" }}
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4"
                  style={{ background: "linear-gradient(to top, rgba(10,18,28,0.95) 0%, rgba(10,18,28,0.6) 60%, transparent 100%)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin size={12} style={{ color: "hsl(182,66%,54%)" }} />
                    <span className="font-sans text-gray-400 text-xs">Tunisia</span>
                  </div>
                  <p className="font-serif font-semibold text-foreground text-sm">Med Rayen Ouerghui</p>
                  <p className="font-mono text-xs mt-1" style={{ color: "hsl(182,66%,54%)" }}>$ terraform apply --auto-approve</p>                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em" }}>
              Building Infrastructure{" "}
              <span className="gradient-text">That Scales</span>
            </h2>
            <p className="font-sans text-gray-400 leading-relaxed">
              I'm a DevOps Engineer focused on building reliable, automated, and scalable systems.
              I enjoy improving developer experience through CI/CD, infrastructure automation,
              and clear operational processes.
            </p>
            <p className="font-sans text-gray-400 leading-relaxed">
              I have hands-on experience with cloud platforms including AWS and Oracle Cloud
              Infrastructure, container orchestration with Kubernetes and Docker, and building
              end-to-end automation pipelines. I'm passionate about bridging the gap between
              development and operations.
            </p>

            {/* Info pills */}
            <div className="flex flex-wrap gap-2">
              {INFO_PILLS.map(({ icon: Icon, label, accent }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-sans"
                  style={{ borderColor: `${accent}44`, background: `${accent}10`, color: accent }}
                >
                  <Icon size={13} />
                  {label}
                </span>
              ))}
            </div>

            {/* Download CV */}
            <a
              href="https://drive.google.com/file/d/1k6dg0a04os0ZSehoDUnumNClwU7L20aH/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-glow-teal inline-flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-semibold text-sm w-fit"
              style={{ background: "linear-gradient(135deg, hsl(182,66%,38%) 0%, hsl(182,66%,50%) 100%)", color: "hsl(210,29%,8%)" }}
            >
              <DownloadSimple size={18} weight="bold" />
              Download Resume (CV)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function HighlightCard({
  icon: Icon, title, desc, accent,
}: { icon: React.ElementType; title: string; desc: string; accent: string }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="relative p-5 rounded-xl border overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background: hovered ? `linear-gradient(135deg, ${accent}0f 0%, hsl(210,18%,12%) 100%)` : "hsl(210,18%,12%)",
        borderColor: hovered ? `${accent}55` : "hsl(210,12%,25%)",
        boxShadow: hovered ? `0 8px 32px ${accent}22` : "none",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={24} className="mb-3" style={{ color: accent }} />
      <h3 className="font-serif font-semibold text-foreground text-sm mb-1">{title}</h3>
      <p className="font-sans text-gray-400 text-xs leading-relaxed">{desc}</p>
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
        style={{ background: hovered ? `${accent}40` : "transparent" }}
      />
    </div>
  );
}

import React from "react";
