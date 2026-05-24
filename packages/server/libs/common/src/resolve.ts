import { getDirname, getResolveFunction } from '@bestlyg/server-shared';

export const resolve = getResolveFunction(getDirname(), 1);
