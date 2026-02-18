export const PREFIX = `bestlyg-`;
export const ASYNC = Promise.resolve();
export const ANY_OBJ = Object.create(null) as any;
export const ANY_OP = (...args: any[]) => args;
export const DEFAULT_OP: <T>(val: T) => T = (val) => val;
export const VOID_OP = (..._args: any[]) => {};

export const ELEMENT_NOT_FOUNT = -1;
export const ERROR_SUBSCRIPT_OUT_OF_BOUNDS = '下标越界';
export const ERROR_EMPTY_ELEMENT = '空元素';
