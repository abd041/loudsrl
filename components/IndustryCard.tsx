"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import MediaImage from "./MediaImage";

type IndustryCardProps = {
  title: string;
  slug: string;
  tags: string;
  description: string;
  image: string;
  index?: number;
};

export default function IndustryCard({
  title,
  slug,
  tags,
  description,
  image,
  index = 0,
}: IndustryCardProps) {
  return (
    <Link
      href={`/industries/${slug}`}
      className={cn(
        "group relative block overflow-hidden border border-white/10 bg-[#101010]",
        index % 2 === 1 && "lg:mt-16"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          src={image}
          alt={title}
          fill
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-6 md:p-8">
        <p className="section-label mb-3">{tags}</p>
        <h3 className="mb-4 text-3xl font-light tracking-tight transition-opacity group-hover:opacity-70 md:text-4xl">
          {title}
        </h3>
        <p className="max-w-xl text-base leading-relaxed text-white/60">
          {description}
        </p>
      </div>
    </Link>
  );
}
