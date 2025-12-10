import { runSolution } from '../utils.ts';
import * as turf from '@turf/turf';

/** provide your solution as the return of this function */
export async function day9b(data: string[]) {
  const shape = turf.polygon([
    [
      ...data.map((line) => line.split(',').map(Number)),
      data[0].split(',').map(Number),
    ],
  ]);

  const areaMap: Record<
    number,
    { x: number; y: number; otherX: number; otherY: number }[]
  > = {};

  data.forEach((line) => {
    const [x, y] = line.split(',').map(Number);

    data.forEach((otherLine) => {
      const [otherX, otherY] = otherLine.split(',').map(Number);

      if (x === otherX || y === otherY) return;

      const totalArea = (Math.abs(x - otherX) + 1) * (Math.abs(y - otherY) + 1);

      if (!areaMap[totalArea]) {
        areaMap[totalArea] = [];
      }
      areaMap[totalArea].push({
        x,
        y,
        otherX,
        otherY,
      });
    });
  });

  const areasLargeToSmall = Object.keys(areaMap).sort(
    (a, b) => Number(b) - Number(a)
  );

  const smallest = areasLargeToSmall.find((areaSize) => {
    const candidates = areaMap[Number(areaSize)];

    return candidates.some(({ x, y, otherX, otherY }) => {
      const corners = [
        [x, y],
        [otherX, y],
        [otherX, otherY],
        [x, otherY],
      ];
      const square = turf.polygon([[...corners, [x, y]]]);

      const allCornersInside = corners.every((corner) =>
        turf.booleanPointInPolygon(turf.point(corner), shape)
      );
      if (!allCornersInside) return false;

      const intersection = turf.intersect(
        turf.featureCollection([shape, square])
      );
      if (!intersection) return false;

      const squareArea = turf.area(square);
      const intersectionArea = turf.area(intersection);

      return squareArea === intersectionArea;
    });
  });

  return smallest;
}
await runSolution(day9b);
