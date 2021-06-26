import { RGBtoRGBA } from '../helpers/colorTransform';

export default function RgbColorsToColors(colors, palette) {
  const len = colors.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(RGBtoRGBA(palette[colors[i]]));
  }
  return result;
}
