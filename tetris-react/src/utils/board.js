import { defaultCell } from './cell';
import { movePlayer } from './playerController';
import { transferToBoard } from './pieces';

export function buildBoard({ rows, columns }) {
  const buildRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: buildRows,
    size: { rows, columns },
  };
}

function findDropPosition({ board, position, shape }) {
  let max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
}

export function nextBoard({ board, player, resetPlayer, addLinesCleared }) {
  const { piece, position } = player;

  // Copy and clear spaces used by pieces that
  // hadn't collided and occupied spaces permanently
  let rows = board.rows.map(row =>
    row.map(cell => (cell.occupied ? cell : { ...defaultCell }))
  );

  // Drop position
  const dropPosition = findDropPosition({
    board,
    position,
    shape: piece.shape,
  });

  // Place ghost
  const className = `${piece.className} ${
    player.isFastDropping ? '' : 'ghost'
  }`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: piece.shape,
  });

  // Place the piece
  // If it collided, mark the board cells as collided
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: piece.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: piece.shape,
    });
  }

  rows = transferToBoard({
    className: piece.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: piece.shape,
  });

  // If we collided, reset the player!
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  // Return the next board
  return {
    rows,
    size: { ...board.size },
  };
}

export function hasCollision({ board, position, shape }) {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;

        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

export function isWithinBoard({ board, position, shape }) {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) return false;
      }
    }
  }

  return true;
}
