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

export class XIdl extends XIdlCore {
    declare config: Required<XIdlConfig>;
    hooks = createHooks();
    constructor(config: XIdlConfig) {
        super(createConfig(config));
        this.hooks.onGenEnum.tapPromise('XIDL_ECMA_CORE', async (code, obj) => {
            const valueStr = Object.entries(obj.values)
                .map(([k, v]) =>
                    this.appendComment({
                        content: `${this.config.indent}${k} = ${v},`,
                        comment: obj.comments[k],
                        indentCount: 1,
                    }),
                )
                .join(this.config.splitChar);
            return (
                code +
                this.appendComment({
                    content: `enum ${obj.name} {\n${valueStr}\n}`,
                    comment: obj.comment,
                })
            );
        });
        this.hooks.onGenRoot.tapPromise('XIDL_ECMA_CORE', async (code, obj) => {
            const res = await Promise.all(obj.nestedArray.map(obj => this.genObj(obj)));
            return code + res.join(this.config.splitChar);
        });
    }
    appendComment({
        content,
        comment,
        indentCount = 0,
    }: {
        content: string;
        comment?: string | null;
        indentCount?: number;
    }) {
        if (!comment) return content;
        return `${this.config.indent.repeat(indentCount)}/** ${comment} */\n${content}`;
    }
    genValueType(type: string): string {
        if (type === 'bool') {
            return 'boolean';
        } else if (
            type.includes('int') ||
            type.includes('fixed') ||
            type === 'float' ||
            type === 'double'
        ) {
            return 'number';
        } else if (type === 'bytes') {
            return 'string';
        } else {
            return type;
        }
    }
}
