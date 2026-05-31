import Link from "next/link";
import { dualCtaCopy, dualCtaImages } from "@/data/dualCta";
import { cn } from "@/lib/cn";

type NextConsultingNav = {
  href: string;
  title: string;
};

type DualCTAProps = {
  agencyCta?: string;
  studioCta?: string;
  studioHoverText?: string;
  variant?: "dark" | "light";
  nextConsulting?: NextConsultingNav;
};

function PointFingerIcon({ className }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M13.5 2.5c.6 0 1 .4 1 1v5.2l1.8-1.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L14.8 12l2.9 2.9c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0L13.5 13.4V20c0 .6-.4 1-1 1s-1-.4-1-1v-6.6L7.7 16.3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4L9.2 12 6.3 9.1c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l1.8 1.8V3.5c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function CardHint({ centered }: { centered?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.18em] text-black/35 transition-colors duration-500 group-hover:text-white/45",
        centered && "justify-center"
      )}
    >
      <PointFingerIcon />
      <span>Point your finger to discover how to do that</span>
    </div>
  );
}

type DualCardProps = {
  label: string;
  title: string;
  hoverText?: string;
  href: string;
  hoverImage: string;
  isLight: boolean;
};

function DualCard({
  label,
  title,
  hoverText,
  href,
  hoverImage,
  isLight,
}: DualCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate min-h-[380px] cursor-link cursor-none overflow-hidden transition-colors duration-500 md:min-h-[460px] lg:min-h-[520px]",
        isLight
          ? "cursor-invert bg-[#e5e5e5] text-black hover:cursor-force-white hover:text-white"
          : "dark-card thin-border text-white"
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{ backgroundImage: `url(${hoverImage})` }}
      />

      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-black/55 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
      />

      <div
        aria-hidden
        className={cn(
          "absolute inset-0 z-[2] transition-opacity duration-500 ease-out",
          isLight
            ? "bg-[#e5e5e5] group-hover:opacity-0"
            : "bg-[#101010] group-hover:opacity-0"
        )}
      />

      <div
        className={cn(
          "relative z-10 flex h-full min-h-[380px] flex-col justify-between p-8 transition-colors duration-500 md:min-h-[460px] md:p-10 lg:min-h-[520px]",
          isLight && "items-center text-center"
        )}
      >
        <p
          className={cn(
            "font-mono text-[0.625rem] uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-white/60",
            isLight && "self-start"
          )}
        >
          {label}
        </p>

        <div className="relative flex w-full flex-1 items-center justify-center py-6">
          <p
            className={cn(
              "max-w-md text-2xl leading-snug transition-all duration-500 md:text-[1.75rem] md:leading-snug lg:text-3xl",
              isLight && "mx-auto text-center",
              hoverText && "group-hover:opacity-0"
            )}
          >
            {title}
          </p>
          {hoverText ? (
            <p
              className={cn(
                "absolute max-w-md text-lg leading-relaxed opacity-0 transition-all duration-500 group-hover:opacity-100 md:text-xl md:leading-relaxed",
                isLight && "mx-auto text-center"
              )}
            >
              {hoverText}
            </p>
          ) : null}
        </div>

        <CardHint centered={isLight} />
      </div>
    </Link>
  );
}

export default function DualCTA({
  agencyCta = dualCtaCopy.agencyTitle,
  studioCta = dualCtaCopy.studioTitle,
  studioHoverText = dualCtaCopy.studioHoverText,
  variant = "dark",
  nextConsulting,
}: DualCTAProps) {
  const isLight = variant === "light";

  return (
    <section
      className={cn(
        "page-padding py-20 md:py-24 lg:py-28",
        isLight ? "bg-white text-black" : ""
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <DualCard
            label="LOUD AGENCY"
            title={agencyCta}
            href="/contact-us"
            hoverImage={dualCtaImages.agency}
            isLight={isLight}
          />
          <DualCard
            label="LOUD STUDIO"
            title={studioCta}
            hoverText={studioHoverText}
            href="/contact-us?c=startup"
            hoverImage={dualCtaImages.studio}
            isLight={isLight}
          />
        </div>

        {nextConsulting ? (
          <div className="mt-10 flex items-center justify-center gap-4 md:mt-12 md:gap-6">
            <span className="text-sm md:text-base">Next consulting way</span>
            <Link
              href={nextConsulting.href}
              className="inline-flex h-10 w-10 shrink-0 cursor-invert cursor-link cursor-none items-center justify-center rounded-full border border-black/25 text-lg transition-transform duration-300 hover:translate-x-0.5 md:h-11 md:w-11"
              aria-label={`Go to ${nextConsulting.title}`}
            >
              →
            </Link>
            <Link
              href={nextConsulting.href}
              className="cursor-invert cursor-link cursor-none text-sm md:text-base"
            >
              {nextConsulting.title}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
