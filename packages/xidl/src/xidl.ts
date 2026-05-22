import { loadConfig as loadConfigC12 } from 'c12'
import * as tapable from 'tapable'
import pb from 'protobufjs'
import path from 'node:path'
import fs from 'fs-extra'
import { CWD, LIB_NAME, Hookable, Plugin, logger, stringifyLogger } from './utils'
import { resolve } from 'path'
import Handlebars from 'handlebars'

export interface XIdlConfiguration {
  name?: string
  cwd?: string
  input: {
    main: string
  }
  output?: {
    clean?: boolean
    indent?: {
      char?: string
      count?: number
    }
    dist?: string
  }
  plugins?: Plugin<XIdl>[]
}

type RequiredDeep<T> = T extends object ? (T extends Array<any> ? T : { [P in keyof T]-?: RequiredDeep<T[P]> }) : T

export function defineConfig(config: XIdlConfiguration) {
  return config
}

function normalizeConfigOptions(options: any) {
  const cwd = options?.cwd ?? CWD
  const normalized = { cwd }
  return normalized
}

export async function loadConfig(options: any): Promise<XIdlConfiguration> {
  const { cwd } = normalizeConfigOptions(options)

  const defaultConfig = {
    name: 'root',
    cwd,
    input: {
      main: '',
    },
    output: {
      indent: { char: ' ', count: 4 },
      dist: resolve(cwd, 'dist'),
      clean: true,
    },
    plugins: [],
  } satisfies Partial<XIdlConfiguration>

  const configOptions = {
    name: 'xidl',
    cwd,
    dotenv: true,
    envName: LIB_NAME,
    defaultConfig,
  }

  logger.debug('> Config Options')
  stringifyLogger(configOptions)

  const { config } = await loadConfigC12<XIdlConfiguration>(configOptions)

  if (config.output?.dist && !path.isAbsolute(config.output.dist)) {
    config.output.dist = resolve(cwd, config.output.dist)
  }

  return config
}

export class XIdl extends Hookable {
  hooks = Object.freeze({
    onGenParseOptions: new tapable.AsyncSeriesWaterfallHook<[pb.IParseOptions]>(['options']),
    afterGenParseOptions: new tapable.AsyncSeriesWaterfallHook<[pb.IParseOptions]>(['options']),

    onGenRoot: new tapable.AsyncSeriesWaterfallHook<[string, pb.Root]>(['code', 'obj']),
    afterGenRoot: new tapable.AsyncParallelHook<[string, pb.Root]>(['code', 'obj']),
    onGenService: new tapable.AsyncSeriesWaterfallHook<[string, pb.Service]>(['code', 'obj']),
    afterGenService: new tapable.AsyncParallelHook<[string, pb.Service]>(['code', 'obj']),
    onGenNamespace: new tapable.AsyncSeriesWaterfallHook<[string, pb.Namespace]>(['code', 'obj']),
    afterGenNamespace: new tapable.AsyncParallelHook<[string, pb.Namespace]>(['code', 'obj']),
    onGenEnum: new tapable.AsyncSeriesWaterfallHook<[string, pb.Enum]>(['code', 'obj']),
    afterGenEnum: new tapable.AsyncParallelHook<[string, pb.Enum]>(['code', 'obj']),
    onGenType: new tapable.AsyncSeriesWaterfallHook<[string, pb.Type]>(['code', 'obj']),
    afterGenType: new tapable.AsyncParallelHook<[string, pb.Type]>(['code', 'obj']),
    onGenMethod: new tapable.AsyncSeriesWaterfallHook<[string, pb.Method]>(['code', 'obj']),
    afterGenMethod: new tapable.AsyncParallelHook<[string, pb.Method]>(['code', 'obj']),
    onGenObj: new tapable.AsyncSeriesWaterfallHook<[string, pb.ReflectionObject]>(['code', 'obj']),
    afterGenObj: new tapable.AsyncParallelHook<[string, pb.ReflectionObject]>(['code', 'obj']),
    onGenField: new tapable.AsyncSeriesWaterfallHook<[string, pb.Field]>(['code', 'Field']),
    afterGenField: new tapable.AsyncParallelHook<[string, pb.Field]>(['code', 'obj']),

    onGenOutputArgs: new tapable.AsyncSeriesWaterfallHook<[{ path: string; code: string }]>(['args']),
    afterGenOutputArgs: new tapable.AsyncSeriesWaterfallHook<[{ path: string; code: string }]>(['args']),
  })
  config!: RequiredDeep<XIdlConfiguration>

  get indent() {
    return this.config.output.indent.char.repeat(this.config.output.indent.count)
  }

  constructor() {
    super()
  }

  async setup(options: any) {
    this.config = (await loadConfig(options)) as RequiredDeep<XIdlConfiguration>
    this.config.plugins.forEach((plugin) => this.use(plugin))
    logger.debug('> Parsed Config')
    stringifyLogger(this.config)
  }

  async parse() {
    if (this.config.output.clean) {
      await fs.emptyDir(this.config.output.dist)
    }
    if (!this.config.input.main) {
      throw new Error('Missing required xidl config: input.main')
    }
    const protocPath = resolve(this.config.cwd, this.config.input.main)
    logger.debug(`> protocPath`)
    logger.debug(protocPath)
    const parseOptions = await this.hooks.onGenParseOptions.promise({
      keepCase: true,
      alternateCommentMode: true,
      preferTrailingComment: true,
    })
    await this.hooks.afterGenParseOptions.promise(parseOptions)
    const root = await this.createRoot(protocPath, parseOptions)
    await this.genObj(root)
  }

  async createRoot(filePath: string, options: pb.IParseOptions) {
    const root = new pb.Root()
    await root.load(filePath, options)
    return root
  }

  async genRoot(obj: pb.Root) {
    const code = await this.hooks.onGenRoot.promise('', obj)
    await this.hooks.afterGenRoot.promise(code, obj)
    return code
  }

  async genService(obj: pb.Service) {
    const code = await this.hooks.onGenService.promise('', obj)
    await this.hooks.afterGenService.promise(code, obj)
    return code
  }

  async genNamespace(obj: pb.Namespace) {
    const code = await this.hooks.onGenNamespace.promise('', obj)
    await this.hooks.afterGenNamespace.promise(code, obj)
    return code
  }

  async genEnum(obj: pb.Enum) {
    const code = await this.hooks.onGenEnum.promise('', obj)
    await this.hooks.afterGenEnum.promise(code, obj)
    return code
  }

  async genType(obj: pb.Type) {
    const code = await this.hooks.onGenType.promise('', obj)
    await this.hooks.afterGenType.promise(code, obj)
    return code
  }

  async genMethod(obj: pb.Method) {
    const code = await this.hooks.onGenMethod.promise('', obj)
    await this.hooks.afterGenMethod.promise(code, obj)
    return code
  }

  async genField(obj: pb.Field) {
    const code = await this.hooks.onGenField.promise('', obj)
    await this.hooks.afterGenField.promise(code, obj)
    return code
  }

  async genObj(obj: pb.ReflectionObject) {
    let code = ''
    code = await this.hooks.onGenObj.promise(code, obj)
    if (obj instanceof pb.Root) {
      code = await this.genRoot(obj)
    } else if (obj instanceof pb.Type) {
      code = await this.genType(obj)
    } else if (obj instanceof pb.Service) {
      code = await this.genService(obj)
    } else if (obj instanceof pb.Method) {
      code = await this.genMethod(obj)
    } else if (obj instanceof pb.Namespace) {
      code = await this.genNamespace(obj)
    } else if (obj instanceof pb.Enum) {
      code = await this.genEnum(obj)
    } else if (obj instanceof pb.Field) {
      code = await this.genField(obj)
    } else {
      throw new Error('UnSupport Type', { cause: obj })
    }
    await this.hooks.afterGenObj.promise(code, obj)
    return code
  }

  getParents(obj: pb.ReflectionObject) {
    const parents: pb.ReflectionObject[] = []
    let current: pb.ReflectionObject | null = obj

    while (current) {
      parents.unshift(current)
      current = current.parent
    }
    return parents
  }

  getFilePath({
    obj,
    fileName,
    paths = this.getParents(obj).map((p) => p.name),
  }: {
    obj: pb.ReflectionObject
    fileName: string
    paths?: string[]
  }) {
    return resolve(this.config.output.dist, ...paths, fileName)
  }

  async output(p: string, code: string) {
    logger.debug('> output')
    p = resolve(this.config.output.dist, p)
    const res = await this.hooks.onGenOutputArgs.promise({ path: p, code })
    p = res.path
    code = res.code
    await this.hooks.afterGenOutputArgs.promise(res)
    logger.debug(`path: ${p}`)
    logger.debug('code:')
    code
      .trim()
      .split('\n')
      .forEach((v) => logger.debug(v))
    await fs.ensureDir(path.dirname(p))
    await fs.writeFile(p, code)
  }

  async renderTemplate({ obj: _obj, input, context }: { obj: pb.ReflectionObject; context: any; input: any }) {
    logger.debug('> Render Template')
    const template = Handlebars.compile(input)
    return template(context)
  }
}
