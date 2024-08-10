import { moduleTools, defineConfig } from '@modern-js/module-tools';
import path from 'path';
import best from '@bestlyg/cli';

// const CWD = best.utils.CWD;
// const resolve = best.utils.getResolveFunction(__dirname);

const CWD = process.cwd();
function resolve(...p: string[]) {
    return path.resolve(__dirname, ...new Array(3).fill('..'), ...p);
}

export default defineConfig({
    plugins: [moduleTools()],
    buildConfig: [
        {
            dts: false,
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            input: [resolve(CWD, 'src', '**', '*.ts'), resolve(CWD, 'src', '**', '*.tsx')],
            target: 'esnext',
            format: 'esm',
            autoExtension: true,
            outDir: resolve(CWD, 'dist', 'esm'),
            esbuildOptions: options => {
                options.outExtension = { '.js': '.js' };
                return options;
            },
        },
        {
            dts: false,
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            input: [resolve(CWD, 'src', '**', '*.ts'), resolve(CWD, 'src', '**', '*.tsx')],
            target: 'esnext',
            format: 'cjs',
            autoExtension: true,
            outDir: resolve(CWD, 'dist', 'lib'),
            esbuildOptions: options => {
                options.outExtension = { '.js': '.cjs' };
                return options;
            },
        },
        {
            buildType: 'bundleless',
            dts: {
                only: true,
            },
            outDir: resolve(CWD, 'dist', 'types'),
        },
    ],
});
