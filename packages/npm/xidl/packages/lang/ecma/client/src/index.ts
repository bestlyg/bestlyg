import { tapable } from '@xidl/shared';
import {
    XIdl as XIdlCore,
    createHooks as createCoreHooks,
    XIdlConfig as XIdlCoreConfig,
} from '@xidl/core';

export interface XIdlConfig extends XIdlCoreConfig {}

export function createConfig(config: XIdlConfig): InstanceType<typeof XIdl>['config'] {
    return { ...config } as InstanceType<typeof XIdl>['config'];
}

export function createHooks() {
    return {
        ...createCoreHooks(),
        on: new tapable.AsyncHook(),
    };
}

export const defaultConfig: Partial<XIdlConfig> = {};

export class XIdl extends XIdlCore {
    declare config: Required<XIdlConfig>;
    hooks = createHooks();
    constructor(config: XIdlConfig) {
        super(createConfig(config));
    }
}
