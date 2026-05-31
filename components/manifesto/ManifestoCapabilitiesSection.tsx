import Link from "next/link";
import { services } from "@/data/services";
import type { ManifestoDeliverable } from "@/data/manifesto";
import DeliverablesGrid from "@/components/manifesto/DeliverablesGrid";

type ManifestoCapabilitiesSectionProps = {
  deliverables: ManifestoDeliverable[];
  overview: string;
};

function BuildWithUsLink() {
  return (
    <Link
      href="/contact-us"
      className="group inline-flex cursor-link cursor-none cursor-invert items-center gap-4 text-lg"
    >
      Build with Us
      <svg
        viewBox="0 0 50 50"
        width={32}
        height={32}
        className="fill-none transition-transform duration-300 ease-out group-hover:translate-x-1"
        aria-hidden
      >
        <circle cx="25" cy="25" r="24" stroke="#AD8AEC" fill="#AD8AEC" strokeWidth={1} />
        <g transform="translate(7, 10) scale(1)">
          <path d="M 9 15 L 27.45 15" fill="none" stroke="#FFFFFF" strokeWidth={1} />
          <path d="M 27 15 L 21 9" fill="none" stroke="#FFFFFF" strokeWidth={1} />
          <path d="M 27 15 L 21 21" fill="none" stroke="#FFFFFF" strokeWidth={1} />
        </g>
      </svg>
    </Link>
  );
}

export default function ManifestoCapabilitiesSection({
  deliverables,
  overview,
}: ManifestoCapabilitiesSectionProps) {
  return (
    <section className="relative z-20 bg-[#f0f0f0] px-4 py-20 text-black lg:px-10 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs tracking-[0.03rem] text-black/60">
          Deliverables.
        </p>
        <h2 className="mb-12 mt-0 text-4xl leading-[120%] tracking-[0.03rem] sm:leading-[140%]">
          Including but not limited to.
        </h2>

        <DeliverablesGrid items={deliverables} />
      </div>

      <div className="mx-auto mt-20 max-w-6xl">
        <p className="font-mono text-xs tracking-[0.03rem] text-black/60">
          Our services. The full list!
        </p>
        <h2 className="mb-12 mt-0 text-4xl leading-[120%] tracking-[0.03rem] sm:leading-[140%]">
          {overview}
        </h2>

        <div className="grid grid-cols-2 border-l border-t border-black/30 md:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="border-b border-r border-black/30 bg-[#f0f0f0] p-6"
            >
              <p className="mb-4 font-mono text-xs leading-[120%] tracking-[0.03rem] text-black/50 sm:leading-[140%]">
                {service.title}
              </p>
              <ul>
                {service.items.map((item) => (
                  <li key={item} className="mb-2 text-sm last:mb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-28 flex justify-center">
          <BuildWithUsLink />
        </div>
      </div>
    </section>
  );
}
