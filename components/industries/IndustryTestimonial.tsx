import Image from "next/image";
import Link from "next/link";
import type { IndustryTestimonial as IndustryTestimonialType } from "@/data/industryPages";

type IndustryTestimonialProps = {
  testimonial: IndustryTestimonialType;
};

export default function IndustryTestimonial({
  testimonial,
}: IndustryTestimonialProps) {
  return (
    <section className="relative z-20 bg-[#06433E99] text-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-stretch gap-4 px-4 py-10 sm:flex-row lg:gap-10 lg:py-20">
        <div className="w-full sm:w-2/5">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-between sm:w-3/5">
          <blockquote>
            <p className="mt-4 text-xl leading-snug md:text-2xl md:leading-snug lg:text-4xl lg:leading-snug">
              &ldquo;{testimonial.quote.trim()}&rdquo;
            </p>
          </blockquote>

          <div className="mb-10 mt-10 flex flex-col">
            <p className="mb-1.5 font-mono text-sm font-medium uppercase tracking-[0.14em] opacity-60">
              {testimonial.name}
            </p>
            <p className="text-sm opacity-80">{testimonial.role}</p>
          </div>

          {testimonial.projectSlug ? (
            <Link
              href={`/case-studies/${testimonial.projectSlug}`}
              className="flex cursor-link cursor-none items-center justify-end gap-2 self-end text-sm hover:opacity-70"
            >
              {testimonial.ctaLabel ?? "Case studio"}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
