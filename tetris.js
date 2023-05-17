const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

const piece = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function drawPiece(piece, offset) {
  piece.forEach((x, y) => {
    x.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x, y, 1, 1);
      }
    });
  });
}

drawPiece(piece, { x: 5, y: 5 });
