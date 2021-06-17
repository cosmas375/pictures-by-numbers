import Worker from '@/workers/processImage.js';
import getImageDataFromImage from '@/utils/getImageDataFromImage';
import getImageFromImageData from '@/utils/getImageFromImageData';
import convertImageDataToRGBMatrix from '@/helpers/convertImageDataToRGBMatrix';
import convertRGBMatrixToImageData from '@/helpers/convertRGBMatrixToImageData';

export default function processImage(img) {
  return new Promise((resolve, reject) => {
    var worker = new Worker();
    worker.onmessage = e => {
      worker.terminate();
      if (e.data.error) {
        reject(e.data.error);
      } else {
        const rgbMatrix = e.data.matrix;
        const imageData = convertRGBMatrixToImageData(rgbMatrix);
        getImageFromImageData(imageData).then(img => resolve(img));
      }
    };

    const imgData = getImageDataFromImage(img);
    const rgbMatrix = convertImageDataToRGBMatrix(imgData);
    worker.postMessage({
      matrix: rgbMatrix
    });
  });
}
