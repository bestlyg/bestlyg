import EventEmitter from 'eventemitter3';
import { NonFunctionKeys } from './types';

export type BaseModelPlugin<T> = ((model: T) => void) | { apply: (model: T) => void };

export class BaseModel<
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
> extends EventEmitter<EventTypes, Context> {
    set<K extends NonFunctionKeys<this>, V extends this[K]>(key: K, val: V) {
        this[key] = val;
        return this;
    }
    get<K extends NonFunctionKeys<this>>(key: K) {
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
