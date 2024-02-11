import path from 'path';
import fs from 'fs-extra';
import hash from '@emotion/hash';
import { constantCase } from 'change-case';

export const LOGO = `***********************************************************
*      ____  ______  _____ _______ _  __     _______      *
*     |  _ \\|  ____|/ ____|__   __| | \\ \\   / / ____|     *
*     | |_) | |__  | (___    | |  | |  \\ \\_/ / |  __      *
*     |  _ <|  __|  \\___ \\   | |  | |   \\   /| | |_ |     *
*     | |_) | |____ ____) |  | |  | |____| | | |__| |     *
*     |____/|______|_____/   |_|  |______|_|  \\_____|     *
*                                                         *
***********************************************************`;

export const resolve = (...p: string[]) => path.resolve(__dirname, '../', ...p);

export const CWD = process.cwd();

export const packageFileName = 'package.json';
export const packageJson = require(resolve(CWD, packageFileName));
export const packagesPath = resolve('packages');

export function getAbsolutePath(value: string): string {
    return path.dirname(require.resolve(path.join(value, packageFileName)));
}

export function getLibs() {
    const paths = [packagesPath];
    const arr: {
        packageJson: Record<string, any>;
        dirPath: string;
    }[] = [];
    for (const rootPath of paths) {
        const dirs = fs
            .readdirSync(rootPath)
            .map(v => resolve(rootPath, v))
            .filter(v => fs.statSync(v).isDirectory());
        for (const dirPath of dirs) {
            const packageJson = require(resolve(dirPath, packageFileName));
            arr.push({
                packageJson,
                dirPath
            });
        }
    }
    return arr;
}

export const baseDefines: Record<string, any> = {
    ...getLibs().reduce((o, { packageJson: { name, version } }) => {
        o[`process.env.VERSION_${constantCase(name)}`] = hash(version);
        return o;
    }, {})
};
