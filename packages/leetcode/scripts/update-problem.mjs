/**
 * @typedef {import("../dist/types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("../dist/types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import { getLeetCodeDataList, DATE_FORMAT_SOLUTION } from './utils.mjs';
// import { DATA_LIST } from '../dist/esm/index.js';

// console.log(DATA_LIST);

// const dataList = await getLeetCodeDataList();

// const levelMap = {
//     简单: 'Easy',
//     中等: 'Medium',
//     困难: 'Hard',
// };

// const run = best.pLimit(10);

// for (const { problemData, problemPath } of dataList.map(v => v.problems).flat()) {
//     const tagList = problemData.tag;
//     problemData.tagList = tagList;
//     problemData.level = levelMap[problemData.difficulty];
//     delete problemData.tag;
//     delete problemData.difficulty;
//     for (const solution of problemData.solutions) {
//         solution.date = best.dayjs(solution.date).format(DATE_FORMAT_SOLUTION);
//     }
//     run(async () => {
//         console.log(`ReWrite ${problemPath}`);
//         await fs.writeFile(problemPath, JSON.stringify(problemData, null, 4));
//     });
// }

// import { LeetCodeCN, Credential } from 'leetcode-query';

// // const credential = new Credential({
// //     session: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXh0X2FmdGVyX29hdXRoIjoiL3Byb2JsZW1zZXQvIiwiX2F1dGhfdXNlcl9pZCI6IjgyMTA4NiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZmQ5ODYxMGM0YjBlYjM4MzAxZGM2ODNlMzU5NDc0MTBhOTg1MjM4MTBjZmIyNTExM2NkYzU3NjkwOWZjNjdkZSIsImlkIjo4MjEwODYsImVtYWlsIjoiIiwidXNlcm5hbWUiOiJiZXN0bHlnIiwidXNlcl9zbHVnIjoiYmVzdGx5ZyIsImF2YXRhciI6Imh0dHBzOi8vYXNzZXRzLmxlZXRjb2RlLmNuL2FsaXl1bi1sYy11cGxvYWQvdXNlcnMveGlhby14aWFvLXhpYW8tamluZy15dS9hdmF0YXJfMTU2ODU0NjI0NS5wbmciLCJwaG9uZV92ZXJpZmllZCI6dHJ1ZSwiaXAiOiIxMDkuMTA1LjE5My4xNjEiLCJfdGltZXN0YW1wIjoxNzIzMjQ3ODM4LjI3NTIxMiwiZXhwaXJlZF90aW1lXyI6MTcyNTgyMjAwMCwidmVyc2lvbl9rZXlfIjowLCJkZXZpY2VfaWQiOiJkYjJhNTg2N2ViM2U4ZWIwYjc5YWYwY2I0MGY1YTEwZCJ9.Pus6WHlYSMRFzUA0qPvqw6Btby96gkp18ZbxlLcngu8`,
// //     csrf: '0e3kKoYHXVqWCmJtFsMSg3JfwfJH6I4QqtJzZz2f2XdbKGbKufTZ5ivabS6HRBd1',
// // });
// // await credential.init();

// const leetcode = new LeetCodeCN();
// leetcode.credential.csrf = '0e3kKoYHXVqWCmJtFsMSg3JfwfJH6I4QqtJzZz2f2XdbKGbKufTZ5ivabS6HRBd1';
// leetcode.credential.session = `esyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXh0X2FmdGVyX29hdXRoIjoiL3Byb2JsZW1zZXQvIiwiX2F1dGhfdXNlcl9pZCI6IjgyMTA4NiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZmQ5ODYxMGM0YjBlYjM4MzAxZGM2ODNlMzU5NDc0MTBhOTg1MjM4MTBjZmIyNTExM2NkYzU3NjkwOWZjNjdkZSIsImlkIjo4MjEwODYsImVtYWlsIjoiIiwidXNlcm5hbWUiOiJiZXN0bHlnIiwidXNlcl9zbHVnIjoiYmVzdGx5ZyIsImF2YXRhciI6Imh0dHBzOi8vYXNzZXRzLmxlZXRjb2RlLmNuL2FsaXl1bi1sYy11cGxvYWQvdXNlcnMveGlhby14aWFvLXhpYW8tamluZy15dS9hdmF0YXJfMTU2ODU0NjI0NS5wbmciLCJwaG9uZV92ZXJpZmllZCI6dHJ1ZSwiaXAiOiIxMDkuMTA1LjE5My4xNjEiLCJfdGltZXN0YW1wIjoxNzIzMjQ3ODM4LjI3NTIxMiwiZXhwaXJlZF90aW1lXyI6MTcyNTgyMjAwMCwidmVyc2lvbl9rZXlfIjowLCJkZXZpY2VfaWQiOiJkYjJhNTg2N2ViM2U4ZWIwYjc5YWYwY2I0MGY1YTEwZCJ9.Pus6WHlYSMRFzUA0qPvqw6Btby96gkp18ZbxlLcngu8`;

// console.log(leetcode.submissions);
