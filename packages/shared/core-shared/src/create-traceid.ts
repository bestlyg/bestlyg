import { customAlphabet } from 'nanoid'
import dayjs from 'dayjs'

/** 按照和旭东约定的生成traceId的规则 生成 traceId https://mk70znjkuv.feishu.cn/wiki/F97gwygjIi4VJqkyUIJcEefIn2b*/
export function createTraceId() {
  const alphabet = '0123456789'
  const generate = customAlphabet(alphabet, 5)
  return `frontend_${dayjs(new Date()).format('YYYYMMDDHHmmss')}_${generate()}`
}
