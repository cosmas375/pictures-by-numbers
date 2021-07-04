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

const OUTLINE_PALETTE = [
  { r: 255, g: 255, b: 255, a: 255 },
  { r: 0, g: 0, b: 0, a: 255 }
];

onmessage = async e => {
  console.log(
    '---------------------------------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log(new Date());

  const imageData = e.data;

  console.log('extracting colors...');
  const colors = imageDataToColors(imageData.data);

  console.log('converting rgba to rgb...');
  const rgbColors = colorsToRgbColors(colors);

  console.log('generating palette...');
  const palette = generatePalette(rgbColors);

  console.log('aligning colors to palette...');
  const alignedColors = alignColorsToPalette(rgbColors, palette);

  console.log('transforming colors to matrix...');
  const matrix = colorsToMatrix({
    colors: alignedColors,
    width: imageData.width,
    height: imageData.height
  });

  console.log('smoothing...');
  const smoothedImage = smooth(matrix);

  console.log('outlining...');
  const outlinedImage = outline(smoothedImage);

  console.log('calculating labels locations...');
  const labelsLocations = getLabelLocations(smoothedImage);

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
    width: imageData.width,
    height: imageData.height
  });

  postMessage({
    action: 'result',
    value: {
      outline: result,
      labelsLocations,
      palette
    }
  });

  console.log('Done!');
};
