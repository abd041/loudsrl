export type LiquidPreset = {
  spinRotation: number;
  spinSpeed: number;
  colour1: string;
  colour2: string;
  colour3: string;
  contrast: number;
  lighting: number;
  spinAmount: number;
  pixelFilter: number;
  grainStrength: number;
  useGrain: boolean;
  effectDepth: number;
  zoom?: number;
};

export const LIQUID_PRESETS: LiquidPreset[] = [
  {
    spinRotation: 0,
    spinSpeed: 2,
    colour1: "#0d0d39",
    colour2: "#717184",
    colour3: "#000000",
    contrast: 5.5,
    lighting: 0.4,
    spinAmount: 0.25,
    pixelFilter: 10000,
    grainStrength: 0.2,
    useGrain: false,
    effectDepth: 10,
  },
  {
    spinRotation: 3,
    spinSpeed: 10,
    colour1: "#CF907B",
    colour2: "#DDB1A3",
    colour3: "#CF907B",
    contrast: 1.5,
    lighting: 0,
    spinAmount: 0.85,
    pixelFilter: 10000,
    grainStrength: 0.2,
    useGrain: false,
    effectDepth: 4,
  },
  {
    spinRotation: 0,
    spinSpeed: 0,
    colour1: "#9BABE9",
    colour2: "#637FDC",
    colour3: "#7F96E3",
    contrast: 2,
    lighting: 0.3,
    spinAmount: 0,
    pixelFilter: 10000,
    grainStrength: 0.5,
    useGrain: false,
    effectDepth: 5,
    zoom: 10,
  },
  {
    spinRotation: 1,
    spinSpeed: 1,
    colour1: "#89A3BD",
    colour2: "#57687F",
    colour3: "#000000",
    contrast: 3.5,
    lighting: 0.2,
    spinAmount: 2.5,
    pixelFilter: 10000,
    grainStrength: 0.2,
    useGrain: true,
    effectDepth: 2,
  },
  {
    spinRotation: 0,
    spinSpeed: 0.5,
    colour1: "#C5ACCA",
    colour2: "#9780A8",
    colour3: "#806A97",
    contrast: 0.8,
    lighting: 0.2,
    spinAmount: 0.25,
    pixelFilter: 10,
    grainStrength: 0.2,
    useGrain: false,
    effectDepth: 7,
    zoom: 100,
  },
  {
    spinRotation: 0,
    spinSpeed: 2,
    colour1: "#fffffc",
    colour2: "#eeeee9",
    colour3: "#ddddda",
    contrast: 3,
    lighting: 0.15,
    spinAmount: 0.15,
    pixelFilter: 10000,
    grainStrength: 0.2,
    useGrain: false,
    effectDepth: 4,
  },
  {
    spinRotation: 0,
    spinSpeed: 10,
    colour1: "#00ffff",
    colour2: "#FF33FF",
    colour3: "#000000",
    contrast: 8,
    lighting: 0.05,
    spinAmount: 3,
    pixelFilter: 30,
    grainStrength: 1,
    useGrain: true,
    effectDepth: 3,
    zoom: 50,
  },
];

export const HOME_LIQUID_PRESET = LIQUID_PRESETS[0];

export function clampPresetIndex(index: number): number {
  return Math.max(0, Math.min(index, LIQUID_PRESETS.length - 1));
}

/** Presets like Design: no spin — transition is driven by zoom + colour. */
export function isZoomLedPreset(preset: LiquidPreset): boolean {
  return preset.spinSpeed === 0 && preset.spinAmount === 0;
}
