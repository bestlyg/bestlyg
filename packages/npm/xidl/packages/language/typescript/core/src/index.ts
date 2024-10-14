import { tapable, protobufjs as pb, fs, CWD, lodash } from '@xidl/shared';
import { XIdl as XIdlCore, XIdlConfig as XIdlCoreConfig } from '@xidl/core';
import path from 'path';

export const prefix = 'XIDL_TYPESCRIPT_CORE';

export interface XIdlConfig extends XIdlCoreConfig {}

export function createConfig(config: XIdlConfig): InstanceType<typeof XIdl>['config'] {
    return { ...config } as InstanceType<typeof XIdl>['config'];
}

export function createHooks() {
    return {
        gen: {
            onGenMethodField: new tapable.AsyncSeriesWaterfallHook<[string, pb.Method]>([
                'code',
                'obj',
            ]),
        },
    };
}

export class XIdl extends XIdlCore {
    declare config: Required<XIdlConfig>;
    declare hooks: ReturnType<typeof createHooks> & InstanceType<typeof XIdlCore>['hooks'];
    constructor(config: XIdlConfig) {
        super(createConfig(config));
        this.bindHooks(createHooks());
        this.hooks.gen.onGenRoot.tapPromise(prefix, async (code, obj) => {
            const res = await Promise.all(obj.nestedArray.map(obj => this.genObj(obj)));
            return code + res.join(this.config.splitChar);
        });
        this.hooks.gen.onGenType.tapPromise(prefix, async (code, obj) => {
            const fieldItems = await Promise.all(
                obj.fieldsArray.map(field => this.genField(field)),
            );
            return (
                code +
                (await this.genComment({
                    content: `export interface ${obj.name} {\n${fieldItems.join(this.config.splitChar)}\n}`,
                    comment: obj.comment,
                }))
            );
        });
        this.hooks.gen.onGenNamespace.tapPromise(prefix, async (code, obj) => {
            const outputDir = path.resolve(
                CWD,
                this.config.output.dirPath,
                ...this.getNamespaceNameList(obj),
            );
            const resCode = await Promise.all(obj.nestedArray.map(obj => this.genObj(obj)));
            await this.output({
                config: lodash.merge({}, this.config, {
                    output: {
                        dirPath: outputDir,
                        fileName: 'index.ts',
                    },
                }),
                code: resCode.join(this.config.splitChar),
            });
            const name = obj.name;
            return code + `export * as ${name} from './${name}';`;
        });
        this.hooks.gen.onGenEnum.tapPromise(prefix, async (code, obj) => {
            const valueList = await Promise.all(
                Object.entries(obj.values).map(([k, v]) =>
                    this.genComment({
                        content: `${this.config.indent}${k} = ${v},`,
                        comment: obj.comments[k],
                        indentCount: 1,
                    }),
                ),
            );

            return (
                code +
                (await this.genComment({
                    content: `export enum ${obj.name} {\n${valueList.join(this.config.splitChar)}\n}`,
                    comment: obj.comment,
                }))
            );
        });
        this.hooks.gen.onGenService.tapPromise(prefix, async (code, obj) => {
            const methodStr = await Promise.all(
                obj.methodsArray.map(method => this.genObj(method)),
            );
            return (
                code +
                (await this.genComment({
                    content: [`export namespace ${obj.name} {\n${methodStr}\n}`].join(
                        this.config.splitChar,
                    ),
                    comment: obj.comment,
                }))
            );
        });
        this.hooks.gen.onGenMethod.tapPromise(prefix, async (code, obj) => {
            const REG = /\(api\.(.*?)\)/g;
            const options = Object.entries(obj.options ?? {})
                .map(([key, value]) => {
                    const newKey = Array.from(key.matchAll(REG))[0][1];
                    return [newKey, value];
                })
                .filter(([k]) => k);
            const content = [
                `export namespace ${obj.name} {`,
                ...[
                    `export type Request = ${obj.requestType};`,
                    `export type Response = ${obj.responseType};`,
                    ...options.map(([k, v]) => `export const ${k} = ${v};`),
                    await this.hooks.gen.onGenMethodField.promise('', obj),
                ].map(content => this.contactIndent({ content })),
                '}',
            ].join('\n');
            return (
                code +
                (await this.genComment({
                    content: this.contactIndent({ content }),
                    comment: obj.comment,
                }))
            );
        });

        this.hooks.output.onOutput.tapPromise(prefix, async (code, config) => {
            const outputDir = path.resolve(CWD, config.config.output.dirPath);
            await fs.ensureDir(outputDir);
            await fs.writeFile(path.resolve(outputDir, config.config.output.fileName), code);
        });
    }

    async genComment({
        content,
        comment,
        indentCount = 0,
    }: {
        content: string;
        comment?: string | null;
        indentCount?: number;
    }): Promise<string> {
        if (!comment) return content;
        return `${this.config.indent.repeat(indentCount)}/** ${comment} */\n${content}`;
    }

    async genValueType(type: string): Promise<string> {
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

    async genField(field: pb.Field): Promise<string> {
        let str = this.config.indent;
        str += field.name;
        if (field.optional) str += '?';
        str += ': ';
        if (field.map) {
            const mapField = field as unknown as pb.MapField;
            const keyType = await this.genValueType(mapField.keyType);
            const valueType = await this.genValueType(mapField.type);
            str += `Record<${keyType}, ${valueType}>`;
        } else {
            str += await this.genValueType(field.type);
        }
        if (field.repeated) str += '[]';
        str += ';';
        return this.genComment({
            content: str,
            comment: field.comment,
            indentCount: 1,
        });
    }
}
