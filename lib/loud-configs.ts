import {
  LIQUID_PRESETS,
  HOME_LIQUID_PRESET,
  clampPresetIndex,
  type LiquidPreset,
} from "@/data/liquidPresets";

export {
  LIQUID_PRESETS,
  HOME_LIQUID_PRESET,
  clampPresetIndex,
  type LiquidPreset,
};

/** @deprecated Use LIQUID_PRESETS from @/data/liquidPresets */
export const LOUD_PRESETS = LIQUID_PRESETS;
/** @deprecated Use HOME_LIQUID_PRESET from @/data/liquidPresets */
export const HOME_PRESET = HOME_LIQUID_PRESET;

export type LoudShaderConfig = LiquidPreset;
