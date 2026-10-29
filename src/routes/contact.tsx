import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHero, seo } from "@/components/site/Layout";
import { SITE, services, waLink } from "@/data/site";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { service?: string } => (typeof s["service"] === "string" ? { service: s["service"] } : {}),
  head: () => seo("Contact Ann Tessie — Hire a Web Developer & SEO Specialist", "Start a website, SEO, advertising or automation project with Ann Tessie. Message on WhatsApp or send an enquiry.", "/contact"),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(120).optional(),
  service: z.string().min(1, "Please choose a service"),
  budget: z.string().max(60).optional(),
  timeline: z.string().max(60).optional(),
  description: z.string().trim().min(20, "Please describe your project (at least 20 characters)").max(2000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

const input = "w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary aria-[invalid=true]:border-destructive";

function Contact() {
  const { service } = Route.useSearch();
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Errors] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    const d = r.data;
    const msg = `New project enquiry\n\nName: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company || "-"}\nService: ${d.service}\nBudget: ${d.budget || "-"}\nTimeline: ${d.timeline || "-"}\n\n${d.description}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSending(false);
    setDone(true);
  };

  const a = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let's build something <span className="italic text-gradient">that grows.</span></>} intro="Share a few details and your enquiry opens in WhatsApp, ready to send." crumbs={[{ label: "Contact" }]} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.4fr_1fr]">
        {done ? (
          <div className="rounded-3xl border bg-card p-10" role="status">
            <h2 className="text-3xl font-medium">Your enquiry is ready in WhatsApp</h2>
            <p className="mt-4 text-muted-foreground">Press send in WhatsApp to deliver it. If WhatsApp didn't open, message {SITE.whatsapp} directly.</p>
            <button onClick={() => setDone(false)} className="mt-6 rounded-full border px-5 py-2.5 text-sm hover:border-primary">Send another enquiry</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl border bg-card p-8 md:grid-cols-2">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <Field id="name" label="Full name *" error={errors.name}><input id="name" name="name" className={input} {...a("name")} /></Field>
            <Field id="email" label="Email *" error={errors.email}><input id="email" name="email" type="email" className={input} {...a("email")} /></Field>
            <Field id="company" label="Company / Organization"><input id="company" name="company" className={input} /></Field>
            <Field id="service" label="Service required *" error={errors.service}>
              <select id="service" name="service" defaultValue={service ?? ""} className={input} {...a("service")}>
                <option value="">Choose a service</option>
                {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                {service && !services.some((s) => s.title === service) && <option>{service}</option>}
                <option>Other</option>
              </select>
            </Field>
            <Field id="budget" label="Project budget">
              <select id="budget" name="budget" className={input}><option value="">Prefer to discuss</option><option>Under $1,000</option><option>$1,000 – $3,000</option><option>$3,000 – $10,000</option><option>$10,000+</option></select>
            </Field>
            <Field id="timeline" label="Timeline">
              <select id="timeline" name="timeline" className={input}><option value="">Flexible</option><option>ASAP</option><option>Within 1 month</option><option>1 – 3 months</option><option>3+ months</option></select>
            </Field>
            <div className="md:col-span-2">
              <Field id="description" label="Project description *" error={errors.description}><textarea id="description" name="description" rows={6} className={input} {...a("description")} /></Field>
            </div>
            <button type="submit" disabled={sending} className="rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60 md:col-span-2">
              {sending ? "Preparing…" : "Send via WhatsApp"}
            </button>
          </form>
        )}
        <aside className="space-y-4">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="block rounded-3xl border bg-card p-6 hover:border-primary"><p className="text-xs text-muted-foreground">WhatsApp</p><p className="mt-1 text-lg font-medium">{SITE.whatsapp}</p></a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="block rounded-3xl border bg-card p-6 hover:border-primary"><p className="text-xs text-muted-foreground">LinkedIn</p><p className="mt-1 text-lg font-medium">in/anntessie</p></a>
          <div className="rounded-3xl border border-dashed p-6"><p className="text-xs text-muted-foreground">Email</p><p className="mt-1 text-muted-foreground">Coming soon</p></div>
          <div className="rounded-3xl border border-dashed p-6"><p className="text-xs text-muted-foreground">GitHub</p><p className="mt-1 text-muted-foreground">Coming soon</p></div>
        </aside>
      </section>
    </>
  );
}
