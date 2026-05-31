import type { IndustryPage } from "@/data/industryPages";

type IndustryMethodologyProps = {
  industry: IndustryPage;
};

function MethodologyColumn({
  label,
  items,
  index,
}: {
  label: string;
  items: string[];
  index: number;
}) {
  return (
    <div
      className={`flex grow flex-col border border-white/30 p-10 md:border-b-0 md:border-t-0 ${
        index === 0 ? "md:border-0 md:pl-4" : index === 2 ? "md:border-0 md:pr-4" : ""
      }`}
    >
      <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">
        {label}
      </h2>
      <ul className="mt-6">
        {items.map((item) => (
          <li key={item} className="mt-2.5 text-sm leading-relaxed text-white/75">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IndustryMethodology({ industry }: IndustryMethodologyProps) {
  return (
    <section className="relative z-20 bg-black text-white">
      <div className="mx-auto flex max-w-6xl justify-end px-4 pb-10 lg:pb-20">
        <div className="w-full md:w-1/2">
          <p className="text-2xl leading-relaxed">{industry.methodologyIntro}</p>
        </div>
      </div>

      <div className="border-white/30 md:border-b md:border-t">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-1 px-4 sm:grid-cols-2 md:grid-cols-3 md:gap-0 md:px-0">
          <MethodologyColumn
            label={industry.thinkLabel}
            items={industry.thinkItems}
            index={0}
          />
          <MethodologyColumn
            label={industry.designLabel}
            items={industry.designItems}
            index={1}
          />
          <MethodologyColumn
            label={industry.developLabel}
            items={industry.developItems}
            index={2}
          />
        </div>
      </div>
    </section>
  );
}
