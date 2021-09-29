export type DrawTypes =
  | 'POINTS'
  | 'LINE_STRIP'
  | 'LINE_LOOP'
  | 'LINES'
  | 'TRIANGLE_STRIP'
  | 'TRIANGLE_FAN'
  | 'TRIANGLES';
export type Attribute = { name: string; size: number };
export type UniformMethods =
  | 'uniformMatrix2fv'
  | 'uniformMatrix3fv'
  | 'uniformMatrix4fv'
  | 'uniform1fv'
  | 'uniform2fv'
  | 'uniform3fv'
  | 'uniform4fv'
  | 'uniform1iv'
  | 'uniform2iv'
  | 'uniform3iv'
  | 'uniform4iv';
export type Uniform = {
  name: string;
  data: number[];
  method: UniformMethods;
};
export type Size = [number, number];
export type Animation = {
  key: string | number;
  loop: boolean;
  frames: { time: number; value: number }[];
};
export type Texture = {
  name: string;
  source: string;
  format: 'RGB' | 'RGBA';
  magFilter?: 'LINEAR' | 'NEAREST';
  minFilter?:
    | 'LINEAR'
    | 'NEAREST'
    | 'NEAREST_MIPMAP_NEAREST'
    | 'NEAREST_MIPMAP_LINEAR'
    | 'LINEAR_MIPMAP_NEAREST'
    | 'LINEAR_MIPMAP_LINEAR';
  wrapS?: 'REPEAT' | 'CLAMP_TO_EDGE' | 'MIRRORED_REPEAT';
  wrapT?: 'REPEAT' | 'CLAMP_TO_EDGE' | 'MIRRORED_REPEAT';
};
