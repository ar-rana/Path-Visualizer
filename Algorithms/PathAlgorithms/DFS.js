function dfs(queue, mat, visited, i, j, m, n) {
    if (i<0 || j<0 || i>=mat.length || j>=mat[0].length || visited[i][j]) {
        return;
    }
    if (i == m && j == n) {
        return queue;
    }
    ele = {i, j};
    queue.enqueue(ele);
    dfs(queue, mat, visited, i+1, j, m, n);
    dfs(queue, mat, visited, i, j+1, m, n);
    dfs(queue, mat, visited, i-1, j, m, n);
    dfs(queue, mat, visited, i, j-1, m, n);
}