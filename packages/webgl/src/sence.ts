import { Object3D } from './object3D';
import { Webgl } from './webgl';
export class Sence {
  private _map = new Map<string, Object3D>();
  get map() {
    return this._map;
  }
  get list() {
    return Array.from(this.map.values());
  }
  constructor(private webgl: Webgl) {}
  add(...list: Object3D[]) {
    for (const obj of list) {
      this.map.set(obj.id, obj);
    }
  }
  remove(...list: Object3D[]) {
    for (const obj of list) {
      this.map.delete(obj.id);
    }
  }
  draw() {
    const {
      webgl: { context },
      webgl,
    } = this;
    webgl.clear();
    for (const obj of this.list) {
      context.useProgram(obj.program);
      obj.update();
      obj.drawTypes.forEach(mode => {
        context.drawElements(context[mode], obj.geometry.count, context.UNSIGNED_BYTE, 0);
      });
    }
  }
  setUniform(key: string, data: number[]) {
    this.list.forEach(obj => obj.material.setUniform(key, data));
  }
}
