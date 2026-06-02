import { studioWhySection } from "@/data/studio";

type StudioWhyChoosingUsProps = {
  items: string[];
};

export default function StudioWhyChoosingUs({ items }: StudioWhyChoosingUsProps) {
  return (
    <section className="relative z-20 bg-white px-4 py-20 text-black md:py-40 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.03rem] text-black/60">
          {studioWhySection.label}
        </p>
        <h2 className="mt-0 max-w-4xl text-[clamp(1.75rem,5vw,2.25rem)] tracking-[0.03rem] leading-[120%] sm:leading-[140%]">
          {studioWhySection.title}
        </h2>

        <div className="mt-7 grid grid-cols-2 gap-px bg-[#4E71FF] sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item, index) => (
            <div
              key={item}
              className="flex flex-col gap-16 bg-white px-4 pb-4 pt-8 sm:gap-24 sm:px-6 sm:pt-12 md:gap-40"
            >
              <p className="font-mono text-xl tracking-[0.03rem] leading-[115%] text-[#4E71FF] sm:leading-[135%]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="text-xl tracking-[0.03rem] leading-[120%] sm:leading-[140%]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
