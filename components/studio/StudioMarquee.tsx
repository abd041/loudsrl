"use client";

type StudioMarqueeProps = {
  text: string;
};

const itemClassName =
  "shrink-0 pr-[1.5em] text-[clamp(3rem,10vw,8rem)] font-light leading-none tracking-tight";

export default function StudioMarquee({ text }: StudioMarqueeProps) {
  const words = text.split(" ");

  return (
    <section className="relative z-20 overflow-hidden bg-black/5 py-16 text-black lg:py-20">
      <div className="studio-marquee-track flex w-max whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className={itemClassName}>
            {words.map((word, index) => (
              <span key={`${copy}-${word}-${index}`} className="pr-[0.4em]">
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
