export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

export type Swatch = {
  id: string;
  hex: string;
  rgb: RGB;
  hsl: HSL;
  locked: boolean;
};

export type HarmonyType = "complementary" | "monochromatic" | "shades-tints";

export type AdjustmentValues = {
  temperature: number;
  saturation: number;
  lightness: number;
  contrast: number;
};

export type PaletteColorData = {
  version: 1;
  swatches: Swatch[];
  adjustments?: AdjustmentValues;
};

export type GeneratePaletteInput = {
  seedColor?: string;
  harmonyType: HarmonyType;
  lockedSwatches?: Swatch[];
  size?: 5;
};

export type GeneratePaletteResult = {
  swatches: Swatch[];
  seedColor: string;
  harmonyType: HarmonyType;
};
