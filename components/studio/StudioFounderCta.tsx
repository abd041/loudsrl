import Link from "next/link";

type StudioFounderCtaProps = {
  className?: string;
};

export default function StudioFounderCta({ className }: StudioFounderCtaProps) {
  return (
    <Link
      href="/contact-us?c=startup"
      className={`group inline-flex cursor-link cursor-none cursor-invert items-center gap-4 text-lg ${className ?? ""}`}
    >
      Consult with a &ldquo;Founder&rdquo; Expert
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
