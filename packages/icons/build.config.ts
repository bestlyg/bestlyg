import { defineBuildConfig } from 'unbuild';
import path from 'path';

const CWD = process.cwd();
const resolve = (...p: string[]) => path.resolve(CWD, ...p);

export default defineBuildConfig({
    parallel: false,
    failOnWarn: false,
    declaration: true,
    alias: { '@': resolve('src') },
    clean: false,
    rollup: {
        output: {
            // 保留模块结构（核心）：每个输入文件生成独立输出文件
            preserveModules: true,
        },
    },
});
