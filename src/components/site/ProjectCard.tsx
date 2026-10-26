import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { statusTone } from "./Layout";

export function ProjectVisual({ p, large }: { p: Project; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-brand ${large ? "aspect-[16/7]" : "aspect-[16/10]"}`} role="img" aria-label={`${p.title} project visual`}>
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="absolute inset-x-6 top-6 h-3 w-24 rounded-full bg-foreground/15" />
      <div className="absolute inset-x-6 top-14 space-y-2">
        <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
        <div className="h-2 w-1/2 rounded-full bg-foreground/10" />
      </div>
      <p className="absolute bottom-5 left-6 right-6 font-display text-2xl text-foreground md:text-3xl">{p.title}</p>
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-gold/20 blur-3xl transition group-hover:bg-gold/40" />
    </div>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link to="/portfolio/$slug" params={{ slug: p.slug }} className="group block rounded-3xl border bg-card p-3 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant">
      <ProjectVisual p={p} />
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone[p.status]}`}>{p.status}</span>
          <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" />
        </div>
        <h3 className="mt-4 text-xl font-medium">{p.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{p.label}</p>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.overview}</p>
      </div>
    </Link>
  );
}
