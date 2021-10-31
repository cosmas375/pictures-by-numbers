export default function getRandomNumbers(from = 0, to = 1, numbersCount = 1) {
  const arr = [];
  while (arr.length < numbersCount) {
    const number = Math.floor(Math.random() * to) + from;
    if (arr.indexOf(number) === -1) {
      arr.push(number);
    }
  }
  return arr;
}
