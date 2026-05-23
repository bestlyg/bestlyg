/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import EventEmitter from 'eventemitter3';
import { BaseModel } from './base-model';

/** 具备插件挂载能力的对象接口。 */
export interface IHookable<T> {
    use(plugin: Plugin<T>): T;
}

/** 对象形式插件，通过 apply 接收宿主实例。 */
export interface PluginClass<T> {
    apply(instance: T): void;
}

/** 函数形式插件，直接接收宿主实例。 */
export type PluginFunction<T> = (instance: T) => void;

/** Hookable 支持的插件类型。 */
export type Plugin<T> = PluginClass<T> | PluginFunction<T>;

/** 按函数插件或对象插件两种约定执行插件。 */
export function hookableUse<T extends IHookable<any>>(pluggable: T, plugin: Plugin<T>) {
    if (typeof plugin === 'function') {
        plugin(pluggable);
    } else {
        plugin.apply(pluggable);
    }
    return pluggable;
}

/** 带插件生命周期 hook 的基础类。 */
export abstract class Hookable<
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
>
    extends BaseModel<EventTypes, Context>
    implements IHookable<Hookable<any, any>>
{
    abstract hooks: Readonly<any>;

    /** 经过 hooks.onPluginUse/afterPluginUse 包装后挂载插件。 */
    use(plugin: Plugin<this>): this {
        plugin = this.hooks?.onPluginUse?.call(plugin) ?? plugin;
        hookableUse(this, plugin);
        this.hooks?.afterPluginUse?.call(plugin);
        return this;
    }
}
