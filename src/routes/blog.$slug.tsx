import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/site/Layout";
import { posts, SITE } from "@/data/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found — Ann Tessie" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    const base = seo(`${p.title} | Ann Tessie`, p.excerpt, `/blog/${p.slug}`);
    return {
      ...base,
      meta: [...base.meta.filter((m) => !("property" in m && m.property === "og:type")), { property: "og:type", content: "article" }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt, datePublished: p.date, author: { "@type": "Person", name: "Ann Tessie" } }) }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="text-4xl">Article not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-primary">Back to insights</Link>
    </div>
  ),
  component: Article,
});

function Article() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const share = (net: "x" | "linkedin" | "wa") => {
    const url = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
    const t = encodeURIComponent(post.title);
    const links = { x: `https://twitter.com/intent/tweet?url=${url}&text=${t}`, linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, wa: `https://wa.me/?text=${t}%20${url}` };
    window.open(links[net], "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <PageHero eyebrow={`${post.category} · ${post.readTime}`} title={post.title} intro={post.excerpt} crumbs={[{ to: "/blog", label: "Insights" }, { label: post.title }]} />
      <article className="mx-auto max-w-3xl px-5 py-16">
        <p className="mb-8 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm">Sample draft — this article will be replaced with a published version.</p>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">{post.body.map((b, i) => <p key={i}>{b}</p>)}</div>
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t pt-8 text-sm">
          <span className="text-muted-foreground">Share:</span>
          <button onClick={() => share("x")} className="rounded-full border px-4 py-2 hover:border-primary">X</button>
          <button onClick={() => share("linkedin")} className="rounded-full border px-4 py-2 hover:border-primary">LinkedIn</button>
          <button onClick={() => share("wa")} className="rounded-full border px-4 py-2 hover:border-primary">WhatsApp</button>
        </div>
        <div className="mt-10 rounded-3xl border bg-card p-6">
          <p className="text-xs text-muted-foreground">Written by</p>
          <p className="font-display text-xl">{SITE.name}</p>
          <p className="text-sm text-muted-foreground">Web Developer, SEO & Digital Marketing Specialist</p>
        </div>
        <h2 className="mt-14 text-2xl font-medium">Related articles</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {related.map((r) => (
            <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="rounded-2xl border bg-card p-5 hover:border-primary">
              <p className="text-xs text-gold">{r.category}</p>
              <p className="mt-2 font-medium">{r.title}</p>
            </Link>
          ))}
        </div>
      </article>
    </>
  );
}
