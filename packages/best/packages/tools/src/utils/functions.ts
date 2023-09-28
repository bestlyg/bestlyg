import path from 'path';

export const resolve = (...p: string[]) => path.resolve(__dirname, '../..', ...p);
