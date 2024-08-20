import '@bestlyg/cli/globals';
import { LeetCode, getLeetCodeDataList, updateProblemFromLeetcode } from '@bestlyg/leetcode';

const leetcode = new LeetCode({
    credential: {
        csrf: process.env.BESTLYG_LEETCODE_CSRF,
        session: process.env.BESTLYG_LEETCODE_SESSION,
    },
});

const dataList = await getLeetCodeDataList();

for (const problem of dataList.map(v => v.problems).flat()) {
    await updateProblemFromLeetcode(leetcode, problem);
}
