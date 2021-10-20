import { Vector2, Matrix4, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';
import { PointerType, State, Direction } from './types';

export abstract class Controls {
  state = State.NONE;
  screenSpacePanning = true;
  panDirection: Direction = Direction.ALL;
  rotateDirection: Direction = Direction.ALL;
  private _pvMartrix = new Matrix4();
  get pvMartrix() {
    return this._pvMartrix;
  }
  private _target = new Vector3(0, 0, 0);
  get target() {
    return this._target;
  }
  private _dragStart = new Vector2();
  get dragStart() {
    return this._dragStart;
  }
  private _dragEnd = new Vector2();
  get dragEnd() {
    return this._dragEnd;
  }
  protected zoomScale = 0.95;
  get canvasSize() {
    return [this.canvas.width, this.canvas.height];
  }
  constructor(
    protected canvas: HTMLCanvasElement,
    public camera: OrthographicCamera | PerspectiveCamera
  ) {}
  trigger({ x, y }: { x: number; y: number });
  trigger({ dolly }: { dolly: number });
  trigger(data: { x?: number; y?: number; dolly?: number }) {
    const {
      dragEnd,
      dragStart,
      state,
      zoomScale,
      camera: { type },
    } = this;
    if (data.dolly !== undefined) {
      this[`wheel${type}`]?.(data.dolly >= 0 ? 1 / zoomScale : zoomScale);
    } else {
      dragEnd.set(data.x!, data.y!);
      const delta = dragEnd.clone().sub(dragStart);
      switch (state) {
        case State.PAN:
          this[`pan${type}`]?.(delta);
          break;
        case State.ROTATE:
          this[`rotate${type}`]?.(delta);
          break;
      }
      dragStart.copy(dragEnd);
    }
    this.update();
  }
  update() {
    const { camera, target, pvMartrix } = this;
    camera.lookAt(target);
    camera.updateMatrixWorld(true);
    pvMartrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.onUpdated();
  }
  protected onUpdated() {}
  protected abstract panOrthographicCamera(delta: Vector2);
  protected abstract panPerspectiveCamera(delta: Vector2);
  protected abstract rotateOrthographicCamera(delta: Vector2);
  protected abstract rotatePerspectiveCamera(delta: Vector2);
  protected abstract wheelOrthographicCamera(zoomScale: number);
  protected abstract wheelPerspectiveCamera(zoomScale: number);
}
