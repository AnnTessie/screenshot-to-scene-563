import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHero, seo } from "@/components/site/Layout";
import { experience } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => seo("About Ann Tessie (Kaitesi Anna) — Web Developer & Marketer", "Ann Tessie is a technology and digital marketing professional working across web development, SEO, advertising, administration and community development.", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About me" title={<>Technology, creativity <span className="italic text-gradient">and compassion.</span></>} crumbs={[{ label: "About" }]} />
      <section className="mx-auto max-w-3xl space-y-6 px-5 py-20 text-lg leading-relaxed text-muted-foreground">
        <p className="text-foreground">I'm Ann Tessie, also known as Kaitesi Anna, a technology and digital marketing professional with experience spanning web development, SEO, digital advertising, marketing management, administration, project coordination, and community development.</p>
        <p>My professional journey has taken me through office administration, marketing management, technology development, and humanitarian project coordination.</p>
        <p>I specialize in building websites, digital platforms, business management systems, SEO strategies, Google Ads and Meta Ads campaigns, and workflow automation solutions.</p>
        <p>Beyond technology, I am passionate about community development and creating meaningful social impact through projects involving Light Cares Foundation and La Ayuda.</p>
        <p className="font-display text-2xl text-foreground">I believe the most valuable solutions combine technology, creativity, strategic thinking, and compassion.</p>
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="mb-8 text-3xl font-medium">Career timeline</h2>
        <ol className="relative space-y-8 border-l pl-8">
          {experience.map((e) => (
            <li key={e.org} className="relative">
              <span className="absolute -left-[37px] top-1.5 size-3 rounded-full bg-primary" />
              <p className="text-xs text-gold">{e.dates} · {e.type}</p>
              <h3 className="mt-1 text-xl font-medium">{e.org}</h3>
              <p className="text-sm text-muted-foreground">{e.role}</p>
            </li>
          ))}
        </ol>
      </section>
      <CTA />
    </>
  );
}
