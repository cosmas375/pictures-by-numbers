import imageDataToRGBColors from './steps/imageDataToRGBColors';
import generatePalette from './steps/generatePalette';
import alignColorsToPalette from './steps/alignColorsToPalette';
import colorsToMatrix from './steps/colorsToMatrix';
import smoothImage from './steps/smoothImage';
import outlineImage from './steps/outlineImage';
import getLabels from './steps/getLabels';
import colorsToImageData from './steps/colorsToImageData';
import paletteToColors from './steps/paletteToColors';
import flat from '@/libs/processImage/helpers/flat';

const _store = {
  imageData: null,
  rgbColors: null,
  alignedColor: null,
  result: {
    palette: null,
    preview: null,
    outline: null
  }
};

onmessage = async e => {
  const msg = e.data;
  switch (msg.action) {
    default:
    case 'getData':
      getData(msg.data);
      postMessage({
        action: 'getData',
        data: _store.result
      });
      break;
    case 'getPalette':
      getPalette(msg.data);
      postMessage({
        action: 'getPalette',
        data: _store.result.palette
      });
      break;
    case 'getPreview':
      getPreview(msg.data);
      postMessage({
        action: 'getPreview',
        data: _store.result.preview
      });
      break;
    case 'getOutline':
      getOutline();
      postMessage({
        action: 'getOutline',
        data: _store.result.outline
      });
      break;
  }
};

function getData(imageData) {
  getPalette(imageData);
  getPreview();
  getOutline();
}

function getPalette(imageData) {
  _store.imageData = imageData;

  const smoothedImage = smoothImage(imageData);
  const rgbColors = imageDataToRGBColors(smoothedImage.data);
  _store.rgbColors = rgbColors;
  const palette = generatePalette(rgbColors);

  _store.result.palette = palette;
}

function getPreview(palette = _store.result.palette) {
  _store.result.palette = palette;

  const alignedColors = alignColorsToPalette(_store.rgbColors, palette);
  _store.alignedColors = alignedColors;
  const preview = colorsToImageData({
    colors: paletteToColors(alignedColors, palette),
    width: _store.imageData.width,
    height: _store.imageData.height
  });

  _store.result.preview = preview;
}

function getOutline() {
  const width = _store.imageData.width;
  const height = _store.imageData.height;
  const colorsMatrix = colorsToMatrix({
    colors: _store.alignedColors,
    width: width,
    height: height
  });
  const outlineMatrix = outlineImage(colorsMatrix);
  const labels = getLabels(colorsMatrix);
  const outline = {
    image: { data: flat(outlineMatrix), width, height },
    labels
  };

  _store.result.outline = outline;
}
