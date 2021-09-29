export default function getImageData(image) {
  return new Promise(resolve => {
    const width = image.width;
    const height = image.height;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const img = new Image(width, height);
    img.src = image.src;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      canvas.remove();
      resolve(imgData);
    };
  });
}
