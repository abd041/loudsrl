"use client";

import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { footer } from "@/data/footer";
import { cn } from "@/lib/cn";

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

const COL_HEADER = "!font-dm text-xs text-white/50 mb-2.5";
const COL_LINK_LI = "font-medium text-xs cursor-link";
const COL_LINK_A = "py-2.5 transition-opacity duration-300 hover:opacity-60";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full cursor-force-white overflow-x-hidden bg-black/50 font-dmsans text-white">
        <div className="relative z-10 border-b border-white/30">
          <div
            className={cn(
              "md:min-h-[200px] lg:min-h-[400px] xl:max-w-6xl xl:mx-auto",
              "flex flex-col gap-10 p-10 px-4 pb-12 md:flex-row",
              "items-end justify-between lg:px-20 xl:px-4"
            )}
          >
            <p
              className={cn(
                "!font-dm w-full text-start font-light",
                "text-3xl md:max-w-[300px] lg:text-6xl lg:tracking-tighter"
              )}
            >
              {footer.ctaTitle}
            </p>

            <Link
              href={footer.ctaHref}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 font-light",
                "text-lg leading-[120%] tracking-[0.03rem]",
                "transition-opacity duration-300 hover:opacity-60",
                "sm:leading-[140%] md:w-max md:gap-6 md:text-2xl"
              )}
            >
              {footer.ctaLink}
              <CircleArrowIcon />
            </Link>
          </div>
        </div>

        <div className="relative z-10">
          <div className="grid border-b border-white/30 bg-black/30 md:grid-cols-3 lg:px-10">
            <div className="px-4 py-6 md:pr-10 lg:p-10">
              <p className={COL_HEADER}>SOCIAL</p>
              <nav aria-label="Social links">
                <ul className="flex flex-wrap justify-start gap-x-10 gap-y-4">
                  {footerNav.social.map((item) => (
                    <li key={item.label} className={COL_LINK_LI}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={COL_LINK_A}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="border-y border-white/30 px-4 py-6 md:border-x md:border-y-0 md:p-10">
              <p className={COL_HEADER}>LOUD</p>
              <nav aria-label="LOUD navigation">
                <ul className="flex flex-wrap justify-start gap-x-10 gap-y-4">
                  {footerNav.loud.map((item) => (
                    <li key={item.label} className={COL_LINK_LI}>
                      <Link href={item.href} className={COL_LINK_A}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="px-4 py-6 md:pl-10 lg:p-10">
              <p className={COL_HEADER}>CONTACT</p>
              <nav aria-label="Contact links">
                <ul className="flex flex-wrap justify-start gap-x-10 gap-y-4">
                  {footerNav.contact.map((item) => (
                    <li key={item.label} className={COL_LINK_LI}>
                      <Link href={item.href} className={COL_LINK_A}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col gap-4 bg-black/30 p-4 py-6 text-xs",
              "md:flex-row md:pb-12 md:pt-4 lg:px-20"
            )}
          >
            <p className="flex-1 text-start">{footer.copyright}</p>
            <p className="flex-1 text-start md:text-center">{footer.legal}</p>
            <p className="flex-1 text-start md:text-end">{footer.tagline}</p>
          </div>
        </div>
    </footer>
  );
}
