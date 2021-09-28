import path from 'path';
import { blankReg } from './reg';

export const trimBlank = (str: string) => str.replace(blankReg, '');
export const resolve = (...p: string[]) => path.resolve(__dirname, '../../', ...p);
export const log = (data: Record<string, any>, split = 20) => {
  split && console.log('='.repeat(split));
  console.log(
    Object.entries(data)
      .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
      .join(',')
  );
};
