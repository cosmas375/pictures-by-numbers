export default function convertRGBMatrixToImageData(mat) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  var imgData = context.createImageData(mat[0].length, mat.length);
  for (var y = 0; y < mat.length; y++) {
    for (var x = 0; x < mat[0].length; x++) {
      var i = (y * mat[0].length + x) * 4;
      var col = mat[y][x];
      imgData.data[i] = col.r;
      imgData.data[i + 1] = col.g;
      imgData.data[i + 2] = col.b;
      imgData.data[i + 3] = 255;
    }
  }
  return imgData;
}
