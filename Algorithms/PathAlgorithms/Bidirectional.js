class BidirectionalSearch {
    constructor(row, col, shortestPath, path, mat) {
        this.row = row;
        this.col = col;
        this.found = false;
        this.shortestPath = shortestPath;
        this.path = path;
        this.mat = mat;
    }

    isValidCell(x, y, visited) {
        return x >= 0 && x < this.row && y >= 0 && y < this.col && !visited[x][y];
    }

    isWall(x, y) {
        return this.mat[x][y] === -1;
    }

    BFS(queue, visited, pathMat) {
        const adjecent = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
        ];

        const [i, j] = queue.shift();
        for (const [dx, dy] of adjecent) {
            const k = i + dx;
            const l = j + dy;

            if (this.isValidCell(k, l, visited)) {
                if (!this.isWall(k, l)) {
                    visited[k][l] = true;
                    queue.push([k, l]);
                    this.path.enqueue([k, l]);
                    pathMat[k][l] = [i, j];
                }
            }
        }
    }

    isIntersecting(visited1, visited2) {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                if (visited1[i][j] && visited2[i][j]) {
                    return [i, j];
                }
            }
        }
        return null;
    }

    getShortestPath(pathMat1, pathMat2, pos) {
        const [m, n] = pos;
        const path = [];

        let ele = [m, n];
        while (ele != null) {
            path.push(ele);
            ele = pathMat1[ele[0]][ele[1]];
        }
        path.reverse();

        ele = [m, n];
        while (ele != null) {
            path.push(ele);
            ele = pathMat2[ele[0]][ele[1]];
        }

        this.shortestPath.push(...path);
    }

    bidirectionalBFS(s, d) {
        const visited1 = Array.from({ length: this.row }, () => Array(this.col).fill(false));
        const visited2 = Array.from({ length: this.row }, () => Array(this.col).fill(false));

        const queue1 = [];
        const queue2 = [];

        const pathMat1 = Array.from({ length: this.row }, () => Array(this.col).fill(null));
        const pathMat2 = Array.from({ length: this.row }, () => Array(this.col).fill(null));

        let pos = null;

        const [i, j] = s;
        queue1.push([i, j]);
        visited1[i][j] = true;

        const [k, l] = d;
        queue2.push([k, l]);
        visited2[k][l] = true;

        this.path.enqueue([i, j]);
        this.path.enqueue([k, l]);

        // run bfs from both sides and side by side see if an intersection is found
        // this is also the bidirectional BFS loop
        while (queue1.length > 0 && queue2.length > 0) {
            this.BFS(queue1, visited1, pathMat1);
            this.BFS(queue2, visited2, pathMat2);
            pos = this.isIntersecting(visited1, visited2);

            if (pos) {
                this.found = true;
                this.getShortestPath(pathMat1, pathMat2, pos);
                return;
            }
        }
    }
}


export default BidirectionalSearch;