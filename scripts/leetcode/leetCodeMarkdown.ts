import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '817. 链表组件',
  url: 'https://leetcode.cn/problems/linked-list-components/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.链表],
  desc: `返回列表 nums 中组件的个数`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 20.8,
      desc: '遍历',
      code: `class Solution {
public:
    int numComponents(ListNode* head, vector<int>& nums) {
        unordered_set<int> s(nums.begin(), nums.end());
        ListNode *p = head;
        while (p && !s.count(p->val)) p = p->next;
        int ans = 0;
        while (p) {
            while (p && s.count(p->val)) p = p->next;
            ans++;
            while (p && !s.count(p->val)) p = p->next;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
