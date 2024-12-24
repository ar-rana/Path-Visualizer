function setMatrix(mat, m, n, row, col, sortedArr) { // this is using manhattan distance formulae
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (mat[i][j] === -1) {
        continue;
      } else {
        let r = Math.abs(m - i);
        let c = Math.abs(n - j);
        mat[i][j] = r + c;
        sortedArr.enqueue([i,j], mat[i][j]);
      }
    }
  }
  console.log(sortedArr.getPQueue());
  return mat;
}

class Node {
    constructor(val, isEnd = false) {
        this.val = val;
        this.nodes = {};
        this.isEnd = isEnd;
    }

    insert(item) {
        this.nodes.push(item);
    }

    find(item) {
        for (let i=0;i<this.nodes.length;i++) {
            if (this.arraysEqual(nodes[i], item)) {
                return nodes[i];
            }
        }
        return -1;
    }

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
}

function callKruskal(pQueue, path, sortedArr, mat, visited, i, j, m, n, row, col) {
  setMatrix(mat, m, n, row, col, sortedArr);
    
  return Kruskal(pQueue, path, sortedArr, mat, visited, i, j, m, n);
}

function Kruskal2(pQueue, path, sortedArr, mat, visited, i, j, m, n) {
    const adj = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];

    let z = 0;
    let temp = sortedArr.qPop()
    path.enqueue(temp);

    const root = new Node([temp[0], temp[1]]);
    const keep = root;

    while (!path.isEmpty()) {
        let pos = path.dequeue();
        let k = pos[0];
        let l = pos[1];

        if (k<0 || l<0 || k>=mat.length || l>=mat[0].length || visited[k][l] || mat[k][l] === -1) {
            continue;
        }

        path.enqueue([k, l]);
        visited[k][l] = true;

        // if (k === m && l === n) {
        //     return path.getQueue();
        // }

        for (let [a, b] of adj) {
            let x = k+a;
            let y = l+b;
            if ( x >= 0 && x < mat.length && y >= 0 && y < mat[0].length && !visited[x][y] && mat[x][y] !== -1) {
              keep.insert([x,y]);
            }
        }
    }

    return null;
}


function Kruskal(pQueue, path, sortedArr, mat, visited, i, j, m, n) {
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

        path.enqueue([k, l]);
        visited[k][l] = true;

        if (k === m && l === n) {
            return path.getQueue();
        }

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
        console.log("neighbour: ", neighbours)

        let min = neighbours[0]?.[2];
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
