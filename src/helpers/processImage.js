import Worker from '@/workers/processImage.js';
import getImgData from '@/helpers/getImgData';

export default function processImage(img) {
  return new Promise((resolve, reject) => {
    var worker = new Worker();
    worker.onmessage = e => {
      worker.terminate();
      if (e.data.error) {
        reject(e.data.error);
      } else {
        resolve(e.data);
      }
    };
    worker.postMessage(getImgData(img));
  });
}
