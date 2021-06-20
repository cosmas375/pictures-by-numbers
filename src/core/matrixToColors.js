export default function matrixToColors(matrix) {
  const width = matrix[0].length;
  const height = matrix.length;
  const colors = [];

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      colors.push(matrix[row][col]);
    }
  }

  return colors;
}
