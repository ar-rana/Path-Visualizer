let mat = [];

const screen = document.getElementById("screen");
const matrix = document.getElementById("matrix");

let entryType = "";
let startNode = null;
let destinationNode = null;

for (let i = 0; i < 12; i++) {
  mat[i] = [];
  for (let j = 0; j < 42; j++) {
    mat[i][j] = 1;
  }
}

for (let i = 0; i < 12; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  for (let j = 0; j < 42; j++) {
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
        console.log(node.getAttribute("row"), node.getAttribute("col"));
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
        console.log(node.getAttribute("row"), node.getAttribute("col"));
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
        console.log(node.getAttribute("row"), node.getAttribute("col"));
        mat[i][j] = mat[i][j] == 1 ? -1 : 1;
        console.log(
          "mat: ",
          mat[node.getAttribute("row")][node.getAttribute("col")]
        );
      }
    });
    node.setAttribute("row", i);
    node.setAttribute("col", j);
    row.appendChild(node);
  }
  matrix.appendChild(row);
}

function setEntryType(type) {
  entryType = type;
}
