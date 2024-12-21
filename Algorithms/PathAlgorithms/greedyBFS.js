function setMatrix(mat, m, n) {
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 42; j++) {
      if (mat[i][j] === -1 || mat[i][j] === Number.MAX_SAFE_INTEGER) {
        mat[i][j] = Number.MAX_SAFE_INTEGER;
      } else {
        let r = Math.abs(m - i);
        let c = Math.abs(n - j);
        mat[i][j] = r*r + c*c;
      }
    }
  }
  return mat;
}

function callGreedyBFS(queue, path, mat, visited, i, j, m, n) {
  setMatrix(mat, m, n);
  console.log("in call greedy");
  return greedyBFS(queue, path, mat, visited, i, j, m, n);
}

function greedyBFS(queue, path, mat, visited, i, j, m, n) {
  queue.enqueue([i, j]);

  while (!queue.isEmpty()) {
    let pos = queue.dequeue();

    let k = pos[0];
    let l = pos[1];

    if (k<0 || l<0 || k>=mat.length || l>=mat[0].length || visited[k][l] || mat[k][l] === Number.MAX_SAFE_INTEGER) {
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
    let eles = [];

    for (let [a, b] of index) {
        if (a>=0 && b>=0 && a<mat.length && b<mat[0].length && mat[a][b] != Number.MAX_SAFE_INTEGER) {
            // ele.set([a,b], mat[a][b]); we are not using this becaue JS addreses non-primitive values (arrays, objects)
            // by reference and not by value so [1,2] will be 2 diff obj in memory and not 1 unique key
          eles.push([[a,b], mat[a][b]]);
          console.log("ele set in map", a, b);
        }
    }

    for (let [arr, PRN] of eles) {
      queue.enqueue(arr, PRN);
    }
  }
  return null;
}


export default callGreedyBFS;
