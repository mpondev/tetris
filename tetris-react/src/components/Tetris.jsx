import { useBoard } from '../hooks/useBoard';
import { useGameStats } from '../hooks/useGameStats';
import { usePlayer } from '../hooks/usePlayer';
import Board from './Board';
import GameStats from './GameStats';
import Previews from './Previews';
import './Tetris.css';

function Tetris({ rows, columns, setGameOver }) {
  const [board, setBoard] = useBoard({ rows, columns });
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();

  return (
    <div className="tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews pieces={player.pieces} />
    </div>
  );
}

export default Tetris;
