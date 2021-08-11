import { RGBA_CHANNELS_COUNT } from '../helpers/colorTransform';

export default function colorsToImageData({ colors, width, height }) {
  const len = RGBA_CHANNELS_COUNT * colors.length;
  const arr = new Uint8ClampedArray(len);
  for (let i = 0; i < len; i += RGBA_CHANNELS_COUNT) {
    const color = colors[Math.floor(i / RGBA_CHANNELS_COUNT)];
    arr[i] = color.r;
    arr[i + 1] = color.g;
    arr[i + 2] = color.b;
    arr[i + 3] = 255;
  }
  return new ImageData(arr, width, height);
}
