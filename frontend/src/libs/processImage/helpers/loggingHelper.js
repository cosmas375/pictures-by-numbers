export function log(data) {
  if (process.env.NODE_ENV === 'development') {
    /* eslint no-console: warn */
    console.log(data);
  }
}
