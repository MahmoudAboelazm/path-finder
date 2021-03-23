function hypot(x, y, z) {
  // Use the native implementation if it's available
  if (typeof Math.hypot === "function") {
    return Math.hypot.apply(null, arguments);
  }
}
function dist(x1, y1, z1, x2, y2, z2) {
  if (arguments.length === 4) {
    // In the case of 2d: z1 means x2 and x2 means y2
    return hypot(z1 - x1, x2 - y1);
  } else if (arguments.length === 6) {
    return hypot(x2 - x1, y2 - y1, z2 - z1);
  }
}
function heur(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  return d;
}
let rows = 5;
let cols = 5;
let grid = new Array(rows);
// Making the grid
class Spot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];

    this.addNeighbors = function (grid) {
      let i = this.i;
      let j = this.j;
      if (i < rows - 1) this.neighbors.push(grid[i + 1][j]);
      if (i > 0) this.neighbors.push(grid[i - 1][j]);
      if (j < cols - 1) this.neighbors.push(grid[i][j + 1]);
      if (j > 0) this.neighbors.push(grid[i][j - 1]);
    };
  }
}
for (let i = 0; i < rows; i++) {
  grid[i] = new Array(cols);
}
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    grid[i][j] = new Spot(i, j);
  }
}
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    grid[i][j].addNeighbors(grid);
  }
}
console.log(grid);
// helper function
function remove(arr, elm) {
  for (let i = arr.length; i > 0; i--) {
    if (arr[i] === elm) {
      arr.splice(i, 1);
    }
  }
}
// A* algorithm here
let openSet = [];
let closedSet = [];
let start = grid[0][0];
let end = grid[rows - 1][cols - 1];

openSet.push(start);
console.log(start === openSet[0], start, openSet);
while (openSet.length > 0) {
  if (openSet.length < 3) console.log(openSet);
  let winner = 0;
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[winner].f) {
      winner = i;
    }
  }
  console.log(winner);

  let current = openSet[winner];
  if (current === end) {
    console.log("Done");
  }

  remove(openSet, current);
  closedSet.push(current);

  let currentNeighbors = current.neighbors;
  for (let i = 0; i < currentNeighbors.length; i++) {
    let neighbor = currentNeighbors[i];

    if (!closedSet.includes(neighbor)) {
      let tempG = current.g + 1;

      if (openSet.includes(neighbor)) {
        if (tempG < neighbor.g) {
          neighbor.g = tempG;
        }
      } else {
        neighbor.g = tempG;
        openSet.push(neighbor);
      }
      // neighbor.h = heur(neighbor, end);
      // neighbor.f = neighbor.g + neighbor.h;
    }
  }
}
