import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import CaseStudyCard from "@/components/CaseStudyCard";
import LogoWall from "@/components/LogoWall";
import ScrollReveal from "@/components/ScrollReveal";
import {
  contactTabs,
  contactFeatured,
  contactSteps,
  type ContactTabId,
} from "@/data/contact";
import { cn } from "@/lib/cn";

type Props = {
  searchParams: Promise<{ c?: string }>;
};

function getActiveTab(c?: string): ContactTabId {
  if (c === "startup") return "startup";
  if (c === "career") return "career";
  return "business";
}

export const metadata = {
  title: "Contact us | LOUD",
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeTab = getActiveTab(params.c);
  const featured = contactFeatured[activeTab];

  return (
    <>
      <Header />
      <main>
        <section className="page-padding py-12 md:py-20">
          <p className="section-label mb-8">
            FIRST STEP OF OUR RELATIONSHIP :)
          </p>

          <nav className="mb-12 flex flex-wrap gap-4 border-b border-white/10 pb-6">
            {contactTabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "text-sm transition md:text-base",
                  activeTab === tab.id
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-70"
                )}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <aside className="hidden lg:block">
              <p className="mb-2 text-lg">Hate contact forms?</p>
              <a
                href="mailto:hello@loudsrl.com"
                className="text-2xl underline underline-offset-4 transition hover:opacity-60"
              >
                hello@loudsrl.com
              </a>
            </aside>

            <ContactForm />
          </div>

          <div className="mt-12 lg:hidden">
            <p className="mb-2 text-lg">Hate contact forms?</p>
            <a
              href="mailto:hello@loudsrl.com"
              className="text-xl underline underline-offset-4"
            >
              hello@loudsrl.com
            </a>
          </div>
        </section>

        <section className="page-padding py-20 md:py-28">
          <p className="section-label mb-4">What&apos;s next.</p>
          <h2 className="section-title mb-16">
            Fourth base on a first date?
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {contactSteps.map((step, i) => (
              <article key={step.title} className="border-t border-white/10 pt-6">
                <span className="text-sm text-white/40">{i + 1}.</span>
                <h3 className="mt-2 mb-3 text-xl">{step.title}</h3>
                <p className="text-white/60">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <ScrollReveal className="page-padding pb-20">
          <div className="grid gap-8 md:grid-cols-3">
            {featured.map((slug) => (
              <CaseStudyCard key={slug} slug={slug} />
            ))}
          </div>
        </ScrollReveal>

        <LogoWall />
      </main>
      <Footer />
    </>
  );
}
