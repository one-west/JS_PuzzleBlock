const grid = 32; // 한 칸의 크기 (픽셀)
let board = Array.from({ length: 20 }, () => Array(10).fill(0)); // 보드 생성

// 게임 보드를 그리는 함수
function drawBoard(context) {
  context.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = colors[value];
        context.fillRect(x * grid, y * grid, grid - 1, grid - 1);
      }
    });
  });
}

// 테트로미노 보드에 병합
function merge(tetromino, offsetX, offsetY) {
  tetromino.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        board[y + offsetY][x + offsetX] = tetromino.name;
      }
    });
  });
}

// 완전히 채워진 라인 제거
function removeFullLines() {
  let linesCleared = 0; // 제거된 라인 수
  board = board.filter((row) => {
    if (row.every((cell) => cell !== 0)) {
      linesCleared++;
      return false;
    }
    return true;
  });
  while (board.length < 20) {
    board.unshift(Array(10).fill(0));
  }
  return linesCleared;
}

// 테트로미노가 게임 보드에 충돌하는지 여부
function collision(tetromino, offsetX, offsetY) {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (
        tetromino.shape[y][x] &&
        (board[y + offsetY] && board[y + offsetY][x + offsetX]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}

// 보드 초기화
function reset() {
  board = Array.from({ length: 20 }, () => Array(10).fill(0));
}
