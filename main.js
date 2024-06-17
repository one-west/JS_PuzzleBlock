const canvas = document.getElementById("board");
const context = canvas.getContext("2d");
const playButton = document.getElementById("play-button");

canvas.width = grid * 10; // grid * 열 크기
canvas.height = grid * 20; // grid * 행 크기

let tetromino = randomTetromino();
let offsetX = 3; // 테트로미노 좌표 X
let offsetY = 0; // 테트로미노 좌표 Y
let gameOver = false;
let score = 0;
let level = 1;
let lines = 0;
let dropStart = Date.now();

function playSound(id) {
  const sound = document.getElementById(id);
  sound.currentTime = 0; // 효과음을 처음부터 재생
  sound.play();
}

function updateScoreAndLevel(linesCleared) {
  score += linesCleared * 100;

  if (level !== Math.floor(score / 500) + 1) {
    console.log(level);
    playSound("me_mara_lvup");
    level = Math.floor(score / 500) + 1;
  }

  lines += linesCleared;
  document.getElementById("score").innerText = score;
  document.getElementById("level").innerText = level;
  document.getElementById("lines").innerText = lines;
}

function drawTetromino(tetromino, offsetX, offsetY) {
  context.fillStyle = colors[tetromino.name];
  tetromino.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillRect(
          (offsetX + x) * grid,
          (offsetY + y) * grid,
          grid - 1,
          grid - 1
        );
      }
    });
  });
}

function gameLoop() {
  const now = Date.now();
  const delta = now - dropStart;
  console.log(delta); 
  if (delta > 1000 - level * 100) {
    moveDown();
    dropStart = Date.now();
  }
  if (!gameOver) {
    drawBoard(context);
    drawTetromino(tetromino, offsetX, offsetY);
    requestAnimationFrame(gameLoop);
  } else {
    playSound("se_game_bfall");
    alert("Game Over");
    return;
  }
}

function moveLeft() {
  offsetX--;
  if (collision(tetromino, offsetX, offsetY)) {
    offsetX++;
  }
}

function moveRight() {
  offsetX++;
  if (collision(tetromino, offsetX, offsetY)) {
    offsetX--;
  }
}

function moveDown() {
  offsetY++;
  if (collision(tetromino, offsetX, offsetY)) {
    offsetY--;
    merge(tetromino, offsetX, offsetY);

    const linesCleared = removeFullLines();
    if (linesCleared > 0) {
      playSound("se_game_tetris");
      updateScoreAndLevel(linesCleared);
    }
    tetromino = randomTetromino();
    offsetX = 3;
    offsetY = 0;
    if (collision(tetromino, offsetX, offsetY)) {
      playButton.style.display = "block";
      gameOver = true;
    }
  }
}

function rotateTetromino() {
  const rotated = rotate(tetromino.shape);
  if (!collision({ shape: rotated }, offsetX, offsetY)) {
    tetromino.shape = rotated;
  }
}

function moveToBottom() {
  while (!collision(tetromino, offsetX, offsetY)) {
    offsetY++;
  }
  offsetY--;
  merge(tetromino, offsetX, offsetY);

  const linesCleared = removeFullLines();
  if (linesCleared > 0) {
    playSound("se_game_tetris");
    updateScoreAndLevel(linesCleared);
  }
  tetromino = randomTetromino();
  offsetX = 3;
  offsetY = 0;
  if (collision(tetromino, offsetX, offsetY)) {
    playButton.style.display = "block";
    gameOver = true;
  }
}

document.addEventListener("keydown", (e) => {
  if (gameOver) return;
  e.preventDefault();
  switch (e.key) {
    case "ArrowLeft":
      playSound("se_game_move");
      moveLeft();
      break;
    case "ArrowRight":
      playSound("se_game_move");
      moveRight();
      break;
    case "ArrowDown":
      playSound("se_game_move");
      moveDown();
      break;
    case "ArrowUp":
      playSound("se_game_rotate");
      rotateTetromino();
      break;
    case " ":
      playSound("se_game_landing");
      moveToBottom();
      break;
    case "Escape":
      playSound("se_game_bfall");
      playButton.style.display = "block";
      gameOver = true;
      alert("Game Over");
      return;
  }
});

playButton.addEventListener("click", () => {
  playSound("se_game_single");
  gameOver = false;
  playButton.style.display = "none";
  reset();
  offsetX = 3;
  offsetY = 0;
  score = 0;
  level = 1;
  lines = 0;
  dropStart = Date.now();
  updateScoreAndLevel(0);
  requestAnimationFrame(gameLoop);
});
