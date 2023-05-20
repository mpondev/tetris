import { useState, useCallback } from 'react';

function buildGameStats() {
  return {
    level: 1,
    linesCompleted: 0,
    linesPerLevel: 10,
    points: 0,
  };
}

export function useGameStats() {
  const [gameStats, setGameStats] = useState(buildGameStats());

  const addLinesCleared = useCallback(lines => {
    setGameStats(previous => {
      const points = previous.points + lines * 100;
      const { linesPerLevel } = previous;
      const newLinesCompleted = previous.linesCompleted + lines;
      const level =
        newLinesCompleted >= linesPerLevel
          ? previous.level + 1
          : previous.level;
      const linesCompleted = newLinesCompleted % linesPerLevel;

      return {
        level,
        linesCompleted,
        linesPerLevel,
        points,
      };
    }, []);
  }, []);

  return [gameStats, addLinesCleared];
}
