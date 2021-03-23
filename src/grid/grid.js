const randomNumbersArray = (num, rows, cols) => {
  let arr = new Array(num);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(2);
  }

  for (let i = 0; i < num; i++) {
    for (let ii = 0; ii < 2; ii++) {
      if (ii === 0) {
        arr[i][ii] = Math.ceil(Math.random() * rows - 1);
      } else {
        arr[i][ii] = Math.ceil(Math.random() * cols - 1);
      }
    }
  }
  return arr;
};

const buildWalls = (grid, num, rows, cols) => {
  let arr = randomNumbersArray(num, rows, cols);

  for (let i = 0; i < num; i++) {
    for (let ii = 0; ii < 1; ii++) {
      let row = arr[i][ii];
      let col = arr[i][ii + 1];
      if (
        !grid[row][col].end &&
        !grid[row][col].start &&
        !grid[row][col].house &&
        !grid[row][col].houseWall
      ) {
        grid[row][col].isWall = true;
      }
    }
  }
};
const buildHouses = (grid, num, rows, cols) => {
  let arr = randomNumbersArray(num, rows, cols);

  for (let i = 0; i < num; i++) {
    for (let ii = 0; ii < 1; ii++) {
      let row = arr[i][ii];
      let col = arr[i][ii + 1];
      if (rows > row + 1 && cols > col + 2) {
        if (
          !grid[row][col].end &&
          !grid[row][col].start &&
          !grid[row][col].houseWall &&
          !grid[row][col + 1].houseWall &&
          !grid[row][col + 2].houseWall &&
          !grid[row + 1][col].houseWall &&
          !grid[row + 1][col + 1].houseWall &&
          !grid[row + 1][col + 2].houseWall
        ) {
          grid[row][col].house = true;
          grid[row][col].houseWall = true;
          grid[row][col + 1].houseWall = true;
          grid[row][col + 2].houseWall = true;
          grid[row + 1][col].houseWall = true;
          grid[row + 1][col + 1].houseWall = true;
          grid[row + 1][col + 2].houseWall = true;
        }
      }
    }
  }
};

// Making the grid

function makeGrid(rows, cols) {
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
      this.pre = null;
      this.isWall = false;
      this.end = false;
      this.start = false;
      this.house = false;
      this.houseWall = false;

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
  grid[0][0].start = true;
  grid[rows - 1][cols - 1].end = true;
  let n = rows + cols * 4;
  buildHouses(grid, 15, rows, cols);
  buildWalls(grid, n, rows, cols);
  return grid;
}
export default makeGrid;
