/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import EventEmitter from 'eventemitter3';
import { BaseModel } from './base-model';

export interface IHookable<T> {
    use(plugin: Plugin<T>): T;
}

export interface PluginClass<T> {
    apply(instance: T): void;
}

export type PluginFunction<T> = (instance: T) => void;

export type Plugin<T> = PluginClass<T> | PluginFunction<T>;

export function hookableUse<T extends IHookable<any>>(pluggable: T, plugin: Plugin<T>) {
    if (typeof plugin === 'function') {
        plugin(pluggable);
    } else {
        plugin.apply(pluggable);
    }
    return pluggable;
}

export abstract class Hookable<
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
>
    extends BaseModel<EventTypes, Context>
    implements IHookable<Hookable<any, any>>
{
    abstract hooks: Readonly<any>;
    use(plugin: Plugin<this>): this {
        plugin = this.hooks?.onPluginUse?.call(plugin) ?? plugin;
        hookableUse(this, plugin);
        this.hooks?.afterPluginUse?.call(plugin);
        return this;
    }
}
