import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '89. 格雷编码',
  url: 'https://leetcode-cn.com/problems/number-of-pairs-of-interchangeable-rectangles/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.数学, Tag.计数, Tag.数论],
  desc: `计算并返回 rectangles 中有多少对 可互换 矩形。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 11.5,
      desc: '每次反向覆盖',
      code: `class Solution {
   public:
    vector<int> grayCode(int n) {
        vector<int> ans(2, 0);
        ans[1] = 1;
        for (int i = 1; i < n; i++) {
            for (int j = ans.size() - 1; j >= 0; j--) {
                ans.push_back(ans[j] | 1 << i);
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
