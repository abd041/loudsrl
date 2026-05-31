import { cn } from "@/lib/cn";

type PillarConsultingIntroProps = {
  label: string;
  text: string;
  showLabel?: boolean;
};

export default function PillarConsultingIntro({
  label,
  text,
  showLabel = false,
}: PillarConsultingIntroProps) {
  return (
    <section className="relative z-20 bg-white px-4 py-20 text-center text-black lg:px-10 lg:py-28">
      <div className="mx-auto max-w-4xl">
        {showLabel ? (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50">
            {label}
          </p>
        ) : null}
        <p
          className={cn(
            "mx-auto max-w-3xl text-xl font-normal leading-relaxed text-black md:text-2xl md:leading-relaxed",
            showLabel && "mt-8"
          )}
        >
          {text}
        </p>
      </div>
    </section>
  );
}
