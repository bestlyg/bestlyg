/** core-shared 内部默认字符串前缀。 */
export const PREFIX = `bestlyg-`;
/** 已 resolve 的空 Promise，常用于把同步流程切到微任务。 */
export const ASYNC = Promise.resolve();
/** 无原型对象占位。 */
export const ANY_OBJ = Object.create(null) as any;
/** 透传所有参数的默认操作函数。 */
export const ANY_OP = (...args: any[]) => args;
/** 透传单个值的默认操作函数。 */
export const DEFAULT_OP: <T>(val: T) => T = (val) => val;
/** 空操作函数。 */
export const VOID_OP = (..._args: any[]) => {};

/** 未找到元素时的统一下标值。 */
export const ELEMENT_NOT_FOUNT = -1;
/** 下标越界错误文案。 */
export const ERROR_SUBSCRIPT_OUT_OF_BOUNDS = '下标越界';
/** 空元素错误文案。 */
export const ERROR_EMPTY_ELEMENT = '空元素';
