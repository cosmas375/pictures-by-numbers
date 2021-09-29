export default function outline(mat) {
  const width = mat[0].length;
  const height = mat.length;
  const matrix = [];
  for (var i = 0; i < height; i++) {
    matrix[i] = new Array(width);
  }
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      matrix[y][x] = Number(neighborsSame(mat, x, y));
    }
  }
  return matrix;
}

function neighborsSame(mat, x, y) {
  const width = mat[0].length;
  const height = mat.length;
  const val = mat[y][x];
  const xRel = [1, 0];
  const yRel = [0, 1];
  for (var i = 0; i < xRel.length; i++) {
    const xx = x + xRel[i];
    const yy = y + yRel[i];
    if (xx >= 0 && xx < width && yy >= 0 && yy < height) {
      if (mat[yy][xx] !== val) {
        return false;
      }
    }
  }
  return true;
}
