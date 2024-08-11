import '@bestlyg/cli/globals';
import { getLeetCodeDataList, resolve } from './utils.mjs';

const dataList = await getLeetCodeDataList();

fs.writeFile(resolve('src', 'data-list.ts'), `export const DATA_LIST = ${JSON.stringify(dataList)};`);
