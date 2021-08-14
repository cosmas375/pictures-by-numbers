import JSPDF from 'jspdf';
import { RGBtoHEX } from '@/libs/processImage/helpers/colorTransform';
import { FORMATS_DATA } from '@/data/formats';
import { LAYOUTS } from '@/helpers/layoutHelper';

export default function generatePdf(data) {
  if (!data) {
    return;
  }

  const { outline, palette, preview, source, settings } = data;

  const imgPage = getImagePageData(outline, settings.safetyPaddings);
  const imagePageParams = [
    'PNG',
    imgPage.x0,
    imgPage.y0,
    imgPage.x1,
    imgPage.y1
  ];

  const doc = new JSPDF({
    orientation: imgPage.orientation,
    unit: 'mm',
    format: imgPage.format
  });

  doc.addImage(outline.src, ...imagePageParams);

  if (settings.includePalette) {
    addPalettePage(doc, palette);
  }

  if (settings.includePreview) {
    doc.addPage(imgPage.format, imgPage.orientation);
    doc.addImage(preview.src, ...imagePageParams);
  }

  if (settings.includeSource) {
    doc.addPage(imgPage.format, imgPage.orientation);
    doc.addImage(source.src, ...imagePageParams);
  }

  doc.save(`${settings.fileName}.pdf`);
}

function getImagePageData(image, safetyPaddings) {
  const format = 'a4';
  const orientation =
    image.width > image.height ? LAYOUTS.Landscape : LAYOUTS.Portrait;
  const sheetParams = {
    format: format,
    unit: 'mm',
    width:
      FORMATS_DATA[format][
        orientation === LAYOUTS.Landscape ? 'height' : 'width'
      ],
    height:
      FORMATS_DATA[format][
        orientation === LAYOUTS.Landscape ? 'width' : 'height'
      ]
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
    (sheetParams[secondaryDimension] - image[secondaryDimension] * mmPerPx) / 2;

  const mainDimensionMargin = safetyPaddings;
  const secondaryDimensionMargin =
    (mainDimensionMargin / image[mainDimension]) * image[secondaryDimension];

  const widthIsMain = mainDimension === 'width';

  return {
    format,
    orientation,
    x0: widthIsMain ? mainDimensionMargin : centeringMargin,
    y0: widthIsMain ? centeringMargin : mainDimensionMargin,
    x1: widthIsMain
      ? image[mainDimension] * mmPerPx - mainDimensionMargin * 2
      : image[secondaryDimension] * mmPerPx - secondaryDimensionMargin * 2,
    y1: widthIsMain
      ? image[secondaryDimension] * mmPerPx - secondaryDimensionMargin * 2
      : image[mainDimension] * mmPerPx - mainDimensionMargin * 2
  };
}

function addPalettePage(doc, palette) {
  doc.addPage('a4', 'portrait');
  const topOffset = 5;
  const leftMargin = 5;
  const margin = 5;
  const height = 10;
  const width = 10;
  const borderRadius = 2;
  const itemsPerColumn = 19;
  const indexWidth = 10;
  const textWidth = 20;
  const textMargin = 3;
  const fontSize = 12;
  doc.setLineWidth(0.2);
  doc.setDrawColor(0, 0, 0);
  doc.setFontSize(fontSize);
  palette.forEach((color, i) => {
    doc.text(
      `${i + 1}.`,
      leftMargin +
        Math.floor(i / itemsPerColumn) *
          (width + textMargin + textWidth + textMargin),
      topOffset + (height + margin) * (i % itemsPerColumn) + fontSize / 2
    );
    doc.setFillColor(color.r, color.g, color.b);
    doc.roundedRect(
      leftMargin +
        indexWidth +
        Math.floor(i / itemsPerColumn) *
          (width + textMargin + textWidth + textMargin),
      topOffset + (height + margin) * (i % itemsPerColumn),
      width,
      height,
      borderRadius,
      borderRadius,
      'DF'
    );
    doc.text(
      RGBtoHEX(color),
      leftMargin +
        indexWidth +
        Math.floor(i / itemsPerColumn) *
          (width + textMargin + textWidth + textMargin) +
        width +
        textMargin,
      topOffset + (height + margin) * (i % itemsPerColumn) + fontSize / 2
    );
  });
}
