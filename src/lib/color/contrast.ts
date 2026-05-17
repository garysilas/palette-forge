import type { RGB } from "@/types/palette";

export function relativeLuminance(_rgb: RGB): number {
  throw new Error("relativeLuminance is not implemented.");
}

export function contrastRatio(_colorA: RGB, _colorB: RGB): number {
  throw new Error("contrastRatio is not implemented.");
}
