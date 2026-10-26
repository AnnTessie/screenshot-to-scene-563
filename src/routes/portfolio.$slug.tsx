import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero, statusTone, seo } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectCard";
import { projects, waLink } from "@/data/site";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found — Ann Tessie" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    return {
      ...seo(`${p.title} — Case Study | Ann Tessie`, p.overview, `/portfolio/${p.slug}`),
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: p.title, description: p.overview, creator: { "@type": "Person", name: "Ann Tessie" }, ...(p.url ? { url: p.url } : {}) }) }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="text-4xl">Project not found</h1>
      <Link to="/portfolio" className="mt-6 inline-block text-primary">Back to portfolio</Link>
    </div>
  ),
  component: CaseStudy,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="mt-3 text-muted-foreground">{children}</div>
    </section>
  );
}

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={p.label} title={p.title} intro={p.overview} crumbs={[{ to: "/portfolio", label: "Portfolio" }, { label: p.title }]} />
      <div className="mx-auto max-w-7xl px-5 py-14"><ProjectVisual p={p} large /></div>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <Block title="Objective">{p.objective}</Block>
          <Block title="My role and contribution">{p.role}</Block>
          <Block title="Approach">{p.approach}</Block>
          <Block title="Main features">
            <ul className="mt-2 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => <li key={f} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-primary" />{f}</li>)}
            </ul>
          </Block>
          {p.impact && <Block title="Community impact"><p className="rounded-2xl border-l-4 border-gold bg-muted/50 p-5">{p.impact}</p></Block>}
          <Block title="Gallery"><p className="text-sm">Screenshots will be added once provided.</p></Block>
        </div>
        <aside className="h-fit space-y-5 rounded-3xl border bg-card p-7 lg:sticky lg:top-24">
          <div><p className="text-xs text-muted-foreground">Organisation</p><p className="font-medium">{p.organization}</p></div>
          <div><p className="text-xs text-muted-foreground">Status</p><span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs ${statusTone[p.status]}`}>{p.status}</span></div>
          <div><p className="text-xs text-muted-foreground">Categories</p><p className="text-sm">{p.categories.join(", ")}</p></div>
          {p.url ? (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-full border px-5 py-3 text-sm font-semibold hover:border-primary">Visit live site <ArrowUpRight className="size-4" /></a>
          ) : <p className="text-sm text-muted-foreground">Live link to be confirmed.</p>}
          <Link to="/contact" search={{ service: p.title }} className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">Start a Similar Project</Link>
          <a href={waLink(`Hi Ann, I saw ${p.title} and want something similar.`)} target="_blank" rel="noopener noreferrer" className="block text-center text-sm text-primary hover:underline">Or message on WhatsApp</a>
        </aside>
      </div>
    </>
  );
}
