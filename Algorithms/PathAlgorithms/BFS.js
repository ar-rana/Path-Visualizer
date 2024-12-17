function bfs(queue, mat, visited, i, j) {
    queue.enqueue([i, j]);

    while(!queue.isEmpty()) {
        pos = queue.dequeue();
        m = pos[0];
        n = pos[1];

        if (i<0 || j<0 || i>=5 || j>=5 || visited[m][n]) {
            continue;
        }
        if (mat[m][n] == -1) return;
        if (mat[m][n] == 1) break;

        visited[m][n] = true;

        q.enque([m + 1, n]); 
        q.enque([m, n + 1]); 
        q.enque([m - 1, n]); 
        q.enque([m, n - 1]);
    }
    
}


export default bfs;