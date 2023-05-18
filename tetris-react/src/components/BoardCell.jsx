import './BoardCell.css';

function BoardCell({ cell }) {
  return (
    <div className={`boardCell ${cell.className}`}>
      <div className="sparkle"></div>
    </div>
  );
}

export default BoardCell;
