import EventEmitter from 'eventemitter3';
import { BaseModel } from '../base-model';
import { useState } from 'react';

export class ReactBaseModel<
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
> extends BaseModel<EventTypes, Context> {
    useState<K extends keyof this>(key: K) {
        const stateConfig = useState(this[key]);
        this.set(key, stateConfig[0]);
        return stateConfig;
    }
}
