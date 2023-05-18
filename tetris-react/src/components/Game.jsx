import Menu from './Menu';

function Game({ rows, columns }) {
  function start() {
    console.log('start');
  }
  return (
    <div className="game">
      <Menu onClick={start} />
    </div>
  );
}

export default Game;
