function setMatrix(mat, m, n, row, col) {
  // this is using euclidian distance formulae
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (mat[i][j] === -1) {
        mat[i][j] = Number.MAX_SAFE_INTEGER;
      } else {
        let r = Math.abs(m - i);
        let c = Math.abs(n - j);
        mat[i][j] = Math.sqrt(r * r + c * c);
        // mat[i][j] = 1 * (r + c) + (Math.sqrt(2) - 2*1) * Math.min(r, c);  // Diagonal Distance formulae
      }
    }
  }
  return mat;
}

function callGreedyBFS(
  queue,
  path,
  mat,
  visited,
  i,
  j,
  m,
  n,
  row,
  col,
  shortestPath
) {
  setMatrix(mat, m, n, row, col);

  const pathMat = Array.from({ length: row }, () => Array(col).fill(null));

  return greedyBFS(
    queue,
    path,
    mat,
    visited,
    i,
    j,
    m,
    n,
    pathMat,
    shortestPath
  );
}

function greedyBFS(queue, path, mat, visited, i, j, m, n, pathMat, shortestPath) {
  queue.enqueue([i, j]);
  const adjecent = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (!queue.isEmpty()) {
    let pos = queue.dequeue();

    let k = pos[0];
    let l = pos[1];

    if (
      k < 0 ||
      l < 0 ||
      k >= mat.length ||
      l >= mat[0].length ||
      visited[k][l]
    ) {
      continue;
    }
    if (mat[k][l] === Number.MAX_SAFE_INTEGER) continue;

    path.enqueue([k, l]);
    visited[k][l] = true;

    if (m === k && n === l) {
      let ele = [k, l];
      while (ele != null) {
        shortestPath.push(ele);
        ele = pathMat[ele[0]][ele[1]];
      }
      shortestPath.reverse();
      return true;
    }

    for (let [a, b] of adjecent) {
      let x = k + a;
      let y = l + b;

      if (
        x >= 0 &&
        y >= 0 &&
        x < mat.length &&
        y < mat[0].length &&
        mat[x][y] !== Number.MAX_SAFE_INTEGER &&
        !visited[x][y]
      ) {
        let PRN = mat[x][y];
        queue.enqueue([x, y], PRN);
        pathMat[x][y] = [k, l];
      }
    }
  }
  return false;
}

export default callGreedyBFS;
