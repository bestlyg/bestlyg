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
            input: [resolve(CWD, 'src', '**', '*.ts'), resolve(CWD, 'src', '**', '*.tsx')],
            target: 'esnext',
            format: 'esm',
            autoExtension: true,
            outDir: resolve(CWD, 'dist', 'esm'),
            esbuildOptions: options => {
                options.outExtension = { '.js': '.js' };
                return options;
            },
            // resolve: {
            //     alias: {
            //         '@': './src',
            //     },
            // },
        },
        /**
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
            resolve: {
                alias: alias => {
                    alias['./vendor-esm'] = './src/vendor/vendor-lib';
                    return alias;
                },
            },
        }, */
        // {
        //     buildType: 'bundleless',
        //     dts: {
        //         only: true,
        //     },
        //     outDir: resolve(CWD, 'dist', 'types'),
        // },
    ],
});
