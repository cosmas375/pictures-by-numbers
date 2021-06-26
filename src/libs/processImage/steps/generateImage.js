export default function generateImage(imageData, labelsLocations) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);

    ctx.font = '12px Georgia';
    ctx.fillStyle = 'rgb(150, 150, 150)';
    const len = labelsLocations.length;
    for (var i = 0; i < len; i++) {
      ctx.fillText(
        JSON.stringify(i),
        labelsLocations[i].x - 3,
        labelsLocations[i].y + 4
      );
    }

    const img = document.createElement('img');
    img.src = canvas.toDataURL();
    canvas.remove();
    img.onload = () => resolve(img);
  });
}
