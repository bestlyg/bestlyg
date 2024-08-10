/**
 * @typedef {import("./types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("./types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import { getLeetCodeDataList, dirSort } from './utils.mjs';

const dataList = await getLeetCodeDataList();

