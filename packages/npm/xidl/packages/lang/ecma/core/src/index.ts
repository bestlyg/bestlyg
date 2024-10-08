import { tapable, protobufjs as pb, fs, changeCase } from '@xidl/shared';
import {
    XIdl as XIdlCore,
    createHooks as createCoreHooks,
    XIdlConfig as XIdlCoreConfig,
} from '@xidl/core';
import path from 'path';

export const prefix = 'XIDL_ECMA_CORE';

export interface XIdlConfig extends XIdlCoreConfig {}

export function createConfig(config: XIdlConfig): InstanceType<typeof XIdl>['config'] {
    return { ...config } as InstanceType<typeof XIdl>['config'];
}

export function createHooks() {
    return {
        ...createCoreHooks(),
        tempHook: new tapable.AsyncSeriesBailHook(),
    };
}

export class XIdl extends XIdlCore {
    declare config: Required<XIdlConfig>;
    hooks = createHooks();
    constructor(config: XIdlConfig) {
        super(createConfig(config));
        this.hooks.onGenRoot.tapPromise(prefix, async (code, obj) => {
            const res = await Promise.all(obj.nestedArray.map(obj => this.genObj(obj)));
            return code + res.join(this.config.splitChar);
        });
        this.hooks.onGenType.tapPromise(prefix, async (code, obj) => {
            const fields = obj.fieldsArray;
            const fieldStr = fields.map(field => this.genField(field)).join('\n');
            return (
                code +
                this.appendComment({
                    content: `interface ${obj.name} {\n${fieldStr}\n}`,
                    comment: obj.comment,
                })
            );
        });
        this.hooks.onGenService.tapPromise(prefix, async (code, obj) => {
            const methodStr = obj.methodsArray.map(method => this.genMethod(method));
            return (
                code +
                this.appendComment({
                    content: [
                        `export class ${obj.name} {${methodStr}}`,
                        `export const ${changeCase.camelCase(obj.name)} = new ${obj.name}();`,
                    ].join(this.config.splitChar),
                    comment: obj.comment,
                })
            );
        });
        this.hooks.onGenNamespace.tapPromise(prefix, async (code, obj) => {
            const outputDir = path.resolve(this.config.outputDirPath, obj.name.replace(/./g, '/'));
            const name = obj.name;
            console.log('OUT', outputDir);
            return code;
            await fs.ensureDir(outputDir);
            await fs.emptyDir(outputDir);
            const res = await Promise.all(obj.nestedArray.map(obj => this.genObj(obj)));
            await fs.writeFile(
                path.resolve(outputDir, 'index.ts'),
                `import axios from 'axios';\n${res.join(this.config.splitChar)}`.trim(),
            );
            return code + `export * from './${name}';`;
        });
        this.hooks.onGenEnum.tapPromise(prefix, async (code, obj) => {
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
    genField(field: pb.Field): string {
        let str = this.config.indent;
        str += field.name;
        if (field.optional) str += '?';
        str += ': ';
        if (field.map) {
            str += `Record<${this.genValueType((field as any).keyType)}, ${this.genValueType(field.type)}>`;
        } else {
            str += this.genValueType(field.type);
        }
        if (field.repeated) str += '[]';
        str += ';';
        return this.appendComment({
            content: str,
            comment: field.comment,
            indentCount: 1,
        });
    }

    genMethod(method: pb.Method): string {
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
        return this.appendComment({
            content,
            comment: method.comment,
        });
    }

    async output(obj?: pb.ReflectionObject): Promise<void> {
        obj ??= await this.createRoot();
        const { outputDirPath, inputFilePath } = this.config;
        // await fs.ensureDir(outputDirPath);
        // await fs.emptyDir(outputDirPath);
        const code = await this.genObj(obj);
        console.log(
            'CODE',
            path.resolve(
                outputDirPath,
                path.basename(inputFilePath, path.extname(inputFilePath)) + '.ts',
            ),
        );
        // await fs.writeFile(
        //     path.resolve(
        //         outputDirPath,
        //         path.basename(inputFilePath, path.extname(inputFilePath)) + '.ts',
        //     ),
        //     code,
        // );
    }
}
