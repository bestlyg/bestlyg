import { Response } from 'express'

export class SSE<T = any> {
  static DATA_TAG = 'data: '
  static setSSEModeToResponse(res: Response) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
  }
  static write<T>(res: Response, instance: SSE<T>) {
    res.write(`data: ${JSON.stringify(instance)}\n\n`)
  }
  static from<T>(text: string): SSE<T> {
    if (text.startsWith(SSE.DATA_TAG)) {
      const data = JSON.parse(text.substring(SSE.DATA_TAG.length))
      return new SSE().set('data', data.data).set('code', data.code).set('msg', data.msg)
    }
    throw new Error('Unsupport data')
  }
  code = 0
  data: T | undefined
  msg: string | undefined

  set<K extends keyof this>(key: K, val: this[K]) {
    this[key] = val
    return this
  }

  toJSON() {
    return { code: this.code, msg: this.msg, data: this.data }
  }

  static async fetch<T>({
    fetchConfig,
    onReadSSEData,
  }: {
    fetchConfig: Parameters<typeof fetch>
    onReadSSEData: (data: T | undefined) => Promise<void>
  }) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    fetchConfig[1] ??= {}
    fetchConfig[1].headers ??= {}
    fetchConfig[1].headers = {
      ...headers,
      ...fetchConfig[1].headers,
    }

    const response = await fetch(...fetchConfig)

    if (!response.ok) throw new Error('请求失败')
    if (response.body) {
      const reader = response.body.getReader()
      let done = false
      // 在循环外部实例化 TextDecoder，提高性能。
      const decoder = new TextDecoder()
      while (!done) {
        const { done: isDone, value } = await reader.read()
        done = isDone
        if (!done) {
          const text = decoder.decode(value)
          const data = SSE.from<T>(text)
          if (data.code !== 0) throw new Error(data.msg)
          await onReadSSEData(data.data)
        }
      }
    }
  }
}
