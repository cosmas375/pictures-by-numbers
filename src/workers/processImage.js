import smooth from '@/helpers/processing/smooth';

onmessage = async e => {
  const matrix = e.data.matrix;
  const result = smooth(matrix);
  postMessage({ matrix: result });
};
