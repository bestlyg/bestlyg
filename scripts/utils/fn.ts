import path from 'path';
import { lodash } from './dep';
import { blankReg } from './reg';

const { isNumber, isSet, isMap, isArray, isObject, isString, isBoolean, upperFirst, chunk } =
  lodash;

export const trimBlank = (str: string) => str.replace(blankReg, '');
export const resolve = (...p: string[]) => path.resolve(__dirname, '../../', ...p);

export class Logger {
  get visible() {
    return this._visible;
  }
  set visible(val: boolean) {
    this._visible = val;
  }
  private config = {
    splitCount: 40,
    chunkCount: 5,
  };
  constructor(private _visible = true) {}
  log(data: Record<string, unknown>, config: Partial<typeof this.config> = {}) {
    if (!this.visible) return;
    const { splitCount, chunkCount } = { ...this.config, ...config };
    splitCount && console.log('='.repeat(splitCount));
    console.log(
      chunk(
        Object.entries(data).map(([key, item]) => `${key} = ${this.data2String(item).value}`),
        chunkCount
      )
        .map(arr => arr.join(', '))
        .join('\n')
    );
  }
  private data2String(data: unknown) {
    const ans = {
      key: '',
      value: '',
    };
    if (isNumber(data) || isString(data) || isBoolean(data)) {
      ans.key = upperFirst(typeof data);
      ans.value = data.toString();
    }
    if (isObject(data)) {
      ans.key = 'Object';
      ans.value = `{${Object.entries(data)
        .map(([k, v]) => `${k} : ${this.data2String(v).value}`)
        .join(', ')}}`;
    }
    if (isArray(data)) {
      ans.key = 'Array';
      ans.value = `[${data.map(v => this.data2String(v).value).join(', ')}]`;
    }
    if (isSet(data)) {
      ans.key = 'Set';
      ans.value = `Set [${Array.from(data)
        .map(v => this.data2String(v).value)
        .join(', ')}]`;
    }
    if (isMap(data)) {
      ans.key = 'Map';
      ans.value = `Map {${Array.from(data)
        .map(([k, v]) => `${k} : ${this.data2String(v).value}`)
        .join(', ')}}`;
    }
    return ans;
  }
}
export function log(
  data: Record<string, any>,
  {
    splitCount = 40,
    chunkCount = 5,
    padStart = 0,
    padEnd = 0,
  }: { splitCount?: number; chunkCount?: number; padStart?: number; padEnd?: number } = {}
) {
  splitCount && console.log('='.repeat(splitCount));
  console.log(
    lodash
      .chunk(
        Object.entries(data).map(([k, v]) =>
          `${k}=${JSON.stringify(v)}`.padStart(padStart, ' ').padEnd(padEnd, ' ')
        ),
        chunkCount
      )
      .map(arr => arr.join(','))
      .join('\n')
  );
}
