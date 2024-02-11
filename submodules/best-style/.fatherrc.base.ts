import { defineConfig } from 'father';
import { baseDefines } from './scripts/utils';

export default defineConfig({
    esm: { input: 'src', output: 'es', transformer: 'babel' },
    cjs: { input: 'src', output: 'lib', transformer: 'babel' },
    umd: {
        output: 'dist',
        chainWebpack(config) {
            config.resolve.alias.clear();
            // for (const lib of getLibs()) {
            //     config.resolve!.alias![lib.packageJson.name] = lib.dirPath;
            // }
            // config.resolve!.alias!['react'] = getAbsolutePath('react');
            // config.resolve!.alias!['react-dom'] = getAbsolutePath('react-dom');
            return config;
        }
    },
    prebundle: {
        deps: {}
    },
    sourcemap: !true,
    define: {
        ...Object.fromEntries(Object.entries(baseDefines).map(([k, v]) => [k, JSON.stringify(v)]))
    }
});
