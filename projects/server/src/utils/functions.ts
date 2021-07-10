import * as path from 'path';
export const resolve = (...paths: string[]) => path.resolve(__dirname, '../', ...paths);
