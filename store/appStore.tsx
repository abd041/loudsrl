"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export type LiquidBackgroundState = {
  index: number;
  isReady: boolean;
  zoom: boolean | number;
  isWhite: boolean;
  preventZoomAnimation: boolean;
};

export type HomepageState = {
  shouldAnimate: boolean;
};

type AppState = {
  liquidBackground: LiquidBackgroundState;
  homepage: HomepageState;
};

type AppAction =
  | { type: "liquid/setIndex"; index: number }
  | { type: "liquid/setIsReady"; isReady: boolean }
  | { type: "liquid/setZoom"; zoom: boolean | number }
  | { type: "liquid/setIsWhite"; isWhite: boolean }
  | { type: "liquid/setPreventZoom"; preventZoomAnimation: boolean }
  | { type: "homepage/setShouldAnimate"; shouldAnimate: boolean };

const initialState: AppState = {
  liquidBackground: {
    index: 0,
    isReady: false,
    zoom: false,
    isWhite: false,
    preventZoomAnimation: false,
  },
  homepage: {
    shouldAnimate: true,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "liquid/setIndex":
      return {
        ...state,
        liquidBackground: { ...state.liquidBackground, index: action.index },
      };
    case "liquid/setIsReady":
      return {
        ...state,
        liquidBackground: { ...state.liquidBackground, isReady: action.isReady },
      };
    case "liquid/setZoom":
      return {
        ...state,
        liquidBackground: { ...state.liquidBackground, zoom: action.zoom },
      };
    case "liquid/setIsWhite":
      return {
        ...state,
        liquidBackground: { ...state.liquidBackground, isWhite: action.isWhite },
      };
    case "liquid/setPreventZoom":
      return {
        ...state,
        liquidBackground: {
          ...state.liquidBackground,
          preventZoomAnimation: action.preventZoomAnimation,
        },
      };
    case "homepage/setShouldAnimate":
      return {
        ...state,
        homepage: { ...state.homepage, shouldAnimate: action.shouldAnimate },
      };
    default:
      return state;
  }
}

type AppStoreValue = AppState & {
  setIndex: (index: number) => void;
  setIsReady: (isReady: boolean) => void;
  setZoom: (zoom: boolean | number) => void;
  setIsWhite: (isWhite: boolean) => void;
  setPreventZoom: (preventZoomAnimation: boolean) => void;
  setShouldAnimate: (shouldAnimate: boolean) => void;
};

const AppStoreContext = createContext<AppStoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setIndex = useCallback((index: number) => {
    dispatch({ type: "liquid/setIndex", index });
  }, []);

  const setIsReady = useCallback((isReady: boolean) => {
    dispatch({ type: "liquid/setIsReady", isReady });
  }, []);

  const setZoom = useCallback((zoom: boolean | number) => {
    dispatch({ type: "liquid/setZoom", zoom });
  }, []);

  const setIsWhite = useCallback((isWhite: boolean) => {
    dispatch({ type: "liquid/setIsWhite", isWhite });
  }, []);

  const setPreventZoom = useCallback((preventZoomAnimation: boolean) => {
    dispatch({ type: "liquid/setPreventZoom", preventZoomAnimation });
  }, []);

  const setShouldAnimate = useCallback((shouldAnimate: boolean) => {
    dispatch({ type: "homepage/setShouldAnimate", shouldAnimate });
  }, []);

  const value = useMemo<AppStoreValue>(
    () => ({
      ...state,
      setIndex,
      setIsReady,
      setZoom,
      setIsWhite,
      setPreventZoom,
      setShouldAnimate,
    }),
    [state, setIndex, setIsReady, setZoom, setIsWhite, setPreventZoom, setShouldAnimate]
  );

  return (
    <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) {
    throw new Error("useAppStore must be used within AppStoreProvider");
  }
  return ctx;
}

export function useAppStoreOptional() {
  return useContext(AppStoreContext);
}
