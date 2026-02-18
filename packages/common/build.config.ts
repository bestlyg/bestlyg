import { defineBuildConfig } from 'unbuild';
import path from 'path';

const CWD = process.cwd();
const resolve = (...p: string[]) => path.resolve(CWD, ...p);

console.log('===> CWD', CWD);
console.log('===> resolve', resolve());

export default defineBuildConfig({
    failOnWarn: false,
    declaration: true,
    alias: { '@': resolve('src') },
    clean: false,
});
