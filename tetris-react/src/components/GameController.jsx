import { useInterval } from '../hooks/useInterval';
import { useDropTime } from '../hooks/useDropTime';
import { Action, actionForKey, actionIsDrop } from '../utils/input';
import { playerController } from '../utils/playerController';
import './GameController.css';

function GameController({ board, gameStats, player, setGameOver, setPlayer }) {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  function onKeyUp({ code }) {
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  }

  function onKeyDown({ code }) {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      handleInput({ action });
    }
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
