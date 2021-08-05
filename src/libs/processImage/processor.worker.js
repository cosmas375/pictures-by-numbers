import imageDataToColors from './steps/imageDataToColors';
import colorsToRgbColors from './steps/colorsToRgbColors';
import generatePalette from './steps/generatePalette';
import alignColorsToPalette from './steps/alignColorsToPalette';
import colorsToMatrix from './steps/colorsToMatrix';
import smoothImage from './steps/smoothImage';
import outlineImage from './steps/outlineImage';
import getLabelLocations from './steps/getLabelLocations';
import matrixToColors from './steps/matrixToColors';
import rgbColorsToColors from './steps/rgbColorsToColors';
import colorsToImageData from './steps/colorsToImageData';
import { log } from '@/libs/processImage/helpers/loggingHelper';
import { OUTLINE_COLOR } from '@/libs/processImage/settings';

const OUTLINE_PALETTE = [{ r: 255, g: 255, b: 255, a: 255 }, OUTLINE_COLOR];

onmessage = async e => {
  log(`------------------ ${new Date()} ------------------`);

  const imageData = e.data;
  const width = imageData.width;
  const height = imageData.height;

  log('smoothing...');
  const smoothedImage = smoothImage(imageData);

  log('extracting colors...');
  const colors = imageDataToColors(smoothedImage.data);

  log('converting rgba to rgb...');
  const rgbColors = colorsToRgbColors(colors);

  log('generating palette...');
  const palette = generatePalette(rgbColors);

  log('aligning colors to palette...');
  const alignedColors = alignColorsToPalette(rgbColors, palette);

  log('generating preview...');
  const preview = colorsToImageData({
    colors: rgbColorsToColors(alignedColors, palette),
    width: width,
    height: height
  });

  postMessage({
    type: 'preview',
    data: {
      preview,
      palette
    }
  });

  log('transforming colors to matrix...');
  const matrix = colorsToMatrix({
    colors: alignedColors,
    width: width,
    height: height
  });

  log('outlining...');
  const outlinedImage = outlineImage(matrix);

  log('generating outlined image...');
  const outline = colorsToImageData({
    colors: rgbColorsToColors(matrixToColors(outlinedImage), OUTLINE_PALETTE),
    width: width,
    height: height
  });

  log('calculating labels locations...');
  const labelsLocations = getLabelLocations(matrix);

  postMessage({
    type: 'result',
    data: {
      outline,
      labelsLocations,
      palette,
      preview
    }
  });

  log('Done!');
};
