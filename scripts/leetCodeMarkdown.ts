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
  exist: true,
  name: '825. 适龄的朋友',
  url: 'https://leetcode-cn.com/problems/friends-of-appropriate-ages/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.双指针, Tag.二分查找, Tag.排序],
  desc: `在社交媒体网站上有 n 个用户。返回在该社交媒体网站上产生的好友请求总数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 56,
      memory: 36.3,
      desc: '双指针移动',
      code: `class Solution {
   public:
    int numFriendRequests(vector<int>& ages) {
        sort(ages.begin(), ages.end());
        int n = ages.size(), l = 0, r = 0, ans = 0;
        for (int i = 0; i < n; i++) {
            if (ages[i] * 0.5 + 7 > ages[i]) continue; 
            while (r + 1 < n && ages[r + 1] <=ages[i]) r++;
            while (l < r && ages[l] <= ages[i] * 0.5 + 7) l++;
            ans += r - l;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
