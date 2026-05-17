import type { HarmonyType, Swatch } from "@/types/palette";

export const HARMONY_OPTIONS: HarmonyType[] = [
  "complementary",
  "monochromatic",
  "shades-tints",
];

export const PLACEHOLDER_SWATCHES: Swatch[] = [
  {
    id: "swatch-1",
    hex: "#264653",
    rgb: { r: 38, g: 70, b: 83 },
    hsl: { h: 197, s: 37, l: 24 },
    locked: false,
  },
  {
    id: "swatch-2",
    hex: "#2A9D8F",
    rgb: { r: 42, g: 157, b: 143 },
    hsl: { h: 173, s: 58, l: 39 },
    locked: false,
  },
  {
    id: "swatch-3",
    hex: "#E9C46A",
    rgb: { r: 233, g: 196, b: 106 },
    hsl: { h: 43, s: 74, l: 66 },
    locked: true,
  },
  {
    id: "swatch-4",
    hex: "#F4A261",
    rgb: { r: 244, g: 162, b: 97 },
    hsl: { h: 27, s: 87, l: 67 },
    locked: false,
  },
  {
    id: "swatch-5",
    hex: "#E76F51",
    rgb: { r: 231, g: 111, b: 81 },
    hsl: { h: 12, s: 76, l: 61 },
    locked: false,
  },
];
