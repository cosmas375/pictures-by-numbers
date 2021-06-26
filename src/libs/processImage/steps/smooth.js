import _ from 'lodash';

const SMOOTHING_FACTOR = 4;

export default function smooth(matrix) {
  var width = matrix[0].length;
  var height = matrix.length;
  var simp = [];
  for (var i = 0; i < height; i++) {
    simp[i] = new Array(width);
  }
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var vicinVals = getVicinVals(matrix, x, y, SMOOTHING_FACTOR);
      simp[y][x] = _.chain(vicinVals)
        .toPairs()
        .maxBy(_.last)
        .last()
        .value();
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
