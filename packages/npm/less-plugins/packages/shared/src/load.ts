import type less from 'less';

export type Less = typeof less;

export abstract class LessPlugin {
    abstract install(less: any, pluginManager: any, functions: any): void;
}
