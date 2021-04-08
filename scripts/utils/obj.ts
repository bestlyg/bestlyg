import { minimist } from './dep';

export const args = minimist(process.argv.slice(2));
export const __DEV__ = process.env.NODE_ENV === 'development';
export const __PROD__ = process.env.NODE_ENV === 'production';
