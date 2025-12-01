import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  let zeroTimes = 0;
  let currentAmount = 50;

  data.forEach((line) => {
    if (!line) return;
    const amount = parseInt(line.substring(1));
    if (line.startsWith('L')) {
      currentAmount = currentAmount - amount;
    } else if (line.startsWith('R')) {
      currentAmount = currentAmount + amount;
    }
    const remaining = Math.abs(currentAmount % 100);
    if (currentAmount > 99) {
      currentAmount = remaining;
    } else if (currentAmount < 0) {
      const newAmount = Math.abs(100 - remaining);
      currentAmount = newAmount;
    }
    if (currentAmount === 0) {
      zeroTimes += 1;
    }
    if (currentAmount === 100) {
      currentAmount = 0;
      zeroTimes += 1;
    }
  });
  return zeroTimes;
}

await runSolution(day1a);
