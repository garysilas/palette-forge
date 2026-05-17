import type { HSL, RGB } from "@/types/palette";
import type { ColorHex } from "@/lib/color/color-types";

export function normalizeHex(_hex: string): ColorHex {
  throw new Error("normalizeHex is not implemented.");
}

export function hexToRgb(_hex: string): RGB {
  throw new Error("hexToRgb is not implemented.");
}

export function rgbToHex(_rgb: RGB): ColorHex {
  throw new Error("rgbToHex is not implemented.");
}

export function rgbToHsl(_rgb: RGB): HSL {
  throw new Error("rgbToHsl is not implemented.");
}

export function hslToRgb(_hsl: HSL): RGB {
  throw new Error("hslToRgb is not implemented.");
}

export function hexToHsl(_hex: string): HSL {
  throw new Error("hexToHsl is not implemented.");
}

export function hslToHex(_hsl: HSL): ColorHex {
  throw new Error("hslToHex is not implemented.");
}
