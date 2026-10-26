import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, X, MessageCircle, ArrowUpRight } from "lucide-react";
import { SITE, waLink } from "@/data/site";

const nav = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/blog", label: "Insights" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="grid size-10 place-items-center rounded-full border text-muted-foreground transition hover:text-foreground hover:border-primary">
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight">
          Ann<span className="text-primary">.</span>Tessie
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/contact" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:inline-flex">Hire Me</Link>
          <button className="grid size-10 place-items-center rounded-full border lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t px-5 py-4 lg:hidden">
          {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 text-lg font-display">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-hero">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Ann Tessie</p>
          <p className="mt-2 text-sm text-gold">{SITE.tagline}</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Websites, SEO, advertising and automation for businesses and organisations worldwide.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground">{n.label}</Link>
          ))}
        </nav>
        <div className="space-y-2 text-sm">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary">WhatsApp: {SITE.whatsapp}</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary">LinkedIn</a>
        </div>
      </div>
      <p className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Ann Tessie (Kaitesi Anna)</p>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={waLink("Hi Ann, I'd like to discuss a project.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant transition hover:scale-105">
      <MessageCircle className="size-6" />
    </a>
  );
}

export function PageHero({ eyebrow, title, intro, crumbs }: { eyebrow: string; title: ReactNode; intro?: string; crumbs?: { to?: string; label: string }[] }) {
  return (
    <section className="relative overflow-hidden border-b bg-hero">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
            <ol className="flex flex-wrap gap-2">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex gap-2"><span aria-hidden>/</span>{c.to ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.05] md:text-6xl animate-rise">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-medium md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5">
      <div className="relative overflow-hidden rounded-3xl bg-brand p-10 md:p-16 shadow-elegant">
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-medium text-foreground md:text-5xl">Have a project in mind?</h2>
          <p className="mt-4 text-muted-foreground">Tell me about your website, campaign or system. I'll reply with next steps.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-gold-foreground transition hover:opacity-90">Start a project <ArrowUpRight className="size-4" /></Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-3 font-semibold transition hover:bg-foreground/10">WhatsApp Me</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const statusTone: Record<string, string> = {
  Live: "bg-primary/15 text-primary",
  "In development": "bg-gold/15 text-gold",
  Prototype: "bg-gold/15 text-gold",
  Concept: "bg-muted text-muted-foreground",
  "URL pending": "bg-muted text-muted-foreground",
};

export function seo(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
