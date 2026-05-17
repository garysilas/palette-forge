import { describe, expect, it } from "vitest";
import {
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  normalizeHex,
  rgbToHex,
  rgbToHsl,
} from "@/lib/color/conversions";

describe("color conversions", () => {
  it("normalizes shorthand and mixed-case hex values", () => {
    expect(normalizeHex("#abc")).toBe("#AABBCC");
    expect(normalizeHex("  fF00aa  ")).toBe("#FF00AA");
  });

  it("rejects invalid hex strings", () => {
    expect(() => normalizeHex("#12")).toThrow(/3 or 6 hexadecimal/i);
    expect(() => normalizeHex("#12GG56")).toThrow(/hexadecimal characters/i);
  });

  it("converts hex to rgb", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#264653")).toEqual({ r: 38, g: 70, b: 83 });
  });

  it("converts rgb to hex", () => {
    expect(rgbToHex({ r: 38, g: 70, b: 83 })).toBe("#264653");
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#FFFFFF");
  });

  it("rejects out-of-range rgb values", () => {
    expect(() => rgbToHex({ r: -1, g: 0, b: 0 })).toThrow(/between 0 and 255/i);
    expect(() => rgbToHex({ r: 0, g: 256, b: 0 })).toThrow(/between 0 and 255/i);
  });

  it("converts rgb to hsl using stable palette values", () => {
    expect(rgbToHsl({ r: 38, g: 70, b: 83 })).toEqual({ h: 197, s: 37, l: 24 });
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
  });

  it("converts hsl to rgb", () => {
    expect(hslToRgb({ h: 197, s: 37, l: 24 })).toEqual({ r: 39, g: 71, b: 84 });
    expect(hslToRgb({ h: 0, s: 0, l: 100 })).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("normalizes hue values outside 0-360 when converting hsl to rgb", () => {
    expect(hslToRgb({ h: 360, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
    expect(hslToRgb({ h: -120, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255 });
  });

  it("converts between hex and hsl", () => {
    expect(hexToHsl("#264653")).toEqual({ h: 197, s: 37, l: 24 });
    expect(hslToHex({ h: 197, s: 37, l: 24 })).toBe("#274754");
  });
});
