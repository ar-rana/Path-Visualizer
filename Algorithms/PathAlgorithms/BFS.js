function bfs(queue, queue2, mat, visited, i, j) {
    queue2.enqueue([i, j]);

    while(!queue2.isEmpty()) {
        pos = queue2.dequeue();
        m = pos[0];
        n = pos[1];

        if (i<0 || j<0 || i>=5 || j>=5 || visited[m][n]) {
            continue;
        }
        if (mat[m][n] == -1) return;
        if (mat[m][n] == 1) break;

        visited[m][n] = true;
        queue.enqueue([m, n]);

        queue2.enque([m, n + 1]); 
        queue2.enque([m + 1, n]); 
        queue2.enque([m - 1, n]); 
        queue2.enque([m, n - 1]);
    }
    
}


export default bfs;