import pb from 'protobufjs'

const EXTRA_ENUM_DEFAULT = new RegExp('^\\(default\\.(.*)\\)$')
const EXTRA_ENUM_TYPE = new RegExp('^\\(type\\.(.*)\\)$')
const EXTRA_TYPE_EXTENDS = '(extends)'
const EXTRA_TYPE_REQUIRED = '(required)'
const EXTRA_ENUM_REPEATED = '(repeated)'

function getParsedOptions(obj: pb.ReflectionObject): { [k: string]: any }[] {
  return (obj.parsedOptions as any as { [k: string]: any }[]) ?? []
}

interface ExtraInfoCommon {
  default: Record<string, string>
  type: Record<string, string>
}

function parseExtraInfoCommon(obj: pb.ReflectionObject) {
  const info: ExtraInfoCommon = { default: {}, type: {} }
  for (const option of getParsedOptions(obj)) {
    for (const key of Object.keys(option)) {
      const val = option[key]
      {
        // default
        const matchResult = key.match(EXTRA_ENUM_DEFAULT)
        if (matchResult) {
          const key = matchResult[1]
          info.default[key] = val
        }
      }
      {
        // repeated
        const matchResult = key.match(EXTRA_ENUM_TYPE)
        if (matchResult) {
          const key = matchResult[1]
          info.type[key] = val
        }
      }
    }
  }
  return info
}

export interface ExtraInfoEnum extends ExtraInfoCommon {
  extends?: string
}

export function parseExtraInfoEnum(obj: pb.Enum): ExtraInfoEnum {
  const info = parseExtraInfoCommon(obj)
  return info
}

export interface ExtraInfoType extends ExtraInfoCommon {
  extends?: string
  required?: string[]
  repeated?: string[]
}

export function parseExtraInfoType(obj: pb.Type): ExtraInfoType {
  const info: ExtraInfoType = parseExtraInfoCommon(obj)
  for (const option of getParsedOptions(obj)) {
    for (const key of Object.keys(option)) {
      if (key === EXTRA_TYPE_EXTENDS) {
        info.extends = option[key]
      } else if (key === EXTRA_TYPE_REQUIRED) {
        info.required ??= []
        info.required.push(option[key])
      } else if (key === EXTRA_ENUM_REPEATED) {
        info.repeated ??= []
        info.repeated.push(option[key])
      }
    }
  }
  return info
}

// 类型守卫：验证是否为 MapField 类型
export function isMapField(obj: any): obj is pb.MapField {
  return obj instanceof pb.Field && 'keyType' in obj
}
