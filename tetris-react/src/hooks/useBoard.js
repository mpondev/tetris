import { useState } from 'react';
import { buildBoard } from '../utils/board';

export function useBoard({ rows, columns }) {
  const [board] = useState(buildBoard({ rows, columns }));

  return [board];
}
