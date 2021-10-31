export default function colorsToMatrix({ colors, width, height }) {
  const matrix = [];
  const len = colors.length;
  for (let row = 0; row < height; row++) {
    matrix[row] = new Array(width);
  }
  for (let i = 0; i < len; i++) {
    const x = i % width;
    const y = Math.floor(i / width);
    matrix[y][x] = colors[i];
  }
  return matrix;
}
