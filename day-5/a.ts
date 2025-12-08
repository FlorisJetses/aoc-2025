import { runSolution } from '../utils.ts';

const isInRange = (num: number, start: number, end: number) => {
  return num >= start && num <= end;
};

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  const ids: string[] = [];
  const ingredients: string[] = [];
  let freshAmount = 0;

  let hasIds = false;
  data.forEach((item) => {
    if (item === '') {
      hasIds = true;
      return;
    }

    if (hasIds && item) {
      ingredients.push(item);
      return;
    }

    if (item) {
      ids.push(item);
    }
  });

  ingredients.forEach((id) => {
    let isFresh = false;
    ids.forEach((range) => {
      if (isFresh) return;
      const [start, end] = range.split('-');

      if (isInRange(Number(id), Number(start), Number(end))) {
        isFresh = true;
      }
    });
    if (isFresh) freshAmount++;
  });

  return freshAmount;
}

await runSolution(day5a);
