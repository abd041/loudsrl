import Image from "next/image";
import Link from "next/link";
import type { ManifestoDeliverable } from "@/data/manifesto";

function HoverArrowCircle() {
  return (
    <svg
      viewBox="0 0 50 50"
      width={32}
      height={32}
      className="fill-none stroke-current"
      aria-hidden
    >
      <circle cx="25" cy="25" r="24" stroke="currentColor" fill="none" strokeWidth={1} />
      <g transform="translate(2, 10) scale(1)">
        <path d="M 9 15 L 27.45 15" fill="none" stroke="currentColor" strokeWidth={1} />
        <path d="M 27 15 L 21 9" fill="none" stroke="currentColor" strokeWidth={1} />
        <path d="M 27 15 L 21 21" fill="none" stroke="currentColor" strokeWidth={1} />
      </g>
    </svg>
  );
}

type DeliverablesGridProps = {
  items: ManifestoDeliverable[];
};

export default function DeliverablesGrid({ items }: DeliverablesGridProps) {
  return (
    <div className="grid grid-cols-2 border-l border-t border-black md:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href ?? "/industries/e-commerce"}
          className="group flex min-h-[316px] cursor-link cursor-none cursor-force-white flex-col justify-between border-b border-r border-black bg-[#f0f0f0] p-6 transition-[filter] duration-500 hover:invert"
        >
          <div>
            <Image
              src={item.icon}
              alt=""
              width={56}
              height={56}
              className="group-hover:hidden"
            />
            <div className="hidden group-hover:block">
              <HoverArrowCircle />
            </div>
          </div>

          <div>
            <p className="font-mono text-sm tracking-[0.03rem]">{item.title}</p>
            <p className="mt-4 text-xl leading-snug">{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
