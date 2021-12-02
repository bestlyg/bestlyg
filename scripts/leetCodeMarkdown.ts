import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: !true,
    name: '506. 相对名次',
    url: 'https://leetcode-cn.com/problems/relative-ranks/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.排序, Tag.堆_优先队列],
    desc: `使用长度为 n 的数组 answer 返回获奖，其中 answer[i] 是第 i 位运动员的获奖情况。`,
    solutions: [
      {
        script: Script.TS,
        time: 96,
        memory: 40.9,
        desc: '排序',
        code: `function findRelativeRanks(score: number[]): string[] {
          const n = score.length;
          const idxs = new Array(n)
            .fill(0)
            .map((_, i) => i)
            .sort((a, b) => score[b] - score[a]);
          const ans: string[] = [];
          for (let i = 0; i < n; i++) {
            const str =
              i === 0 ? 'Gold Medal' : i === 1 ? 'Silver Medal' : i === 2 ? 'Bronze Medal' : ${backquote}\${i + 1}${backquote};
            ans[idxs[i]] = str;
          }
          return ans;
        }`,
      },
      {
        script: Script.C,
        time: 16,
        memory: 7.9,
        desc: '遍历',
        code: `int *g_score;
int comp(const void *a, const void *b) {
    return g_score[*(int *)b] - g_score[*(int *)a];
}
char ** findRelativeRanks(int* score, int scoreSize, int* returnSize){
    g_score = score;
    *returnSize = scoreSize;
    int *idxs = (int *)malloc(sizeof(int) * scoreSize);
    for (int i = 0; i < scoreSize; i++) idxs[i] = i;
    qsort(idxs, scoreSize, sizeof(int), comp);
    char **ans = (char **)malloc(sizeof(char *) * scoreSize);
    for (int i = 0; i < scoreSize; i++) {
        if (i == 0) ans[idxs[i]] = "Gold Medal";
        else if (i == 1) ans[idxs[i]] = "Silver Medal";
        else if (i == 2) ans[idxs[i]] = "Bronze Medal";
        else {
            ans[idxs[i]] = (char *)malloc(10);
            sprintf(ans[idxs[i]], "%d", i + 1);
        }
    }
    return ans;
    
}`,
      },
    ],
  },
];
