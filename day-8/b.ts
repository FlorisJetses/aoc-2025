import { runSolution } from '../utils.ts';
import { Graph } from '../utils/graph.ts';

type JunctionCoords = [number, number, number];

const calcEuclidianDistance = (
  junction1: JunctionCoords,
  junction2: JunctionCoords
) => {
  return Math.sqrt(
    (junction1[0] - junction2[0]) ** 2 +
      (junction1[1] - junction2[1]) ** 2 +
      (junction1[2] - junction2[2]) ** 2
  );
};

/** provide your solution as the return of this function */
export async function day8a(data: string[]) {
  const junctions = data.map((val) =>
    val.split(',').map(Number)
  ) as JunctionCoords[];

  const graph = new Graph<string>();

  const connectionsMap = new Map<
    string,
    { start: string; end: string; distance: number }
  >();
  const maxTries = 100;
  const xyz = [0, 1, 2];

  xyz.forEach((dim) => {
    const sortedJunctions = [...junctions].sort((a, b) => a[dim] - b[dim]);

    sortedJunctions.forEach((junction1, i) => {
      for (let j = i + 1; j < sortedJunctions.length; j++) {
        if (j >= i + 1 + maxTries) {
          break;
        }
        const junction2 = sortedJunctions[j];

        const key1 = junction1.join();
        const key2 = junction2.join();
        const key = key1 < key2 ? `${key1}|${key2}` : `${key2}|${key1}`;

        if (!connectionsMap.has(key)) {
          const dist = calcEuclidianDistance(junction1, junction2);
          connectionsMap.set(key, {
            start: key1,
            end: key2,
            distance: dist,
          });
        }
      }
    });
  });

  junctions.forEach((junction) => {
    graph.addNode(junction.join());
  });

  const connections = Array.from(connectionsMap.values());

  const sortedConnections = [...connections].sort(
    (a, b) => a.distance - b.distance
  );

  for (const connection of sortedConnections) {
    graph.addEdge(connection.start, connection.end, connection.distance);
    graph.addEdge(connection.end, connection.start, connection.distance);
    if (graph.connectedNodes().length === 1) {
      console.log(connection);
      break;
    }
  }
}

await runSolution(day8a);
