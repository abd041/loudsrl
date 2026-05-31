"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { industries } from "@/data/industries";
import MediaImage from "./MediaImage";

type ShowIndustriesMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function ShowIndustriesMenu({
  open,
  onClose,
}: ShowIndustriesMenuProps) {
  const [hoveredImage, setHoveredImage] = useState<string>(industries[0].image);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[55] bg-[#050505]"
        >
          <div className="flex h-full flex-col lg:flex-row">
            <div className="relative hidden flex-1 lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <MediaImage src={hoveredImage} alt="" fill />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-1 flex-col justify-between page-padding py-8">
              <button
                type="button"
                onClick={onClose}
                className="self-end text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white"
              >
                Close
              </button>

              <div className="flex flex-col gap-4 py-12">
                <span className="section-label">Industries</span>
                {industries.map((industry, i) => (
                  <motion.div
                    key={industry.slug}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={`/industries/${industry.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setHoveredImage(industry.image)}
                      className="section-title block transition-opacity hover:opacity-60"
                    >
                      {industry.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
