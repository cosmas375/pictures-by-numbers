import Worker from './processor.worker.js';
import generateImage from './steps/generateImage';
import getImageData from './steps/getImageData';
import paletteToColors from './steps/paletteToColors';
import colorsToImageData from './steps/colorsToImageData';

let worker = null;

export default async function processImage(
  img,
  {
    onPreviewReady = () => {},
    onResultReady = () => {},
    onError = () => {},
    uploadId
  }
) {
  if (worker) {
    worker.terminate();
    worker = null;
  }

  worker = new Worker();

  let palette = null;

  worker.onmessage = async e => {
    const msg = e.data;

    switch (msg.type) {
      case 'palette':
        palette = msg.data;
        break;
      case 'preview':
        onPreviewReady({
          palette,
          preview: await generateImage(msg.data),
          uploadId
        });
        break;
      case 'outline':
        onResultReady({
          outline: msg.data,
          uploadId
        });
        worker.terminate();
        break;
      case 'error':
        onError({
          err: msg.data,
          uploadId
        });
        worker.terminate();
        break;
    }
  };

  worker.postMessage(await getImageData(img));

  return {
    terminate: worker.terminate
  };
}

export async function generateOutlineImage(data, settings) {
  const outlinePalette = [settings.outlineColor, { r: 255, g: 255, b: 255 }];
  const imageColors = paletteToColors(data.image.data, outlinePalette);

  const imageData = colorsToImageData({
    colors: imageColors,
    width: data.image.width,
    height: data.image.height
  });

  return await generateImage(imageData, data.labelsLocations, settings);
}
