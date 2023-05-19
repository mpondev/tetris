import { memo } from 'react';
import Preview from './Preview';

function Previews({ pieces }) {
  // We want everything except the last one
  const previewPieces = pieces.slice(1 - pieces.length).reverse();

  return (
    <>
      {previewPieces.map((piece, index) => (
        <Preview piece={piece} index={index} key={index} />
      ))}
    </>
  );
}

export default memo(Previews);
