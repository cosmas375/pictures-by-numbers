import { ACTIONS } from '@/core/vars';
import imageDataToColors from '@/core/imageDataToColors';
import colorsToRgbColors from '@/core/colorsToRgbColors';
import generatePalette from '@/core/generatePalette';
import alignColorsToPalette from '@/core/alignColorsToPalette';
import colorsToMatrix from '@/core/colorsToMatrix';
import smooth from '@/core/smooth';
import matrixToColors from '@/core/matrixToColors';
import RgbColorsToColors from '@/core/RgbColorsToColors';
import getImageData from '@/core/getImageData';

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
  console.log(rgbColors[0]);

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

  console.log('transforming matrix to colors...');
  const processedRgbColors = matrixToColors(smoothedImage);

  console.log('converting rgb to rgba...');
  const processedColors = RgbColorsToColors(processedRgbColors);

  console.log('creating imageData...');
  const result = getImageData({
    colors: processedColors,
    width: imageData.width,
    height: imageData.height
  });

  postMessage({ action: ACTIONS.result, value: result });

  console.log('Done!');
};
