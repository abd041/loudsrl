"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Bot,
  CalendarDays,
  Circle,
  Database,
  Eye,
  FileCheck,
  FlaskConical,
  Map,
  MessagesSquare,
  Milestone,
  PackageCheck,
  Palette,
  PenTool,
  Route,
  Search,
  Smartphone,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { PillarPotentialCard } from "@/data/pillars";

export type PotentialCardItem = {
  title: string;
  description: string;
  icon: string;
};

export type PotentialCard = {
  title: string;
  summary: string;
  items: PotentialCardItem[];
};

export type PotentialAccordionCardsProps = {
  intro: string;
  cards: PillarPotentialCard[];
  allowMultipleOpen?: boolean;
};

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  interview: MessagesSquare,
  vision: Eye,
  strategy: Route,
  users: Users,
  workflow: Workflow,
  journey: Map,
  technical: Wrench,
  figma: PenTool,
  visual: Palette,
  testing: FlaskConical,
  validation: BadgeCheck,
  approval: FileCheck,
  roadmap: CalendarDays,
  deliverables: PackageCheck,
  milestones: Milestone,
  database: Database,
  smartphone: Smartphone,
  bot: Bot,
  circle: Circle,
};

export function normalizePotentialCard(card: PillarPotentialCard): PotentialCard {
  return {
    title: card.title,
    summary: card.summary,
    items: card.items.map((item, index) => ({
      title: item,
      description: card.itemDescriptions[index] ?? "",
      icon: card.itemIcons?.[index] ?? "circle",
    })),
  };
}

type AccordionCardProps = {
  card: PotentialCard;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function chunkByTwo<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

function getFlexStyle(
  index: number,
  rowStartIndex: number,
  rowLength: number,
  openIndex: number | null
): string {
  if (rowLength < 2 || openIndex === null) return "1 1 0%";

  const openInRow =
    openIndex === rowStartIndex || openIndex === rowStartIndex + 1;

  if (!openInRow) return "1 1 0%";
  if (openIndex === index) return "3.25 1 0%";
  return "0.45 2 0%";
}

function ExpandToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute right-6 top-6 z-10 flex h-6 w-6 items-center justify-center md:right-8 md:top-8 md:h-7 md:w-7",
        !isOpen && "-rotate-45 transition-transform duration-300 ease-out"
      )}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={isOpen ? "/icons/potential-close.png" : "/icons/potential-expand.png"}
        alt=""
        width={28}
        height={28}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </span>
  );
}

function AccordionCard({ card, index, isOpen, onToggle }: AccordionCardProps) {
  const panelId = `potential-card-panel-${index}`;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={onToggle}
      className="group relative h-full min-h-[260px] w-full cursor-pointer overflow-hidden bg-[#eeeeee] p-6 pr-14 text-left text-black transition-all duration-500 md:min-h-[300px] md:p-8 md:pr-16"
    >
      <ExpandToggleIcon isOpen={isOpen} />

      <div>
        <p className="font-mono text-[0.625rem] uppercase tracking-widest opacity-50">
          {card.title}
        </p>
        <p className="mt-6 text-lg leading-tight">{card.summary}</p>
      </div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 border-t border-black/10 pt-8">
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
                {card.items.map((item) => {
                  const Icon = ICONS[item.icon] ?? ICONS.circle;

                  return (
                    <div
                      key={item.title}
                      className="min-h-[220px] border-black/10 py-6 pr-6 sm:even:pl-6 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
                    >
                      <div className="mb-8 flex h-10 w-10 items-center justify-center">
                        <Icon size={24} strokeWidth={1.4} />
                      </div>

                      <h4 className="text-base leading-tight md:text-lg">
                        {item.title}
                      </h4>

                      <p className="mt-5 text-sm leading-relaxed opacity-65">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </button>
  );
}

export default function PotentialAccordionCards({
  intro,
  cards,
  allowMultipleOpen = false,
}: PotentialAccordionCardsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const normalizedCards = cards.map(normalizePotentialCard);

  function toggleCard(index: number) {
    if (allowMultipleOpen) {
      setOpenIndex((current) => (current === index ? null : index));
      return;
    }
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section className="relative z-20 bg-white px-4 py-20 text-black lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
          <div>
            <h2 className="font-mono text-4xl leading-none md:text-5xl">
              Unleash Your
              <br />
              Product&apos;s Potential
            </h2>
          </div>
          <div>
            <p className="max-w-md text-sm leading-relaxed">{intro}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          {chunkByTwo(normalizedCards).map((rowCards, rowIndex) => {
            const rowStartIndex = rowIndex * 2;

            return (
              <div
                key={rowStartIndex}
                className={cn(
                  "flex gap-6",
                  rowCards.length === 2 ? "flex-col md:flex-row" : "flex-col"
                )}
              >
                {rowCards.map((card, columnIndex) => {
                  const index = rowStartIndex + columnIndex;
                  const flexStyle = getFlexStyle(
                    index,
                    rowStartIndex,
                    rowCards.length,
                    openIndex
                  );

                  return (
                    <div
                      key={card.title}
                      className="min-w-0 w-full transition-[flex] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                      style={
                        rowCards.length === 2 ? { flex: flexStyle } : undefined
                      }
                    >
                      <AccordionCard
                        card={card}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={() => toggleCard(index)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
