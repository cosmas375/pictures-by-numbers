import Worker from './processor.worker.js';
import generateImage from './steps/generateImage';
import getImageData from './steps/getImageData';
import paletteToColors from './steps/paletteToColors';
import colorsToImageData from './steps/colorsToImageData';

export class ImageProcessor {
  _worker = null;

  constructor({
    onDataReady,
    onPaletteReady,
    onPreviewReady,
    onOutlineReady
  } = {}) {
    this._worker = new Worker();

    const getCallback = f => (typeof f === 'function' ? f : () => {});

    this._worker.onmessage = async e => {
      const msg = e.data;
      switch (msg.action) {
        default:
        case 'getData':
          return getCallback(onDataReady)(msg.data);
        case 'getPalette':
          return getCallback(onPaletteReady)(msg.data);
        case 'getPreview':
          return getCallback(onPreviewReady)(await generateImage(msg.data));
        case 'getOutline':
          return getCallback(onOutlineReady)(msg.data);
      }
    };
  }

  async generateData(image) {
    this._worker.postMessage({
      action: 'getData',
      data: await getImageData(image)
    });
  }

  async generatePalette(image) {
    this._worker.postMessage({
      action: 'getPalette',
      data: await getImageData(image)
    });
  }

  generatePreview(palette) {
    this._worker.postMessage({
      action: 'getPreview',
      data: palette
    });
  }

  generateOutline() {
    this._worker.postMessage({
      action: 'getOutline'
    });
  }
}

export async function generateOutlineImage(data, settings) {
  const outlinePalette = [settings.outlineColor, { r: 255, g: 255, b: 255 }];
  const imageColors = paletteToColors(data.image.data, outlinePalette);

  const imageData = colorsToImageData({
    colors: imageColors,
    width: data.image.width,
    height: data.image.height
  });

  return await generateImage(imageData, data.labels, settings);
}
