const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

const piece = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawPiece(pieceInfo.piece, pieceInfo.pos);
}

function drawPiece(piece, offset) {
  piece.forEach((x, y) => {
    x.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function pieceDrop() {
  pieceInfo.pos.y++;
  dropCounter = 0;
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    pieceDrop();
  }

  draw();
  requestAnimationFrame(update);
}

const pieceInfo = {
  pos: { x: 5, y: 5 },
  piece: piece,
};

document.addEventListener('keydown', evt => {
  if (evt.key === 'ArrowLeft') {
    pieceInfo.pos.x--;
  } else if (evt.key === 'ArrowRight') {
    pieceInfo.pos.x++;
  } else if (evt.key === 'ArrowDown') {
    pieceDrop();
  }
});

update();
