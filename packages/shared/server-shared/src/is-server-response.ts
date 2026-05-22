import type { ServerResponse } from 'node:http'

export function isServerResponse(obj: unknown): obj is ServerResponse {
  return Boolean(
    obj &&
    typeof obj === 'object' &&
    'req' in obj &&
    'statusCode' in obj &&
    (obj as { constructor?: { name?: string } }).constructor?.name === 'ServerResponse',
  )
}
