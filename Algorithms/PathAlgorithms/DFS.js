function dfs(queue, mat, visited, i, j, path) {
    if (i<0 || j<0 || i>=mat.length || j>=mat[0].length || visited[i][j]) {
        return;
    }
    if (mat[i][j] == -1) return; // wall entry
    if (mat[i][j] == 1) { // destination entry
        return;
    }

    visited[i][j] = true;
    queue.enqueue([i, j]); // queue to store all paths explored sequentially
    path.push([i, j]);

    dfs(queue, mat, visited, i+1, j, m, n);
    dfs(queue, mat, visited, i, j+1, m, n);
    dfs(queue, mat, visited, i-1, j, m, n);
    dfs(queue, mat, visited, i, j-1, m, n);

    path.pop([i,j]); // backtrack to store only optimal path
}


export default dfs;
