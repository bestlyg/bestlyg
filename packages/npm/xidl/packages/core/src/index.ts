import { CWD, protobufjs as pb, tapable, lodash } from '@xidl/shared';
import path from 'path';

export interface XIdlConfig {
    input: {
        filePath: string;
    };
    output: {
        dirPath: string;
        fileName: string;
    };
    splitChar?: string;
    indentCount?: number;
    indentUnit?: string;
    indent?: string;
}

export function createConfig(config: XIdlConfig): InstanceType<typeof XIdl>['config'] {
    config = {
        splitChar: '\n\n',
        indentCount: 4,
        indentUnit: ' ',
        ...config,
    };
    config.indent ??= config.indentUnit.repeat(config.indentCount);
    return config as InstanceType<typeof XIdl>['config'];
}

export function createHooks() {
    return {
        gen: {
            onGenRoot: new tapable.AsyncSeriesWaterfallHook<[string, pb.Root]>(['code', 'obj']),
            onGenMethod: new tapable.AsyncSeriesWaterfallHook<[string, pb.Method]>(['code', 'obj']),
            onGenService: new tapable.AsyncSeriesWaterfallHook<[string, pb.Service]>([
                'code',
                'obj',
            ]),
            onGenNamespace: new tapable.AsyncSeriesWaterfallHook<[string, pb.Namespace]>([
                'code',
                'obj',
            ]),
            onGenEnum: new tapable.AsyncSeriesWaterfallHook<[string, pb.Enum]>(['code', 'obj']),
            onGenType: new tapable.AsyncSeriesWaterfallHook<[string, pb.Type]>(['code', 'obj']),
            onBeforeObj: new tapable.AsyncSeriesWaterfallHook<[string, pb.ReflectionObject]>([
                'code',
                'obj',
            ]),
            onAfterObj: new tapable.AsyncSeriesWaterfallHook<[string, pb.ReflectionObject]>([
                'code',
                'obj',
            ]),
        },
        output: {
            afterGenCode: new tapable.AsyncSeriesWaterfallHook<
                [string, Parameters<InstanceType<typeof XIdl>['output']>[0]]
            >(['code', 'config']),
            onOutput: new tapable.AsyncParallelHook<
                [string, Parameters<InstanceType<typeof XIdl>['output']>[0]]
            >(['code', 'config']),
        },
    };
}

export abstract class XIdl {
    config: Required<XIdlConfig>;
    hooks = createHooks();
    constructor(config: XIdlConfig) {
        this.config = createConfig(config);
    }
    async createRoot({
        filePath = this.config.input.filePath,
        options = {},
    }: {
        filePath?: string;
        options?: Parameters<InstanceType<typeof pb.Root>['load']>[1];
    } = {}): Promise<pb.Root> {
        const root = new pb.Root();
        await root.load(path.resolve(CWD, filePath), {
            keepCase: true,
            alternateCommentMode: true,
            preferTrailingComment: true,
            ...options,
        });
        return root;
    }
    async genRoot(obj: pb.Root): Promise<string> {
        const code = await this.hooks.gen.onGenRoot.promise('', obj);
        return code;
    }
    async genService(obj: pb.Service): Promise<string> {
        const code = await this.hooks.gen.onGenService.promise('', obj);
        return code;
    }
    async genNamespace(obj: pb.Namespace): Promise<string> {
        const code = await this.hooks.gen.onGenNamespace.promise('', obj);
        return code;
    }
    async genEnum(obj: pb.Enum): Promise<string> {
        const code = await this.hooks.gen.onGenEnum.promise('', obj);
        return code;
    }
    async genType(obj: pb.Type): Promise<string> {
        const code = await this.hooks.gen.onGenType.promise('', obj);
        return code;
    }
    async genMethod(obj: pb.Method): Promise<string> {
        const code = await this.hooks.gen.onGenMethod.promise('', obj);
        return code;
    }
    async genObj(obj: pb.ReflectionObject): Promise<string> {
        let code = await this.hooks.gen.onBeforeObj.promise('', obj);
        if (obj instanceof pb.Root) {
            code = await this.genRoot(obj);
        } else if (obj instanceof pb.Type) {
            code = await this.genType(obj);
        } else if (obj instanceof pb.Service) {
            code = await this.genService(obj);
        } else if (obj instanceof pb.Method) {
            code = await this.genMethod(obj);
        } else if (obj instanceof pb.Namespace) {
            code = await this.genNamespace(obj);
        } else if (obj instanceof pb.Enum) {
            code = await this.genEnum(obj);
        } else {
            throw new Error('NonSupport Type', { cause: obj });
        }
        code = await this.hooks.gen.onAfterObj.promise(code, obj);
        return code;
    }
    getNamespaceNameList(obj: pb.Namespace): string[] {
        const res: string[] = [];
        let cur = obj;
        while (!(cur instanceof pb.Root)) {
            res.unshift(cur.name);
            cur = cur.parent;
        }
        return res;
    }

    bindHooks(hooks: Record<string, object>): void {
        lodash.merge(this.hooks, hooks);
    }

    use(plugin: { apply: (xidl: XIdl) => void }) {
        plugin.apply(this);
        return this;
    }

    contactIndent({
        count = 1,
        content = '',
        lineSplitChar = '\n',
    }: { count?: number; content?: string; lineSplitChar?: string } = {}) {
        return content
            .split(lineSplitChar)
            .map((v) => `${this.config.indent.repeat(count)}${v}`)
            .join(lineSplitChar);
    }

    async output(
        config: {
            config: Required<XIdlConfig>;
            obj?: pb.ReflectionObject;
            code?: string;
        } = { config: this.config },
    ): Promise<void> {
        const obj = config.obj ?? (await this.createRoot());
        let code = config.code ?? (await this.genObj(obj));
        code = await this.hooks.output.afterGenCode.promise(code, config);
        await this.hooks.output.onOutput.promise(code, { ...config, obj });
    }
}
