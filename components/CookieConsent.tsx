"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("loud-cookies");
    if (!accepted) setVisible(true);
  }, []);

  const accept = (all: boolean) => {
    localStorage.setItem("loud-cookies", all ? "all" : "technical");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] border-t border-white/10 bg-[#080808]/95 p-6 backdrop-blur-md md:p-8">
      <div className="page-padding mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-white/70">
          This website uses cookies to optimize your browsing experience. You
          can choose to accept all cookies or only the technical and necessary
          ones. Check the Cookie Policy and Privacy Policy for more details.
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => accept(false)}
            className="border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.15em] transition hover:bg-white hover:text-black"
          >
            Accept only technical cookies
          </button>
          <button
            type="button"
            onClick={() => accept(true)}
            className="border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.15em] transition hover:bg-white hover:text-black"
          >
            Accept all cookies
          </button>
        </div>
      </div>
    </div>
  );
}
