import { fromError } from 'zod-validation-error'
import { z, ZodObject } from 'zod'
import { produce } from 'immer'

export const zodSchemaSymbol = Symbol('zod-schema')

export type InstanceOfZodModel<T extends ZodObject<any> = ZodObject<any>> = z.infer<T> & BaseZodModel<T>

export interface ZodModelConstructor<T extends ZodObject<any> = ZodObject<any>> {
  new (raw?: z.infer<T>, modelConfig?: ZodModelConfig): InstanceOfZodModel<T>
  [zodSchemaSymbol]: T
  from(raw?: z.infer<T>, modelConfig?: ZodModelConfig): InstanceOfZodModel<T>
  isZodModel: true
}

export interface ZodModelConfig {}

export abstract class BaseZodModel<T extends ZodObject<any> = ZodObject<any>> {
  static isZodModel = true as const
  #parsedResult!: ReturnType<T['safeParse']>
  #cstr: ZodModelConstructor<T>
  #schema: T
  #raw: z.infer<T> = {}
  #config: ZodModelConfig = {}
  constructor(cstr: ZodModelConstructor<T>, schema: T, raw: z.infer<T> = {}, config: ZodModelConfig = {}) {
    this.#cstr = cstr
    this.#schema = schema
    this.#config = config
    this.parse(raw)
  }
  parse(raw: z.infer<T> = {}) {
    this.#raw = raw
    this.#parsedResult = this.#schema.safeParse(this.#raw) as ReturnType<T['safeParse']>
    if (this.isParsedSuccess()) {
      for (const key of Object.keys(this)) {
        Reflect.deleteProperty(this, key)
      }
      Object.assign(this, this.getData())
    }
  }
  isParsedSuccess() {
    return this.#parsedResult.success
  }
  assertSuccess() {
    if (!this.isParsedSuccess()) throw Error('Zod assert success fail.', { cause: this })
    return this
  }
  assertFailure() {
    if (this.isParsedSuccess()) throw Error('Zod assert failure fail.', { cause: this })
    return this
  }
  clone() {
    return this.#cstr.from(this.getData())
  }
  cloneWith(recipe: (draft: z.infer<T>) => void) {
    const newData = produce(this.getData(), recipe)
    return this.#cstr.from(newData)
  }
  setDataWith(recipe: (draft: z.infer<T>) => void) {
    const newData = produce(this.getData(), recipe)
    this.parse(newData)
    return this
  }
  toJSON() {
    return JSON.stringify(this.getData())
  }
  getParsedResult() {
    return this.#parsedResult
  }
  getData() {
    return this.assertSuccess().getParsedResult().data as InstanceOfZodModel<T>
  }
  getErrorMessage() {
    return fromError(this.assertFailure().getParsedResult().error!).toString()
  }
  getCstr() {
    return this.#cstr
  }
  getConfig() {
    return this.#config
  }
  getRaw() {
    return this.#raw
  }
  getSchema() {
    return this.#schema
  }
}

export function createZodModel<T extends ZodObject<any> = ZodObject<any>>(schema: T): ZodModelConstructor<T> {
  class ZodModel extends BaseZodModel<T> {
    static [zodSchemaSymbol] = schema
    static from(...args: ConstructorParameters<typeof ZodModel>) {
      return new ZodModel(...args)
    }
    constructor(raw?: z.infer<T>, modelConfig?: ZodModelConfig) {
      super(ZodModel, schema, raw, modelConfig)
    }
  }
  return ZodModel
}
