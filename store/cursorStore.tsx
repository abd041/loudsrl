"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CursorColorMode = "default" | "force-white" | "grey";

type CursorState = {
  customText: string;
  showText: boolean;
  delayArrow: boolean;
  forceLink: boolean;
  forceColorMode: CursorColorMode | null;
};

type CursorStoreValue = CursorState & {
  setCursor: (patch: Partial<CursorState>) => void;
  resetCursor: () => void;
};

const defaultState: CursorState = {
  customText: "",
  showText: false,
  delayArrow: true,
  forceLink: false,
  forceColorMode: null,
};

const CursorContext = createContext<CursorStoreValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>(defaultState);

  const setCursor = useCallback((patch: Partial<CursorState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetCursor = useCallback(() => {
    setState(defaultState);
  }, []);

  const value = useMemo(
    () => ({ ...state, setCursor, resetCursor }),
    [state, setCursor, resetCursor]
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursorStore() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursorStore must be used within CursorProvider");
  }
  return ctx;
}

export function useCursorStoreOptional() {
  return useContext(CursorContext);
}
