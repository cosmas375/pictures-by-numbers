const SMOOTHING_FACTOR = 2;

export default function smooth(matrix) {
  var width = matrix[0].length;
  var height = matrix.length;
  var simp = [];
  for (var i = 0; i < height; i++) {
    simp[i] = new Array(width);
  }
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      simp[y][x] = Math.max(...getVicinVals(matrix, x, y, SMOOTHING_FACTOR));
    }
  }
  return simp;
}

function getVicinVals(matrix, x, y, range) {
  var width = matrix[0].length;
  var height = matrix.length;
  var vicinVals = [];
  for (var xx = x - range; xx <= x + range; xx++) {
    for (var yy = y - range; yy <= y + range; yy++) {
      if (xx >= 0 && xx < width && yy >= 0 && yy < height) {
        vicinVals.push(matrix[yy][xx]);
      }
    }
  }
  return vicinVals;
}
