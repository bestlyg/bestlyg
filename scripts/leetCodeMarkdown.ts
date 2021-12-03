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
    name: '1005. K 次取反后最大化的数组和',
    url: 'https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/',
    difficulty: Difficulty.简单,
    tag: [Tag.贪心, Tag.数组, Tag.排序],
    desc: `返回数组 可能的最大和`,
    solutions: [
      {
        script: Script.TS,
        time: 80,
        memory: 39.5,
        desc: '排序',
        code: `function largestSumAfterKNegations(nums: number[], k: number): number {
          const n = nums.length;
          nums.sort((a, b) => a - b);
          for (let i = 0; i < n && nums[i] < 0 && k > 0; i++) {
            nums[i] *= -1;
            k--;
          }
          const sum = nums.reduce((total, num) => total + num, 0);
          if ((k & 1) === 0) return sum;
          return sum - 2 * Math.min(...nums);
        }`,
      },
      {
        script: Script.C,
        time: 0,
        memory: 5.7,
        desc: '遍历',
        code: `int comp(const void *a, const void *b) {
    return *(int *)a - *(int *)b;
}
int largestSumAfterKNegations(int* nums, int numsSize, int k){
    qsort(nums, numsSize, sizeof(int), comp);
    for (int i = 0; i < numsSize && nums[i] < 0 && k > 0; i++) {
      nums[i] *= -1;
      k--;
    }
    int sum = 0, min = 10000;
    for (int i = 0; i < numsSize; i++) {
        sum += nums[i];
        if (min > nums[i]) min = nums[i];
    }
    if ((k & 1) == 0) return sum;
    return sum - 2 * min;
}`,
      },
    ],
  },
];
