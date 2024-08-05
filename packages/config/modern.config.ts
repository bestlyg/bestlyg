import path from 'path';
import { moduleTools, defineConfig } from '@modern-js/module-tools';
import best from '@bestlyg/cli';

const CWD = process.cwd();
function resolve(...p: string[]) {
    return path.resolve(__dirname, ...new Array(3).fill('..'), ...p);
}

best.dotenv.config({
    path: resolve('.env.local'),
});

const customDefines = Object.fromEntries(
    Object.entries(process.env)
        .filter(([k]) => k.startsWith('BESTLYG'))
        .map(([k, v]) => [`process.env.${k}`, JSON.stringify(v)])
);

export default defineConfig({
    plugins: [moduleTools()],
    buildConfig: [
        {
            sourceMap: true,
            buildType: 'bundleless',
            shims: false,
            input: [resolve(CWD, 'src', '**', '*.ts'), resolve(CWD, 'src', '**', '*.tsx')],
            target: 'esnext',
            format: 'esm',
            autoExtension: true,
            outDir: resolve(CWD, 'dist', 'esm'),
            esbuildOptions: options => {
                options.outExtension = { '.js': '.js' };
                return options;
            },
            define: { ...customDefines },
        },
        {
            sourceMap: true,
            buildType: 'bundleless',
            shims: false,
            input: [resolve(CWD, 'src', '**', '*.ts'), resolve(CWD, 'src', '**', '*.tsx')],
            target: 'esnext',
            format: 'cjs',
            autoExtension: true,
            outDir: resolve(CWD, 'dist', 'lib'),
            esbuildOptions: options => {
                options.outExtension = { '.js': '.cjs' };
                return options;
            },
            define: { ...customDefines },
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
