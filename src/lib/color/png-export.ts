import type { Swatch } from "@/types/palette";

export type PngExportOptions = {
  width?: number;
  height?: number;
};

export async function exportPalettePng(
  _swatches: Swatch[],
  _options: PngExportOptions = {},
): Promise<Blob> {
  throw new Error("exportPalettePng is not implemented.");
}
