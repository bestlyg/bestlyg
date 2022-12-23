import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1703. 得到连续 K 个 1 的最少相邻交换次数',
  url: 'https://leetcode.cn/problems/minimum-adjacent-swaps-for-k-consecutive-ones/',
  difficulty: Difficulty.困难,
  tag: [Tag.贪心, Tag.数组, Tag.前缀和, Tag.滑动窗口],
  desc: `请你返回使 nums 中包含 k 个 连续 1 的 最少 交换次数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 564,
      memory: 122.5,
      desc: link(
        '参考链接',
        'https://leetcode.cn/problems/minimum-adjacent-swaps-for-k-consecutive-ones/solution/tu-jie-zhuan-huan-cheng-zhong-wei-shu-ta-iz4v/'
      ),
      code: `class Solution {
public:
    int minMoves(vector<int>& nums, int k) {
        int ans = 0x7fffffff;
        vector<int> ilist, slist(1, 0);
        for (int i = 0, cnt = 0; i < nums.size(); i++) {
            if (nums[i] == 1) {
                ilist.push_back(i - cnt++);
                slist.push_back(slist.back() + ilist.back());
            }
        }
        for (int i = 0; i + k <= ilist.size(); i++) 
            ans = min(ans, slist[i + k] + slist[i] - 2 * slist[i + k / 2] - k % 2 * ilist[i + k / 2]);
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
