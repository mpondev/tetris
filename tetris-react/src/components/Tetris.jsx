import { useBoard } from '../hooks/useBoard';
import { useGameStats } from '../hooks/useGameStats';
import Board from './Board';
import GameStats from './GameStats';
import './Tetris.css';

function Tetris({ rows, columns, setGameOver }) {
  const [board, setBoard] = useBoard({ rows, columns });
  const [gameStats, addLinesCleared] = useGameStats();
  return (
    <div className="tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
    </div>
  );
}

export default Tetris;
