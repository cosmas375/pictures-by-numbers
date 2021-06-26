import JSPDF from 'jspdf';

export default function generatePdf(data) {
  if (!data) {
    return;
  }

  const { image } = data;

  const orientation = image.width > image.height ? 'landscape' : 'portrait';
  const sheetParams = {
    format: 'a4',
    unit: 'mm',
    width: orientation === 'landscape' ? 297 : 210,
    height: orientation === 'landscape' ? 210 : 297
  };

  const sheetAspectRatio =
    (sheetParams.width / sheetParams.height) **
    (orientation === 'portrait' ? 1 : -1);
  const aspectRatio = image.width / image.height;
  const mainDimension = aspectRatio > sheetAspectRatio ? 'width' : 'height';
  const secondaryDimension =
    aspectRatio > sheetAspectRatio ? 'height' : 'width';
  const mmPerPx = sheetParams[mainDimension] / image[mainDimension];

  const centeringMargin =
    ((sheetParams[secondaryDimension] - image[secondaryDimension] * mmPerPx) /
      2) *
    0.8;

  const mainDimensionMargin = 10;
  const secondaryDimensionMargin =
    ((2 * mainDimensionMargin) / image[mainDimension]) *
    image[secondaryDimension];

  const doc = new JSPDF({
    orientation,
    unit: 'mm',
    format: sheetParams.format
  });
  doc.addImage(
    image.src,
    'JPEG', // TODO: to be replaced w PNG
    secondaryDimension === 'width' ? centeringMargin : mainDimensionMargin,
    secondaryDimension === 'height' ? centeringMargin : mainDimensionMargin,
    mainDimension === 'width'
      ? image[mainDimension] * mmPerPx - mainDimensionMargin * 2
      : image[secondaryDimension] * mmPerPx - secondaryDimensionMargin * 2,
    mainDimension === 'height'
      ? image[mainDimension] * mmPerPx - mainDimensionMargin * 2
      : image[secondaryDimension] * mmPerPx - secondaryDimensionMargin * 2
  );
  doc.save('My awesome artwork.pdf');
}
