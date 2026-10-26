import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { CTA, PageHero, seo } from "@/components/site/Layout";
import { skills } from "@/data/site";

export const Route = createFileRoute("/skills")({
  head: () => seo("Skills & Expertise — Ann Tessie", "Development, SEO, Google Ads, Meta Ads, business systems and project coordination skills.", "/skills"),
  component: Skills,
});

function Skills() {
  const [q, setQ] = useState("");
  const term = q.toLowerCase().trim();
  return (
    <>
      <PageHero eyebrow="Skills & expertise" title={<>A blend of <span className="italic text-gradient">build and growth.</span></>} crumbs={[{ label: "Skills" }]} />
      <section className="mx-auto max-w-5xl px-5 py-16">
        <label className="relative block">
          <span className="sr-only">Search skills</span>
          <Search className="absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search skills…" className="w-full rounded-full border bg-card py-4 pl-12 pr-5 outline-none focus:border-primary" />
        </label>
        <div className="mt-12 space-y-10">
          {Object.entries(skills).map(([cat, items]) => {
            const shown = items.filter((s) => !term || s.toLowerCase().includes(term) || cat.toLowerCase().includes(term));
            if (!shown.length) return null;
            return (
              <div key={cat}>
                <h2 className="text-2xl font-medium">{cat}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {shown.map((s) => <span key={s} className="rounded-full border bg-card px-4 py-2 text-sm transition hover:border-primary">{s}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}
