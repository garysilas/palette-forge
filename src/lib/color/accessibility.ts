import type { ContrastGrade, ContrastMatrix } from "@/types/accessibility";
import type { Swatch } from "@/types/palette";

export function getContrastGrade(_ratio: number): ContrastGrade {
  throw new Error("getContrastGrade is not implemented.");
}

export function buildContrastMatrix(_swatches: Swatch[]): ContrastMatrix {
  throw new Error("buildContrastMatrix is not implemented.");
}
