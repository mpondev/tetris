import { useBoard } from '../hooks/useBoard';
import { useGameStats } from '../hooks/useGameStats';
import { usePlayer } from '../hooks/usePlayer';
import Board from './Board';
import GameStats from './GameStats';
import Previews from './Previews';
import GameController from './GameController';
import './Tetris.css';

function Tetris({ rows, columns, setGameOver }) {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });

  return (
    <div className="tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews pieces={player.pieces} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
}

export default Tetris;
