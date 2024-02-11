import { defineConfig } from 'father';

export default defineConfig({
    // esm: { input: 'src', output: 'es' },
    // cjs: { input: 'src', output: 'lib' },
    // // umd: { output: 'dist' },
    // prebundle: {
    //     deps: {}
    // }
    extends: '../../.fatherrc.base.ts'
});