const size = 4;
let agent = { x: 0, y: 3 };

const pits = [{ x: 1, y: 1 }, { x: 3, y: 0 }];
const wumpus = { x: 2, y: 2 };
const gold = { x: 3, y: 3 };

const grid = document.getElementById("grid");
const statusText = document.getElementById("status");

function drawGrid() {
  grid.innerHTML = "";

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      if (agent.x === x && agent.y === y) {
        cell.classList.add("agent");
        cell.innerText = "A";
      } else if (gold.x === x && gold.y === y) {
        cell.classList.add("gold");
        cell.innerText = "G";
      } else if (wumpus.x === x && wumpus.y === y) {
        cell.classList.add("wumpus");
        cell.innerText = "W";
      } else if (pits.some(p => p.x === x && p.y === y)) {
        cell.classList.add("pit");
        cell.innerText = "P";
      }

      grid.appendChild(cell);
    }
  }
}

function move(direction) {
  let newX = agent.x;
  let newY = agent.y;

  if (direction === "up") newY--;
  if (direction === "down") newY++;
  if (direction === "left") newX--;
  if (direction === "right") newX++;

  if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
    statusText.innerText = "Hit a wall!";
    return;
  }

  agent.x = newX;
  agent.y = newY;

  checkState();
  drawGrid();
}

function checkState() {
  if (pits.some(p => p.x === agent.x && p.y === agent.y)) {
    statusText.innerText = "Fell into a pit! Game Over.";
  } else if (agent.x === wumpus.x && agent.y === wumpus.y) {
    statusText.innerText = "Eaten by the Wumpus! Game Over.";
  } else if (agent.x === gold.x && agent.y === gold.y) {
    statusText.innerText = "You found the gold! You win!";
  } else {
    statusText.innerText = "Safe move.";
  }
}

drawGrid();
