import Stack from "../Stack/Stack.js";

let stack = new Stack();
let len = Number.MAX_SAFE_INTEGER;

function dfs(queue, mat, visited, i, j, result, m, n, shortestPath) {
    if (i<0 || j<0 || i>=mat.length || j>=mat[0].length) {
        return;
    }
    if (visited[i][j]) return;
    if (mat[i][j] === -1) return; // wall entry

    if (i===m && j===n) { // destination entry
        queue.enqueue([i, j]);
        result.push(queue.getQueue());
        shortestPath.push(stack.getStack());
        return;
    }

    visited[i][j] = true;
    queue.enqueue([i, j]); // queue to store all paths explored sequentially
    stack.push([i, j]);

    dfs(queue, mat, visited, i+1, j, result, m, n, shortestPath);
    dfs(queue, mat, visited, i, j+1, result, m, n, shortestPath);
    dfs(queue, mat, visited, i-1, j, result, m, n, shortestPath);
    dfs(queue, mat, visited, i, j-1, result, m, n, shortestPath);

    stack.pop();
}


export default dfs;
