import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTA, PageHero, seo } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/ProjectCard";
import { categories, projects, type Category } from "@/data/site";

export const Route = createFileRoute("/portfolio/")({
  head: () => seo("Portfolio & Projects — Ann Tessie", "Websites, SEO, advertising, web applications and nonprofit projects by Ann Tessie.", "/portfolio"),
  component: Portfolio,
});

function Portfolio() {
  const [cat, setCat] = useState<Category | "All">("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.categories.includes(cat));
  return (
    <>
      <PageHero eyebrow="Portfolio" title={<>Work across web, search <span className="italic text-gradient">and impact.</span></>} intro="Each project shows its real status — live, in development, prototype or concept." crumbs={[{ label: "Portfolio" }]} />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-2 text-sm transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{c}</button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>
      <CTA />
    </>
  );
}
