import type { ServerResponse } from 'node:http'

/** 判断对象是否是 Node HTTP ServerResponse，常用于兼容 Express response 分支。 */
export function isServerResponse(obj: unknown): obj is ServerResponse {
  return Boolean(
    obj &&
    typeof obj === 'object' &&
    'req' in obj &&
    'statusCode' in obj &&
    (obj as { constructor?: { name?: string } }).constructor?.name === 'ServerResponse',
  )
}
