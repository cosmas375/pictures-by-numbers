import { LABELS_FONT_SIZE, OUTLINE_COLOR } from '@/libs/processImage/settings';

export default function generateImage(
  imageData,
  labelsLocations = [],
  { displayNumbers, outlineColor = OUTLINE_COLOR } = {}
) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);

    const len = labelsLocations.length;
    if (displayNumbers && len) {
      ctx.font = `${LABELS_FONT_SIZE}px Georgia`;
      ctx.fillStyle = `rgb(${outlineColor.r}, ${outlineColor.g}, ${outlineColor.b})`;
      const labelsOffset = LABELS_FONT_SIZE / 2;
      for (var i = 0; i < len; i++) {
        ctx.fillText(
          labelsLocations[i].value,
          labelsLocations[i].x - labelsOffset,
          labelsLocations[i].y + labelsOffset
        );
      }
    }

    const img = document.createElement('img');
    img.src = canvas.toDataURL();
    canvas.remove();
    img.onload = () =>
      resolve({
        src: img.src,
        width: imageData.width,
        height: imageData.height
      });
  });
}
