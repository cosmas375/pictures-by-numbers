export default function alignColorsToPalette(colors, palette) {
  const len = colors.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(getNearestColorFromPalette(colors[i], palette));
  }
  return result;
}

function getNearestColorFromPalette(color, palette) {
  let nearestColorIndex;
  let minDiff = Infinity;
  const len = palette.length;

  for (let i = 0; i < len; i++) {
    const paletteColor = palette[i];

    const diff =
      (paletteColor.r - color.r) ** 2 +
      (paletteColor.g - color.g) ** 2 +
      (paletteColor.b - color.b) ** 2;

    if (diff < minDiff) {
      nearestColorIndex = i;
      minDiff = diff;
    }
  }

  return nearestColorIndex;
}
