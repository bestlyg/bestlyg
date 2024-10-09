import { tapable, protobufjs as pb, fs, CWD } from '@xidl/shared';
import { XIdl as XIdlCore, XIdlConfig as XIdlCoreConfig } from '@xidl/core';
import path from 'path';

export const prefix = 'XIDL_ECMA_CORE';

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
        this.hooks.onGenRoot.tapPromise(prefix, async (code, obj) => {
            const res = await Promise.all(obj.nestedArray.map(obj => this.genObj(obj)));
            return code + res.join(this.config.splitChar);
        });
        this.hooks.onGenType.tapPromise(prefix, async (code, obj) => {
            const fieldItems = await Promise.all(
                obj.fieldsArray.map(field => this.genField(field)),
            );
            return (
                code +
                (await this.genComment({
                    content: `interface ${obj.name} {\n${fieldItems.join(this.config.splitChar)}\n}`,
                    comment: obj.comment,
                }))
            );
        });
        this.hooks.onGenNamespace.tapPromise(prefix, async (code, obj) => {
            const outputDir = path.resolve(
                CWD,
                this.config.distPath,
                ...this.getNamespaceNameList(obj),
            );
            const name = obj.name;
            await fs.ensureDir(outputDir);
            await fs.emptyDir(outputDir);
            const res = await Promise.all(obj.nestedArray.map(obj => this.genObj(obj)));
            await fs.writeFile(
                path.resolve(outputDir, 'index.ts'),
                res.join(this.config.splitChar),
            );
            return code + `export * from './${name}';`;
        });
        this.hooks.onGenEnum.tapPromise(prefix, async (code, obj) => {
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
                    content: `enum ${obj.name} {\n${valueList.join(this.config.splitChar)}\n}`,
                    comment: obj.comment,
                }))
            );
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

    async output(obj?: pb.ReflectionObject): Promise<void> {
        obj ??= await this.createRoot();
        const { distPath, entryPath } = this.config;
        const outputDir = path.resolve(CWD, distPath);
        await fs.ensureDir(outputDir);
        await fs.emptyDir(outputDir);
        const code = await this.genObj(obj);
        await fs.writeFile(
            path.resolve(outputDir, path.basename(entryPath, path.extname(entryPath)) + '.ts'),
            code,
        );
    }
}
