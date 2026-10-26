import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CTA, PageHero, seo } from "@/components/site/Layout";
import { services, waLink } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    ...seo("Services — Website Development, SEO, Google & Meta Ads | Ann Tessie", "Website development services, WordPress, SEO, Google Ads, Meta Ads, custom web applications and business automation.", "/services"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: "Ann Tessie — Digital Services", provider: { "@type": "Person", name: "Ann Tessie" }, serviceType: services.map((s) => s.title) }) }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Build. Optimize. Advertise. <span className="italic text-gradient">Automate.</span></>} intro="Six focused services that work on their own or together as one growth plan." crumbs={[{ label: "Services" }]} />
      <div className="mx-auto max-w-7xl space-y-6 px-5 py-20">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid scroll-mt-24 gap-8 rounded-3xl border bg-card p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
            <div>
              <span className="font-mono text-sm text-gold">0{i + 1}</span>
              <h2 className="mt-3 text-3xl font-medium">{s.title}</h2>
              <p className="mt-4 text-muted-foreground">{s.summary}</p>
              <p className="mt-4 text-sm"><span className="text-primary">Benefit: </span>{s.benefit}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" search={{ service: s.title }} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Enquire</Link>
                <a href={waLink(`Hi Ann, I'm interested in ${s.title}.`)} target="_blank" rel="noopener noreferrer" className="rounded-full border px-5 py-2.5 text-sm font-semibold hover:border-primary">WhatsApp</a>
              </div>
            </div>
            <ul className="grid content-start gap-3 sm:grid-cols-2">
              {s.items.map((it) => (
                <li key={it} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <CTA />
    </>
  );
}
