import { useEffect, useRef, useState } from "react";
import {
  GithubLogo, LinkedinLogo, ArrowDown,
  Terminal, Cloud, GitBranch, Cpu,
} from "@phosphor-icons/react";
import gsap from "gsap";

const PHOTO_URL = "https://c.animaapp.com/mn4m7hcrbcqcdh/img/uploaded-asset-1774359536626-0.png";

const ROLES = [
  "DevOps Engineer",
  "Cloud Engineer",
  "Infrastructure Builder",
  "Automation Engineer",
  "CI/CD Specialist",
];

const TECH_CHIPS = [
  { label: "AWS",        color: "hsl(36,100%,52%)" },
  { label: "OCI",        color: "hsl(14,100%,55%)" },
  { label: "Docker",     color: "hsl(200,75%,60%)" },
  { label: "Kubernetes", color: "hsl(200,80%,55%)" },
  { label: "CI/CD",      color: "hsl(182,66%,54%)" },
  { label: "Python",     color: "hsl(216,97%,60%)" },
  { label: "Terraform",  color: "hsl(270,60%,70%)" },
  { label: "Linux",      color: "hsl(36,80%,55%)" },
];

const STATS = [
  { value: "1+",  label: "Years Exp",  accent: "hsl(182,66%,54%)" },
  { value: "5+", label: "Projects",   accent: "hsl(216,97%,60%)" },
  { value: "3+",  label: "Certs",      accent: "hsl(270,60%,70%)" },
  { value: "∞",   label: "Coffee ☕",  accent: "hsl(36,100%,52%)" },
];

const BADGES = [
  {
    icon: Terminal, label: "Last Deploy",     value: "2 min ago ✓",
    accent: "hsl(144,45%,48%)",
    style: { top: "12%", left: "-18%" }, delay: "0s",
  },
  {
    icon: Cloud, label: "Infrastructure",  value: "99.9% Uptime",
    accent: "hsl(216,97%,60%)",
    style: { top: "8%", right: "-14%" }, delay: "1.2s",
  },
  {
    icon: GitBranch, label: "Pipeline Status", value: "All Green ✅",
    accent: "hsl(182,66%,54%)",
    style: { bottom: "22%", left: "-14%" }, delay: "0.6s",
  },
  {
    icon: Cpu, label: "AI Workloads",    value: "GPU Cluster ⚡",
    accent: "hsl(270,60%,70%)",
    style: { bottom: "10%", right: "-12%" }, delay: "1.8s",
  },
];

/* ── Particle Canvas ─────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const mouse = { x: -999, y: -999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "hsla(182,66%,54%,",
      "hsla(216,97%,60%,",
      "hsla(270,60%,70%,",
    ];

    const particles = Array.from({ length: 55 }, (_, i) => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.56,
      vy: (Math.random() - 0.5) * 0.56,
      r:  0.8 + Math.random() * 1.8,
      color: COLORS[i % COLORS.length],
    }));

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = ((120 - dist) / 120) * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.995; p.vy *= 0.995;
        p.x  += p.vx;  p.y  += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "0.65)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(182,66%,54%,${(1 - d / 120) * 0.18})`;
            ctx.lineWidth   = 0.7;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ── Typed Role ──────────────────────────────────────── */
function TypedRole() {
  const [text, setText]       = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < role.length) {
      t = setTimeout(() => setText(role.slice(0, text.length + 1)), 65);
    } else if (!deleting && text.length === role.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);

  return (
    <span className="font-mono" style={{ color: "hsl(182,66%,54%)", fontSize: "clamp(1rem,2.2vw,1.35rem)" }}>
      {text}
      <span
        className="inline-block w-0.5 h-7 rounded-full animate-blink ml-0.5 align-middle"
        style={{ background: "hsl(182,66%,54%)" }}
      />
    </span>
  );
}

/* ── Floating Badge ──────────────────────────────────── */
function FloatingBadge({
  icon: Icon, label, value, accent, style, delay, badgeRef,
}: {
  icon: React.ElementType; label: string; value: string;
  accent: string; style: React.CSSProperties; delay: string;
  badgeRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={badgeRef}
      className="float-anim absolute px-3 py-2 rounded-xl text-xs font-mono"
      style={{
        ...style,
        animationDelay: delay,
        background: "linear-gradient(135deg, hsla(210,29%,12%,0.92) 0%, hsla(210,18%,10%,0.88) 100%)",
        border: `1px solid ${accent}44`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 16px ${accent}18`,
        backdropFilter: "blur(12px)",
        minWidth: 140,
      }}
    >
      <div className="flex items-center gap-1.5 mb-0.5" style={{ color: accent }}>
        <Icon size={12} weight="bold" />
        <span style={{ color: "hsl(210,10%,60%)", fontSize: 10 }}>{label}</span>
      </div>
      <div className="font-semibold" style={{ color: "hsl(210,17%,92%)", fontSize: 11 }}>{value}</div>
    </div>
  );
}

/* ── HeroSection ─────────────────────────────────────── */
export default function HeroSection() {
  const leftRef   = useRef<HTMLDivElement>(null);
  const photoRef  = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const chipsRef  = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* GSAP entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(leftRef.current,  { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1 })
      .fromTo(photoRef.current, { opacity: 0, x: 60, scale: 0.92 }, { opacity: 1, x: 0, scale: 1, duration: 1 }, "-=0.7")
      .fromTo(badgeRefs.current[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(badgeRefs.current[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(badgeRefs.current[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(badgeRefs.current[3], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(chipsRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
      .fromTo(statsRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(scrollRef.current, { opacity: 0 },         { opacity: 1, duration: 0.5 },       "-=0.2");
  }, []);

  /* 3D tilt */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 22;
      const dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
      card.style.transform = `perspective(900px) rotateY(${dx * 0.45}deg) rotateX(${-dy * 0.35}deg) translateZ(8px)`;
    };
    const onLeave = () => { card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)"; };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "hsl(210,29%,8%)" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 70% 50%, hsla(182,66%,54%,0.10) 0%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 20% 30%, hsla(216,97%,60%,0.12) 0%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 80% 80%, hsla(270,60%,70%,0.08) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(hsla(182,66%,54%,1) 1px, transparent 1px), linear-gradient(90deg, hsla(182,66%,54%,1) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }} />
        <ParticleCanvas />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, hsl(210,29%,8%), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2 gap-16 items-center py-20">
        {/* ── Left column ── */}
        <div ref={leftRef} className="flex flex-col gap-6 max-w-xl">
          {/* Status pills */}
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono"
              style={{ borderColor: "hsl(144,45%,48%)", background: "hsla(144,45%,48%,0.1)", color: "hsl(144,45%,48%)" }}>
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "hsl(144,45%,48%)" }} />
              Open to Opportunities
            </span>
            
          </div>

          {/* Name */}
          <div>
            <h1
              className="font-serif font-bold leading-tight"
              style={{ fontSize: "clamp(2rem,4vw,3.4rem)", letterSpacing: "-0.02em", color: "hsl(210,17%,98%)" }}
            >
              Mohamed Rayen
            </h1>
            <h1
              className="font-serif font-bold leading-tight"
              style={{ fontSize: "clamp(2rem,4vw,3.4rem)", letterSpacing: "-0.02em", color: "hsl(182,66%,54%)" }}
            >
              Ouerghui
            </h1>
          </div>

          {/* Typed role */}
          <div className="h-9 flex items-center">
            <TypedRole />
          </div>

          {/* Description */}
          <p className="font-sans text-gray-400 leading-relaxed">
            I focus on{" "}
            <span style={{ color: "hsl(182,66%,54%)" }} className="font-medium">CI/CD pipelines</span>{" "}
            and{" "}
            <span style={{ color: "hsl(216,97%,60%)" }} className="font-medium">infrastructure automation</span>{" "}
            to improve delivery speed and operational reliability.{" "}
            <span style={{ color: "hsl(270,60%,70%)" }} className="font-medium">Let's build something amazing together.</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="btn-glow-teal px-6 py-3 rounded-lg font-sans font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, hsl(182,66%,38%) 0%, hsl(182,66%,50%) 100%)", color: "hsl(210,29%,8%)" }}
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-glow-blue px-6 py-3 rounded-lg font-sans font-semibold text-sm border"
              style={{ borderColor: "hsl(216,97%,60%)", color: "hsl(216,97%,60%)", background: "transparent" }}
            >
              Hire Me
            </button>
            <a href="https://github.com/rayenouerghui" target="_blank" rel="noreferrer" aria-label="GitHub"
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:text-foreground hover:border-tertiary transition-colors">
              <GithubLogo size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mohamed-rayen-ouerghui-45354a339/?locale=fr" target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:text-foreground hover:border-blue transition-colors">
              <LinkedinLogo size={20} />
            </a>
          </div>

          {/* Tech chips */}
          <div ref={chipsRef}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-600 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {TECH_CHIPS.map(({ label, color }) => (
                <span
                  key={label}
                  className="px-3 py-1 rounded-full border text-xs font-mono transition-all hover:-translate-y-0.5 cursor-default"
                  style={{ borderColor: `${color}44`, color, background: `${color}10` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex flex-wrap gap-0 pt-4"
            style={{ borderTop: "1px solid hsl(210,12%,20%)" }}
          >
            {STATS.map(({ value, label, accent }, i) => (
              <div key={label} className="flex items-center">
                <div className="px-5 text-center">
                  <div className="font-serif text-2xl font-bold" style={{ color: accent }}>{value}</div>
                  <div className="font-sans text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
                {i < STATS.length - 1 && (
                  <div className="w-px h-10" style={{ background: "hsl(210,12%,22%)" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column — photo ── */}
        <div ref={photoRef} className="flex justify-center">
          <div className="relative" style={{ maxWidth: "min(420px, 100%)" }}>
            {/* Decorative glow behind */}
            <div
              className="absolute -z-10 blur-3xl rounded-full"
              style={{
                width: "70%", height: "50%",
                top: "25%", left: "15%",
                background: "hsla(182,66%,54%,0.15)",
              }}
            />

            {/* Card */}
            <div
              ref={cardRef}
              className="relative rounded-3xl overflow-hidden transition-transform duration-100"
              style={{
                boxShadow: "0 0 0 1px hsla(182,66%,54%,0.15), 0 32px 80px rgba(0,0,0,0.5), 0 0 60px hsla(182,66%,54%,0.08)",
              }}
            >
              {/* Gradient overlay top */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: "linear-gradient(135deg, hsla(182,66%,54%,0.12) 0%, transparent 50%, hsla(216,97%,60%,0.08) 100%)" }}
              />

              <img
                src={PHOTO_URL}
                alt="Med Rayen Ouerghui"
                className="w-full object-cover block"
                style={{ aspectRatio: "3/4", filter: "contrast(1.05) brightness(1.02)", objectPosition: "45% top" }}
              />

              {/* Bottom overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 p-5"
                style={{ background: "linear-gradient(to top, rgba(10,18,28,0.95) 0%, rgba(10,18,28,0.6) 60%, transparent 100%)" }}
              >
                <p className="font-serif font-semibold text-foreground text-sm">Med Rayen Ouerghui</p>
                <p className="font-sans text-gray-400 text-xs">Cloud &amp; DevOps Engineer</p>
                <p className="font-mono text-xs mt-1" style={{ color: "hsl(182,66%,54%)" }}>
                  $ kubectl get pods --all-namespaces
                </p>              </div>
            </div>

            {/* Floating badges */}
            {BADGES.map((b, i) => (
              <FloatingBadge
                key={b.label}
                {...b}
                badgeRef={(el) => { badgeRefs.current[i] = el; }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">Scroll</span>
        <div className="w-px h-5" style={{ background: "linear-gradient(to bottom, hsl(182,66%,54%), transparent)" }} />
        <ArrowDown size={14} className="animate-bounce-slow text-gray-600" />
      </div>
    </section>
  );
}
