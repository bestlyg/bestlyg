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
    name: '594. 最长和谐子序列',
    url: 'https://leetcode-cn.com/problems/longest-harmonious-subsequence/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.哈希表, Tag.排序],
    desc: `现在，给你一个整数数组 nums ，请你在所有可能的子序列中找到最长的和谐子序列的长度。`,
    solutions: [
      {
        script: Script.TS,
        time: 120,
        memory: 48.6,
        desc: '哈希存储',
        code: `function findLHS(nums: number[]): number {
          const map = new Map<number, number>();
          for (const num of nums) map.set(num, (map.get(num) ?? 0) + 1);
          const list = Array.from(map.entries()).sort(([num1], [num2]) => num1 - num2);
          let ans = 0;
          for (let i = 0, l = list.length; i < l - 1; i++) {
            const [num1, cnt1] = list[i];
            const [num2, cnt2] = list[i + 1];
            if (num2 !== num1 + 1) continue;
            ans = Math.max(ans, cnt1 + cnt2);
          }
          return ans;
        }`,
      },
      {
        script: Script.C,
        time: 52,
        memory: 8.6,
        desc: '排序',
        code: `int comp(int *num1, int *num2){
    return *num1 - *num2;
}
int findLHS(int* nums, int numsSize){
    qsort(nums, numsSize, sizeof(int), comp);
    int ans = 0, left = 0, right = 0;
    while(right < numsSize - 1){
        while(right < numsSize - 1 && nums[right] == nums[left]) right++;
        while(right < numsSize - 1 && nums[right] == nums[right + 1]) right++;
        if(nums[left] == nums[right] - 1 && right - left + 1 > ans) ans = right - left + 1;
        while(nums[left] != nums[right]) left++;
    }
    return ans;
}`,
      },
    ],
  },
];
