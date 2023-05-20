export const Action = {
  Left: 'Left',
  FastDrop: 'FastDrop',
  Pause: 'Pause',
  Quit: 'Quit',
  Right: 'Right',
  Rotate: 'Rotate',
  SlowDrop: 'SlowDrop',
};

export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop,
};

export function actionIsDrop(action) {
  return [Action.SlowDrop, Action.FastDrop].includes(action);
}

export const actionForKey = keyCode => Key[keyCode];
