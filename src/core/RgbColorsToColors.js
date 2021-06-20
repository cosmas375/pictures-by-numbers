import { RGBtoRGBA } from '@/helpers/colorTransformHelper';

export default function RgbColorsToColors(colors) {
  const len = colors.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(RGBtoRGBA(colors[i]));
  }
  return result;
}
