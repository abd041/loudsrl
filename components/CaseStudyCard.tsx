import Link from "next/link";
import { getCaseStudy } from "@/data/caseStudies";
import MediaImage from "./MediaImage";

type CaseStudyCardProps = {
  slug: string;
  large?: boolean;
  theme?: "dark" | "light";
};

export default function CaseStudyCard({
  slug,
  large,
  theme = "dark",
}: CaseStudyCardProps) {
  const study = getCaseStudy(slug);
  if (!study) return null;

  const isLight = theme === "light";

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`group block overflow-hidden ${
        isLight
          ? "border border-black/10 bg-transparent"
          : "border border-white/10 bg-[#101010]"
      }`}
    >
      <div
        className={`relative overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        <MediaImage
          src={study.previewImage}
          alt={study.title}
          fill
          plain={isLight}
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-6">
        <p
          className={`section-label mb-2 ${isLight ? "text-black/50" : ""}`}
        >
          {study.industry}
        </p>
        <h3
          className={`text-xl font-light tracking-tight transition-opacity group-hover:opacity-70 md:text-2xl ${
            isLight ? "text-black" : ""
          }`}
        >
          {study.title}
        </h3>
        <p
          className={`mt-2 text-sm ${isLight ? "text-black/50" : "text-white/50"}`}
        >
          {study.subtitle}
        </p>
      </div>
    </Link>
  );
}
