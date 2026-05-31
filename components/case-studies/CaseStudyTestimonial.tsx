import Image from "next/image";
import type { CaseStudyTestimonial as CaseStudyTestimonialType } from "@/data/caseStudies";

type CaseStudyTestimonialProps = {
  testimonial: CaseStudyTestimonialType;
};

export default function CaseStudyTestimonial({
  testimonial,
}: CaseStudyTestimonialProps) {
  return (
    <div className="flex justify-center px-4 pb-20 pt-10 lg:py-20">
      <div className="flex w-full max-w-2xl flex-col justify-between gap-4 lg:gap-10">
        <blockquote>
          <p className="mt-4 text-xl font-light tracking-[0.03rem] lg:text-4xl">
            {testimonial.quote}
          </p>
        </blockquote>

        <div className="mt-10 flex flex-col">
          <p className="mb-1.5 font-mono text-sm font-medium uppercase opacity-60">
            {testimonial.author}
          </p>
          <div className="relative w-max text-sm">
            {testimonial.role}
            <span className="absolute bottom-0 right-0 translate-y-[calc(100%-13px)] pt-4 sm:left-auto sm:translate-x-full sm:pt-0">
              <Image
                src="/media/Union-1.png"
                alt=""
                width={20}
                height={20}
                className="ml-8"
              />
              <span className="block pt-2 font-mono text-[0.625rem] opacity-50">
                Our clients say about us
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
