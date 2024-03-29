const typescript = require('rollup-plugin-typescript2');
const json = require('@rollup/plugin-json');
const { default: dts } = require('rollup-plugin-dts');
const { terser } = require('rollup-plugin-terser');
const path = require('path');
const resolve = (...p) => path.resolve(__dirname, ...p);
const _ = require('lodash');
const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';
const pkg = require('../../package.json');
const fs = require('fs-extra');

// const packageConfigs = [
//   {
//     pkgName: 'shared',
//     external: ['lodash'],
//   },
//   {
//     pkgName: 'data-structures',
//     external: ['lodash'],
//   },
//   {
//     pkgName: 'algorithms',
//     external: ['lodash'],
//   },
// ]
//   .map(({ pkgName, external = [] }) => {
//     const path = resolve('packages', pkgName);
//     const input = resolve(path, 'src', 'index.ts');
//     const outputDir = resolve(path, 'dist');
//     const outputTypeDir = resolve(path, 'types');
//     fs.removeSync(outputDir);
//     fs.removeSync(outputTypeDir);
//     return [
//       {
//         input,
//         output: {
//           file: resolve(outputDir, 'index.js'),
//           format: 'umd',
//           name: `BestLyg${_.upperFirst(_.camelCase(pkgName))}`,
//           globals: external.reduce((obj, lib) => {
//             obj[lib] = lib;
//             return obj;
//           }, {}),
//         },
//         external,
//         plugins: [
//           __PROD__ ? terser() : {},
//           json(),
//           typescript({
//             tsconfig: resolve('tsconfig.json'),
//             tsconfigOverride: {
//               compilerOptions: {
//                 // sourceMap: true,
//                 // declaration: true,
//                 // declarationMap: true,
//               },
//               exclude: ['**/__tests__'],
//             },
//           }),
//         ],
//       },
//       {
//         input,
//         output: [{ file: resolve(outputTypeDir, 'index.d.ts'), format: 'umd' }],
//         plugins: [dts()],
//       },
//     ];
//   })
//   .flat();
const packageConfigs = [
    {
        input: resolve('src/index.ts'),
        output: {
            file: resolve('dist/index.js'),
            format: 'umd',
            name: `BestLyg`,
            globals: { lodash: 'lodash' },
        },
        external: ['lodash'],
        plugins: [
            __PROD__ ? terser() : {},
            json(),
            typescript({
                tsconfig: resolve('tsconfig.build.json'),
                tsconfigOverride: {
                    compilerOptions: {
                        sourceMap: true,
                        declaration: true,
                        declarationMap: true,
                    },
                },
            }),
        ],
    },
    // {
    //   input: resolve('src/index.ts'),
    //   output: [{ file: resolve('types/index.d.ts'), format: 'umd' }],
    //   plugins: [dts()],
    // },
];
export default packageConfigs;
