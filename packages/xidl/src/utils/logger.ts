import { createConsola } from 'consola'
import { LIB_NAME } from './constants'

export const logger = createConsola({
  defaults: { tag: LIB_NAME },
})

export function stringifyLogger(obj: any) {
  JSON.stringify(obj, null, 4)
    .split('\n')
    .forEach((v) => logger.debug(v))
}
