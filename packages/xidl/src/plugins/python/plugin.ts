import { PluginClass } from '@/utils'
import { XIdl } from '@/xidl'
import pb from 'protobufjs'
import { isMapField, parseExtraInfoEnum, parseExtraInfoType } from '@/extra'
import _ from 'lodash'
import { PY_ENUM_TEMPLATE, PY_FIELD_TEMPLATE, PY_TYPE_TEMPLATE } from './template'

export class PythonPlugin implements PluginClass<XIdl> {
  codeHeaders: string[] = []

  getFieldMessage(obj: pb.Field) {
    if (!obj.message) {
      throw new Error(`Field "${obj.name}" is not attached to a protobuf message.`)
    }

    return obj.message
  }

  addCodeHeader(header: string) {
    if (!this.codeHeaders.includes(header)) {
      this.codeHeaders.push(header)
    }
  }

  async _genValueType(type: string) {
    if (type === 'bool') {
      return 'bool'
    }
    if (/int|fixed/.test(type) && !/float|double/.test(type)) {
      return 'int'
    }
    if (type === 'float' || type === 'double') {
      return 'float'
    }
    if (type === 'bytes') {
      return 'bytes'
    }
    if (type === 'string') {
      return 'str'
    }
    return type
  }

  async genValueType(obj: pb.Field): Promise<string> {
    if (obj.repeated) {
      const baseType = await this._genValueType(obj.type)
      this.addCodeHeader('from typing import List')
      return `'List[${baseType}]'`
    }
    if (obj.map && isMapField(obj)) {
      const keyType = await this._genValueType(obj.keyType)
      const valueType = await this._genValueType(obj.type)
      this.addCodeHeader('from typing import Dict')
      return `'Dict[${keyType}, ${valueType}]'`
    }
    return `'${await this._genValueType(obj.type)}'`
  }

  getPaths(instance: XIdl, obj: pb.ReflectionObject) {
    const paths = instance.getParents(obj).map((p) => p.name)
    // paths[0] = "python";
    return paths
  }

  apply(instance: XIdl): void {
    instance.hooks.onGenRoot.tapPromise(PythonPlugin.name, async (_, obj) => {
      const codes = await Promise.all(obj.nestedArray.map((v) => instance.genObj(v)))
      const filePath = instance.getFilePath({
        obj,
        fileName: '__init__.py',
        paths: this.getPaths(instance, obj),
      })
      await instance.output(filePath, codes.join('\n\n'))
      return codes.filter(Boolean).join('\n\n')
    })

    instance.hooks.onGenNamespace.tapPromise(PythonPlugin.name, async (code, obj) => {
      const codes = await Promise.all(obj.nestedArray.map((v) => instance.genObj(v)))
      const filePath = instance.getFilePath({
        obj,
        fileName: '__init__.py',
        paths: this.getPaths(instance, obj),
      })
      await instance.output(filePath, codes.filter(Boolean).join('\n\n'))
      this.codeHeaders.length = 0
      const context = {
        name: obj.name,
      }
      code = await instance.renderTemplate({
        obj,
        input: '',
        context,
      })
      return code
    })

    instance.hooks.onGenType.tapPromise(PythonPlugin.name, async (code, obj) => {
      this.addCodeHeader('from dataclasses import dataclass')
      const info = parseExtraInfoType(obj)

      const context = {
        name: obj.name,
        comment: obj.comment,
        extends: info.extends,
        indent: instance.indent,
        items: await Promise.all(obj.fieldsArray.map((field) => instance.genField(field))),
      }
      code = await instance.renderTemplate({
        obj,
        input: PY_TYPE_TEMPLATE,
        context,
      })
      return code
    })

    instance.hooks.onGenField.tapPromise(PythonPlugin.name, async (code, obj) => {
      const info = parseExtraInfoType(this.getFieldMessage(obj))
      const type = await this.genValueType(obj)
      const context = {
        name: obj.name,
        comment: obj.comment,
        optional: obj.optional && !info.required?.includes(obj.name),
        indent: instance.indent,
        type,
        repeated: obj.repeated,
        value: info.default[obj.name],
      }
      code = await instance.renderTemplate({
        obj,
        input: PY_FIELD_TEMPLATE,
        context,
      })
      return code
    })

    instance.hooks.onGenEnum.tapPromise(PythonPlugin.name, async (code, obj) => {
      const info = parseExtraInfoEnum(obj)
      if (Object.keys(info.default).length > 0) {
        this.addCodeHeader('from enum import StrEnum')
      }
      const context = {
        name: obj.name,
        comment: obj.comment,
        indent: instance.indent,
        items: Object.keys(obj.values).map((item) => ({
          key: item,
          value: info.default[item],
          comment: obj.comments[item],
        })),
      }

      code = await instance.renderTemplate({
        obj,
        input: PY_ENUM_TEMPLATE,
        context,
      })
      return code
    })

    instance.hooks.onGenOutputArgs.tapPromise(PythonPlugin.name, async (args) => {
      args.code = this.codeHeaders.join('\n') + '\n\n' + args.code
      return args
    })
  }
}
