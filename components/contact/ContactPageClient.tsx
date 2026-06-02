"use client";

import { useLayoutEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LogoWall from "@/components/LogoWall";
import ProjectCardsRow, {
  projectCardsFromSlugs,
} from "@/components/shared/ProjectCardsRow";
import ContactFormGrid from "@/components/contact/ContactFormGrid";
import ContactStepsSection from "@/components/contact/ContactStepsSection";
import {
  contactFeatured,
  contactTabs,
  type ContactTabId,
} from "@/data/contact";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

function getActiveTab(c?: string | null): ContactTabId {
  if (c === "startup") return "startup";
  if (c === "career") return "career";
  return "business";
}

const TAB_TEXT =
  "!font-dm font-light text-2xl tracking-[-0.125rem] transition-opacity duration-300 [word-spacing:-0.3125rem] md:text-4xl lg:[word-spacing:-0.625rem]";

const STRIKE_LINE =
  "pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] origin-center translate-y-[2px] bg-black/30 transition-transform duration-200";

function tabIndicatorColor(tab: ContactTabId): string {
  return tab === "career" ? "bg-[#AD8AEC]" : "bg-[#4E71FF]";
}

export default function ContactPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = getActiveTab(searchParams.get("c"));
  const featured = contactFeatured[activeTab];

  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<ContactTabId, HTMLButtonElement | null>>({
    business: null,
    startup: null,
    career: null,
  });
  const indicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = tabBarRef.current;
    const indicator = indicatorRef.current;
    const active = tabRefs.current[activeTab];
    if (!bar || !indicator || !active) return;

    const barRect = bar.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - barRect.left}px)`;
    indicator.style.backgroundColor =
      activeTab === "career" ? "rgb(173, 138, 236)" : "rgb(78, 113, 255)";
  }, [activeTab]);

  const setTab = (id: ContactTabId, href: string) => {
    router.push(href, { scroll: false });
  };

  return (
    <>
      <Header showBack scrollWithPage isWhiteBg />
      <main
        id="main-content"
        className="-mt-[72px] min-h-screen cursor-invert bg-white text-black md:-mt-[88px]"
      >
        <div className="pb-16 md:pb-20">
          <div className="pt-24 md:pt-36 lg:px-10">
            <p className="mb-6 px-4 !font-dm text-xs leading-[115%] opacity-50 sm:leading-[135%] md:mb-2 lg:px-0">
              FIRST STEP OF OUR RELATIONSHIP :)
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="grow overflow-hidden pb-2">
                  <div className="flex h-full w-full max-w-full justify-center">
                    <div
                      ref={tabBarRef}
                      className="relative flex w-full max-w-full items-end gap-3"
                    >
                      <div className="no-scrollbar flex max-w-full grow flex-wrap items-end gap-6 overflow-x-auto overflow-y-hidden px-4 sm:flex-nowrap lg:px-0">
                        {contactTabs.map((tab) => {
                          const isActive = activeTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              ref={(el) => {
                                tabRefs.current[tab.id] = el;
                              }}
                              onClick={() => setTab(tab.id, tab.href)}
                              className="relative shrink-0 cursor-pointer"
                            >
                              <p
                                className={cn(
                                  TAB_TEXT,
                                  "text-black"
                                )}
                                style={{ opacity: isActive ? 1 : 0.3 }}
                              >
                                {tab.label}
                              </p>
                              <div
                                className={cn(
                                  STRIKE_LINE,
                                  isActive ? "scale-x-0" : "scale-x-100"
                                )}
                                aria-hidden
                              />
                            </button>
                          );
                        })}
                      </div>
                      <div
                        ref={indicatorRef}
                        className={cn(
                          "absolute -bottom-1.5 left-0 h-1 rounded opacity-100 transition-[transform,width] duration-200 ease-out",
                          tabIndicatorColor(activeTab)
                        )}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden shrink-0 flex-col items-end justify-end gap-1.5 whitespace-nowrap lg:flex">
                <p className="text-xs font-medium leading-[115%] tracking-[0.03rem] sm:leading-[135%]">
                  Hate contact forms?
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-lg !font-dm leading-[115%] text-black opacity-50 transition-opacity hover:opacity-70 sm:leading-[135%]"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <ContactFormGrid mode={activeTab} />

            <div className="mt-8 flex flex-col items-center justify-center gap-1.5 whitespace-nowrap px-4 lg:hidden">
              <p className="text-xs font-medium leading-[115%] tracking-[0.03rem] sm:leading-[135%]">
                Hate contact forms?
              </p>
              <a
                href={`mailto:${site.email}`}
                className="text-lg !font-dm leading-[115%] text-black opacity-50 sm:leading-[135%]"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <ContactStepsSection />

        <ProjectCardsRow
          key={activeTab}
          projects={projectCardsFromSlugs(featured)}
          embedded
          labelMode="studio"
          parityVariant="contact-live"
        />

        <LogoWall variant="light" sectionLayout="contact" />
      </main>
      <Footer />
    </>
  );
}
