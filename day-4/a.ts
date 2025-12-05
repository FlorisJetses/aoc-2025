import { runSolution, toMatrix, traverseMatrix } from '../utils.ts';
import { directions } from '../utils/directions.ts';

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
  const matrix = toMatrix(data);
  const maxRolls = 3;
  let accessibleRolls = 0;

  traverseMatrix(matrix, (val, x, y) => {
    if (val !== '@') return;
    let nearbyRolls = 0;
    Object.values(directions).forEach((dir) => {
      const [xdir, ydir] = dir;
      const [xpos, ypos] = [x + xdir, y + ydir];
      if (ypos < 0 || ypos >= matrix.length) return;
      if (xpos < 0 || xpos >= matrix[0].length) return;
      const pos = matrix[ypos][xpos];

      if (pos === '@') {
        nearbyRolls += 1;
      }
    });

    if (nearbyRolls <= maxRolls) {
      accessibleRolls += 1;
    }
  });
  return accessibleRolls;
}

await runSolution(day4a);
