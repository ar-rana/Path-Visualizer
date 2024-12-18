function bfs(path, queue2, mat, visited, i, j) {
    queue2.enqueue([i, j]);

    while(!queue2.isEmpty()) {
        let pos = queue2.dequeue();
        let m = pos[0];
        let n = pos[1];

        if (m<0 || n<0 || m>=mat.length || n>=mat[0].length || visited[m][n]) {
            continue;
        }

        path.enqueue([m, n]);
        visited[m][n] = true;

        if (mat[m][n] === -1) continue;
        if (mat[m][n] === 1) break;

        queue2.enque([m, n + 1]); 
        queue2.enque([m + 1, n]); 
        queue2.enque([m - 1, n]); 
        queue2.enque([m, n - 1]);
    }
    
}


export default bfs;