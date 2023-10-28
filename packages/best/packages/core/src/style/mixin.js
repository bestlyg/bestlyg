module.exports = class LessPluginBestMixin {
    install(less, pluginManager, functions) {
        functions.add('v', key => {
            return new less.tree.Call('var', [
                new less.tree.Expression(
                    [
                        new less.tree.Variable('@best-cssvars-prefix'),
                        new less.tree.Keyword('-'),
                        key,
                    ],
                    true
                ),
            ]);
        });
        functions.add('get_prefix', key => {
            return new less.tree.Expression(
                [
                    // new less.tree.Variable('@best-js-prefix'),
                    new less.tree.Keyword('-'),
                    key,
                ],
                true
            );
        });

        functions.add('define_var', (key, value) => {
            console.log(new less.tree.Declaration(`@${key.value}`, value));
            return new less.tree.Declaration(`@${key.value}`, value);
        });
        // functions.add('load-less-vars', function (key) {
        //     console.log(this)
        //     console.log(key);
        //     this.variables().add('@a', new less.tree.Value('1px'));
        //     return new less.tree.Anonymous('');
        // });
    }
};
