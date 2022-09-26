import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '面试题 17.19. 消失的两个数字',
  url: 'https://leetcode.cn/problems/missing-two-lcci/',
  difficulty: Difficulty.困难,
  tag: [Tag.位运算, Tag.数组,Tag.哈希表],
  desc: `给定一个数组，包含从 1 到 N 所有的整数，但其中缺了两个数字。你能在 O(N) 时间内只用 O(1) 的空间找到它们吗？`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 21.7,
      desc: '遍历,因为只缺少两个不同的数字,使用异或遍历所有数和所有存在数,只有缺少的两个数字会被异或,其他的都会抵消,此时利用最低位1说明两个不同的数字异或必存在一个1且一个数字有,一个数字无',
      code: `class Solution {
public:
    vector<int> missingTwo(vector<int>& nums) {
        int xor_num = 0, n = nums.size() + 2;
        for (auto &num : nums) xor_num ^= num;
        for (int i = 1; i <= n; i++) xor_num ^= i;
        int num = xor_num & -xor_num;
        vector<int> list(2, 0);
        for (auto &item : nums) {
            if (item & num) list[0] ^= item;
            else list[1] ^= item;
        }
        for (int item = 1; item <= n; item++) {
            if (item & num) list[0] ^= item;
            else list[1] ^= item;
        }
        return list;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
