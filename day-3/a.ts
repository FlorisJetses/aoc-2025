import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  let sum = 0;
  data.forEach((line) => {
    if (!line) {
      return;
    }
    let firstLargestNumber = 0;
    let secondLargestNumber = 0;
    line.split('').forEach((char, index, arr) => {
      const number = parseInt(char, 10);
      if (number > firstLargestNumber && index !== arr.length - 1) {
        firstLargestNumber = number;
        secondLargestNumber = 0;
      } else if (number > secondLargestNumber) {
        secondLargestNumber = number;
      }
    });
    const total = Number(`${firstLargestNumber}${secondLargestNumber}`);
    sum += total;
  });
  return sum;
}

await runSolution(day3a);
