import less from 'less';

export interface LessPlugins {
    module: any;
    require: any;
    registerPlugin: any;
    functions: any;
    tree: any;
    less: any;
    fileInfo: any;
}

declare global {
    var LESS_PLUGINS: LessPlugins;
}

export const LESS_PLUGINS = (global.LESS_PLUGINS = {} as LessPlugins);

export function loadPlugin(module, require, registerPlugin, functions, tree, less, fileInfo) {
    Object.assign(LESS_PLUGINS, {
        module,
        require,
        registerPlugin,
        functions,
        tree,
        less,
        fileInfo,
    });
    return require(fileInfo.currentDirectory);
}

export type Less = typeof less;

export abstract class LessPlugin {
    abstract install(less: any, pluginMenager: any, functions: any);
}
