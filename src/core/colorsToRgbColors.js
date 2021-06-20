import { RGBAtoRGB } from '@/helpers/colorTransformHelper';

export default function colorsToRgbColors(colors) {
  const len = colors.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(RGBAtoRGB(colors[i]));
  }
  return result;
}
