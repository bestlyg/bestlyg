import '@bestlyg/cli/globals';
import { getLeetCodeDataList, resolve } from './utils.mjs';

const dataList = await getLeetCodeDataList();

fs.writeFile(
    resolve('src', 'data-list.ts'),
    `
import { LeetCodeDataList } from './types';
export const DATA_LIST: LeetCodeDataList = ${JSON.stringify(dataList, null, 4)};
`.trim()
);
