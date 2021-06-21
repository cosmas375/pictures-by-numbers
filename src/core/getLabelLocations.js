import _ from 'lodash';

export default function getLabelLocations(mat) {
  var width = mat[0].length;
  var height = mat.length;
  var covered = [];
  for (var i = 0; i < height; i++) {
    covered[i] = new Array(width);
    _.fill(covered[i], false);
  }
  var labelLocs = [];
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      if (covered[y][x] === false) {
        var region = getRegion(mat, covered, x, y);
        coverRegion(covered, region);
        if (region.x.length > 100) {
          labelLocs.push(getLabelLoc(mat, region));
        } else {
          removeRegion(mat, region);
        }
      }
    }
  }
  return labelLocs;
}

function getRegion(mat, cov, x, y) {
  var covered = _.cloneDeep(cov);
  var region = { value: mat[y][x], x: [], y: [] };
  var value = mat[y][x];

  var queue = [[x, y]];
  while (queue.length > 0) {
    var coord = queue.shift();
    const color = mat[coord[1]][coord[0]];
    if (
      covered[coord[1]][coord[0]] === false &&
      color.r === value.r &&
      color.g === value.g &&
      color.b === value.b
    ) {
      region.x.push(coord[0]);
      region.y.push(coord[1]);
      covered[coord[1]][coord[0]] = true;
      if (coord[0] > 0) {
        queue.push([coord[0] - 1, coord[1]]);
      }
      if (coord[0] < mat[0].length - 1) {
        queue.push([coord[0] + 1, coord[1]]);
      }
      if (coord[1] > 0) {
        queue.push([coord[0], coord[1] - 1]);
      }
      if (coord[1] < mat.length - 1) {
        queue.push([coord[0], coord[1] + 1]);
      }
    }
  }

  return region;
}

function coverRegion(covered, region) {
  for (var i = 0; i < region.x.length; i++) {
    covered[region.y[i]][region.x[i]] = true;
  }
}

function getLabelLoc(mat, region) {
  var bestI = 0;
  var best = 0;
  for (var i = 0; i < region.x.length; i++) {
    var goodness =
      sameCount(mat, region.x[i], region.y[i], -1, 0) *
      sameCount(mat, region.x[i], region.y[i], 1, 0) *
      sameCount(mat, region.x[i], region.y[i], 0, -1) *
      sameCount(mat, region.x[i], region.y[i], 0, 1);
    if (goodness > best) {
      best = goodness;
      bestI = i;
    }
  }
  return {
    value: region.value,
    x: region.x[bestI],
    y: region.y[bestI]
  };
}
function sameCount(mat, x, y, incX, incY) {
  var value = mat[y][x];
  var count = -1;
  while (
    x >= 0 &&
    x < mat[0].length &&
    y >= 0 &&
    y < mat.length &&
    mat[y][x].r === value.r &&
    mat[y][x].g === value.g &&
    mat[y][x].b === value.b
  ) {
    count++;
    x += incX;
    y += incY;
  }
  return count;
}

function removeRegion(mat, region) {
  let newValue;
  if (region.y[0] > 0) {
    newValue = mat[region.y[0] - 1][region.x[0]]; // assumes first pixel in list is topmost then leftmost of region.
  } else {
    newValue = getBelowValue(mat, region);
  }
  for (var i = 0; i < region.x.length; i++) {
    mat[region.y[i]][region.x[i]] = newValue;
  }
}

function getBelowValue(mat, region) {
  var x = region.x[0];
  var y = region.y[0];
  while (mat[y][x] === region.value) {
    y++;
  }
  return mat[y][x];
}
