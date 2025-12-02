import { runSolution } from '../utils.ts';

const isEven = (num: number) => num % 2 === 0;

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  const idString = data.join('');
  const ids = idString.split(',');
  let password = 0;

  ids.forEach((idPair) => {
    const [id1, id2] = idPair.split('-').map((val) => parseInt(val, 10));
    if (isNaN(id1) || isNaN(id2)) {
      return;
    }
    for (let i = id1; i <= id2; i++) {
      const numberLength = i.toString().length;
      if (!isEven(numberLength)) {
        continue;
      }
      const firstHalf = i.toString().slice(0, numberLength / 2);
      const secondHalf = i.toString().slice(numberLength / 2);
      if (firstHalf === secondHalf) {
        password += i;
      }
    }
  });

  return password;
}

await runSolution(day2a);
