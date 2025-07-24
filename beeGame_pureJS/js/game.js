const params = new URLSearchParams(window.location.search);
const gameData = {
  rows: Number(params.get("rows")),
  cols: Number(params.get("cols")),
  startingX: Number(params.get("xcoord")) - 1,
  startingY: Number(params.get("ycoord")) - 1,
};
let grid = [];
let beePosition = { x: gameData.startingX, y: gameData.startingY };

function createGrid() {
  grid = Array.from({ length: gameData.rows }, (_, y) =>
    Array.from({ length: gameData.cols }, (_, x) => ({
      hasHeart: !this.beeHere && !this.isVisited,
      isVisited: false,
      beeHere: x === gameData.startingX && y === gameData.startingY,
    }))
  );
  drawGrid();
}

function drawGrid() {
  const board = document.getElementById("grid");
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${grid[0].length}, 50px)`;
  board.style.gridTemplateRows = `repeat(${grid.length}, 50px)`;

  grid.forEach((row) => {
    row.forEach((cell) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      if (cell.beeHere) cellDiv.textContent = "🐝";
      else if (cell.isVisited) cellDiv.textContent = "❌";
      else cellDiv.textContent = "❤️";
      board.appendChild(cellDiv);
    });
  });
}

function moveBee(dx, dy) {
  const newX = beePosition.x + dx;
  const newY = beePosition.y + dy;

  // Check if bee goes out of bounds
  if (newX < 0 || newY < 0 || newY >= grid.length || newX >= grid[0].length) {
    console.log("Out of bounds!");
    const errorDiv = document.getElementById("errormsg");
    errorDiv.textContent = "You have gone out of bounds! Restarting...";
    setTimeout(() => {
      location.reload();
    }, 1500);
    return;
  }

  // Check if bee goes into an "X"
  if (grid[newX][newY].isVisited) {
    const errorDiv = document.getElementById("errormsg");
    errorDiv.textContent = "You have lost! Restarting...";
    setTimeout(() => {
      location.reload();
    }, 1500);
    return;
  }

  // Clear old bee position
  grid[beePosition.y][beePosition.x].beeHere = false;
  grid[beePosition.y][beePosition.x].isVisited = true;

  // Update new position
  beePosition.x = newX;
  beePosition.y = newY;
  grid[newY][newX].beeHere = true;

  drawGrid();
}

createGrid();
