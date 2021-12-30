import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1296. 划分数组为连续数字的集合',
  url: 'https://leetcode-cn.com/problems/divide-array-in-sets-of-k-consecutive-numbers/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.哈希表, Tag.排序],
  desc: `给你一个整数数组 nums 和一个正整数 k，请你判断是否可以把这个数组划分成一些由 k 个连续数字组成的集合。如果可以，请返回 true；否则，返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 32,
      memory: 19.9,
      desc: '遍历后标记使用过的值',
      code: `class Solution {
   public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        int n = hand.size(), ans = 0, *check = (int*)calloc(n, sizeof(int)),
            *nums = (int*)calloc(groupSize, sizeof(int));
        sort(hand.begin(), hand.end());
        for (int i = 0; i < n; i++) {
            if (check[i]) continue;
            int len = 0, pre = hand[i];
            nums[len++] = i;
            for (int j = i + 1; j < n && len < groupSize && hand[j] <= pre + 1;
                 j++) {
                if (check[j] || pre == hand[j]) continue;
                pre = hand[j];
                nums[len++] = j;
            }
            if (len < groupSize) continue;
            ans++;
            for (int j = 0; j < groupSize; j++) check[nums[j]] = 1;
        }
        return ans * groupSize == n;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
