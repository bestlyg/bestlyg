import path from 'path';
import { lodash } from './dep';
import { blankReg } from './reg';

const { isNumber, isSet, isMap, isArray, isObject, isString, isBoolean, upperFirst, chunk } =
  lodash;

export const trimBlank = (str: string) => str.replace(blankReg, '');
export const resolve = (...p: string[]) => path.resolve(__dirname, '../../', ...p);