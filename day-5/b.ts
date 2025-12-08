import { runSolution } from '../utils.ts';

const isInRange = (num: number, start: number, end: number) => {
  return num >= start && num <= end;
};

/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
  const ids: string[] = [];
  const ingredients: string[] = [];

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

  const starts: number[] = [];
  const startEnd: Record<number, number> = {};
  const ends: number[] = [];
  const endStart: Record<number, number> = {};

  const ranges: [number, number][] = [];

  ids.forEach((range) => {
    const [start, end] = range.split('-');

    starts.push(Number(start));
    startEnd[Number(start)] = Number(end);
    ends.push(Number(end));
    endStart[Number(end)] = Number(start);
    ranges.push([Number(start), Number(end)]);
  });

  const sortedRanges = ranges.sort((a, b) => {
    return a[0] - b[0];
  });

  const newRanges: [number, number][] = [];

  sortedRanges.forEach((range, index) => {
    if (index === 0) {
      newRanges.push(range);
    }

    const previousRange = newRanges.at(-1);
    if (previousRange[0] <= range[0] && previousRange[1] >= range[1]) {
      return;
    }

    if (
      previousRange[0] <= range[0] &&
      isInRange(previousRange[1], range[0], range[1])
    ) {
      newRanges[newRanges.length - 1] = [previousRange[0], range[1]];
      return;
    }

    newRanges.push(range);
  });

  let sum = 0;

  newRanges.forEach((range) => {
    sum += range[1] - range[0] + 1;
  });

  return sum;
}

await runSolution(day5b);
