import { BaseModel } from '@/base-model';
import { useState } from 'react';

export class ReactBaseModel extends BaseModel {
    useState<K extends keyof this>(key: K) {
        const stateConfig = useState(this[key]);
        this.set(key, stateConfig[0]);
        return stateConfig;
    }
}
