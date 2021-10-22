import { Sence } from '../sence';
import { DrawTypes } from '../types';
import { Webgl } from '../webgl';
import { Geometry, GeometryProps } from './geometry';
import { Material, MaterialProps } from './material';
type InternalOmit<T> = Omit<Omit<T, 'webgl'>, 'program'>;
interface Object3DProps {
  id: string;
  geoProps: InternalOmit<GeometryProps>;
  matProps: InternalOmit<MaterialProps>;
  webgl: Webgl;
  drawTypes: DrawTypes[];
  vertexShaderSource: string;
  fragmentShaderSource: string;
}
export class Object3D {
  private _drawTypes: DrawTypes[];
  get drawTypes() {
    return this._drawTypes;
  }
  public id: string;
  private _program: WebGLProgram;
  get program() {
    return this._program;
  }
  public parent: Sence | null = null;
  private _geometry: Geometry;
  private _material: Material;
  get geometry() {
    return this._geometry;
  }
  get material() {
    return this._material;
  }
  constructor({
    id,
    webgl,
    vertexShaderSource,
    fragmentShaderSource,
    geoProps,
    matProps,
    drawTypes,
  }: Object3DProps) {
    this.id = id;
    this._drawTypes = drawTypes;
    const program = (this._program = webgl.createProgram(vertexShaderSource, fragmentShaderSource));
    webgl.context.useProgram(program);
    this._geometry = new Geometry({ webgl, program, ...geoProps });
    this._material = new Material({ webgl, program, ...matProps });
  }
  update() {
    if (!this.material.init) return;
    this.geometry.update();
    this.material.update();
  }
}
