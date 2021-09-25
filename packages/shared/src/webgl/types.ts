export type DrawTypes =
  | 'POINTS'
  | 'LINE_STRIP'
  | 'LINE_LOOP'
  | 'LINES'
  | 'TRIANGLE_STRIP'
  | 'TRIANGLE_FAN'
  | 'TRIANGLES';
export type Attribute = { name: string; size: number; index: number; byteIndex: number };
export type UniformMatrixMethods = 'uniformMatrix2fv' | 'uniformMatrix3fv' | 'uniformMatrix4fv';
export type UniformCommonMethods =
  | 'uniform1fv'
  | 'uniform2fv'
  | 'uniform3fv'
  | 'uniform4fv'
  | 'uniform1iv'
  | 'uniform2iv'
  | 'uniform3iv'
  | 'uniform4iv';
export type UniformMatrixMap = {
  [Method in UniformMatrixMethods]: {
    name: string;
    data: Parameters<WebGLRenderingContext[Method]>[2];
    method: Method;
  };
};
export type UniformCommonMap = {
  [Method in UniformCommonMethods]: {
    name: string;
    data: Parameters<WebGLRenderingContext[Method]>[1];
    method: Method;
  };
};
export type UniformCommon = UniformCommonMap[keyof UniformCommonMap];
export type UniformMatrix = UniformMatrixMap[keyof UniformMatrixMap];
export type Uniform = UniformCommon | UniformMatrix;
