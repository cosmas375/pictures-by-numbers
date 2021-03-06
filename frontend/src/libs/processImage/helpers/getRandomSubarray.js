export default function getRandomSubarray(arr, size) {
  const shuffled = arr.slice();
  let i = arr.length;
  let temp, index;

  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}
