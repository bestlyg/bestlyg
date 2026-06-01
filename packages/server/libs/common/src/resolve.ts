import { CWD, getResolveFunction } from '@bestlyg/server-shared';

// Use the process root instead of caller dirname so webpack output and dev mode agree.
export const resolve = getResolveFunction(CWD);
