function setMatrix(mat, k, l, row, col) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (mat[i][j] === -1) {
        mat[i][j] = Number.MIN_SAFE_INTEGER; // wall
      } else {
        mat[i][j] = Number.MAX_SAFE_INTEGER;
      }
    }
  }
  mat[k][l] = 0;
  return mat;
}

function callDijkstra(queue, shortestPath, path, mat, visited, i, j, m, n, row, col, nodes) {
  setMatrix(mat, i, j, row, col);

  return Dijkstra(queue, shortestPath, path, mat, visited, i, j, m, n, row, col, nodes);
}

function Dijkstra(queue, shortestPath, path, mat, visited, i, j, m, n, row, col, nodes) {
  const adjecent = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  path.enqueue([i, j], mat[i][j]);
  queue.enqueue([i, j], mat[i][j]);

  const pathMat = Array.from({ length: row }, () => Array(col).fill(null));

  while (!path.isEmpty()) {
    let pos = path.dequeue();
    let k = pos[0];
    let l = pos[1];

    let distance = mat[k][l];

    visited[k][l] = true;

    if (k === m && l === n) {
      let ele = [m, n];
      while (ele != null) {
        shortestPath.push(ele);
        ele = pathMat[ele[0]][ele[1]];
      }
      shortestPath.reverse();
      nodes.push(...getVisitedNodes(queue.getQueue(), m, n));
      return true;
    }

    for (let [a, b] of adjecent) {
      let x = k+a;
      let y = l+b;

      if ( x >= 0 && x < mat.length && y >= 0 && y < mat[0].length && !visited[x][y]) {
        const val = distance + 1;
        
        if (val < mat[x][y]) {
          mat[x][y] = val;
          path.enqueue([x, y], val);
          queue.enqueue([x, y], val);
          pathMat[x][y] = [k, l];
        }
      }
    }
  }
  return false;
}

function getVisitedNodes(queue, m, n) {
  let path = [];
  for (let [a,b] of queue) {
    path.push([a,b])
    if (a === m && b === n) {
      return path;
    }
  }
  return null;
}

export default callDijkstra;