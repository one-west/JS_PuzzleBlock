const tetrominoes = {
  I: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
  ],
  J: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
  ],
  L: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
  ],
  O: [
      [1, 1],
      [1, 1]
  ],
  S: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
  ],
  Z: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
  ],
  T: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
  ]
};

const colors = {
  I: 'cyan',
  J: 'blue',
  L: 'orange',
  O: 'yellow',
  S: 'green',
  Z: 'red',
  T: 'purple'
};

// 랜덤 테트로미노 뽑기
function randomTetromino() {
  const keys = Object.keys(tetrominoes);
  const name = keys[Math.floor(Math.random() * keys.length)];
  return { name, shape: tetrominoes[name] };
}

// 테트로미노 90도 회전
function rotate(matrix) {
  return matrix[0].map((val, index) =>
      matrix.map(row => row[index]).reverse()
  );
}
