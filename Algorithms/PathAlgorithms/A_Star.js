class cell {
  // each cell stores parent of i, j to track back shortest path
  constructor() {
    this.parent_i = 0;
    this.parent_j = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

function isValid(i, j, row, col) {
  return i >= 0 && i < row && j >= 0 && j < col;
}

function isUnBlocked(grid, i, j) {
  if (grid[i][j] != -1) return true;
  else return false;
}

function isDestination(i, j, dest) {
  if (i == dest[0] && j == dest[1]) return true;
  else return false;
}

function calculateHValue(i, j, dest) {
  const r = Math.abs(dest[0] - i);
  const c = Math.abs(dest[1] - j);
  return Math.sqrt(r * r + c * c);
}

function tracePath(cellDetails, dest) {
  console.log("The Path is ");
  let row = dest[0];
  let col = dest[1];

  // stack<Pair> Path;
  let Path = [];

  while (
    !(
      cellDetails[row][col].parent_i == row &&
      cellDetails[row][col].parent_j == col
    )
  ) {
    Path.push([row, col]);
    let temp_row = cellDetails[row][col].parent_i;
    let temp_col = cellDetails[row][col].parent_j;
    row = temp_row;
    col = temp_col;
  }

  Path.push([row, col]);
  while (Path.length > 0) {
    let p = Path[0];
    Path.shift();

    if (p[0] == 2 || p[0] == 1) {
      console.log("-> (" + p[0] + ", " + (p[1] - 1) + ")");
    } else console.log("-> (" + p[0] + ", " + p[1] + ")");
  }

  return Path;
}

function aStarSearch(grid, src, dest, matRow, matCol, queue, closedList, pQueue) {
  // storee details of each cell here
  let cellDetails = new Array(matRow);
  for (let i = 0; i < matRow; i++) {
    cellDetails[i] = new Array(matCol);
  }

  let i, j;

  for (i = 0; i < matRow; i++) {
    for (j = 0; j < matCol; j++) {
      cellDetails[i][j] = new cell();
      cellDetails[i][j].f = Number.MAX_SAFE_INTEGER;
      cellDetails[i][j].g = Number.MAX_SAFE_INTEGER;
      cellDetails[i][j].h = Number.MAX_SAFE_INTEGER;
      cellDetails[i][j].parent_i = -1;
      cellDetails[i][j].parent_j = -1;
    }
  }

  // Initialising the parameters of the starting node
  (i = src[0]), (j = src[1]);
  cellDetails[i][j].f = 0;
  cellDetails[i][j].g = 0;
  cellDetails[i][j].h = 0;
  cellDetails[i][j].parent_i = i;
  cellDetails[i][j].parent_j = j;

  /*
     Create an open list having information as-
     <f, <i, j>>
     where f = g + h,
     and i, j are the row and column index of that cell
     Note that 0 <= i <= ROW-1 & 0 <= j <= COL-1
     This open list is implemented as a set of pair of
     pair.*/
  let openList = new Map();
  console.log("reached aStar");

  // initially, i & j's  f = 0 
  openList.set(0, [i, j]);
  pQueue.enqueue([i, j], 0);

  let foundDest = false;

  while (!pQueue.isEmpty()) {  //openList.size > 0
    // let p = openList.entries().next().value;
    let p = pQueue.dequeue();
    console.log("p: ", p);

    // openList.delete(p[0]);

    // Add this vertex to the closed list
    // i = p[1][0];
    // j = p[1][1];
    i = p[0];
    j = p[1];
    closedList[i][j] = true;

    /*                                                  |
         Generating all the 4 successor of this cell -- o --
         Cell-->Popped Cell (i, j)                      |      */

    // To store the 'g', 'h' and 'f' of the 4 successors
    let gNew, hNew, fNew;

    //----------- 1st Successor (North) ------------
    console.log("reached aStar while loop");
    // Only process this cell if this is a valid one
    if (isValid(i - 1, j, matRow, matCol) == true) {
      console.log("In 1st succ");
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i - 1, j, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i - 1][j].parent_i = i;
        cellDetails[i - 1][j].parent_j = j;
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      }
      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i - 1][j] == false &&
        isUnBlocked(grid, i - 1, j) == true
      ) {
        queue.enqueue([i,j]);
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i - 1, j, dest);
        fNew = gNew + hNew;

        console.log(i, j, "have been added to queue");

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //                OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
        if (
          cellDetails[i - 1][j].f == Number.MAX_SAFE_INTEGER ||
          cellDetails[i - 1][j].f > fNew
        ) {
          openList.set(fNew, [i - 1, j]);
          pQueue.enqueue([i -1, j], fNew);

          // Update the details of this cell
          cellDetails[i - 1][j].f = fNew;
          cellDetails[i - 1][j].g = gNew;
          cellDetails[i - 1][j].h = hNew;
          cellDetails[i - 1][j].parent_i = i;
          cellDetails[i - 1][j].parent_j = j;
        }
      }
    }

    //----------- 2nd Successor (South) ------------

    if (isValid(i + 1, j, matRow, matCol) == true) {
      console.log("In 1st succ");

      if (isDestination(i + 1, j, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i + 1][j].parent_i = i;
        cellDetails[i + 1][j].parent_j = j;
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      }

      else if (
        closedList[i + 1][j] == false &&
        isUnBlocked(grid, i + 1, j) == true
      ) {
        queue.enqueue([i,j]);
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i + 1, j, dest);
        fNew = gNew + hNew;

        console.log(i, j, "have been added to queue");

        if (
          cellDetails[i + 1][j].f == Number.MAX_SAFE_INTEGER ||
          cellDetails[i + 1][j].f > fNew
        ) {
          openList.set(fNew, [i + 1, j]);
          pQueue.enqueue([i + 1, j], fNew);
          // Update the details of this cell
          cellDetails[i + 1][j].f = fNew;
          cellDetails[i + 1][j].g = gNew;
          cellDetails[i + 1][j].h = hNew;
          cellDetails[i + 1][j].parent_i = i;
          cellDetails[i + 1][j].parent_j = j;
        }
      }
    }

    //----------- 3rd Successor (East) ------------

    if (isValid(i, j + 1, matRow, matCol) == true) {
      console.log("In 1st succ");

      if (isDestination(i, j + 1, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i][j + 1].parent_i = i;
        cellDetails[i][j + 1].parent_j = j;
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      }

      else if (
        closedList[i][j + 1] == false &&
        isUnBlocked(grid, i, j + 1) == true
      ) {
        queue.enqueue([i,j]);
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i, j + 1, dest);
        fNew = gNew + hNew;

        console.log(i, j, "have been added to queue");

        if (
          cellDetails[i][j + 1].f == Number.MAX_SAFE_INTEGER ||
          cellDetails[i][j + 1].f > fNew
        ) {
          openList.set(fNew, [i, j + 1]);
          pQueue.enqueue([i, j + 1], fNew);
          // Update the details of this cell
          cellDetails[i][j + 1].f = fNew;
          cellDetails[i][j + 1].g = gNew;
          cellDetails[i][j + 1].h = hNew;
          cellDetails[i][j + 1].parent_i = i;
          cellDetails[i][j + 1].parent_j = j;
        }
      }
    }

    //----------- 4th Successor (West) ------------
    if (isValid(i, j - 1, matRow, matCol) == true) {
      console.log("In 1st succ");

      if (isDestination(i, j - 1, dest) == true) {
        cellDetails[i][j - 1].parent_i = i;
        cellDetails[i][j - 1].parent_j = j;
        console.log("The destination cell is found\n");
        tracePath(cellDetails, dest);
        foundDest = true;
        return;
      }

      else if (
        closedList[i][j - 1] == false &&
        isUnBlocked(grid, i, j - 1) == true
      ) {
        queue.enqueue([i,j]);
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i, j - 1, dest);
        fNew = gNew + hNew;

        console.log(i, j, "have been added to queue");


        if (
          cellDetails[i][j - 1].f == Number.MAX_SAFE_INTEGER ||
          cellDetails[i][j - 1].f > fNew
        ) {
          openList.set(fNew, [i, j - 1]);
          pQueue.enqueue([i, j - 1], fNew);
          // Update the details of this cell
          cellDetails[i][j - 1].f = fNew;
          cellDetails[i][j - 1].g = gNew;
          cellDetails[i][j - 1].h = hNew;
          cellDetails[i][j - 1].parent_i = i;
          cellDetails[i][j - 1].parent_j = j;
        }
      }
    }
    console.log("curr queue", queue.getQueue());
  }

  // No destination found
  return foundDest;
}
              //grid                              // this is the visited array 
// aStarSearch(mat, src, dest, matRow, matCol, queue, closedList, pQueue);

export default aStarSearch;
