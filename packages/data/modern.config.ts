import { moduleTools, defineConfig } from '@modern-js/module-tools';
import best from '@bestlyg/cli';

const CWD = best.utils.CWD;
const resolve = best.utils.getResolveFunction(__dirname);

export default defineConfig({
    plugins: [moduleTools()],
    buildConfig: [
        {
            dts: false,
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            platform: 'browser',
            input: [
                resolve(CWD, 'src', '**', '*.ts'),
                resolve(CWD, 'src', '**', '*.tsx'),
                resolve(CWD, 'src', '**', '*.js'),
            ],
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
            platform: 'browser',
            input: [
                resolve(CWD, 'src', '**', '*.ts'),
                resolve(CWD, 'src', '**', '*.tsx'),
                resolve(CWD, 'src', '**', '*.js'),
            ],
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
            platform: 'browser',
            dts: {
                only: true,
            },
            outDir: resolve(CWD, 'dist', 'types'),
        },
    ],
});
