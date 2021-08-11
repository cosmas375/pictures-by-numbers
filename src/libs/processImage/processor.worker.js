import imageDataToRGBColors from './steps/imageDataToRGBColors';
import generatePalette from './steps/generatePalette';
import alignColorsToPalette from './steps/alignColorsToPalette';
import colorsToMatrix from './steps/colorsToMatrix';
import smoothImage from './steps/smoothImage';
import outlineImage from './steps/outlineImage';
import getLabelLocations from './steps/getLabelLocations';
import colorsToImageData from './steps/colorsToImageData';
import paletteToColors from './steps/paletteToColors';
import { log } from '@/libs/processImage/helpers/loggingHelper';
import flat from '@/libs/processImage/helpers/flat';

const emit = postMessage;

onmessage = async e => {
  log(`------------------ ${new Date()} ------------------`);

  const imageData = e.data;
  const width = imageData.width;
  const height = imageData.height;

  log('smoothing...');
  const smoothedImage = smoothImage(imageData);

  log('extracting colors...');
  const rgbColors = imageDataToRGBColors(smoothedImage.data);

  log('generating palette...');
  const palette = generatePalette(rgbColors);

  emit({
    type: 'palette',
    data: palette
  });

  log('aligning colors to palette...');
  const alignedColors = alignColorsToPalette(rgbColors, palette);

  log('generating preview...');
  const preview = colorsToImageData({
    colors: paletteToColors(alignedColors, palette),
    width: width,
    height: height
  });

  emit({
    type: 'preview',
    data: preview
  });

  log('transforming colors to matrix...');
  const colorsMatrix = colorsToMatrix({
    colors: alignedColors,
    width: width,
    height: height
  });

  log('outlining...');
  const outlineMatrix = outlineImage(colorsMatrix);

  log('calculating labels locations...');
  const labelsLocations = getLabelLocations(colorsMatrix);

  emit({
    type: 'outline',
    data: {
      image: { data: flat(outlineMatrix), width, height },
      labelsLocations
    }
  });

  log('Done!');
};
