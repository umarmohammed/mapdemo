type color = { r: number; g: number; b: number };

function hexToRgb(hex: string): color {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(_m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

function rgbToIntensity(color: color): number {
  return color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
}

function hexToIntensity(hex: string) {
  return rgbToIntensity(hexToRgb(hex));
}

function intensityToTextColor(intensity: number): string {
  return intensity > 186 ? '#000' : '#fff';
}

export function bgHexToTextColor(hex: string) {
  return intensityToTextColor(hexToIntensity(hex));
}
