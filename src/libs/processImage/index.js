import Worker from './processor.worker.js';
import generateImage from './steps/generateImage';
import getImageData from './steps/getImageData';

export default function processImage(
  img,
  { onPreviewReady = () => {}, onResultReady = () => {}, onError = () => {} }
) {
  var worker = new Worker();

  worker.onmessage = async e => {
    const msg = e.data;
    switch (msg.type) {
      case 'preview':
        onPreviewReady({
          ...msg.data,
          preview: await generateImage(msg.data.preview)
        });
        break;
      case 'result':
        onResultReady({
          ...msg.data,
          preview: await generateImage(msg.data.preview),
          outline: await generateImage(
            msg.data.outline,
            msg.data.labelsLocations
          )
        });
        worker.terminate();
        break;
      case 'error':
        onError(msg.data);
        worker.terminate();
        break;
    }
  };

  worker.postMessage(getImageData(img));
}
