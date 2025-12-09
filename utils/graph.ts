type GraphList<T, K = string> = { node: T; cost: number; direction?: K }[];

export class Graph<T, K = string> {
  private adjacencyList: Map<T, GraphList<T, K>> = new Map();

  addEdge(from: T, to: T, cost: number, direction?: K): void {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, []);
    }
    this.adjacencyList.get(from)?.push({ node: to, cost, direction });
  }

  addNode(node: T): void {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }

  neighbors(node: T): GraphList<T, K> {
    return this.adjacencyList.get(node) || [];
  }

  has(node: T): boolean {
    return this.adjacencyList.has(node);
  }

  cost(from: T, to: T): number {
    const edges = this.adjacencyList.get(from) || [];
    const edge = edges.find((e) => e.node === to);
    return edge ? edge.cost : Infinity;
  }

  mergeNodes(nodeA: T, nodeB: T, cost: number = 0): void {
    const edgesA = this.adjacencyList.get(nodeA) || [];
    const edgesB = this.adjacencyList.get(nodeB) || [];

    this.adjacencyList.set(nodeA, [
      ...edgesA,
      ...edgesB,
      { node: nodeB, cost },
    ]);

    this.adjacencyList.delete(nodeB);
  }

  get() {
    return this.adjacencyList;
  }

  connectedNodes(): T[][] {
    const visited = new Set<T>();
    const nodesList: T[][] = [];

    const getConnections = (node: T, nodes: T[]) => {
      visited.add(node);
      nodes.push(node);

      for (const neighbor of this.neighbors(node)) {
        if (!visited.has(neighbor.node)) {
          getConnections(neighbor.node, nodes);
        }
      }
    };

    for (const node of this.adjacencyList.keys()) {
      if (!visited.has(node)) {
        const nodes: T[] = [];
        getConnections(node, nodes);
        nodesList.push(nodes);
      }
    }

    return nodesList;
  }
}
