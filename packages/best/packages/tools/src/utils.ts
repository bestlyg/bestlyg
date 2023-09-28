import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export const resolve = (...p: string[]) => path.resolve(__dirname, '..', ...p);
export const packageInfo: {
    name: string;
    version: string;
    description: string;
} = require(resolve('package.json'));

export const error = (msg: string) => {
    console.log(chalk.red(msg));
    process.exit(1);
};
