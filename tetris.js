const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function collide(arena, pieceInfo) {
  const [m, p] = [pieceInfo.piece, pieceInfo.pos];
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (m[y][x] !== 0 && (arena[y + p.y] && arena[y + p.y][x + p.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function createPiece(w, h) {
  const piece = [];
  while (h--) {
    piece.push(new Array(w).fill(0));
  }
  return piece;
}

function createPieces(type) {
  if (type === 'T') {
    return [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];
  } else if (type === 'O') {
    return [
      [1, 1],
      [1, 1],
    ];
  } else if (type === 'L') {
    return [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ];
  } else if (type === 'J') {
    return [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ];
  } else if (type === 'I') {
    return [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ];
  } else if (type === 'S') {
    return [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
  } else if (type === 'Z') {
    return [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ];
  }
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawPiece(arena, { x: 0, y: 0 });
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

function merge(arena, pieceInfo) {
  pieceInfo.piece.forEach((x, y) => {
    x.forEach((value, x) => {
      if (value !== 0) {
        arena[y + pieceInfo.pos.y][x + pieceInfo.pos.x] = value;
      }
    });
  });
}

function pieceDrop() {
  pieceInfo.pos.y++;
  if (collide(arena, pieceInfo)) {
    pieceInfo.pos.y--;
    merge(arena, pieceInfo);
    pieceReset();
  }
  dropCounter = 0;
}

function pieceMove(dir) {
  pieceInfo.pos.x += dir;
  if (collide(arena, pieceInfo)) {
    pieceInfo.pos.x -= dir;
  }
}

function pieceReset() {
  const pieces = 'ILJOTSZ';
  pieceInfo.piece = createPieces(pieces[(pieces.length * Math.random()) | 0]);
  pieceInfo.pos.y = 0;
  pieceInfo.pos.x =
    ((arena[0].length / 2) | 0) - ((pieceInfo.piece[0].length / 2) | 0);
}

function pieceRotate(dir) {
  const pos = pieceInfo.pos.x;
  let offset = 1;
  rotate(pieceInfo.piece, dir);
  while (collide(arena, pieceInfo)) {
    pieceInfo.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > pieceInfo.piece[0].length) {
      rotate(pieceInfo.piece, -dir);
      pieceInfo.pos.x = pos;
      return;
    }
  }
}

function rotate(piece, dir) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < y; x++) {
      [piece[x][y], piece[y][x]] = [piece[y][x], piece[x][y]];
    }
  }
  if (dir > 0) {
    piece.forEach(row => row.reverse());
  } else {
    piece.reverse();
  }
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

const arena = createPiece(12, 20);

const pieceInfo = {
  pos: { x: 5, y: 5 },
  piece: createPieces('T'),
};

document.addEventListener('keydown', evt => {
  if (evt.key === 'ArrowLeft') {
    pieceMove(-1);
  } else if (evt.key === 'ArrowRight') {
    pieceMove(1);
  } else if (evt.key === 'ArrowDown') {
    pieceDrop();
  } else if (evt.key === 'q') {
    pieceRotate(-1);
  } else if (evt.key === 'w') {
    pieceRotate(1);
  }
});

update();
