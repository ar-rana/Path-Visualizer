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

function callDijkstra(queue, shortestPath, path, mat, visited, i, j, m, n, row, col) {
  setMatrix(mat, i, j, row, col);

  return Dijkstra2(queue, shortestPath, path, mat, visited, i, j, m, n, row, col);
}

function Dijkstra(queue, queue2, path, mat, visited, i, j, m, n, row, col) {
  const adjecent = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  path.enqueue([i, j], mat[i][j]);
  queue.enqueue([i, j]);

  while (!queue.isEmpty()) {
    let pos = queue.dequeue();
    let k = pos[0];
    let l = pos[1];

    let distance = mat[k][l];

    if (k<0 || l<0 || k>=mat.length || l>=mat[0].length || visited[k][l]) {
      continue;
    }

    visited[k][l] = true;

    if (k === m && l === n) {
      break;
    }

    for (let [a, b] of adjecent) {
      let x = k+a;
      let y = l+b;
      let val = 0;

      if ( x >= 0 && x < mat.length && y >= 0 && y < mat[0].length && !visited[x][y]) {

        // if (mat[x][y] === Number.MAX_SAFE_INTEGER) {
        //   val = distance + 1;
        //   mat[x][y] = val;
        //   path.enqueue([x, y], val);
        //   queue.enqueue([x, y]);
        // } else {
        //   val = distance + mat[k][l];
        //   mat[x][y] = val;
        //   path.enqueue([x, y], val);
        //   queue.enqueue([x, y]);
        // }
        val = distance + 1;
        if (val < mat[x][y]) {
          mat[x][y] = val;
          path.enqueue([x, y], val);
          queue.enqueue([x, y]);
          if (k === m && l === n) {
            break;
          }
        }
      }
    }
  }
  return path.getQueue();
}

function Dijkstra2(queue, shortestPath, path, mat, visited, i, j, m, n, row, col) {
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
      return getVisitedNodes(queue.getQueue(), m, n);
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
  return null;
}


function getShortestPath2(queue2, mat, row, col, m, n) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      queue2.enqueue([i, j] ,mat[i][j]);
      if (i == m && j == n) {
        console.log("short?: ", getVisitedNodes(queue2.getQueue(), m, n));
        return;
      }
    }
  }
  return null;
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