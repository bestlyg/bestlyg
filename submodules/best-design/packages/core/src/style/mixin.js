const path = require('path');
const fs = require('fs-extra');
function v(ctx, key) {
    return new less.tree.Call('var', [
        new less.tree.Expression(
            [new less.tree.Variable('@best-cssvars-prefix'), new less.tree.Keyword('-'), key],
            true
        ),
    ]).eval(ctx);
}
v.evalArgs = false;

function get_prefix(ctx, key) {
    return new less.tree.Expression(
        [new less.tree.Variable('@best-jsvars-prefix'), new less.tree.Keyword('-'), key],
        true
    ).eval(ctx);
}
get_prefix.evalArgs = false;

function get_version(p) {
    try {
        p = [
            p && path.resolve(p._fileInfo.currentDirectory, p.value),
            path.resolve(process.cwd(), 'package.json'),
        ].find(p => fs.existsSync(p));
        return require(p).version;
    } catch (e) {
        console.error(e);
    }
}

const functionRegisters = {
    v,
    get_prefix,
    get_version,
};
module.exports = class LessPluginBestMixin {
    install(less, pluginManager, functions) {
        for (const [k, fn] of Object.entries(functionRegisters)) {
            functions.add(k, fn);
        }

        // functions.add('get_prefix', key => {
        //     const quote = `@{best-jsvars-prefix}-${key.value}`;
        //     return new less.tree.Quoted(`'`, quote);
        // });

        // functions.add('define_var', (key, value) => {
        //     console.log(new less.tree.Declaration(`@${key.value}`, value));
        //     return new less.tree.Declaration(`@${key.value}`, value);
        // });
        // functions.add('load-less-vars', function (key) {
        //     console.log(this)
        //     console.log(key);
        //     this.variables().add('@a', new less.tree.Value('1px'));
        //     return new less.tree.Anonymous('');
        // });
    }
};
