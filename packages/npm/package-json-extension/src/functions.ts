import path from 'path';
import { fileURLToPath } from 'node:url';
import _ from 'lodash';

export const resolve = (...p: string[]) =>
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ...p);
