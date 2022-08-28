import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '793. 阶乘函数后 K 个零',
  url: 'https://leetcode.cn/problems/preimage-size-of-factorial-zeroes-function/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学, Tag.二分查找],
  desc: `给定 k，找出返回能满足 f(x) = k 的非负整数 x 的数量。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.8,
      desc: '层序遍历',
      code: `class Solution {
public:
    int preimageSizeFZF(int k) {
        return help(k + 1) - help(k);
    }
    long long help(int k) {
        long long l = 0, r = 5LL * k;
        while (l < r) {
            long long mid = (l + r) / 2;
            if (get_cnt(mid) >= k) r = mid;
            else l = mid + 1;
        }
        return l;
    }
    int get_cnt(int num) {
        int cnt = 0;
        while (num) {
            cnt += num / 5;
            num /= 5;
        }
        return cnt;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
