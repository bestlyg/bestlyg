import { OrthographicCamera, PerspectiveCamera, Vector2, Spherical, Vector3 } from 'three';
import { Controls } from './base';
import { Direction, State } from './types';
export class OrbitControls extends Controls {
  private spherical = new Spherical();
  constructor(canvas: HTMLCanvasElement, camera: OrthographicCamera | PerspectiveCamera) {
    super(canvas, camera);
  }
  private updateSpherical() {
    this.spherical.setFromVector3(this.camera.position.clone().sub(this.target));
  }
  protected panOrthographicCamera({ x, y }: Vector2) {
    const {
      canvasSize: [canvasWidth, canvasHeight],
      screenSpacePanning,
      panOffset,
      camera,
      panDirection,
    } = this;
    const { left, right, top, bottom, matrix, up } = camera as OrthographicCamera;
    const [cameraWidth, cameraHeight] = [right - left, top - bottom];
    const [distanceX, distanceY] = [
      (x / canvasWidth) * cameraWidth,
      (y / canvasHeight) * cameraHeight,
    ];
    const axisX = new Vector3().setFromMatrixColumn(matrix, 0);
    const vecX = axisX.clone().multiplyScalar(-distanceX);
    const vecY = (
      screenSpacePanning
        ? new Vector3().setFromMatrixColumn(matrix, 1)
        : new Vector3().crossVectors(up, axisX)
    ).multiplyScalar(distanceY);
    switch (panDirection) {
      case Direction.HORIZONTAL:
        panOffset.copy(vecX);
        break;
      case Direction.VERTICAL:
        panOffset.copy(vecY);
        break;
      case Direction.ALL:
        panOffset.copy(vecX.add(vecY));
        break;
    }
    this.update();
  }
  protected panPerspectiveCamera(delta: Vector2) {}
}
