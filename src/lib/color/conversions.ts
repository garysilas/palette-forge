import type { HSL, RGB } from "@/types/palette";
import type { ColorHex } from "@/lib/color/color-types";

const HEX_SHORT_LENGTH = 3;
const HEX_LONG_LENGTH = 6;
const RGB_CHANNEL_MIN = 0;
const RGB_CHANNEL_MAX = 255;
const HSL_CHANNEL_MIN = 0;
const HSL_CHANNEL_MAX = 100;
const HUE_MAX = 360;

function assertFiniteNumber(value: number, label: string) {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
}

function normalizeRgbChannel(value: number, label: string) {
  assertFiniteNumber(value, label);

  const normalizedValue = Math.round(value);

  if (normalizedValue < RGB_CHANNEL_MIN || normalizedValue > RGB_CHANNEL_MAX) {
    throw new Error(`${label} must be between 0 and 255.`);
  }

  return normalizedValue;
}

function normalizePercent(value: number, label: string) {
  assertFiniteNumber(value, label);

  if (value < HSL_CHANNEL_MIN || value > HSL_CHANNEL_MAX) {
    throw new Error(`${label} must be between 0 and 100.`);
  }

  return value;
}

function normalizeHueValue(value: number) {
  assertFiniteNumber(value, "Hue");

  const normalizedValue = value % HUE_MAX;

  return normalizedValue < 0 ? normalizedValue + HUE_MAX : normalizedValue;
}

function normalizeHsl(hsl: HSL): HSL {
  return {
    h: normalizeHueValue(hsl.h),
    s: normalizePercent(hsl.s, "Saturation"),
    l: normalizePercent(hsl.l, "Lightness"),
  };
}

export function normalizeHex(hex: string): ColorHex {
  const trimmedHex = hex.trim().replace(/^#/, "");

  if (trimmedHex.length !== HEX_SHORT_LENGTH && trimmedHex.length !== HEX_LONG_LENGTH) {
    throw new Error("HEX colors must be either 3 or 6 hexadecimal characters.");
  }

  if (!/^[\da-fA-F]+$/.test(trimmedHex)) {
    throw new Error("HEX colors may only include hexadecimal characters.");
  }

  const expandedHex =
    trimmedHex.length === HEX_SHORT_LENGTH
      ? trimmedHex
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : trimmedHex;

  return `#${expandedHex.toUpperCase()}`;
}

export function hexToRgb(hex: string): RGB {
  const normalizedHex = normalizeHex(hex);

  return {
    r: Number.parseInt(normalizedHex.slice(1, 3), 16),
    g: Number.parseInt(normalizedHex.slice(3, 5), 16),
    b: Number.parseInt(normalizedHex.slice(5, 7), 16),
  };
}

export function rgbToHex(rgb: RGB): ColorHex {
  const red = normalizeRgbChannel(rgb.r, "Red");
  const green = normalizeRgbChannel(rgb.g, "Green");
  const blue = normalizeRgbChannel(rgb.b, "Blue");

  return `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0").toUpperCase())
    .join("")}`;
}

export function rgbToHsl(rgb: RGB): HSL {
  const red = normalizeRgbChannel(rgb.r, "Red") / RGB_CHANNEL_MAX;
  const green = normalizeRgbChannel(rgb.g, "Green") / RGB_CHANNEL_MAX;
  const blue = normalizeRgbChannel(rgb.b, "Blue") / RGB_CHANNEL_MAX;

  const maxChannel = Math.max(red, green, blue);
  const minChannel = Math.min(red, green, blue);
  const chroma = maxChannel - minChannel;
  const lightness = (maxChannel + minChannel) / 2;

  let hue = 0;
  let saturation = 0;

  if (chroma !== 0) {
    saturation = chroma / (1 - Math.abs(2 * lightness - 1));

    switch (maxChannel) {
      case red:
        hue = ((green - blue) / chroma) % 6;
        break;
      case green:
        hue = (blue - red) / chroma + 2;
        break;
      default:
        hue = (red - green) / chroma + 4;
        break;
    }
  }

  return {
    h: Math.round(normalizeHueValue(hue * 60)),
    s: Math.round(saturation * HSL_CHANNEL_MAX),
    l: Math.round(lightness * HSL_CHANNEL_MAX),
  };
}

export function hslToRgb(hsl: HSL): RGB {
  const normalizedHsl = normalizeHsl(hsl);
  const saturation = normalizedHsl.s / HSL_CHANNEL_MAX;
  const lightness = normalizedHsl.l / HSL_CHANNEL_MAX;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const hueSegment = normalizedHsl.h / 60;
  const secondaryComponent = chroma * (1 - Math.abs((hueSegment % 2) - 1));
  const matchLightness = lightness - chroma / 2;

  let redPrime = 0;
  let greenPrime = 0;
  let bluePrime = 0;

  if (hueSegment >= 0 && hueSegment < 1) {
    redPrime = chroma;
    greenPrime = secondaryComponent;
  } else if (hueSegment >= 1 && hueSegment < 2) {
    redPrime = secondaryComponent;
    greenPrime = chroma;
  } else if (hueSegment >= 2 && hueSegment < 3) {
    greenPrime = chroma;
    bluePrime = secondaryComponent;
  } else if (hueSegment >= 3 && hueSegment < 4) {
    greenPrime = secondaryComponent;
    bluePrime = chroma;
  } else if (hueSegment >= 4 && hueSegment < 5) {
    redPrime = secondaryComponent;
    bluePrime = chroma;
  } else {
    redPrime = chroma;
    bluePrime = secondaryComponent;
  }

  return {
    r: normalizeRgbChannel((redPrime + matchLightness) * RGB_CHANNEL_MAX, "Red"),
    g: normalizeRgbChannel((greenPrime + matchLightness) * RGB_CHANNEL_MAX, "Green"),
    b: normalizeRgbChannel((bluePrime + matchLightness) * RGB_CHANNEL_MAX, "Blue"),
  };
}

export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

export function hslToHex(hsl: HSL): ColorHex {
  return rgbToHex(hslToRgb(hsl));
}
