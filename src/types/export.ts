export type ExportFormat = "png" | "hex" | "rgb" | "hsl";

export type ExportRecordInput = {
  paletteId: string;
  format: ExportFormat;
  metadata?: string;
};
