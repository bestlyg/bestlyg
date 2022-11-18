import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '891. 子序列宽度之和',
  url: 'https://leetcode.cn/problems/sum-of-subsequence-widths/',
  difficulty: Difficulty.困难,
  tag: [Tag.数组, Tag.数学, Tag.排序],
  desc: `给你一个整数数组 nums ，返回 nums 的所有非空 子序列 的 宽度之和 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 224,
      memory: 52.5,
      desc: '因为子序列是选取某几个元素组成所以和顺序无关，先排序然后比较对于每一个元素，有几次做最大值有几次做最小值',
      code: `class Solution {
public:
    typedef long long ll;
    const ll mod = 1e9 + 7;
    int sumSubseqWidths(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        ll ans = 0, n = nums.size();
        for (ll i = 0; i < n; i++) ans = (ans + (toCount(i + 1) - toCount(n - i)) * nums[i]) % mod;
        return ans;
    }
    ll toCount(ll num) {
        return quick_pow(2, num - 1);
    }
    ll quick_pow(ll a, ll b) {
        ll ans = 1, tmp = a;
        for (; b; b >>= 1) {
            if (b & 1) ans = (ans * tmp) % mod;
            tmp = (tmp * tmp) % mod;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
