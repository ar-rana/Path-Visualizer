import Queue from "./Algorithms/Queue/Queue.js";
import Stack from "./Algorithms/Stack/Stack.js";

import dfs from "./Algorithms/PathAlgorithms/DFS.js";
import bfs from "./Algorithms/PathAlgorithms/BFS.js";
import callGreedyBFS from "./Algorithms/PathAlgorithms/greedyBFS.js";

let mat = [];

const grid = document.getElementById("grid");
const screen = document.getElementById("screen");
const selectOptions = document.getElementById("selectTab");

let entryType = "";
let startNode = null;
let destinationNode = null;

for (let i = 0; i < 12; i++) {
  mat[i] = [];
  for (let j = 0; j < 42; j++) {
    mat[i][j] = 1;
  }
}

for (let i = 0; i < 504; i++) {
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
  node.setAttribute("col", i % 42);
  node.setAttribute("row", Math.floor(i / 42));
  grid.appendChild(node);
}

function callAlgo() {
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

  for (let i = 0; i < 12; i++) {
    visited[i] = [];
    for (let j = 0; j < 42; j++) {
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

    runAnimation(result[0]);
  } else if (text === "breathFirstSearch") {
    let queue = new Queue();
    let path = new Queue();
    bfs(path, queue, mat, visited, i, j, m, n)
    console.log("path: ", path.getQueue());
    console.log("queue: ", queue.getQueue());

    runAnimation(path.getQueue());
  }
}

function runAnimation(list) {
  let len = list.length;
  for (let i=0;i<len;i++) {
    let r = list[i][0];
    let c = list[i][1];
    const entry = document.querySelector(`[row="${r}"][col="${c}"]`);
    // console.log("ele: ", entry);
    if (i === 0 || i === len-1) {
      entry.classList.remove("destination", "start");
      entry.classList.add("end");
    }
    setTimeout(() => {
      setClass(i, entry, len-1);
    }, i * 150);

  }
}

function setClass(i, entry, end) {
  if (i !=0) {
    entry.classList.remove("destination", "start");
    entry.classList.add("path");
  }
}

function setEntryType(type) {
  entryType = type;
}

window.setEntryType = setEntryType;
window.callAlgo = callAlgo;
