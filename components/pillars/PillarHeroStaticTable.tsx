"use client";

import { useRouter } from "next/navigation";
import { pillars } from "@/data/pillars";
import { getNextIndex, getPrevIndex, slugToPillarIndex } from "@/lib/pillarNav";
import { cn } from "@/lib/cn";

export type PillarHeroTableGroup = {
  title: string;
  items: string[];
};

export type PillarHeroStaticTableProps = {
  slug: string;
  groups: PillarHeroTableGroup[];
  note?: string;
  isWhite?: boolean;
};

export default function PillarHeroStaticTable({
  slug,
  groups,
  note,
  isWhite = false,
}: PillarHeroStaticTableProps) {
  const router = useRouter();
  const pillarIndex = Math.max(0, slugToPillarIndex(slug));
  const prevPillar = pillars[getPrevIndex(pillarIndex, pillars.length)];
  const nextPillar = pillars[getNextIndex(pillarIndex, pillars.length)];

  const borderColor = isWhite ? "border-black/25" : "border-white/25";
  const titleColor = isWhite ? "text-black/40" : "text-white/40";
  const itemColor = isWhite ? "text-black" : "text-white";
  const arrowColor = isWhite ? "text-black/80" : "text-white/80";
  const noteColor = isWhite ? "text-black/90" : "text-white/90";

  const goToPillar = (targetSlug: string) => {
    if (targetSlug === slug) return;
    window.scrollTo(0, 0);
    router.push(`/pillars/${targetSlug}`);
  };

  const arrowButtonClass = cn(
    "pointer-events-auto absolute top-1/2 -translate-y-1/2 text-2xl opacity-80 transition-opacity hover:opacity-100 cursor-pointer",
    arrowColor
  );

  return (
    <section className="pointer-events-none relative z-30 w-full px-4 pb-5 lg:px-8 lg:pb-6">
      <div className="mx-auto max-w-[1100px]">
        <div className={cn("relative hidden border-y lg:block", borderColor)}>
          <button
            type="button"
            onClick={() => goToPillar(prevPillar.slug)}
            className={cn(arrowButtonClass, "left-2 xl:left-3")}
            aria-label={`Previous pillar: ${prevPillar.navLabel}`}
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => goToPillar(nextPillar.slug)}
            className={cn(arrowButtonClass, "right-2 xl:right-3")}
            aria-label={`Next pillar: ${nextPillar.navLabel}`}
          >
            →
          </button>

          <div className="grid grid-cols-4 pl-10 pr-10 xl:pl-12 xl:pr-12">
            {groups.map((group) => (
              <div
                key={group.title}
                className={cn(
                  "min-h-[160px] border-l px-3 py-5 xl:px-5 xl:py-6 last:border-r",
                  borderColor
                )}
              >
                <p
                  className={cn(
                    "font-mono text-[10px] tracking-widest xl:text-[11px]",
                    titleColor
                  )}
                >
                  {group.title}
                </p>

                <ul className="mt-3 space-y-2 xl:mt-4 xl:space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "text-sm leading-snug tracking-normal xl:text-[15px]",
                        itemColor
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/mobile: horizontal scroll + pillar nav arrows */}
        <div className={cn("relative border-y lg:hidden", borderColor)}>
          <button
            type="button"
            onClick={() => goToPillar(prevPillar.slug)}
            className={cn(
              "pointer-events-auto absolute left-0 top-1/2 z-10 -translate-y-1/2 px-1.5 text-xl opacity-80 transition-opacity hover:opacity-100",
              arrowColor
            )}
            aria-label={`Previous pillar: ${prevPillar.navLabel}`}
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => goToPillar(nextPillar.slug)}
            className={cn(
              "pointer-events-auto absolute right-0 top-1/2 z-10 -translate-y-1/2 px-1.5 text-xl opacity-80 transition-opacity hover:opacity-100",
              arrowColor
            )}
            aria-label={`Next pillar: ${nextPillar.navLabel}`}
          >
            →
          </button>

          <div className="no-scrollbar flex overflow-x-auto px-7">
            {groups.map((group) => (
              <div
                key={group.title}
                className={cn(
                  "min-w-[170px] shrink-0 border-r px-4 py-5 last:border-r-0",
                  borderColor
                )}
              >
                <p className={cn("font-mono text-[10px] tracking-widest", titleColor)}>
                  {group.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={cn("text-sm leading-snug", itemColor)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {note ? (
          <div
            className={cn(
              "mt-3 flex items-start gap-2 font-mono text-[9px] tracking-wide sm:mt-4 sm:text-[10px]",
              noteColor
            )}
          >
            <span className="shrink-0 text-sm sm:text-base" aria-hidden>
              ↪
            </span>
            <p>{note}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
