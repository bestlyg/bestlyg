import { dotenv } from '@bestlyg/cli';
import { resolve } from './utils';

dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

export * from './graphql';
export * from './types';
export * from './utils';
export * from './leetcode';
