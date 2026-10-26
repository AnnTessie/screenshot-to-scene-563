import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, seo } from "@/components/site/Layout";
import { blogCategories, posts } from "@/data/site";

export const Route = createFileRoute("/blog/")({
  head: () => seo("Insights — Web, SEO & Marketing Articles | Ann Tessie", "Articles on web development, SEO, Google Ads, AI automation and business technology.", "/blog"),
  component: Blog,
});

function Blog() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const list = posts.filter((p) => (cat === "All" || p.category === cat) && (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero eyebrow="Insights" title={<>Notes on building <span className="italic text-gradient">and growing online.</span></>} intro="Articles shown here are sample drafts until published versions are added." crumbs={[{ label: "Insights" }]} />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {["All", ...blogCategories].map((c) => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-2 text-sm ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{c}</button>
            ))}
          </div>
          <input aria-label="Search articles" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="rounded-full border bg-card px-5 py-2.5 text-sm outline-none focus:border-primary md:w-64" />
        </div>
        {list.length === 0 && <p className="text-muted-foreground">No articles match yet.</p>}
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-3xl border bg-card p-8 transition hover:border-primary/50 hover:shadow-elegant">
              <p className="text-xs text-gold">{p.category} · {p.readTime} · Sample draft</p>
              <h2 className="mt-3 text-2xl font-medium group-hover:text-primary">{p.title}</h2>
              <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
