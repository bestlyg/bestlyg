import '@bestlyg/cli/globals';
import { LeetCode, getLeetCodeDataList } from '@bestlyg/leetcode';

const leetcode = new LeetCode({
    credential: {
        csrf: process.env.BESTLYG_LEETCODE_CSRF,
        session: process.env.BESTLYG_LEETCODE_SESSION,
    },
});

/**
 * @param {string} url
 */
function getTitleSlugFromURL(url) {
    const res = Array.from(url.matchAll(/https:\/\/leetcode.cn\/problems\/(.*)/g));
    return res[0][1];
}

const dataList = await getLeetCodeDataList();

for (const { problemName, problemData, problemPath } of dataList.map(v => v.problems).flat()) {
    try {
        const titleSlug = getTitleSlugFromURL(problemData.url);
        const problemResult = await leetcode.getProblem(titleSlug);
        if (!problemResult) {
            throw new Error('Get problem result fail.');
        }
        problemData.id = problemResult.questionId;
        problemData.name = (
            problemResult.questionFrontendId +
            '.' +
            problemResult.translatedTitle
        ).replace(/ /g, '');
        problemData.level = problemResult.difficulty;
        problemData.tagList = problemResult.topicTags.map(v => v.translatedName);
        await fs.writeFile(problemPath, JSON.stringify(problemData, null, 4));
        echo`${problemName} is updated`;
    } catch (err) {
        echo`${problemName} update fail`;
        console.error(err);
    }
}
