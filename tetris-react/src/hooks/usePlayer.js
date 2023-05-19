import { useState, useCallback } from 'react';
import { randomPiece } from '../utils/pieces';

function buildPlayer(previous) {
  let pieces;

  if (previous) {
    pieces = [...previous.pieces];
    pieces.unshift(randomPiece());
  } else {
    pieces = Array(5)
      .fill(0)
      .map(_ => {
        randomPiece();
      });
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    pieces,
    piece: pieces.pop(),
  };
}

export function usePlayer() {
  const [player, setPlayer] = useState(buildPlayer());

  const resetPlayer = useCallback(() => {
    setPlayer(prev => buildPlayer(prev));
  }, []);

  return [player, setPlayer, resetPlayer];
}
