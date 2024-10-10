import { tapable, changeCase, protobufjs as pb } from '@xidl/shared';
import { XIdl as XIdlCore, XIdlConfig as XIdlCoreConfig } from '@xidl/ecma-core';

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
        this.hooks.onGenService.tapPromise(prefix, async (code, obj) => {
            const methodStr = await Promise.all(
                obj.methodsArray.map(method => this.genMethod(method)),
            );
            return (
                code +
                (await this.genComment({
                    content: [
                        `export class ${obj.name} {\n${methodStr}\n}`,
                        `export const ${changeCase.camelCase(obj.name)} = new ${obj.name}();`,
                    ].join(this.config.splitChar),
                    comment: obj.comment,
                }))
            );
        });
    }

    async genMethod(method: pb.Method): Promise<string> {
        const reqMethod = (method.options?.['(api.method)'] as string).toUpperCase();
        const content = `
async ${method.name}(req: ${method.requestType}): Promise<${method.responseType}> {
${this.config.indent}return axios({
${this.config.indent.repeat(2)}url: '${method.options?.['(api.url)']}',
${this.config.indent.repeat(2)}method: '${reqMethod}',
${this.config.indent.repeat(2)}${reqMethod === 'GET' ? `params` : `data`}: req,
${this.config.indent}});
}
`.trim();
        return this.genComment({
            content,
            comment: method.comment,
        });
    }
}
