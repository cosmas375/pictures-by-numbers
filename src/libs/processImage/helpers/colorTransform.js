export const RGBA_CHANNELS_COUNT = 4;

export function RGBAtoRGB(color) {
  return {
    r: getRGBChannelFromRGBA(color, 'r'),
    g: getRGBChannelFromRGBA(color, 'g'),
    b: getRGBChannelFromRGBA(color, 'b')
  };
}

function getRGBChannelFromRGBA(color, channel) {
  const backgroundColorChannelValue = 255; // assuming background to be white
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
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}
