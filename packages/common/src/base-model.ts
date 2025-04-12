import EventEmitter from 'eventemitter3';

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
    set<K extends BaseModelKey<this>, V extends this[K]>(key: K, val: V) {
        this[key] = val;
        return this;
    }
    get<K extends BaseModelKey<this>>(key: K) {
        return this[key];
    }
    use(plugin: BaseModelPlugin<this>) {
        if (typeof plugin === 'function') {
            plugin(this);
        } else if (typeof plugin?.apply === 'function') {
            plugin.apply(this);
        }
        return this;
    }
}
