const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');
const traverse = require('@babel/traverse');
const resolve = (...p) => path.resolve(__dirname, ...p);

function run(content, filepath) {
    const ast = babel.parseSync(content, {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic',
                    development: true,
                },
            ],
            [
                '@babel/preset-typescript',
                {
                    isTSX: true,
                    allExtensions: true,
                },
            ],
        ],
    });
    console.log(ast);
    traverse.default(ast, {
        ImportDeclaration(source) {
            const { node } = source;
            const importedFilename = path.join(path.dirname(filepath), node.source.value);
            console.log(node.source.value, importedFilename);
            node.source.value = '@m4b-aaa';
        },
    });
    const res = babel.transformFromAst(ast);
    // console.log(res);
}

function main() {
    const filepath = resolve(
        '/Users/bytedance/projects/arco-design/components/Input/input-element.tsx'
    );
    const content = fs.readFileSync(filepath).toString();
    run(content, filepath);
}
main();
