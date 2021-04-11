import path from 'path';
import { EMPTY_OBJ } from './obj';
import { blankReg } from './reg';

export const trimBlank = (str: string) => str.replace(blankReg, '');
export const resolve = (...p: string[]) =>
  path.resolve.apply(EMPTY_OBJ, [__dirname, '../../', ...p]);
