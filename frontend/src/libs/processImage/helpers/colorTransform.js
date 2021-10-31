export const RGBA_CHANNELS_COUNT = 4;

export function RGBAtoRGB(color) {
  return {
    r: getRGBChannelFromRGBA(color, 'r'),
    g: getRGBChannelFromRGBA(color, 'g'),
    b: getRGBChannelFromRGBA(color, 'b')
  };
}

function getRGBChannelFromRGBA(color, channel) {
  const backgroundColorChannelValue = 255; // assuming that background is white
  const normalizedAlpha = color.a / 255;
  return (
    (1 - normalizedAlpha) * backgroundColorChannelValue +
    normalizedAlpha * color[channel]
  );
}

export function RGBtoRGBA(color) {
  return {
    r: color.r,
    g: color.g,
    b: color.b,
    a: 255
  };
}

export function RGBtoHEX({ r, g, b }) {
  return `#${getHexFromRGBChannel(r)}${getHexFromRGBChannel(
    g
  )}${getHexFromRGBChannel(b)}`;
}
function getHexFromRGBChannel(c) {
  const hex = Math.floor(c).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export function HEXtoRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

export function RGBtoHSV({ r, g, b }) {
  let rr, gg, bb, h, s;
  const rabs = r / 255;
  const gabs = g / 255;
  const babs = b / 255;
  const v = Math.max(rabs, gabs, babs);
  const diff = v - Math.min(rabs, gabs, babs);
  const diffc = c => (v - c) / 6 / diff + 1 / 2;
  const percentRoundFn = num => Math.round(num * 100) / 100;
  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100)
  };
}

export function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s;
    v = h.v;
    h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
