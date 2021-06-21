export default function outline(mat) {
  var width = mat[0].length;
  var height = mat.length;
  var line = [];
  for (var i = 0; i < height; i++) {
    line[i] = new Array(width);
  }
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      line[y][x] = neighborsSame(mat, x, y)
        ? { r: 255, g: 255, b: 255, a: 255 }
        : { r: 0, g: 0, b: 0, a: 255 };
    }
  }
  return line;
}

function neighborsSame(mat, x, y) {
  var width = mat[0].length;
  var height = mat.length;
  var val = mat[y][x];
  var xRel = [1, 0];
  var yRel = [0, 1];
  for (var i = 0; i < xRel.length; i++) {
    var xx = x + xRel[i];
    var yy = y + yRel[i];
    if (xx >= 0 && xx < width && yy >= 0 && yy < height) {
      if (
        mat[yy][xx].r !== val.r ||
        mat[yy][xx].g !== val.g ||
        mat[yy][xx].b !== val.b
      ) {
        return false;
      }
    }
  }
  return true;
}
