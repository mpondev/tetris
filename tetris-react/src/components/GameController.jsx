import { Action, actionForKey } from '../utils/input';
import { playerController } from '../utils/playerController';
import './GameController.css';

function GameController({ board, gameStats, player, setGameOver, setPlayer }) {
  function onKeyUp({ code }) {
    const action = actionForKey(code);
    if (action === Action.Quit) {
      setGameOver(true);
    }
  }

  function onKeyDown({ code }) {
    const action = actionForKey(code);
    handleInput({ action });
  }

  function handleInput({ action }) {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
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
