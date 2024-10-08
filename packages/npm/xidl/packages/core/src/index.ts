import { protobufjs as pb, tapable } from '@xidl/shared';

export interface XIdlConfig {
    inputFilePath: string;
    outputDirPath: string;
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
        onGenRoot: new tapable.AsyncSeriesWaterfallHook<[string, pb.Root]>(['code', 'obj']),
        onGenService: new tapable.AsyncSeriesWaterfallHook<[string, pb.Service]>(['code', 'obj']),
        onGenNamespace: new tapable.AsyncSeriesWaterfallHook<[string, pb.Namespace]>([
            'code',
            'obj',
        ]),
        onGenEnum: new tapable.AsyncSeriesWaterfallHook<[string, pb.Enum]>(['code', 'obj']),
        onGenType: new tapable.AsyncSeriesWaterfallHook<[string, pb.Type]>(['code', 'obj']),
    };
}

export abstract class XIdl {
    config: Required<XIdlConfig>;
    hooks = createHooks();
    constructor(config: XIdlConfig) {
        this.config = createConfig(config);
    }
    async createRoot({
        filePath = this.config.inputFilePath,
        options = {},
    }: {
        filePath?: string;
        options?: Parameters<InstanceType<typeof pb.Root>['load']>[1];
    } = {}): Promise<pb.Root> {
        const root = new pb.Root();
        await root.load(filePath, {
            keepCase: true,
            alternateCommentMode: true,
            preferTrailingComment: true,
            ...options,
        });
        return root;
    }
    async genRoot(obj: pb.Root): Promise<string> {
        const code = await this.hooks.onGenRoot.promise('', obj);
        return code;
    }
    async genService(obj: pb.Service): Promise<string> {
        const code = await this.hooks.onGenService.promise('', obj);
        return code;
    }
    async genNamespace(obj: pb.Namespace): Promise<string> {
        const code = await this.hooks.onGenNamespace.promise('', obj);
        return code;
    }
    async genEnum(obj: pb.Enum): Promise<string> {
        const code = await this.hooks.onGenEnum.promise('', obj);
        return code;
    }
    async genType(obj: pb.Type): Promise<string> {
        const code = await this.hooks.onGenType.promise('', obj);
        return code;
    }
    async genObj(obj: pb.ReflectionObject): Promise<string> {
        if (obj instanceof pb.Root) {
            return this.genRoot(obj);
        } else if (obj instanceof pb.Type) {
            return this.genType(obj);
        } else if (obj instanceof pb.Service) {
            return this.genService(obj);
        } else if (obj instanceof pb.Namespace) {
            return this.genNamespace(obj);
        } else if (obj instanceof pb.Enum) {
            return this.genEnum(obj);
        } else {
            throw new Error('NonSupport Type', { cause: obj });
        }
    }
}
