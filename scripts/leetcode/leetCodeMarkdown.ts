import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '373. 查找和最小的K对数字',
  url: 'https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.排序],
  desc: `给你一个整数数组 nums ，其中总是存在 唯一的 一个最大整数 。请你找出数组中的最大元素并检查它是否 至少是数组中每个其他数字的两倍 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 924,
      memory: 62.6,
      desc: '堆',
      code: `class Solution {
   public:
    struct node {
        int num1, num2, sum;
        bool operator<(const node& obj) const {
            return sum == obj.sum
                       ? num2 == obj.num2 ? num1 < obj.num1 : num2 < obj.num2
                       : sum < obj.sum;
        }
    };
    vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2,
                                       int k) {
        priority_queue<node> q;
        int isBreak = 0, len = min(k, (int)(nums1.size() * nums2.size()));
        // cout << "len = " << len << endl;
        vector<vector<int>> ans(len, vector<int>(2));
        for (auto& num1 : nums1) {
            if (isBreak) break;
            for (auto& num2 : nums2) {
                if (q.size() >= len && num1 > 0 && num2 > 0 &&
                    num1 > q.top().sum && num2 > q.top().sum)
                    isBreak = 1;
                if (isBreak) break;
                if (q.size() < len) {
                    q.push((node){num1, num2, num1 + num2});
                } else if (q.top().sum > num1 + num2) {
                    // cout << q.top().num1 << ',' << q.top().num2;
                    // if (q.top() )
                    q.pop();
                    q.push((node){num1, num2, num1 + num2});
                }
            }
        }
        while (q.size()) {
            node n = q.top();
            q.pop();
            ans[len - 1][0] = n.num1;
            ans[len - 1][1] = n.num2;
            len--;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
