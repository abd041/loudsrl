import Image from "next/image";
import { studioWhatWeDo } from "@/data/studio";
import StudioFounderCta from "@/components/studio/StudioFounderCta";

type StudioWhatWeDoProps = {
  process: string[];
};

export default function StudioWhatWeDo({ process }: StudioWhatWeDoProps) {
  return (
    <section className="relative z-20 bg-white px-4 pb-60 pt-40 text-black lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-20 md:flex-row">
        <div className="grow">
          <p className="font-mono text-lg lg:text-xl">{studioWhatWeDo.label}</p>
          <p className="mt-5 max-w-xl text-xl tracking-[0.03rem] leading-[120%] sm:leading-[140%] lg:text-2xl">
            {studioWhatWeDo.description}
          </p>
        </div>

        <div className="relative shrink-0 md:min-w-[280px]">
          <div className="absolute -top-8 left-0 flex items-center gap-2 md:-translate-x-1/2">
            <Image
              src="/media/studio/lightbulb_2.png"
              alt=""
              width={20}
              height={20}
            />
            <p className="font-mono text-xs">{studioWhatWeDo.unicornLabel}</p>
            <Image
              src="/media/studio/Union_1.png"
              alt=""
              width={22}
              height={42}
            />
          </div>

          <ol className="flex h-full min-h-[320px] flex-col justify-end bg-[#4E71FF] px-6 py-9 sm:min-w-xs">
            {process.map((step) => (
              <li
                key={step}
                className="ml-7 list-decimal text-xl tracking-[0.03rem] leading-[190%] text-white"
              >
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-11 flex w-full justify-center">
            <StudioFounderCta />
          </div>
        </div>
      </div>
    </section>
  );
}
