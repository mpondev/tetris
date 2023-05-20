import { Action, actionForKey } from '../utils/input';
import './GameController.css';

function GameController({ board, gameStats, player, setGameOver, setPlayer }) {
  function onKeyUp({ code }) {
    const action = actionForKey(code);
    if (action === Action.Quit) {
      setGameOver(true);
    }
  }

  function onKeyDown({ code }) {
    console.log(`onKeyDown ${code}`);
  }

  return (
    <input
      className="gameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
}

export default GameController;
