import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.mjs',
            format: 'esm',
        },
        {
            file: 'dist/index.cjs',
            format: 'cjs',
        },
    ],
    plugins: [
        typescript(),
        // replace({}),
        {
            name: 'insert-at-start',
            config: null,
            banner: `import path from 'node:path';
import url from 'node:url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);`,
            //             moduleParsed(info) {
            //                 console.log(info);
            //                 info.code = `import path from 'node:path';
            // import url from 'node:url';
            // const __filename = url.fileURLToPath(import.meta.url);
            // const __dirname = path.dirname(__filename);
            // ${info.code}`;
            //             },
        },
    ],
});
