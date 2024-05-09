import less from 'less';
import { loadConfig, LessPluginsConfig } from './config';

export interface LessPlugins {
    module: any;
    require: any;
    registerPlugin: any;
    functions: any;
    tree: any;
    less: any;
    fileInfo: {
        currentDirectory: string;
    };
    config: LessPluginsConfig;
}

declare global {
    var LESS_PLUGINS: LessPlugins;
}

export const LESS_PLUGINS = (global.LESS_PLUGINS = {} as LessPlugins);

export function loadPlugin(
    module: LessPlugins['module'],
    require: LessPlugins['require'],
    registerPlugin: LessPlugins['registerPlugin'],
    functions: LessPlugins['functions'],
    tree: LessPlugins['tree'],
    less: LessPlugins['less'],
    fileInfo: LessPlugins['fileInfo']
) {
    const dirPath = fileInfo.currentDirectory;
    Object.assign(LESS_PLUGINS, {
        module,
        require,
        registerPlugin,
        functions,
        tree,
        less,
        fileInfo,
        config: loadConfig(dirPath),
    });
    return require(dirPath);
}

export type Less = typeof less;

export abstract class LessPlugin {
    abstract install(less: any, pluginMenager: any, functions: any);
}
