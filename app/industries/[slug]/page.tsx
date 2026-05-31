import { notFound } from "next/navigation";
import IndustryPageClient from "@/components/industries/IndustryPageClient";
import { getIndustry, industryPages } from "@/data/industryPages";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...industryPages.map((i) => ({ slug: i.slug })),
    { slug: "artificial-intelligence" },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  return {
    title: industry ? `${industry.title} | LOUD` : "Industry | LOUD",
    description: industry?.heroLine,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  return <IndustryPageClient industry={industry} activeSlug={industry.slug} />;
}
