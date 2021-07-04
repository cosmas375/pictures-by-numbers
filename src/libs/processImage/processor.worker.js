import imageDataToColors from './steps/imageDataToColors';
import colorsToRgbColors from './steps/colorsToRgbColors';
import generatePalette from './steps/generatePalette';
import alignColorsToPalette from './steps/alignColorsToPalette';
import colorsToMatrix from './steps/colorsToMatrix';
import smooth from './steps/smooth';
import outline from './steps/outline';
import getLabelLocations from './steps/getLabelLocations';
import matrixToColors from './steps/matrixToColors';
import rgbColorsToColors from './steps/rgbColorsToColors';
import colorsToImageData from './steps/colorsToImageData';
import { OUTLINE_COLOR } from '@/libs/processImage/settings';

const OUTLINE_PALETTE = [{ r: 255, g: 255, b: 255, a: 255 }, OUTLINE_COLOR];

onmessage = async e => {
  console.log(
    '---------------------------------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log(new Date());

  const imageData = e.data;
  const width = imageData.width;
  const height = imageData.height;

  console.log('smoothing...');
  const smoothedImage = smooth(imageData);

  console.log('extracting colors...');
  const colors = imageDataToColors(smoothedImage.data);

  console.log('converting rgba to rgb...');
  const rgbColors = colorsToRgbColors(colors);

  console.log('generating palette...');
  const palette = generatePalette(rgbColors);

  console.log('aligning colors to palette...');
  const alignedColors = alignColorsToPalette(rgbColors, palette);

  console.log('transforming colors to matrix...');
  const matrix = colorsToMatrix({
    colors: alignedColors,
    width: width,
    height: height
  });

  console.log('outlining...');
  const outlinedImage = outline(matrix);

  console.log('calculating labels locations...');
  const labelsLocations = getLabelLocations(matrix);

  console.log('transforming matrix to colors...');
  const processedRgbColors = matrixToColors(outlinedImage);

  console.log('converting rgb to rgba...');
  const processedColors = rgbColorsToColors(
    processedRgbColors,
    OUTLINE_PALETTE
  );

  console.log('creating imageData...');
  const result = colorsToImageData({
    colors: processedColors,
    width: width,
    height: height
  });

  postMessage({
    action: 'result',
    value: {
      outline: result,
      labelsLocations,
      palette,
      color: colorsToImageData({
        colors: rgbColorsToColors(matrixToColors(matrix), palette),
        width: width,
        height: height
      })
    }
  });

  console.log('Done!');
};
