export default function convertImageDataToRGBMatrix(imageData) {
  const matrix = [];
  const width = imageData.width;
  const height = imageData.height;
  const dataLength = imageData.data.length;
  for (let row = 0; row < height; row++) {
    matrix[row] = new Array(width);
  }
  for (let i = 0; i < dataLength; i += 4) {
    const color = {
      r: imageData.data[i],
      g: imageData.data[i + 1],
      b: imageData.data[i + 2]
    };
    const x = (i / 4) % width;
    const y = Math.floor(i / 4 / width);
    matrix[y][x] = color;
  }
  return matrix;
}
