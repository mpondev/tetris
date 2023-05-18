import Menu from './Menu';
import Tetris from './Tetris';
import { useGameOver } from '../hooks/useGameOver';

function Game({ rows, columns }) {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  function start() {
    resetGameOver();
  }
  return (
    <div className="game">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
}

export default Game;
