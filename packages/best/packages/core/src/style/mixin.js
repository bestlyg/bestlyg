module.exports = class LessPluginBestMixin {
    install(less, pluginManager, functions) {
        functions.add('v', key => {
            return new less.tree.Call('var', [
                new less.tree.Expression(
                    [
                        new less.tree.Keyword('--'),
                        new less.tree.Variable('@best-css-prefix'),
                        new less.tree.Keyword('-'),
                        key,
                    ],
                    true
                ),
            ]);
        });
        functions.add('get_prefix', key => {
            console.log('Key', key);
            return new less.tree.Expression(
                [new less.tree.Variable('@best-css-prefix'), key],
                true
            );
        });
    }
};
