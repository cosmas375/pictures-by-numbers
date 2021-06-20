import Worker from '@/workers/processImage.js';
import getImageDataFromImage from '@/utils/getImageDataFromImage';
import getImageFromImageData from '@/utils/getImageFromImageData';

export default function processImage(img) {
  return new Promise((resolve, reject) => {
    var worker = new Worker();
    worker.onmessage = e => {
      worker.terminate();
      if (e.data.error) {
        reject(e.data.error);
      } else {
        const imageData = e.data.value;
        getImageFromImageData(imageData).then(img => resolve(img));
      }
    };

    const imgData = getImageDataFromImage(img);
    worker.postMessage(imgData);
  });
}
