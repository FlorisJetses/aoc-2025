import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  let zeroTimes = 0;
  let currentAmount = 50;
  const min = 0;
  let isPrev0 = false;

  data.forEach((line) => {
    if (!line) return;
    const amount = parseInt(line.substring(1));
    if (line.startsWith('L')) {
      currentAmount = currentAmount - amount;
    } else if (line.startsWith('R')) {
      currentAmount = currentAmount + amount;
    }
    const left = Math.abs(currentAmount % 100);
    const test = currentAmount / 100;
    if (currentAmount > 99) {
      currentAmount = left;
      const test1 = Math.ceil(test) - 1;

      if (test1 > 0) {
        zeroTimes += test1;
      }
    } else if (currentAmount < min) {
      const newAmount = Math.abs(100 - left);
      currentAmount = newAmount;

      const test2 = Math.ceil(Math.abs(test)) - (isPrev0 ? 1 : 0);

      if (test2 > 0) {
        zeroTimes += test2;
      }
    }
    if (currentAmount === min) {
      zeroTimes += 1;
    }
    if (currentAmount === 100) {
      currentAmount = 0;
      zeroTimes += 1;
    }
    isPrev0 = currentAmount === 0;
  });

  return zeroTimes;
}

await runSolution(day1a);
