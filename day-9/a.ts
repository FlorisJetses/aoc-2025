import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  let area = 0;
  data.forEach((line) => {
    const [x, y] = line.split(',').map(Number);

    data.forEach((otherLine) => {
      const [otherX, otherY] = otherLine.split(',').map(Number);
      const totalArea = (Math.abs(x - otherX) + 1) * (Math.abs(y - otherY) + 1);

      if (totalArea > area) {
        area = totalArea;
      }
    });
  });
  return area;
}

await runSolution(day9a);
