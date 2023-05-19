import './GameStats.css';

function GameStats({ gameStats }) {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <div>
      <ul className="gameStats gameStats__right">
        <li>Level</li>
        <li className="value">{level}</li>
        <li>Lines to Level</li>
        <li className="value">{linesToLevel}</li>
        <li>Points</li>
        <li className="value">{points}</li>
      </ul>
    </div>
  );
}

export default GameStats;
