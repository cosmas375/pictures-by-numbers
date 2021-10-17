export function getCssTransform(image, points) {
  const transforms = getTransform(image, points);
  const cssValue = `matrix3d(${transforms.join(', ')})`;
  return {
    transform: cssValue,
    '-webkit-transform': cssValue,
    '-moz-transform': cssValue,
    '-o-transform': cssValue
  };
}

function getTransform(image, points) {
  const width = image.width;
  const height = image.height;

  let t = getGeneral2DProjection(
    0,
    0,
    points[0].x,
    points[0].y,
    width,
    0,
    points[1].x,
    points[1].y,
    0,
    height,
    points[2].x,
    points[2].y,
    width,
    height,
    points[3].x,
    points[3].y
  );
  for (let i = 0; i !== 9; ++i) t[i] = t[i] / t[8];
  t = [
    t[0],
    t[3],
    0,
    t[6],
    t[1],
    t[4],
    0,
    t[7],
    0,
    0,
    1,
    0,
    t[2],
    t[5],
    0,
    t[8]
  ];
  return t;
}

function getGeneral2DProjection(
  x1s,
  y1s,
  x1d,
  y1d,
  x2s,
  y2s,
  x2d,
  y2d,
  x3s,
  y3s,
  x3d,
  y3d,
  x4s,
  y4s,
  x4d,
  y4d
) {
  var s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
  var d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
  return multiplyMatrices(d, getAdjugateMatrix(s));
}

function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
  var m = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  var v = multiplyMatrixByVector(getAdjugateMatrix(m), [x4, y4, 1]);
  return multiplyMatrices(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

function multiplyMatrices(a, b) {
  var c = Array(9);
  for (var i = 0; i !== 3; ++i) {
    for (var j = 0; j !== 3; ++j) {
      var cij = 0;
      for (var k = 0; k !== 3; ++k) {
        cij += a[3 * i + k] * b[3 * k + j];
      }
      c[3 * i + j] = cij;
    }
  }
  return c;
}
function multiplyMatrixByVector(m, v) {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2]
  ];
}

function getAdjugateMatrix(m) {
  return [
    m[4] * m[8] - m[5] * m[7],
    m[2] * m[7] - m[1] * m[8],
    m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8],
    m[0] * m[8] - m[2] * m[6],
    m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6],
    m[1] * m[6] - m[0] * m[7],
    m[0] * m[4] - m[1] * m[3]
  ];
}
