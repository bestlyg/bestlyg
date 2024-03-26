import path from 'path';
import _ from 'lodash';

export const resolve = (...p: string[]) => path.resolve(__dirname, '..', ...p);
