import Menu from './Menu';
import { useGameOver } from '../hooks/useGameOver';

function Game({ rows, columns }) {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  function start() {
    resetGameOver();
    console.log(`Start ${gameOver}`);
  }
  return (
    <div className="game">
      <Menu onClick={start} />
    </div>
  );
}

export default Game;
