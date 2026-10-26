import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Code2, Search, Megaphone, Workflow, LineChart, Users } from "lucide-react";
import { SITE, services, projects, skills, process, posts, waLink } from "@/data/site";
import { CTA, SectionHead, seo } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/ProjectCard";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/")({
  head: () => seo("Ann Tessie — Web Developer, SEO & Digital Marketing Specialist", "Freelance web developer and SEO specialist offering website development, Google Ads, Meta Ads and business automation for international businesses.", "/"),
  component: Home,
});

const icons = [Code2, Search, Megaphone, Workflow, LineChart, Users];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-lines opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr]">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" /> {SITE.tagline}
            </p>
            <h1 className="mt-6 text-5xl font-medium leading-[1.02] md:text-7xl">
              I Build Digital Solutions That Help Businesses <span className="italic text-gradient">Grow.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I'm Ann Tessie, a Web Developer, SEO Strategist, and Digital Marketing Specialist helping businesses transform ideas into high-performing websites, scalable digital platforms, effective advertising campaigns, and intelligent automation solutions.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90">Explore My Work <ArrowRight className="size-4" /></Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-gold-foreground transition hover:opacity-90">Hire Me</Link>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition hover:border-primary">WhatsApp Me</a>
            </div>
          </div>

          {/* Portrait placeholder — replace with real portrait */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/20 blur-3xl" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border bg-brand shadow-elegant" role="img" aria-label="Portrait placeholder for Ann Tessie">
              <div className="absolute inset-0 grid-lines opacity-40" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-8xl italic text-foreground/80">AT</span>
              </div>
              <p className="absolute bottom-5 left-0 right-0 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Portrait coming soon</p>
            </div>
            <div className="absolute -left-8 top-10 rounded-2xl glass px-4 py-3 text-sm animate-float">
              <p className="text-xs text-muted-foreground">Search visibility</p>
              <svg viewBox="0 0 100 30" className="mt-1 h-8 w-28" aria-hidden><polyline fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary" points="0,26 20,22 35,24 50,15 70,12 85,6 100,2" /></svg>
            </div>
            <div className="absolute -right-6 bottom-16 rounded-2xl glass px-4 py-3 text-sm animate-float [animation-delay:2s]">
              <p className="font-mono text-xs text-gold">&lt;build /&gt;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <p className="font-display text-2xl leading-relaxed md:text-3xl">
          Technology, marketing and operations — combined with <span className="text-gold">creativity, strategy and compassion</span> — to help organisations build, get found and grow.
        </p>
        <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-primary hover:underline">More about me <ArrowRight className="size-4" /></Link>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <SectionHead eyebrow="Services" title="What I can do for you" action={<Link to="/services" className="text-sm text-primary hover:underline">All services →</Link>} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <Link key={s.slug} to="/services" hash={s.slug} className="group rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-6 text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHead eyebrow="Featured work" title="Selected projects" action={<Link to="/portfolio" className="text-sm text-primary hover:underline">View portfolio →</Link>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* Skills */}
      <section className="border-y bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow="Skills" title="Skills and technologies" action={<Link to="/skills" className="text-sm text-primary hover:underline">Explore skills →</Link>} />
          <div className="flex flex-wrap gap-2">
            {Object.values(skills).flat().map((s) => (
              <span key={s} className="rounded-full border bg-card px-4 py-2 text-sm">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionHead eyebrow="Process" title="How I work" />
        <ol className="grid gap-6 md:grid-cols-4">
          {process.map((p) => (
            <li key={p.step} className="border-t-2 border-primary pt-6">
              <span className="font-mono text-sm text-gold">{p.step}</span>
              <h3 className="mt-3 text-xl font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Community */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2">
        <img src={community} alt="An adult's hands gently holding a child's hand" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-3xl object-cover" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Community impact</p>
          <h2 className="mt-3 text-3xl font-medium md:text-4xl">Technology with purpose</h2>
          <p className="mt-5 text-muted-foreground">Beyond client work, I'm involved in community development through Light Cares Foundation and La Ayuda — including humanitarian project coordination supporting vulnerable children and families.</p>
          <Link to="/experience" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">Experience & impact <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <div className="py-20"><CTA /></div>

      {/* Insights */}
      <section className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Insights" title="Latest insights" action={<Link to="/blog" className="text-sm text-primary hover:underline">All articles →</Link>} />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-3xl border bg-card p-7 transition hover:border-primary/50">
              <p className="text-xs text-gold">{p.category} · Sample draft</p>
              <h3 className="mt-3 text-xl font-medium group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <ArrowUpRight className="mt-5 size-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
