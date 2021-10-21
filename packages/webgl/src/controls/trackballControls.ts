import { Controls } from './base';
import {
  Quaternion,
  Vector2,
  OrthographicCamera,
  PerspectiveCamera,
  Vector3,
  MathUtils,
  Spherical,
} from 'three';
import { Direction } from './types';
export class TrackballControls extends Controls {
  constructor(canvas: HTMLCanvasElement, camera: OrthographicCamera | PerspectiveCamera) {
    super(canvas, camera);
  }
  protected panOrthographicCamera({ x, y }: Vector2) {
    const {
      canvasSize: [canvasWidth, canvasHeight],
      camera,
    } = this;
    const { left, right, top, bottom } = camera as OrthographicCamera;
    const [cameraWidth, cameraHeight] = [right - left, top - bottom];
    const [distanceX, distanceY] = [
      (x / canvasWidth) * cameraWidth,
      (y / canvasHeight) * cameraHeight,
    ];
    this._pan(distanceX, distanceY);
  }
  protected panPerspectiveCamera({ x, y }: Vector2) {
    const {
      camera,
      target,
      canvasSize: [, canvasHeight],
    } = this;
    const { fov, position } = camera as PerspectiveCamera;
    const distance = position.clone().sub(target).length();
    const height = 2 * Math.tan(MathUtils.degToRad(fov / 2)) * distance;
    const ratio = height / canvasHeight;
    const [distanceX, distanceY] = [ratio * x, ratio * y];
    this._pan(distanceX, distanceY);
  }
  protected _pan(distanceX: number, distanceY: number) {
    const {
      camera,
      camera: { matrix, up },
      target,
      screenSpacePanning,
      panDirection,
    } = this;
    const panOffset = new Vector3();
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
    target.add(panOffset);
    camera.position.add(panOffset);
  }
  protected wheelOrthographicCamera(zoomScale: number) {
    const { camera } = this;
    camera.zoom *= zoomScale;
    camera.updateProjectionMatrix();
  }
  protected wheelPerspectiveCamera(zoomScale: number) {
    const {
      camera: { position },
      target,
    } = this;
    const spherical = new Spherical().setFromVector3(position.clone().sub(target));
    spherical.radius *= zoomScale;
    const rotateOffset = new Vector3().setFromSpherical(spherical).add(target);
    position.copy(rotateOffset);
  }
  private getAngle({ x, y }: Vector2) {
    const {
      canvasSize: [, height],
      rotateDirection,
    } = this;
    const ratio = new Vector2(
      rotateDirection & Direction.HORIZONTAL ? x / height : 0,
      rotateDirection & Direction.VERTICAL ? -y / height : 0
    ).length();
    const angle = ratio * Math.PI * 2;
    return angle;
  }
  protected rotateOrthographicCamera(delta: Vector2) {
    const { x, y } = delta;
    const {
      camera,
      canvasSize: [canvasWidth, canvasHeight],
    } = this;
    const { top, bottom, left, right } = camera as OrthographicCamera;
    const [cameraWidth, cameraHeight] = [right - left, top - bottom];
    const [ratioX, ratioY] = [x / canvasWidth, -y / canvasHeight];
    const angle = this.getAngle(delta);
    const [distanceX, distanceY] = [ratioX * cameraWidth, ratioY * cameraHeight];
    this._rotate(angle, distanceX, distanceY);
  }
  protected rotatePerspectiveCamera(delta: Vector2) {
    const { x, y } = delta;
    const {
      camera,
      canvasSize: [canvasHeight],
      target,
    } = this;
    const { fov, position } = camera as PerspectiveCamera;
    const distance = position.clone().sub(target).length();
    const height = 2 * Math.tan(MathUtils.degToRad(fov / 2)) * distance;
    const ratio = height / canvasHeight;
    const [distanceX, distanceY] = [ratio * x, -ratio * y];
    const angle = this.getAngle(delta);
    this._rotate(angle, distanceX, distanceY);
  }
  private _rotate(angle: number, distanceX: number, distanceY: number) {
    const {
      camera: { matrix, position, up },
      target,
    } = this;
    const [mx, my] = [
      new Vector3().setFromMatrixColumn(matrix, 0),
      new Vector3().setFromMatrixColumn(matrix, 1),
    ];
    const [vx, vy] = [mx.multiplyScalar(distanceX), my.multiplyScalar(distanceY)];
    const moveDirection = vx.clone().add(vy).normalize();
    const eyeDirection = position.clone().sub(target).normalize();
    const axis = new Vector3().crossVectors(moveDirection, eyeDirection);
    const quaternion = new Quaternion().setFromAxisAngle(axis, angle);
    const rotateOffset = position.clone().sub(target).applyQuaternion(quaternion);
    position.copy(rotateOffset.add(target));
    up.applyQuaternion(quaternion);
  }
}
