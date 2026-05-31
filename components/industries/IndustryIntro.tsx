import type { IndustryPage } from "@/data/industryPages";

type IndustryIntroProps = {
  industry: IndustryPage;
};

export default function IndustryIntro({ industry }: IndustryIntroProps) {
  return (
    <section className="bg-black px-4 pt-10 text-white lg:px-10 lg:pt-20">
      <div className="mx-auto flex max-w-6xl justify-end">
        <div className="w-full md:w-1/2">
          <p className="font-mono text-sm opacity-50">{industry.eyebrow}</p>
          <p className="mt-4 text-lg leading-[1.3] tracking-[0.01em] md:text-2xl md:leading-[1.25] lg:text-3xl">
            {industry.heroLine}
          </p>
        </div>
      </div>
    </section>
  );
}
