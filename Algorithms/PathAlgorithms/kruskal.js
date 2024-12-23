function setMatrix(mat, m, n, row, col) { // this is using euclidian distance formulae
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (mat[i][j] === -1) {
        mat[i][j] = Number.MAX_SAFE_INTEGER;
      } else {
        let r = Math.abs(m - i);
        let c = Math.abs(n - j);
        mat[i][j] = r * r + c * c;
      }
    }
  }
  return mat;
}

function callKruskal(pQueue, path, mat, visited, i, j, m, n, row, col) {
  setMatrix(mat, m, n, row, col);

  return Kruskal(pQueue, path, mat, visited, i, j, m, n);
}

function Kruskal(pQueue, path, mat, visited, i, j, m, n) {
    const adj = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];

    pQueue.enqueue([i,j], mat[i][j]);

    while (!pQueue.isEmpty()) {
        let pos = pQueue.dequeue();
        let k = pos[0];
        let l = pos[1];

        if (k<0 || l<0 || k>=mat.length || l>=mat[0].length || visited[k][l] || mat[k][l] === Number.MAX_SAFE_INTEGER) {
            continue;
        }

        if (k === m && l === n) {
            return path.getQueue();
        }

        path.enqueue([k, l]);
        visited[k][l] = true;

        let neighbours = [];
        for (let [a, b] of adj) {
            let x = k+a;
            let y = l+b;
            if ( x >= 0 && x < mat.length && y >= 0 && y < mat[0].length && !visited[x][y]) {
              neighbours.push([x, y, mat[x][y]]);
            }
        }

        neighbours.sort((a, b) => {
            return a[2] - b[2];
        });

        let min = neighbours[0][2];
        console.log("min: ",min);
        for (let [c, d, e] of neighbours) {
            if (e === min) {
                pQueue.enqueue([c, d], mat[c][d]);
            }
        }
    }

    return null;
}


export default callKruskal;
