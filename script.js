const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 4;
const cellSize = canvas.width / gridSize;

let player = { x: 0, y: 0 };
let gold = { x: 3, y: 3 };
let wumpus = { x: 2, y: 2 };

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }

    // Player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);

    // Gold
    ctx.fillStyle = "gold";
    ctx.fillRect(gold.x * cellSize, gold.y * cellSize, cellSize, cellSize);

    // Wumpus
    ctx.fillStyle = "red";
    ctx.fillRect(wumpus.x * cellSize, wumpus.y * cellSize, cellSize, cellSize);
}

function move(direction) {
    if (direction === "up" && player.y > 0) player.y--;
    if (direction === "down" && player.y < gridSize - 1) player.y++;
    if (direction === "left" && player.x > 0) player.x--;
    if (direction === "right" && player.x < gridSize - 1) player.x++;

    checkGameState();
    drawGrid();
}

function checkGameState() {
    if (player.x === wumpus.x && player.y === wumpus.y) {
        alert("💀 You were eaten by the Wumpus!");
        resetGame();
    }

    if (player.x === gold.x && player.y === gold.y) {
        alert("🎉 You found the gold!");
        resetGame();
    }
}

function resetGame() {
    player = { x: 0, y: 0 };
}

drawGrid();