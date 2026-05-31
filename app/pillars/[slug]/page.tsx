import { notFound } from "next/navigation";
import PillarPageController from "@/components/pillars/PillarPageController";
import { getPillar, pillars } from "@/data/pillars";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pillar = getPillar(slug);
  return { title: pillar ? `${pillar.navLabel} | LOUD` : "Pillar | LOUD" };
}

export default async function PillarPage({ params }: Props) {
  const { slug } = await params;
  const pillar = getPillar(slug);

  if (!pillar) notFound();

  return <PillarPageController initialSlug={slug} />;
}
