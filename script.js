import Queue from "./Algorithms/Queue/Queue.js";
import Stack from "./Algorithms/Stack/Stack.js";
import PriorityQueue from "./Algorithms/Queue/priorityQueue.js";

import dfs from "./Algorithms/PathAlgorithms/DFS.js";
import bfs from "./Algorithms/PathAlgorithms/BFS.js";
import callGreedyBFS from "./Algorithms/PathAlgorithms/greedyBFS.js";
import callDijkstra from "./Algorithms/PathAlgorithms/Dijkstra.js";
import callAStar from "./Algorithms/PathAlgorithms/AStar.js";
import aStarSearch from "./Algorithms/PathAlgorithms/A_Star.js";

let mat = [];
let running = false;

const grid = document.getElementById("grid");
const selectOptions = document.getElementById("selectTab");

let entryType = "";
let startNode = null;
let destinationNode = null;
let speed = 40;
let timeOuts = [];

const row = 12;
const col = 42;
let entries = row * col;


setMatrix();
setMatrixNodes();

function setMatrix() {
  for (let i = 0; i < row; i++) {
    mat[i] = [];
    for (let j = 0; j < col; j++) {
      mat[i][j] = 1;
    }
  }
}

function setMatrixNodes() {
  for (let i = 0; i < entries; i++) {
    const node = document.createElement("div");
    node.classList.add("entry");
    node.addEventListener("click", () => {
      node.classList.add("entry");
      if (entryType === "start") {
        if (node == destinationNode) {
          destinationNode = null;
        }
        if (startNode) {
          startNode.classList.remove("start");
        }
        node.classList.remove("destination", "wall");
        node.classList.add(entryType);
        startNode = node;
        mat[node.getAttribute("row")][node.getAttribute("col")] = 1;
        // console.log("col: ", node.getAttribute("col"), "row: ", node.getAttribute("row"));

      } else if (entryType === "destination") {
        if (node == startNode) {
          startNode = null;
        }
        if (destinationNode) {
          destinationNode.classList.remove("destination");
        }
        node.classList.remove("start", "wall");
        node.classList.add(entryType);
        destinationNode = node;
        mat[node.getAttribute("row")][node.getAttribute("col")] = 1;
        // console.log("col: ", node.getAttribute("col"), "row: ", node.getAttribute("row"));

      } else if (entryType === "wall") {
        if (node == startNode) {
          startNode = null;
        }
        if (node == destinationNode) {
          destinationNode = null;
        }
        node.classList.remove("destination", "start");
        node.classList.toggle(entryType);
        mat[node.getAttribute("row")][node.getAttribute("col")] =
        mat[node.getAttribute("row")][node.getAttribute("col")] === 1 ? -1 : 1;
        // console.log("col: ", node.getAttribute("col"), "row: ", node.getAttribute("row"));

      }
    });
    node.setAttribute("col", i % col);
    node.setAttribute("row", Math.floor(i / col));
    grid.appendChild(node);
  }
}

function resetMatrix() {
  if (running) {
    running = false;
  };
  clearAnimations();
  setMatrix();
  const entries = grid.children;
  for (let entry of entries) {
    entry.classList.remove("wall", "path", "endPoint", "visited");
  }
  if (startNode) startNode.classList.add("start");
  if (destinationNode) destinationNode.classList.add("destination");
}

function callAlgo() {
  resetPath();
  clearAnimations();
  running = true;
  let i;
  let j;
  let m;
  let n;
  let visited = [];
  var text = selectOptions.options[selectOptions.selectedIndex].value;
  if (text === "") return;
  if (startNode === null || destinationNode === null) return;
  i = Number(startNode.getAttribute("row"));
  j = Number(startNode.getAttribute("col"));
  m = Number(destinationNode.getAttribute("row"));
  n = Number(destinationNode.getAttribute("col"));

  for (let i = 0; i < row; i++) {
    visited[i] = [];
    for (let j = 0; j < col; j++) {
      visited[i][j] = false;
    }
  }

  let shortestPath = [];
  const copy = mat.map(row => [...row]); // we are not doing "copy = mat" because it goes by reference not val; 

  if (text === "deapthFirstSearch") {
    let result = [];
    let queue = new Queue();

    dfs(queue, copy, visited, i, j, result, m, n, shortestPath);

    runAnimation(result[0], result[0]);

  } else if (text === "breathFirstSearch") {
    let queue = new Queue();
    let path = new Queue();
    if (bfs(path, queue, copy, visited, i, j, m, n, row, col, shortestPath)) {
      runAnimation(path.getQueue(), shortestPath);
    } else {
      runAnimation(path.getQueue(), null);
    }

  } else if (text === "greedyBreathFirstSearch") {
    let queue = new PriorityQueue();
    let path = new Queue();
    if (callGreedyBFS(queue, path, copy, visited, i, j, m, n, row, col, shortestPath)) {
      runAnimation(path.getQueue(), shortestPath);
    } else {
      runAnimation(path.getQueue(), null);
    }

  } else if (text === "dijkastraAlgorithm") {
    let queue = new PriorityQueue();
    let path = new PriorityQueue();
    let nodes = [];
    if (callDijkstra(queue, shortestPath, path, copy, visited, i, j, m, n, row, col, nodes)) {
      runAnimation(nodes, shortestPath);
    } else {
      runAnimation(nodes, null);
    }

  } else if (text === "aStarAlgorithm") {
    let queue = new Queue();
    let pQueue = new PriorityQueue();
    // shortestPath = aStarSearch(copy, [i, j], [m, n], row, col, queue, visited, pQueue);
    // runAnimation(queue.getQueue(), shortestPath);
    if (callAStar(pQueue, queue, copy, visited, i, j, m, n, row, col, shortestPath)) {
      runAnimation(queue.getQueue(), shortestPath);
    } else {
      runAnimation(queue.getQueue(), null);
    }

  }
}

function generateRandomWalls(row, col, mat) {
  resetMatrix();
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let int = getRandomInteger(-1, 1);
      if (int === -1) {
        const entry = document.querySelector(`[row="${i}"][col="${j}"]`);
        if (entry != null && (entry == startNode || entry == destinationNode)) continue;
        if (entry != null) {
          mat[i][j] = -1;
          entry.classList.toggle("wall");
        } else {
          mat[i][j] = 1;
        }
      } else {
        mat[i][j] = 1;
      }
    }
  }
}

function runAnimation(list, result) {
  if (list === null || list === -1) {
    running = false;
    return;
  }
  console.log('path size', list.length);
  let len = list.length;
  for (let i=0;i<len;i++) {
    let r = list[i][0];
    let c = list[i][1];
    const entry = document.querySelector(`[row="${r}"][col="${c}"]`);
    // console.log("ele: ", entry);
    if (entry != null && (entry == startNode || entry == destinationNode)) {
      entry.classList.remove("destination", "start");
      entry.classList.add("endPoint");
    }
    timeOuts.push(
      setTimeout(() => {
        setClass(i, entry, len-1);
      }, i * speed)
    );
  }

  if (result != null) {
    if (list.length >= 400) {
      setTimeout(() => {
        runShortestAnimation(result);
      }, 19000);
    } else if (list.length >= 300) {
      setTimeout(() => {
        runShortestAnimation(result);
      }, 14000);
    }  else if (list.length >= 200) {
      setTimeout(() => {
        runShortestAnimation(result);
      }, 10000);
    } else if (list.length >= 100) {
      setTimeout(() => {
        runShortestAnimation(result);
      }, 5000);
    } else if (list.length >= 50) {
      setTimeout(() => {
        runShortestAnimation(result);
      }, 3500);
    } else {
      setTimeout(() => {
        runShortestAnimation(result);
      }, 2000);
    }
  }  

  running = false;
}

function runShortestAnimation(list) {
  let len = list.length;
  for (let i=0;i<len;i++) {
    let r = list[i][0];
    let c = list[i][1];
    const entry = document.querySelector(`[row="${r}"][col="${c}"]`);
      setTimeout(() => {
        if (entry != null) {
          entry.classList.remove("path");
          entry.classList.add("visited");
        }
      }, i * speed-10);
  }
}

function resetPath() {
  if (running) return;
  const entries = grid.children;
  for (let entry of entries) {
    entry.classList.remove("path", "endPoint", "visited");
  }

  if (startNode) startNode.classList.add("start");
  if (destinationNode) destinationNode.classList.add("destination");
}

function clearAnimations() {
  for (let i = 0; i < timeOuts.length; i++) {
    clearTimeout(timeOuts[i]);
  }
  timeOuts = [];
}

function setClass(i, entry, end) {
  if (entry != null && i !=0 && i!=end) {
    entry.classList.remove("destination", "start");
    entry.classList.add("path");
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function callGenerateRandomWalls() {
  generateRandomWalls(row, col, mat);
}

function setEntryType(type) {
  entryType = type;
}

function setSpeed(value) {
  speed = value;
}

window.setEntryType = setEntryType;
window.callAlgo = callAlgo;
window.resetMatrix = resetMatrix;
window.setSpeed = setSpeed;
window.callGenerateRandomWalls = callGenerateRandomWalls;
