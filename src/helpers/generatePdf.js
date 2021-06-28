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

  let mainDimension, secondaryDimension;
  if (aspectRatio > sheetAspectRatio) {
    mainDimension = 'width';
    secondaryDimension = 'height';
  } else {
    mainDimension = 'height';
    secondaryDimension = 'width';
  }

  const mmPerPx = sheetParams[mainDimension] / image[mainDimension];

  const centeringMargin =
    ((sheetParams[secondaryDimension] - image[secondaryDimension] * mmPerPx) /
      2) *
    0.8;

  const mainDimensionMargin = 10;
  const secondaryDimensionMargin =
    (mainDimensionMargin / image[mainDimension]) * image[secondaryDimension];

  const doc = new JSPDF({
    orientation,
    unit: 'mm',
    format: sheetParams.format
  });
  const widthIsMain = mainDimension === 'width';
  doc.addImage(
    image.src,
    'JPEG', // TODO: to be replaced w PNG
    widthIsMain ? mainDimensionMargin : centeringMargin,
    widthIsMain ? centeringMargin : mainDimensionMargin,
    widthIsMain
      ? image[mainDimension] * mmPerPx - mainDimensionMargin * 2
      : image[secondaryDimension] * mmPerPx - secondaryDimensionMargin * 2,
    widthIsMain
      ? image[secondaryDimension] * mmPerPx - secondaryDimensionMargin * 2
      : image[mainDimension] * mmPerPx - mainDimensionMargin * 2
  );
  doc.save('My awesome artwork.pdf');
}
