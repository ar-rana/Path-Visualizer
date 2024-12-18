function setMatrix(mat, m, n) {
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 42; j++) {
      if (mat[i][j] == -1) {
        mat[i][j] = Number.MAX_SAFE_INTEGER;
      } else {
        let r = Math.abs(m - i);
        let c = Math.abs(n - j);
        mat[i][j] = r + c;
      }
    }
  }
  return mat;
}

function callGreedyBFS(queue, path, mat, visited, i, j, m, n) {
  setMatrix(mat, m, n);

  return greedyBFS(queue, path, mat, visited, i, j, m, n);
}

function greedyBFS(queue, path, mat, visited, i, j, m, n) {
  queue.enqueue([i, j]);

  while (!queue.isEmpty()) {
    let pos = queue.dequeue();

    let k = pos[0];
    let l = pos[1];

    if (k<0 || l<0 || k>=mat.length || l>=mat[0].length || visited[k][l]) {
        continue;
    }
    path.enqueue([k, l]);
    visited[k][l] = true;

    if (k===m && l===n) {
        return path;
    }
    let index = [
        [k+1, l], 
        [k, l+1], 
        [k-1, l], 
        [k, l-1]
    ];
    let ele = new Map();

    for (let [a, b] in index) {
        if (a>=0 && b>=0 && a<mat.length && b<mat[0].length) {
            // ele.set([a,b], mat[a][b]); we are not using this becaue JS addreses non-primitive values (arrays, objects)
            // by reference and not by value so [1,2] will be 2 diff obj in memory and not 1 unique key
            ele.set(`${a},${b}`, mat[a][b]);
        }
    }

    let min = Math.min(...Array.from(ele.values()));

    for (let [key, val] of ele.entries()) {
        if (min === val) {
            let [a, b] = key.split(',').map(Number);
            queue.enqueue([a, b]);
        }
    }
  }
  return null;
}
