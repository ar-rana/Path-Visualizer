import Queue from "./Algorithms/Queue/Queue.js";
import Stack from "./Algorithms/Stack/Stack.js";
import PriorityQueue from "./Algorithms/Queue/priorityQueue.js";

import dfs from "./Algorithms/PathAlgorithms/DFS.js";
import bfs from "./Algorithms/PathAlgorithms/BFS.js";
import callGreedyBFS from "./Algorithms/PathAlgorithms/greedyBFS.js";
import callDijkstra from "./Algorithms/PathAlgorithms/Dijkstra.js";

let mat = [];
let running = false;

const grid = document.getElementById("grid");
const screen = document.getElementById("screen");
const selectOptions = document.getElementById("selectTab");

let entryType = "";
let startNode = null;
let destinationNode = null;
let speed = 40;

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
        console.log(
          "c: ",
          node.getAttribute("col"),
          "r: ",
          node.getAttribute("row")
        );
        console.log(
          "mat: ",
          mat[node.getAttribute("row")][node.getAttribute("col")]
        );
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
        console.log(
          "c: ",
          node.getAttribute("col"),
          "r: ",
          node.getAttribute("row")
        );
        console.log(
          "mat: ",
          mat[node.getAttribute("row")][node.getAttribute("col")]
        );
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
        console.log(
          "c: ",
          node.getAttribute("col"),
          "r: ",
          node.getAttribute("row")
        );
        console.log(
          "mat: ",
          mat[node.getAttribute("row")][node.getAttribute("col")]
        );
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
  setMatrix();
  const entries = grid.children;
  for (let entry of entries) {
    entry.classList.remove("wall", "path", "endPoint");
  }
  // TO-DO : Design Decision
  // wont need this if you dont apply 'endPoint' class at runAnimation()
  startNode.classList.add("start");
  destinationNode.classList.add("destination");
}


function callAlgo() {
  if (running) return;
  running = true;
  let i;
  let j;
  let m;
  let n;
  let visited = [];
  var text = selectOptions.options[selectOptions.selectedIndex].value;
  if (text === "") return;
  console.log("option: ", text);
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

  if (text === "deapthFirstSearch") {
    let result = [];
    let queue = new Queue();
    dfs(queue, mat, visited, i, j, result, m, n);
    console.log("result: ", result[0]);
    console.log("len: ", result.length);
    console.log("queue: ", queue.getQueue());

    runAnimation(result[0]); // result will have multiple queue's one of them willbe the shortest path through DFS
  } else if (text === "breathFirstSearch") {
    let queue = new Queue();
    let path = new Queue();
    bfs(path, queue, mat, visited, i, j, m, n)
    console.log("path: ", path.getQueue());
    console.log("queue: ", queue.getQueue());

    runAnimation(path.getQueue());
  } else if (text === "greedyBreathFirstSearch") {
    let queue = new PriorityQueue();
    let path = new Queue();
    path = callGreedyBFS(queue, path, mat, visited, i, j, m, n, row, col);
    console.log("path: ", path.getQueue());

    runAnimation(path.getQueue());
  } else if (text === "dijkastraAlgorithm") {
    let queue = new PriorityQueue();
    let shortestPath = [];
    let path = new PriorityQueue();
    let nodes = callDijkstra(queue, shortestPath, path, mat, visited, i, j, m, n, row, col);
    console.log("shortestPath: ", shortestPath);
    console.log("nodes: ", nodes);

    runAnimation(nodes);
  }
}

function runAnimation(list) {
  let len = list.length;
  for (let i=0;i<len;i++) {
    let r = list[i][0];
    let c = list[i][1];
    const entry = document.querySelector(`[row="${r}"][col="${c}"]`);
    // console.log("ele: ", entry);
    if (entry == startNode || entry == destinationNode) {
      entry.classList.remove("destination", "start");
      entry.classList.add("endPoint");
      continue;
    }
    setTimeout(() => {
      setClass(i, entry, len-1);
    }, i * speed);
  }
  running = false;
}

function setClass(i, entry, end) {
  if (i !=0 && i!=end) {
    entry.classList.remove("destination", "start");
    entry.classList.add("path");
  }
}

function setEntryType(type) {
  entryType = type;
}

function setSpeed(value) {
  console.log(value);
  speed = value;
}

window.setEntryType = setEntryType;
window.callAlgo = callAlgo;
window.resetMatrix = resetMatrix;
window.setSpeed = setSpeed;
