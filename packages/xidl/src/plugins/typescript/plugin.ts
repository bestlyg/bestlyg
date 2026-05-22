import { PluginClass } from '@/utils'
import { XIdl } from '@/xidl'
import pb from 'protobufjs'
import { isMapField, parseExtraInfoEnum, parseExtraInfoType } from '@/extra'
import _ from 'lodash'
import { TS_ENUM_TEMPLATE, TS_FIELD_TEMPLATE, TS_NAMESPACE_TEMPLATE, TS_TYPE_TEMPLATE } from './template'

export interface TypescriptPluginConfig {
  semi: boolean
  template: {
    enum: string
    field: string
    namespace: string
    type: string
  }
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (...args: any[]) => any // 所有属性转为可选
    ? T[P] // 若属性是函数类型，直接使用原类型（不递归）
    : T[P] extends object
      ? DeepPartial<T[P]> // 其他对象类型，继续深层处理
      : T[P] // 非对象非函数类型（如基本类型），保持原类型
}

export class TypescriptPlugin implements PluginClass<XIdl> {
  config: TypescriptPluginConfig
  constructor(config: DeepPartial<TypescriptPluginConfig> = {}) {
    config.semi ??= true
    config.template = _.merge(
      {
        enum: TS_ENUM_TEMPLATE,
        field: TS_FIELD_TEMPLATE,
        namespace: TS_NAMESPACE_TEMPLATE,
        type: TS_TYPE_TEMPLATE,
      },
      config.template,
    )
    this.config = config as TypescriptPluginConfig
  }

  getFieldMessage(obj: pb.Field) {
    if (!obj.message) {
      throw new Error(`Field "${obj.name}" is not attached to a protobuf message.`)
    }

    return obj.message
  }

  async _genValueType(type: string) {
    if (type === 'bool') {
      return 'boolean'
    }
    if (/int|fixed|float|double/.test(type)) {
      return 'number'
    }

    if (type === 'bytes' || type === 'string') {
      return 'string'
    }
    return type
  }

  async genValueType(obj: pb.Field): Promise<string> {
    const info = parseExtraInfoType(this.getFieldMessage(obj))
    let type = ''
    if (info.type[obj.name]) {
      type = info.type[obj.name]
    } else if (obj.map && isMapField(obj)) {
      const mapField = obj as unknown as pb.MapField
      const keyType = await this._genValueType(mapField.keyType)
      const valueType = await this._genValueType(mapField.type)
      type = `Record<${keyType}, ${valueType}>`
    } else {
      type = await this._genValueType(obj.type)
    }
    if (obj.repeated || info.repeated?.includes(obj.name)) type += '[]'
    return type
  }

  getPaths(instance: XIdl, obj: pb.ReflectionObject) {
    const paths = instance.getParents(obj).map((p) => p.name)
    // paths[0] = "typescript";
    return paths
  }

  apply(instance: XIdl): void {
    instance.hooks.onGenRoot.tapPromise(TypescriptPlugin.name, async (_, obj) => {
      const codes = await Promise.all(obj.nestedArray.map((v) => instance.genObj(v)))
      const filePath = instance.getFilePath({
        obj,
        fileName: 'index.ts',
        paths: this.getPaths(instance, obj),
      })
      await instance.output(filePath, codes.join('\n\n'))
      return codes.filter(Boolean).join('\n\n')
    })
    instance.hooks.onGenNamespace.tapPromise(TypescriptPlugin.name, async (code, obj) => {
      const codes = await Promise.all(obj.nestedArray.map((v) => instance.genObj(v)))
      const filePath = instance.getFilePath({
        obj,
        fileName: 'index.ts',
        paths: this.getPaths(instance, obj),
      })
      await instance.output(filePath, codes.filter(Boolean).join('\n\n'))
      const context = {
        name: obj.name,
        config: this.config,
      }
      code = await instance.renderTemplate({
        obj,
        input: this.config.template.namespace,
        context,
      })
      return code
    })

    instance.hooks.onGenType.tapPromise(TypescriptPlugin.name, async (code, obj) => {
      const info = parseExtraInfoType(obj)
      const context = {
        name: obj.name,
        comment: obj.comment,
        extends: info.extends,
        indent: instance.indent,
        items: await Promise.all(obj.fieldsArray.map((field) => instance.genField(field))),
        config: this.config,
      }
      code = await instance.renderTemplate({
        obj,
        input: this.config.template.type,
        context,
      })
      return code
    })

    instance.hooks.onGenField.tapPromise(TypescriptPlugin.name, async (code, obj) => {
      const info = parseExtraInfoType(this.getFieldMessage(obj))
      const type = await this.genValueType(obj)
      const context = {
        name: obj.name,
        comment: obj.comment,
        optional: obj.optional && !info.required?.includes(obj.name),
        indent: instance.indent,
        type,
        value: info.default[obj.name],
        config: this.config,
      }
      code = await instance.renderTemplate({
        obj,
        input: this.config.template.field,
        context,
      })
      return code
    })

    instance.hooks.onGenEnum.tapPromise(TypescriptPlugin.name, async (code, obj) => {
      const info = parseExtraInfoEnum(obj)
      const context = {
        name: obj.name,
        comment: obj.comment,
        indent: instance.indent,
        items: Object.keys(obj.values).map((item) => ({
          key: item,
          value: info.default[item],
          comment: obj.comments[item],
        })),
        config: this.config,
      }
      code = await instance.renderTemplate({
        obj,
        input: this.config.template.enum,
        context,
      })
      return code
    })
  }
}
