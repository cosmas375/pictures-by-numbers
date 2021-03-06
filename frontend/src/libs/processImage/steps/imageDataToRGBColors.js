import { RGBA_CHANNELS_COUNT, RGBAtoRGB } from '../helpers/colorTransform';

export default function imageDataToRGBColors(imageData) {
  const len = imageData.length;
  const colors = [];
  for (let i = 0; i < len; i += RGBA_CHANNELS_COUNT) {
    colors.push(
      RGBAtoRGB({
        r: imageData[i],
        g: imageData[i + 1],
        b: imageData[i + 2],
        a: imageData[i + 3]
      })
    );
  }
  return colors;
}
