import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1814. 统计一个数组中好对子的数目',
  url: 'https://leetcode.cn/problems/count-nice-pairs-in-an-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.数学, Tag.计数],
  desc: `请你返回好下标对的数目。`,
  solutions: [
    {
      script: Script.PY3,
      time: 260,
      memory: 23.1,
      desc: '双指针递归',
      code: `class Solution:
def countNicePairs(self, nums: List[int]) -> int:
    m = Counter()
    ans = 0
    for num in nums:
        k = num - int(str(num)[::-1])
        ans += m[k]
        m[k] += 1
    return int(ans % (1e9 + 7))`,
    },
  ],
};

export default leetCodeMarkdown;
