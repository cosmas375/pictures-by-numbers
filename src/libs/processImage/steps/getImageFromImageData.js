export default function getImageFromImageData(imgData) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imgData, 0, 0);
    const img = document.createElement('img');
    img.src = canvas.toDataURL();
    canvas.remove();
    img.onload = () => resolve(img);
  });
}
