import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHero, seo } from "@/components/site/Layout";
import { experience, projects } from "@/data/site";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/experience")({
  head: () => seo("Experience & Community Impact — Ann Tessie", "Professional experience in web development, marketing management and administration, plus community and humanitarian work.", "/experience"),
  component: Experience,
});

function Experience() {
  const ayuda = projects.find((p) => p.slug === "la-ayuda");
  return (
    <>
      <PageHero eyebrow="Experience & impact" title={<>Work that spans <span className="italic text-gradient">business and community.</span></>} crumbs={[{ label: "Experience" }]} />
      <section className="mx-auto max-w-4xl px-5 py-20">
        <h2 className="mb-10 text-3xl font-medium">Experience</h2>
        <div className="space-y-4">
          {experience.map((e) => (
            <article key={e.org} className="grid gap-4 rounded-3xl border bg-card p-7 md:grid-cols-[200px_1fr]">
              <div className="text-sm"><p className="text-gold">{e.dates}</p><p className="text-muted-foreground">{e.type}</p></div>
              <div>
                <h3 className="text-xl font-medium">{e.org}</h3>
                <p className="text-sm text-primary">{e.role}</p>
                <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-24 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Community impact</p>
          <h2 className="mt-3 text-3xl font-medium md:text-4xl">Supporting vulnerable children and families</h2>
          <p className="mt-5 text-muted-foreground">Through Light Cares Foundation (volunteer involvement) and La Ayuda (humanitarian project coordination), I've contributed to initiatives supporting access to shelter, healthcare and social support.</p>
          {ayuda?.impact && <p className="mt-5 rounded-2xl border-l-4 border-gold bg-muted/50 p-5 text-sm">{ayuda.impact}</p>}
        </div>
        <img src={community} alt="An adult's hands gently holding a child's hand" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-3xl object-cover" />
      </section>
      <CTA />
    </>
  );
}
