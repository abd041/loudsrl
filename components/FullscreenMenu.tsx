"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { mainNav } from "@/data/navigation";
import { industries } from "@/data/industries";
import MediaImage from "./MediaImage";

type FullscreenMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function FullscreenMenu({ open, onClose }: FullscreenMenuProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(
    industries[0]?.image ?? null
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex bg-[#050505]"
        >
          <div className="relative hidden w-1/2 overflow-hidden lg:block">
            <AnimatePresence mode="wait">
              {hoveredImage && (
                <motion.div
                  key={hoveredImage}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <MediaImage src={hoveredImage} alt="" fill />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-1 flex-col justify-between page-padding py-8">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="cursor-close cursor-none text-sm uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-12 py-12 lg:flex-row lg:gap-24">
              <nav className="flex flex-col gap-2">
                {mainNav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setHoveredImage(null)}
                      className="huge-title block cursor-link cursor-none text-[clamp(2.5rem,8vw,5rem)] transition-opacity hover:opacity-60"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-col gap-2">
                <span className="section-label mb-4">Industries</span>
                {industries.map((industry, i) => (
                  <motion.div
                    key={industry.slug}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={`/industries/${industry.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setHoveredImage(industry.image)}
                      className="block cursor-link cursor-none text-2xl transition-opacity hover:opacity-60 md:text-3xl"
                    >
                      {industry.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-xs text-white/40">
              LOUD. Digital Product Company.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
