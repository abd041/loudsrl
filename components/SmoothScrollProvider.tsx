"use client";

import { useEffect } from "react";
import { registerGsap } from "@/lib/animations";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    registerGsap();
  }, []);

  return <>{children}</>;
}
