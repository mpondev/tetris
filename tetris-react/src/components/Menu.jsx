import './Menu.css';

function Menu({ onClick }) {
  return (
    <div className="menu">
      <button className="menu-btn" onClick={onClick}>
        Play Tetris
      </button>
    </div>
  );
}

export default Menu;
