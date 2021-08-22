export default function getLabelLocations(matrix) {
  const width = matrix[0].length;
  const height = matrix.length;
  const covered = [];
  for (let i = 0; i < height; i++) {
    covered[i] = new Array(width).fill(false);
  }
  const labelLocs = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (covered[y][x]) {
        continue;
      }
      const region = getRegion(matrix, covered, x, y);
      coverRegion(covered, region);
      if (region.x.length > 100) {
        labelLocs.push(getLabelLoc(matrix, region));
      } else {
        removeRegion(matrix, region);
      }
    }
  }
  return labelLocs;
}

function getRegion(matrix, covered, x, y) {
  const region = { value: matrix[y][x], x: [], y: [] };
  const value = matrix[y][x];
  const width = matrix[0].length;
  const height = matrix.length;

  const queue = [[x, y]];
  while (queue.length > 0) {
    const coord = queue.shift();
    const color = matrix[coord[1]][coord[0]];
    if (covered[coord[1]][coord[0]] === false && color === value) {
      region.x.push(coord[0]);
      region.y.push(coord[1]);
      covered[coord[1]][coord[0]] = true;
      if (coord[0] > 0) {
        queue.push([coord[0] - 1, coord[1]]);
      }
      if (coord[0] < width - 1) {
        queue.push([coord[0] + 1, coord[1]]);
      }
      if (coord[1] > 0) {
        queue.push([coord[0], coord[1] - 1]);
      }
      if (coord[1] < height - 1) {
        queue.push([coord[0], coord[1] + 1]);
      }
    }
  }

  return region;
}

function coverRegion(covered, region) {
  const len = region.x.length;
  for (let i = 0; i < len; i++) {
    covered[region.y[i]][region.x[i]] = true;
  }
}

function getLabelLoc(matrix, region) {
  let bestI = 0;
  let best = 0;
  const len = region.x.length;
  const regX = region.x;
  const regY = region.y;
  for (let i = 0; i < len; i++) {
    const goodness =
      sameCount(matrix, regX[i], regY[i], -1, 0) *
      sameCount(matrix, regX[i], regY[i], 1, 0) *
      sameCount(matrix, regX[i], regY[i], 0, -1) *
      sameCount(matrix, regX[i], regY[i], 0, 1);
    if (goodness > best) {
      best = goodness;
      bestI = i;
    }
  }
  return {
    value: region.value + 1,
    x: regX[bestI] - 2,
    y: regY[bestI] - 2
  };
}
function sameCount(matrix, x, y, incX, incY) {
  const value = matrix[y][x];
  let count = -1;
  const len1 = matrix[0].length;
  const len2 = matrix.length;
  while (x >= 0 && x < len1 && y >= 0 && y < len2 && matrix[y][x] === value) {
    count++;
    x += incX;
    y += incY;
  }
  return count;
}

function removeRegion(matrix, region) {
  let newValue;
  const regX = region.x;
  const regY = region.y;
  if (regY[0] > 0) {
    newValue = matrix[regY[0] - 1][region.x[0]]; // assumes first pixel in list is topmost then leftmost of region.
  } else {
    const x = regX[0];
    let y = regY[0];
    while (matrix[y][x] === region.value) {
      y++;
    }
    newValue = matrix[y][x];
  }
  const len = regX.length;
  for (let i = 0; i < len; i++) {
    matrix[regY[i]][regX[i]] = newValue;
  }
}
