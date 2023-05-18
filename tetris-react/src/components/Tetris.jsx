import { useBoard } from '../hooks/useBoard';
import Board from './Board';
import './Tetris.css';

function Tetris({ rows, columns, setGameOver }) {
  const [board, setBoard] = useBoard({ rows, columns });
  return (
    <div className="tetris">
      <Board board={board} />
    </div>
  );
}

export default Tetris;
