import { defineBuildConfig } from 'unbuild';
import path from 'node:path';

const CWD = process.cwd();
const resolve = (...parts: string[]) => path.resolve(CWD, ...parts);

export default defineBuildConfig({
    failOnWarn: false,
    declaration: true,
    alias: { '@': resolve('src') },
    clean: false,
});
