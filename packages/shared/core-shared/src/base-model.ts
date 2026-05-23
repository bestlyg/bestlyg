import EventEmitter from 'eventemitter3';

/** BaseModel 插件可以是直接接收实例的函数，也可以是带 apply 方法的对象。 */
export type BaseModelPlugin<T> = ((model: T) => void) | { apply: (model: T) => void };

/**
 * 提取非下划线开头和非函数类型的key
 */
export type BaseModelKey<T> = Exclude<
    keyof T,
    {
        [P in keyof T]: P extends `_${string}` ? P : T[P] extends Function ? P : never;
    }[keyof T]
>;

export class BaseModel<
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
> extends EventEmitter<EventTypes, Context> {
    /** 设置一个公开数据字段，并返回当前实例以支持链式调用。 */
    set<K extends BaseModelKey<this>, V extends this[K]>(key: K, val: V) {
        this[key] = val;
        return this;
    }

    /** 读取一个公开数据字段。 */
    get<K extends BaseModelKey<this>>(key: K) {
        return this[key];
    }

    /** 挂载插件，插件可直接修改当前模型实例或注册事件。 */
    use(plugin: BaseModelPlugin<this>) {
        if (typeof plugin === 'function') {
            plugin(this);
        } else if (typeof plugin?.apply === 'function') {
            plugin.apply(this);
        }
        return this;
    }
}
