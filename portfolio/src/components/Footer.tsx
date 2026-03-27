import { useState } from "react";
import { LinkedinLogo, GithubLogo, EnvelopeSimple } from "@phosphor-icons/react";

const SOCIALS = [
  { icon: LinkedinLogo, label: "LinkedIn", href: "https://linkedin.com", hoverColor: "hsl(216,97%,60%)", hoverBorder: "hsl(216,97%,60%)" },
  { icon: GithubLogo,   label: "GitHub",   href: "https://github.com",   hoverColor: "hsl(182,66%,54%)", hoverBorder: "hsl(182,66%,54%)" },
  { icon: EnvelopeSimple, label: "Email",  href: "mailto:contact@example.com", hoverColor: "hsl(270,60%,70%)", hoverBorder: "hsl(270,60%,70%)" },
];

function SocialBtn({ icon: Icon, label, href, hoverColor, hoverBorder }: typeof SOCIALS[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200"
      style={{
        borderColor: hovered ? hoverBorder : "hsl(210,12%,22%)",
        color: hovered ? hoverColor : "hsl(210,10%,55%)",
        background: "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={16} weight="fill" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer>
      {/* CTA Banner */}
      <div
        className="relative overflow-hidden py-20 px-8 border-t"
        style={{
          background: "linear-gradient(135deg, hsl(210,29%,10%) 0%, hsl(216,40%,14%) 50%, hsl(210,29%,10%) 100%)",
          borderColor: "hsl(210,12%,22%)",
        }}
      >
        {/* Teal blob */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "hsl(182,66%,54%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <h2
            className="font-serif font-bold gradient-text"
            style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}
          >
            Let's Build Something Together
          </h2>
          <p className="font-sans text-gray-400 max-w-md">
            Open to new opportunities, collaborations, and interesting projects.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-glow-teal px-8 py-3 rounded-xl font-sans font-semibold text-sm"
            style={{ background: "linear-gradient(135deg, hsl(182,66%,40%) 0%, hsl(182,66%,54%) 100%)", color: "hsl(210,29%,8%)" }}
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto"
        style={{ borderColor: "hsl(210,12%,18%)" }}
      >
        <p className="font-sans text-xs text-gray-500">
          © {new Date().getFullYear()} Med Rayen Ouerghui. All rights reserved.
        </p>
        <div className="flex gap-2">
          {SOCIALS.map((s) => <SocialBtn key={s.label} {...s} />)}
        </div>
      </div>
    </footer>
  );
}
