import type { CameraOffset } from './camera';
export type NavigationCommand = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Home';
export function keyboardCameraOffset(command: NavigationCommand, offset: CameraOffset, step = 46): CameraOffset {
  switch (command) {
    case 'ArrowUp': return { ...offset, y: offset.y + step };
    case 'ArrowDown': return { ...offset, y: offset.y - step };
    case 'ArrowLeft': return { ...offset, x: offset.x + step };
    case 'ArrowRight': return { ...offset, x: offset.x - step };
    case 'Home': return { x: 0, y: 0 };
  }
}
