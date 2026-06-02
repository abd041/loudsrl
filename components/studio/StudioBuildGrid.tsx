import Image from "next/image";
import { studioBuildSection } from "@/data/studio";
import StudioFounderCta from "@/components/studio/StudioFounderCta";

type BuildCard = {
  title: string;
  description: string;
  icon: string;
};

type StudioBuildGridProps = {
  cards: BuildCard[];
};

export default function StudioBuildGrid({ cards }: StudioBuildGridProps) {
  return (
    <section className="relative z-20 bg-black/5 px-4 py-16 text-black md:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.03rem] text-black/60">
          {studioBuildSection.label}
        </p>
        <h2 className="mt-0 max-w-3xl text-[clamp(1.75rem,5vw,2.25rem)] tracking-[0.03rem] leading-[120%] sm:leading-[140%]">
          {studioBuildSection.title}
        </h2>

        <div className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-[50px]">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col justify-between gap-10 bg-white px-4 py-5 transition-colors duration-300 sm:gap-16 sm:px-5 sm:py-6 md:gap-20"
            >
              <Image src={card.icon} alt="" width={72} height={72} />

              <div>
                <h3 className="mb-4 font-mono text-sm tracking-[0.03rem] leading-[115%] sm:leading-[135%]">
                  {card.title}
                </h3>
                <p className="max-w-[367px] text-balance text-xl tracking-[0.03rem] leading-[120%] sm:leading-[140%]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <StudioFounderCta />
        </div>
      </div>
    </section>
  );
}
