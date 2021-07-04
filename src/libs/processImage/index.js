import Worker from './processor.worker.js';
import generateImage from './steps/generateImage';
import getImageData from './steps/getImageData';

export default function processImage(img) {
  return new Promise((resolve, reject) => {
    var worker = new Worker();
    worker.onmessage = e => {
      worker.terminate();
      if (e.data.error) {
        reject(e.data.error);
      } else {
        const { outline, palette, labelsLocations, color } = e.data.value;
        generateImage(outline, labelsLocations).then(processedOutline =>
          generateImage(color, []).then(processedColor =>
            resolve({
              outline: processedOutline,
              color: processedColor,
              palette
            })
          )
        );
      }
    };

    worker.postMessage(getImageData(img));
  });
}
