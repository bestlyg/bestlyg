import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '457. 环形数组是否存在循环',
  url: 'https://leetcode-cn.com/problems/number-of-pairs-of-interchangeable-rectangles/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.数学, Tag.计数, Tag.数论],
  desc: `计算并返回 rectangles 中有多少对 可互换 矩形。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 7,
      desc: '对于每个起点进行双指针遍历',
      code: `class Solution {
   public:
    int getNext(int i, vector<int>& nums) {
        int delta = 1000 * nums.size(), n = nums.size();
        if (nums[i] < 0) delta *= -1;
        nums[i] += delta;
        return ((i + nums[i]) % n + n) % n;
    }
    bool circularArrayLoop(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            if (abs(nums[i]) > 1000) continue;
            int p = i, q = i;
            do {
                p = getNext(p, nums);
                q = getNext(getNext(q, nums), nums);
            } while (p != q);
            int a = 0, b = 0, l = 0;
            do {
                if (nums[p] > 0)
                    a++;
                else
                    b++;
                l++;
                p = getNext(p, nums);
            } while (p != q);
            if (l > 1 && (a == 0 || b == 0)) return 1;
        }
        return 0;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
