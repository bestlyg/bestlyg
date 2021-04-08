import path from 'path';
import { blankReg } from './reg';

export const trimBlank = (str: string) => str.replace(blankReg, '');
export const resolve = (...p: string[]) => path.resolve.apply({}, [__dirname, '../../', ...p]);
