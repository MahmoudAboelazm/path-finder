// helper functions
function getDistance(xA, yA, xB, yB) {
  var xDiff = xA - xB;
  var yDiff = yA - yB;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
function heur(a, b) {
  let d = getDistance(a.i, a.j, b.i, b.j);
  return d;
}

const remove = (arr, elm) => {
  for (let i = arr.length; i >= 0; i--) {
    if (arr[i] === elm) {
      arr.splice(i, 1);
      console.log("searching...");
    }
  }
};
function resetTheGrid(grid, start, end) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].f = 0;
      grid[i][j].g = 0;
      grid[i][j].h = 0;
      grid[i][j].pre = null;
      grid[i][j].end = false;
      grid[i][j].start = false;
      if (start === grid[i][j] && start.house) {
        grid[i][j].houseWall = false;
        grid[i][j + 1].houseWall = false;
        grid[i][j + 2].houseWall = false;
        grid[i + 1][j].houseWall = false;
        grid[i + 1][j + 1].houseWall = false;
        grid[i + 1][j + 2].houseWall = false;
      } else if (grid[i][j].house) {
        grid[i][j].houseWall = true;
        grid[i][j + 1].houseWall = true;
        grid[i][j + 2].houseWall = true;
        grid[i + 1][j].houseWall = true;
        grid[i + 1][j + 1].houseWall = true;
        grid[i + 1][j + 2].houseWall = true;
      }
    }
  }
}
// A* algorithm
const a = (star, finish, grid) => {
  let start = grid[star.i][star.j];
  let end = grid[finish[0]][finish[1]];
  resetTheGrid(grid, start, end);
  let openSet = [];
  let closedSet = [];

  end.end = true;

  let path;
  openSet.push(start);
  while (openSet.length > 0) {
    let lowestF = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestF].f) {
        lowestF = i;
      }
    }

    let current = openSet[lowestF];
    if (current === end) {
      path = [];
      let temp = current;
      temp.end = true;
      path.unshift(temp);

      while (temp.pre) {
        path.unshift(temp.pre);
        temp = temp.pre;
      }

      path[0].start = true;

      console.log("Done");
      return path;
    }

    remove(openSet, current);
    closedSet.push(current);

    let currentNeighbors = current.neighbors;
    for (let i = 0; i < currentNeighbors.length; i++) {
      let neighbor = currentNeighbors[i];
      if (neighbor.isWall) continue;
      if (neighbor.houseWall) continue;
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
        neighbor.h = heur(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.pre = current;
      }
    }
  }
  return closedSet;
};
export default a;
