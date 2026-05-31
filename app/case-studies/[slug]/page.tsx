import { notFound } from "next/navigation";
import CaseStudyPageClient from "@/components/case-studies/CaseStudyPageClient";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Case Study | LOUD" };
  }

  return {
    title: study.metaTitle,
    description: study.metaDescription,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  return <CaseStudyPageClient slug={slug} />;
}
