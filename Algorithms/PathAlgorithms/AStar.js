function calculateHValue(i, j, m, n) {
  const r = Math.abs(m - i);
  const c = Math.abs(n - j);
  return Math.sqrt(r * r + c * c);
}

function callAStar(pQueue, queue, mat, visited, i, j, m, n, row, col, shortestPath) {
  // this is cost matrix initially set to infinity for all nodes
  const costMat = Array.from({ length: row }, () => Array(col).fill(Number.MAX_SAFE_INTEGER));
  costMat[i][j] = 0; // cost from (i,j) to itself will always be 0

  return AStar(pQueue, queue, mat, costMat, visited, i, j, m, n, row, col, shortestPath);
}

function AStar(pQueue, queue, mat, costMat, visited, i, j, m, n, row, col, shortestPath) {
  const adj = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  pQueue.enqueue([i, j], 0);
  const pathMat = Array.from({ length: row }, () => Array(col).fill(null));

  while (!pQueue.isEmpty()) {
    console.log(pQueue.getPQueue());
    let pos = pQueue.dequeue();
    let k = pos[0];
    let l = pos[1];
    console.log("k, l", k, l);

    if (
      k < 0 ||
      l < 0 ||
      k >= mat.length ||
      l >= mat[0].length ||
      visited[k][l] ||
      mat[k][l] === -1
    ) {
      continue;
    }

    queue.enqueue([k, l]); // store all paths
    visited[k][l] = true;

    if (k === m && l === n) {
      let ele = [m, n];
      while (ele != null) {
        shortestPath.push(ele);
        ele = pathMat[ele[0]][ele[1]];
      }
      shortestPath.reverse();

      return true;
    }

    for (let [x, y] of adj) {
      let a = k + x;
      let b = l + y;

      if (
        a >= 0 &&
        b >= 0 &&
        a < mat.length &&
        b < mat[0].length &&
        mat[a][b] != -1 &&
        !visited[a][b]
      ) {
        const g = 1 + costMat[k][l]; // cost of each edge is one, 1 + costMat will be cost to reach that node
        const h = calculateHValue(a, b, m, n);
        const fx = g + h;
        if (g < costMat[a][b]) {
            costMat[a][b] = g;
        }
        pQueue.enqueue([a, b], fx);
        pathMat[a][b] = [k, l];
      }
    }
  }
  return false;
}

export default callAStar;
