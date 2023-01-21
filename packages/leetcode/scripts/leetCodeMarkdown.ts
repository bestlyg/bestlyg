import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1013. 将数组分成和相等的三个部分',
  url: 'https://leetcode.cn/problems/partition-array-into-three-parts-with-equal-sum/',
  difficulty: Difficulty.简单,
  tag: [Tag.贪心, Tag.数组],
  desc: `给你一个整数数组 arr，只有可以将其划分为三个和相等的 非空 部分时才返回 true，否则返回 false。`,
  solutions: [
    {
      script: Script.PY3,
      time: 248,
      memory: 26.3,
      desc: 'dfs',
      code: `class Solution:
def canThreePartsEqualSum(self, arr: List[int]) -> bool:
    print(arr)
    n = len(arr)
    nsum = sum(arr)
    print(nsum)
    if nsum / 3 != nsum // 3:
        return False
    num = nsum // 3
    f: bool = False
    def dfs(i: int, frag: int):
        nonlocal f
        if i == n:
            if frag == 3:
                f = True
            return
        vsum = 0
        for i in range(i, n):
            vsum += arr[i]
            if vsum == num:
                dfs(i + 1, frag + 1)
    dfs(0, 0)
    return f`,
    },
  ],
};

export default leetCodeMarkdown;
