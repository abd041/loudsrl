"use client";

type PillarMarqueeProps = {
  marqueeText: string;
};

const marqueeItemClassName =
  "shrink-0 pr-16 text-[clamp(2.75rem,8vw,7rem)] font-light leading-[0.95] tracking-tight md:pr-24 lg:text-[9vw]";

export default function PillarMarquee({ marqueeText }: PillarMarqueeProps) {
  return (
    <section className="relative z-20 overflow-hidden bg-white py-16 text-black lg:py-24">
      <div className="pillar-marquee-track flex whitespace-nowrap">
        <span className={marqueeItemClassName}>{marqueeText}</span>
        <span className={marqueeItemClassName}>{marqueeText}</span>
      </div>
    </section>
  );
}
