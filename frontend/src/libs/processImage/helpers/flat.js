export default function flat(matrix) {
  return matrix.reduce((result, row) => result.concat(row), []);
}
