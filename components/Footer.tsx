import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { footer } from "@/data/footer";

function CircleArrowIcon() {
  return (
    <svg
      viewBox="0 0 50 50"
      width={32}
      height={32}
      className="shrink-0 fill-none stroke-current"
      aria-hidden
    >
      <circle cx="25" cy="25" r="24" stroke="currentColor" fill="none" strokeWidth={1} />
      <g transform="translate(7, 10) scale(1)">
        <path d="M 9 15 L 27.45 15" fill="none" stroke="currentColor" strokeWidth={1} />
        <path d="M 27 15 L 21 9" fill="none" stroke="currentColor" strokeWidth={1} />
        <path d="M 27 15 L 21 21" fill="none" stroke="currentColor" strokeWidth={1} />
      </g>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative cursor-force-white overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.04),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(0,0,0,0.35),transparent_50%)]"
      />

      <div className="relative z-10 border-b border-white/30">
        <div className="page-padding mx-auto flex max-w-6xl min-h-[200px] flex-col justify-between gap-10 pb-12 pt-10 md:min-h-[280px] md:flex-row md:items-end lg:min-h-[400px] lg:py-20">
          <h2 className="max-w-[320px] font-mono text-3xl font-light leading-[1.05] tracking-tighter lg:text-6xl">
            {footer.ctaTitleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <Link
            href={footer.ctaHref}
            className="link-hover flex w-full cursor-link items-center gap-4 text-lg font-light tracking-[0.03em] md:w-max md:gap-6 md:text-2xl"
          >
            {footer.ctaLink}
            <CircleArrowIcon />
          </Link>
        </div>
      </div>

      <div className="relative z-10 grid border-b border-white/30 md:grid-cols-3">
        <div className="border-b border-white/30 px-4 py-6 md:border-b-0 md:border-r md:p-10">
          <p className="mb-2.5 font-mono text-xs uppercase tracking-widest text-white/50">
            Social
          </p>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {footerNav.social.map((item) => (
              <li key={item.label} className="text-xs font-medium">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover cursor-link py-2.5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-b border-white/30 px-4 py-6 md:border-b-0 md:border-r md:p-10">
          <p className="mb-2.5 font-mono text-xs uppercase tracking-widest text-white/50">
            LOUD
          </p>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {footerNav.loud.map((item) => (
              <li key={item.label} className="text-xs font-medium">
                <Link href={item.href} className="link-hover cursor-link py-2.5">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 py-6 md:p-10">
          <p className="mb-2.5 font-mono text-xs uppercase tracking-widest text-white/50">
            Contact
          </p>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {footerNav.contact.map((item) => (
              <li key={item.label} className="text-xs font-medium">
                <Link href={item.href} className="link-hover cursor-link py-2.5">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-4 px-4 py-6 text-xs md:flex-row md:items-center md:justify-between lg:px-20">
        <p className="flex-1 text-start">{footer.copyright}</p>
        <p className="flex-1 text-start leading-relaxed text-white/90 md:text-center">
          {footer.legal}
        </p>
        <p className="flex-1 text-start md:text-end">{footer.tagline}</p>
      </div>
    </footer>
  );
}
