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
