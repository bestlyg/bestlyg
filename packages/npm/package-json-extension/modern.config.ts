import { moduleTools, defineConfig } from '@modern-js/module-tools';
import '@bestlyg/cli/globals';

const CWD = best.common.CWD;
const resolve = best.common.getResolveFunction(CWD);

export default defineConfig({
    plugins: [moduleTools()],
    buildConfig: [
        {
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            platform: 'node',
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
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            platform: 'node',
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
            platform: 'browser',
            dts: {
                only: true,
            },
            outDir: resolve(CWD, 'dist', 'types'),
        },
    ],
});
