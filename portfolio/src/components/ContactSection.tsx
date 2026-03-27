import { useState } from "react";
import { PaperPlaneTilt, CheckCircle, WarningCircle, LinkedinLogo, GithubLogo, EnvelopeSimple } from "@phosphor-icons/react";

interface Form { name: string; email: string; message: string; }
const EMPTY: Form = { name: "", email: "", message: "" };

export default function ContactSection() {
  const [form,      setForm]      = useState<Form>(EMPTY);
  const [errors,    setErrors]    = useState<Partial<Form>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [mutError,  setMutError]  = useState(false);

  const validate = () => {
    const e: Partial<Form> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true); setMutError(false);
    try {
      const res = await fetch("https://formspree.io/f/xaqlnjvk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setMutError(true);
    } finally {
      setLoading(false);
    }
  };

  const field = (key: keyof Form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  return (
    <section id="contact" className="py-24 px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Badge + heading */}
        <div className="flex flex-col items-center mb-12 gap-4">
          <span className="px-4 py-1.5 rounded-full border text-xs font-mono"
            style={{ borderColor: "hsla(182,66%,54%,0.4)", background: "hsla(182,66%,54%,0.1)", color: "hsl(182,66%,54%)" }}>
            Contact
          </span>
          <h2 className="font-serif font-bold text-center" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em" }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-md">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div
            className="flex flex-col items-center gap-4 py-16 text-center rounded-lg border p-8"
            style={{ background: "hsl(210,18%,12%)", borderColor: "hsl(144,45%,48%)" }}
          >
            <CheckCircle size={48} weight="fill" className="text-success" />
            <h3 className="font-serif text-2xl font-semibold text-foreground">Message Sent!</h3>
            <p className="font-sans text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
            <button
              onClick={() => { setSubmitted(false); setForm(EMPTY); }}
              className="mt-2 px-6 py-2.5 rounded-lg border font-sans text-sm transition-colors"
              style={{ borderColor: "hsl(182,66%,54%)", color: "hsl(182,66%,54%)" }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="rounded-lg border border-border p-8 space-y-6" style={{ background: "hsl(210,18%,12%)" }}>
            {mutError && (
              <div className="flex items-center gap-2 p-3 rounded-lg border"
                style={{ background: "hsl(210,18%,15%)", borderColor: "hsl(0,72%,51%)" }}>
                <WarningCircle size={20} weight="fill" className="text-destructive" />
                <span className="font-sans text-sm text-gray-300">Something went wrong. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-sans text-sm text-gray-400 mb-1.5" htmlFor="name">Name</label>
                <input
                  id="name" type="text" placeholder="Your name"
                  {...field("name")}
                  aria-invalid={!!errors.name}
                  className="w-full px-4 py-3 rounded-lg font-sans text-sm text-foreground placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  style={{ background: "hsl(210,18%,15%)", border: `1px solid ${errors.name ? "hsl(0,72%,51%)" : "hsl(210,12%,25%)"}` }}
                />
                {errors.name && <p className="mt-1 text-xs font-sans" style={{ color: "hsl(0,72%,51%)" }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block font-sans text-sm text-gray-400 mb-1.5" htmlFor="email">Email</label>
                <input
                  id="email" type="email" placeholder="your@email.com"
                  {...field("email")}
                  aria-invalid={!!errors.email}
                  className="w-full px-4 py-3 rounded-lg font-sans text-sm text-foreground placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  style={{ background: "hsl(210,18%,15%)", border: `1px solid ${errors.email ? "hsl(0,72%,51%)" : "hsl(210,12%,25%)"}` }}
                />
                {errors.email && <p className="mt-1 text-xs font-sans" style={{ color: "hsl(0,72%,51%)" }}>{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block font-sans text-sm text-gray-400 mb-1.5" htmlFor="message">Message</label>
                <textarea
                  id="message" rows={5} placeholder="Tell me about your project..."
                  {...field("message")}
                  aria-invalid={!!errors.message}
                  className="w-full px-4 py-3 rounded-lg font-sans text-sm text-foreground placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                  style={{ background: "hsl(210,18%,15%)", border: `1px solid ${errors.message ? "hsl(0,72%,51%)" : "hsl(210,12%,25%)"}` }}
                />
                {errors.message && <p className="mt-1 text-xs font-sans" style={{ color: "hsl(0,72%,51%)" }}>{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-sans font-semibold text-sm transition-all hover:bg-secondary hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "hsl(216,97%,42%)", color: "hsl(210,17%,98%)" }}
              >
                {loading ? "Sending..." : <><PaperPlaneTilt size={20} weight="bold" /> Send Message</>}
              </button>
            </form>
          </div>
        )}

        {/* Social links */}
        <div className="flex justify-center gap-4 mt-10">
          {[
            { href: "https://linkedin.com", icon: LinkedinLogo, label: "LinkedIn" },
            { href: "https://github.com",   icon: GithubLogo,   label: "GitHub" },
            { href: "mailto:medrayenouerghui@gmail.com", icon: EnvelopeSimple, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={label}
              className="p-3 rounded-xl border border-border text-gray-400 hover:text-tertiary transition-colors"
            >
              <Icon size={28} weight="fill" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
