function bfs(path, queue2, mat, visited, i, j, k, l, row, col, shortestPath) {
    queue2.enqueue([i, j]);

    const pathMat = Array.from({ length: row }, () => Array(col).fill(null));
    const adjecent = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    while(!queue2.isEmpty()) {
        let pos = queue2.dequeue();
        let m = pos[0];
        let n = pos[1];

        if (m<0 || n<0 || m>=mat.length || n>=mat[0].length || visited[m][n]) {
            continue;
        }
        if (mat[m][n] === -1) continue;

        path.enqueue([m, n]);
        visited[m][n] = true;

        if (m === k && n === l) {
            let ele = [k, l];
            while (ele != null) {
                shortestPath.push(ele);
                ele = pathMat[ele[0]][ele[1]];
            }
            shortestPath.reverse();
            return true;
        };

        for (let [a, b] of adjecent) {
            let x = m+a;
            let y = n+b;
      
            if ( x >= 0 && x < mat.length && y >= 0 && y < mat[0].length && !visited[x][y]) {
                queue2.enqueue([x, y]);
                pathMat[x][y] = [m, n];
            }
        }
    }
    return false;
}


export default bfs;