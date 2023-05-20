import { Action } from './input';
import { rotate } from './pieces';
import { isWithinBoard, hasCollision } from './board';

function attemptRotation({ board, player, setPlayer }) {
  const shape = rotate({
    piece: player.piece.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      piece: {
        ...player.piece,
        shape,
      },
    });
  } else {
    return false;
  }
}

export function playerController({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}) {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  }
}
