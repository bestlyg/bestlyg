import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Run fixtures in native Node, so the test runner cannot mask ESM loading errors.
export function renderFixture(testUrl) {
    return execFileSync(
        process.execPath,
        [fileURLToPath(import.meta.url), fileURLToPath(new URL('../', testUrl))],
        {
            encoding: 'utf8',
            env: { ...process.env, BESTLYG_DESIGN: 'form' },
        },
    );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const root = path.resolve(process.argv[2]);
    process.chdir(root);
    const require = createRequire(path.join(root, 'package.json'));
    const { default: less } = await import(pathToFileURL(require.resolve('less')).href);
    const plugins = [];
    const addPlugin = async (entry, options) => {
        const { default: Plugin } = await import(pathToFileURL(entry).href);
        const plugin = new Plugin();
        if (options) plugin.setOptions(options);
        plugins.push(plugin);
    };
    const name = path.basename(root);
    if (name === 'playground') {
        await addPlugin(require.resolve('@less-plugins/css-logical'));
        await addPlugin(require.resolve('@less-plugins/rtl'), '--selector "html[data-m4b-zth] &"');
    } else {
        const options =
            name === 'define-var'
                ? '--function-name aaa'
                : name === 'rtl'
                  ? '--enable-selector'
                  : undefined;
        await addPlugin(path.join(root, 'dist/index.mjs'), options);
    }
    const filename = path.join(root, 'tests/basic.less');
    const { css } = await less.render(readFileSync(filename, 'utf8'), { filename, plugins });
    process.stdout.write(css);
}
