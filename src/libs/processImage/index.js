import Worker from './processor.worker.js';
import getImageDataFromImage from './steps/getImageDataFromImage';
import getImageFromImageData from './steps/getImageFromImageData';

export default function processImage(img) {
  return new Promise((resolve, reject) => {
    var worker = new Worker();
    worker.onmessage = e => {
      worker.terminate();
      if (e.data.error) {
        reject(e.data.error);
      } else {
        const imageData = e.data.value.outlined;
        const labelsLocations = e.data.value.labelsLocations;
        getImageFromImageData(imageData).then(img =>
          resolve({
            outlined: img,
            labelsLocations
          })
        );
      }
    };

    const imgData = getImageDataFromImage(img);
    worker.postMessage(imgData);
  });
}
