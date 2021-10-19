import { Vector2, Matrix4, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';
import { PointerType, State, Direction } from './types';

export abstract class Controls {
  state = State.NONE;
  target = new Vector3(0, 0, 0);
  screenSpacePanning = true;
  panDirection: Direction = Direction.ALL;
  rotateDirection: Direction = Direction.ALL;
  pvMartrix = new Matrix4();
  private _dragStart = new Vector2();
  get dragStart() {
    return this._dragStart;
  }
  private _dragEnd = new Vector2();
  get dragEnd() {
    return this._dragEnd;
  }
  protected zoomScale = 0.95;
  protected panOffset = new Vector3();
  protected rotateOffset = new Vector3();
  get canvasSize() {
    return [this.canvas.width, this.canvas.height];
  }
  constructor(
    protected canvas: HTMLCanvasElement,
    protected camera: OrthographicCamera | PerspectiveCamera
  ) {}
  trigger({ x, y }: { x: number; y: number }) {
    const { dragEnd, dragStart, state } = this;
    dragEnd.set(x, y);
    const delta = dragEnd.clone().sub(dragStart);
    switch (state) {
      case State.PAN:
        this[`pan${this.camera.type}`]?.(delta);
        break;
    }
    dragStart.copy(dragEnd);
    this.update();
  }
  update() {
    const { camera, target, panOffset, pvMartrix } = this;
    // pan
    target.add(panOffset);
    camera.position.add(panOffset);
    // common
    camera.lookAt(target);
    camera.updateMatrixWorld(true);
    pvMartrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    // reset
    panOffset.set(0, 0, 0);
    this.onUpdated();
  }
  protected onUpdated() {}
  protected abstract panOrthographicCamera(delta: Vector2);
  protected abstract panPerspectiveCamera(delta: Vector2);
}
