import { defaultCell } from './cell';

export function buildBoard({ rows, columns }) {
  const buildRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: buildRows,
    size: { rows, columns },
  };
}
