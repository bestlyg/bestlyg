import { useRef, useCallback } from 'react';
import { OrthographicCamera, Vector2 } from 'three';
import { useEventListener, useCreation, usePersistFn } from 'ahooks';
/** 控制器状态 */
enum ControlsState {
  NONE,
  /* 平移 */
  PAN,
  /* 旋转 */
  ROTATE,
  /* 缩放 */
  DOLLY,
}
export function useOrthographicControls({
  canvasRef,
  camera,
  onUpdated,
}: {
  camera: OrthographicCamera;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onUpdated: () => void;
}) {
  const state = useRef(ControlsState.NONE);
  const dragStart = useCreation(() => new Vector2(), []);
  const dragEnd = useCreation(() => new Vector2(), []);
  const pan = usePersistFn((vec: Vector2) => {});
  const dragMap = useCreation(
    () =>
      ({
        [ControlsState.PAN]: pan,
      } as Record<ControlsState, (vec: Vector2) => void>),
    []
  );
  useEventListener('contextmenu', e => e.preventDefault(), { target: canvasRef });
  useEventListener(
    'pointerdown',
    ({ button, clientX, clientY }) => {
      dragStart.set(clientX, clientY);
      if (button === 0) {
        // 左键
        state.current = ControlsState.ROTATE;
      } else if (button === 1) {
        // 滚轮
      } else if (button === 2) {
        // 右键
        state.current = ControlsState.PAN;
      }
    },
    { target: canvasRef }
  );
  useEventListener('pointerup', () => (state.current = ControlsState.NONE), { target: canvasRef });
  useEventListener(
    'pointermove',
    ({ clientX, clientY }) => {
      if (state.current === ControlsState.NONE) return;
      dragEnd.set(clientX, clientY);
      dragMap[state.current]?.(dragEnd.clone().sub(dragStart));
      dragStart.copy(dragEnd);
    },
    { target: canvasRef }
  );
}
