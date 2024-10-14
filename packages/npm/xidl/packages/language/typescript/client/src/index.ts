import { tapable } from '@xidl/shared';
import { XIdl as XIdlCore, XIdlConfig as XIdlCoreConfig } from '@xidl/typescript-core';

export const prefix = 'XIDL_TYPESCRIPT_CLIENT';

export interface XIdlConfig extends XIdlCoreConfig {}

export function createConfig(config: XIdlConfig): InstanceType<typeof XIdl>['config'] {
    return { ...config } as InstanceType<typeof XIdl>['config'];
}

export function createHooks() {
    return {
        tempHook: new tapable.AsyncSeriesBailHook(),
    };
}

export class XIdl extends XIdlCore {
    declare config: Required<XIdlConfig>;
    declare hooks: ReturnType<typeof createHooks> & InstanceType<typeof XIdlCore>['hooks'];
    constructor(config: XIdlConfig) {
        super(createConfig(config));
        this.bindHooks(createHooks());
        this.hooks.gen.onGenMethodField.tapPromise(prefix, async code => {
            const content = [
                `export const request = async (req: Request): Promise<Response> => {`,
                this.contactIndent({
                    content: `return fetch({ url, method, serializer, data: req });`,
                }),
                `};`,
            ].join('\n');
            return [code, content].join('');
        });
    }
}
