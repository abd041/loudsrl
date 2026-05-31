"use client";

import Link from "next/link";
import { industryPages } from "@/data/industryPages";
import { cn } from "@/lib/cn";

type IndustryTabBarProps = {
  activeSlug: string;
};

export default function IndustryTabBar({ activeSlug }: IndustryTabBarProps) {
  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10 pb-6 md:gap-x-10 md:pb-8">
      {industryPages.map((industry) => {
        const isActive = activeSlug === industry.slug;

        return (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className={cn(
              "cursor-link cursor-none text-sm transition-opacity duration-300 md:text-base",
              isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
            )}
          >
            {industry.title}
          </Link>
        );
      })}
    </nav>
  );
}
