import { defaultCell } from './cell';
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

export function nextBoard({ board, player, resetPlayer, addLinesCleared }) {
  const { piece, position } = player;

  // Copy and clear spaces used by pieces that
  // hadn't collided and occupied spaces permanently
  let rows = board.rows.map(row =>
    row.map(cell => (cell.occupied ? cell : { ...defaultCell }))
  );

  rows = transferToBoard({
    className: piece.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: piece.shape,
  });

  // Return the next board
  return {
    rows,
    size: { ...board.size },
  };
}
