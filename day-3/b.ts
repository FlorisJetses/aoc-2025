import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  let sum = 0;
  data.forEach((line) => {
    if (!line) {
      return;
    }
    const highestNumbers: number[] = [...Array(12).fill(-1)];
    let currentCharIndex = 0;

    for (let i = 0; i < highestNumbers.length; i++) {
      let largestNumber = -1;
      for (
        let j = currentCharIndex;
        j < line.length - (highestNumbers.length - 1 - i);
        j++
      ) {
        const number = parseInt(line[j], 10);
        if (number > largestNumber) {
          largestNumber = number;
          currentCharIndex = j + 1;
        }
      }
      highestNumbers[i] = largestNumber;
    }

    const total = Number(`${highestNumbers.join('')}`);
    sum += total;
    console.log(total);
  });
  return sum;
}

await runSolution(day3b);
