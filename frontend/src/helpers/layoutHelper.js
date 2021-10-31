export const LAYOUTS = {
  Landscape: 'landscape',
  Portrait: 'portrait'
};

export function getLayout(img) {
  return img.width > img.height ? LAYOUTS.Landscape : LAYOUTS.Portrait;
}
