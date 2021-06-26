import imageDataToColors from './steps/imageDataToColors';
import colorsToRgbColors from './steps/colorsToRgbColors';
import generatePalette from './steps/generatePalette';
import alignColorsToPalette from './steps/alignColorsToPalette';
import colorsToMatrix from './steps/colorsToMatrix';
import smooth from './steps/smooth';
import outline from './steps/outline';
import getLabelLocations from './steps/getLabelLocations';
import matrixToColors from './steps/matrixToColors';
import RgbColorsToColors from './steps/rgbColorsToColors';
import getImageData from './steps/getImageData';

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
  const processedColors = RgbColorsToColors(processedRgbColors);

  console.log('creating imageData...');
  const result = getImageData({
    colors: processedColors,
    width: imageData.width,
    height: imageData.height
  });

  postMessage({
    action: 'result',
    value: {
      colorized: '',
      outlined: result,
      labelsLocations
    }
  });

  console.log('Done!');
};
