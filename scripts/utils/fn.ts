import path from 'path';
import { lodash } from './dep';
import { blankReg } from './reg';

export const trimBlank = (str: string) => str.replace(blankReg, '');
export const resolve = (...p: string[]) => path.resolve(__dirname, '../../', ...p);
export const log = (
  data: Record<string, any>,
  {
    splitCount = 40,
    chunkCount = 5,
    padStart = 0,
    padEnd = 0,
  }: { splitCount?: number; chunkCount?: number; padStart?: number; padEnd?: number } = {}
) => {
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
};
